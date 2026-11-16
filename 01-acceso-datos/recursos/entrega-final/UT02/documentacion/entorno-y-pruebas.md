# UT02 · Preparación del proyecto y pruebas

[Inicio de la entrega](../../INDICE.md) · [Documentación de UT02](INDICE.md) · [Ejercicios resueltos](../ejercicios/INDICE.md)

<a id="indice"></a>
## Índice de apartados

- [1. Entorno común](#nav-entorno-comun)
- [2. Dependencias Maven](#nav-dependencias-maven)
- [3. Helper de transacciones](#nav-helper-de-transacciones)
- [4. Datos mínimos de world](#nav-datos-minimos-de-world)
- [5. Datos de la práctica de salarios](#nav-datos-de-la-practica-de-salarios)
- [6. Suite de pruebas JDBC](#nav-suite-de-pruebas-jdbc)
- [7. Reproducir las pruebas desde los documentos](#nav-reproducir-las-pruebas-desde-los-documentos)

<a id="nav-entorno-comun"></a>
## 1. Entorno común

Java 11 o superior, Maven y los drivers del motor que se vaya a utilizar. Los archivos completos se identifican mediante una ruta como `src/main/java/jdbc/IdiomasEspana.java`. Copiar cada uno en esa ruta, sin incluir los delimitadores Markdown.

| Actividad | Entorno de trabajo | Validación local prevista |
|---|---|---|
| Ejercicios 1–5 | MySQL y world importada. | H2 y SQLite reales en memoria, con datos mínimos explícitos. |
| Salarios | Esquema emp, driver con ResultSet actualizable y tablas transaccionales. | H2 con los catorce empleados y fallo antes de commit. |
| Procedimientos | Rutinas preparadas en MySQL u Oracle. | Compilación del Java; sin certificación de los servidores. |
| Chinook | SQLite y distribución con los nombres de tabla indicados. | Muestra mínima de relaciones y casos límite; no la base completa. |

Configurar `DB_URL`, `DB_USER` y `DB_PASSWORD` en el entorno del proceso o del IDE. La clase [Conexion](../contenidos/3A-manejo-de-conectores.md#preparar-conexion) está en el tema 3A y se comparte con los ejercicios. No usar credenciales de administrador como ejemplo por defecto.

```text
MySQL world: jdbc:mysql://localhost:3306/world
Oracle por servicio: jdbc:oracle:thin:@//localhost:1521/XE
SQLite local: jdbc:sqlite:/ruta/absoluta/chinook.db
```

[↑ Volver al índice](#indice)

<a id="nav-dependencias-maven"></a>
## 2. Dependencias Maven

Las versiones se fijan para reproducir los ejemplos. No son una recomendación de dependencias actuales para producción. Connector/J y SQLite están disponibles al ejecutar; H2 y JUnit solo se utilizan en las pruebas.

### `pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>dam2.acceso</groupId>
    <artifactId>ut02-jdbc</artifactId>
    <version>1.0-SNAPSHOT</version>
    <properties>
        <maven.compiler.release>11</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>
    <dependencies>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>3.42.0.0</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <version>1.4.200</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.13.0</version>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.2.5</version>
            </plugin>
        </plugins>
    </build>
</project>
```

[↑ Volver al índice](#indice)

<a id="nav-helper-de-transacciones"></a>
## 3. Helper de transacciones

Se exige una conexión inicialmente en autocommit para no confirmar trabajo ajeno. Si una operación falla, se intenta rollback y se conserva la excepción original. Si el rollback falla, **no se reactiva autocommit**, porque podría confirmar cambios inciertos: el llamante debe descartar esa conexión.

### `src/main/java/jdbc/Transacciones.java`

```java
package jdbc;

import java.sql.Connection;
import java.sql.SQLException;

public final class Transacciones {
    private Transacciones() {
    }

    @FunctionalInterface
    public interface Trabajo<T> {
        T ejecutar() throws SQLException;
    }

    public static <T> T ejecutar(Connection conexion, Trabajo<T> trabajo) throws SQLException {
        if (!conexion.getAutoCommit()) {
            throw new SQLException("El método requiere una conexión sin transacción pendiente");
        }

        conexion.setAutoCommit(false);
        boolean finalizada = false;
        Throwable fallo = null;
        try {
            T resultado = trabajo.ejecutar();
            conexion.commit();
            finalizada = true;
            return resultado;
        } catch (SQLException | RuntimeException ex) {
            fallo = ex;
            try {
                conexion.rollback();
                finalizada = true;
            } catch (SQLException errorRollback) {
                ex.addSuppressed(errorRollback);
            }
            throw ex;
        } finally {
            if (finalizada) {
                try {
                    conexion.setAutoCommit(true);
                } catch (SQLException errorRestauracion) {
                    if (fallo != null) {
                        fallo.addSuppressed(errorRestauracion);
                    } else {
                        throw errorRestauracion;
                    }
                }
            }
        }
    }
}
```

La clase no cierra la conexión recibida; los `main` la cierran con try-with-resources. Las tablas deben utilizar un motor transaccional. En una aplicación con transacciones gestionadas por un framework se utiliza el mecanismo del framework, no este helper de demostración.

[↑ Volver al índice](#indice)

<a id="nav-datos-minimos-de-world"></a>
## 4. Datos mínimos de world

**Muestra sintética para pruebas**, no copia de la world completa ni estadísticas actuales. Ejecutar solo en una base nueva de prácticas. No hay DROP DATABASE ni credenciales.

### `src/test/resources/world-minimo.sql`

```sql
CREATE TABLE country (
    Code CHAR(3) PRIMARY KEY,
    Name VARCHAR(64) NOT NULL,
    Population BIGINT NOT NULL CHECK (Population >= 0)
);

CREATE TABLE city (
    ID INTEGER PRIMARY KEY,
    Name VARCHAR(64) NOT NULL,
    CountryCode CHAR(3) NOT NULL,
    District VARCHAR(64),
    Population BIGINT NOT NULL,
    FOREIGN KEY (CountryCode) REFERENCES country (Code)
);

CREATE TABLE countrylanguage (
    CountryCode CHAR(3) NOT NULL,
    Language VARCHAR(64) NOT NULL,
    Percentage DECIMAL(5, 1) NOT NULL,
    PRIMARY KEY (CountryCode, Language),
    FOREIGN KEY (CountryCode) REFERENCES country (Code)
);

INSERT INTO country (Code, Name, Population)
VALUES ('ESP', 'Spain', 40000000),
    ('FRA', 'France', 60000000),
    ('IRL', 'O''Pais', 5000000);

INSERT INTO city (ID, Name, CountryCode, District, Population)
VALUES (1, 'Madrid', 'ESP', 'Madrid', 3200000),
    (2, 'Barcelona', 'ESP', 'Catalunya', 1600000),
    (3, 'Paris', 'FRA', 'Ile-de-France', 2100000),
    (4, 'Ciudad con comilla', 'IRL', 'Prueba', 100);

INSERT INTO countrylanguage (CountryCode, Language, Percentage)
VALUES ('ESP', 'Spanish', 74.4),
    ('ESP', 'Catalan', 16.9),
    ('FRA', 'French', 99.0);
```

[↑ Volver al índice](#indice)

<a id="nav-datos-de-la-practica-de-salarios"></a>
## 5. Datos de la práctica de salarios

Se conservan los catorce empleados, fechas e importes del adjunto docente, pero se utiliza SQL portátil de carga para las pruebas, sin borrar bases completas y sin depender de STR_TO_DATE. Las tablas bonus y salgrade del script original no intervienen en el cálculo de esta práctica.

### `src/test/resources/emp.sql`

```sql
CREATE TABLE dept (
    deptno NUMERIC(2, 0) PRIMARY KEY,
    dname VARCHAR(14),
    loc VARCHAR(13)
);

CREATE TABLE emp (
    empno NUMERIC(4, 0) PRIMARY KEY,
    ename VARCHAR(10),
    job VARCHAR(9),
    mgr NUMERIC(4, 0),
    hiredate DATE,
    sal NUMERIC(7, 2),
    comm NUMERIC(7, 2),
    deptno NUMERIC(2, 0),
    FOREIGN KEY (deptno) REFERENCES dept (deptno)
);

INSERT INTO dept (deptno, dname, loc)
VALUES (10, 'ACCOUNTING', 'NEW YORK'),
    (20, 'RESEARCH', 'DALLAS'),
    (30, 'SALES', 'CHICAGO'),
    (40, 'OPERATIONS', 'BOSTON');

INSERT INTO emp (empno, ename, job, mgr, hiredate, sal, comm, deptno)
VALUES (7839, 'KING', 'PRESIDENT', NULL, '1981-11-17', 5000, NULL, 10),
    (7698, 'BLAKE', 'MANAGER', 7839, '1981-05-01', 2850, NULL, 30),
    (7782, 'CLARK', 'MANAGER', 7839, '1981-06-09', 2450, NULL, 10),
    (7566, 'JONES', 'MANAGER', 7839, '1981-04-02', 2975, NULL, 20),
    (7788, 'SCOTT', 'ANALYST', 7566, '1987-07-13', 3000, NULL, 20),
    (7902, 'FORD', 'ANALYST', 7566, '1981-12-03', 3000, NULL, 20),
    (7369, 'SMITH', 'CLERK', 7902, '1980-12-17', 800, NULL, 20),
    (7499, 'ALLEN', 'SALESMAN', 7698, '1981-02-20', 1600, 300, 30),
    (7521, 'WARD', 'SALESMAN', 7698, '1981-02-22', 1250, 500, 30),
    (7654, 'MARTIN', 'SALESMAN', 7698, '1981-09-28', 1250, 1400, 30),
    (7844, 'TURNER', 'SALESMAN', 7698, '1981-09-08', 1500, 0, 30),
    (7876, 'ADAMS', 'CLERK', 7788, '1987-07-13', 1100, NULL, 20),
    (7900, 'JAMES', 'CLERK', 7698, '1981-12-03', 950, NULL, 30),
    (7934, 'MILLER', 'CLERK', 7782, '1982-01-23', 1300, NULL, 10);
```

[↑ Volver al índice](#indice)

<a id="nav-suite-de-pruebas-jdbc"></a>
## 6. Suite de pruebas JDBC

### `src/test/java/jdbc/JdbcTest.java`

```java
package jdbc;

import static org.junit.Assert.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.UUID;
import org.junit.Test;

public class JdbcTest {
    private Connection base(boolean sqlite, String recurso) throws Exception {
        String url = sqlite ? "jdbc:sqlite::memory:"
                            : "jdbc:h2:mem:t" + UUID.randomUUID().toString().replace("-", "");
        Connection conexion = DriverManager.getConnection(url);
        try {
            if (sqlite) {
                try (Statement sentencia = conexion.createStatement()) {
                    sentencia.execute("PRAGMA foreign_keys = ON");
                }
            }
            try (InputStream entrada = getClass().getResourceAsStream("/" + recurso)) {
                if (entrada == null) {
                    throw new IllegalStateException("Falta el recurso " + recurso);
                }
                String sql = new String(entrada.readAllBytes(), StandardCharsets.UTF_8);
                try (Statement sentencia = conexion.createStatement()) {
                    for (String instruccion : sql.split(";")) {
                        if (!instruccion.isBlank()) {
                            sentencia.execute(instruccion);
                        }
                    }
                }
            }
            return conexion;
        } catch (Exception ex) {
            conexion.close();
            throw ex;
        }
    }

    private long valor(Connection conexion, String sql) throws SQLException {
        try (Statement sentencia = conexion.createStatement();
                ResultSet filas = sentencia.executeQuery(sql)) {
            assertTrue(filas.next());
            return filas.getLong(1);
        }
    }

    private Map<String, BigDecimal> salarios(Connection conexion) throws SQLException {
        Map<String, BigDecimal> resultado = new TreeMap<>();
        try (Statement sentencia = conexion.createStatement();
                ResultSet filas = sentencia.executeQuery("SELECT ename, sal FROM emp")) {
            while (filas.next()) {
                resultado.put(filas.getString(1), filas.getBigDecimal(2));
            }
        }
        return resultado;
    }

    @Test
    public void idiomasEnDosMotores() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                List<String> filas = IdiomasEspana.consultar(c);
                assertEquals(2, filas.size());
                assertTrue(filas.get(0).startsWith("Spanish: 74.4"));
                assertTrue(filas.get(1).startsWith("Catalan: 16.9"));
            }
        }
    }

    @Test
    public void idiomasSinDatos() throws Exception {
        try (Connection c = base(true, "world-minimo.sql"); Statement s = c.createStatement()) {
            s.executeUpdate("DELETE FROM countrylanguage WHERE CountryCode = 'ESP'");
            assertTrue(IdiomasEspana.consultar(c).isEmpty());
        }
    }

    @Test
    public void metadatosYConteo() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                List<String> tablas = ListarTablas.listar(c);
                assertEquals(3, tablas.size());
                String texto = String.join("\n", tablas).toLowerCase();
                assertTrue(texto.contains("countrylanguage"));
                assertTrue(texto.contains("city"));
                assertTrue(texto.contains("catálogo:"));
            }
        }
    }

    @Test
    public void dmlSobreFilaTemporal() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                ModificarCiudad.ejecutar(c, 900000);
                assertEquals(4, valor(c, "SELECT COUNT(*) FROM city"));
                assertEquals(0, valor(c, "SELECT COUNT(*) FROM city WHERE ID = 900000"));
                assertEquals(3200000, valor(c, "SELECT Population FROM city WHERE ID = 1"));
                assertTrue(c.getAutoCommit());
            }
        }
    }

    @Test
    public void claveDuplicadaNoBorraLaFilaOriginal() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                try {
                    ModificarCiudad.ejecutar(c, 1);
                    fail("Debió fallar la clave duplicada");
                } catch (SQLException esperada) {
                    assertEquals(3200000, valor(c, "SELECT Population FROM city WHERE ID = 1"));
                }
                assertEquals(4, valor(c, "SELECT COUNT(*) FROM city"));
            }
        }
    }

    @Test
    public void buscarOrdenYUmbral() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                List<String> filas = BuscadorCiudades.buscar(c, "Spain", 100000);
                assertEquals(2, filas.size());
                assertTrue(filas.get(0).startsWith("Madrid |"));
                assertTrue(filas.get(1).startsWith("Barcelona |"));
                assertTrue(BuscadorCiudades.buscar(c, "Spain", 99999999).isEmpty());
            }
        }
    }

    @Test
    public void parametrosConComillasEInyeccion() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                assertEquals(1, BuscadorCiudades.buscar(c, "O'Pais", 0).size());
                assertTrue(BuscadorCiudades.buscar(c, "' OR 1=1 --", 0).isEmpty());
                try {
                    BuscadorCiudades.buscar(c, "Spain", -1);
                    fail("Debió rechazar población negativa");
                } catch (IllegalArgumentException esperada) {
                    assertTrue(esperada.getMessage().contains("no negativa"));
                }
            }
        }
    }

    @Test
    public void transferenciaCorrecta() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                TransferirPoblacion.transferir(c, "FRA");
                assertEquals(
                        41000000, valor(c, "SELECT Population FROM country WHERE Code = 'ESP'"));
                assertEquals(
                        59000000, valor(c, "SELECT Population FROM country WHERE Code = 'FRA'"));
            }
        }
    }

    @Test
    public void paisInexistenteDeshaceLaPrimeraActualizacion() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                try {
                    TransferirPoblacion.transferir(c, "XXX");
                    fail("Debió detectar cero filas");
                } catch (SQLException esperada) {
                    assertEquals(40000000,
                            valor(c, "SELECT Population FROM country WHERE Code = 'ESP'"));
                    assertEquals(60000000,
                            valor(c, "SELECT Population FROM country WHERE Code = 'FRA'"));
                }
            }
        }
    }

    @Test
    public void poblacionInsuficienteTambienHaceRollback() throws Exception {
        try (Connection c = base(true, "world-minimo.sql"); Statement s = c.createStatement()) {
            s.executeUpdate("UPDATE country SET Population = 10 WHERE Code = 'FRA'");
            try {
                TransferirPoblacion.transferir(c, "FRA");
                fail();
            } catch (SQLException esperada) {
                assertEquals(
                        40000000, valor(c, "SELECT Population FROM country WHERE Code = 'ESP'"));
                assertEquals(10, valor(c, "SELECT Population FROM country WHERE Code = 'FRA'"));
            }
        }
    }

    @Test
    public void noConfirmaUnaTransaccionAjena() throws Exception {
        try (Connection c = base(true, "world-minimo.sql")) {
            c.setAutoCommit(false);
            try {
                TransferirPoblacion.transferir(c, "FRA");
                fail();
            } catch (SQLException esperada) {
                assertFalse(c.getAutoCommit());
                c.rollback();
            }
        }
    }

    @Test
    public void salariosDeLosCatorceEmpleados() throws Exception {
        try (Connection c = base(false, "emp.sql")) {
            assertEquals(14, ActualizarSalarios.actualizar(c, false));
            Map<String, BigDecimal> valores = salarios(c);
            String[] nombres = {"KING", "BLAKE", "CLARK", "JONES", "SCOTT", "FORD", "SMITH",
                    "ALLEN", "WARD", "MARTIN", "TURNER", "ADAMS", "JAMES", "MILLER"};
            String[] importes = {"5000.00", "3135.00", "2695.00", "3272.50", "3150.00", "3150.00",
                    "920.00", "1840.00", "1437.50", "1350.00", "1620.00", "1100.00", "950.00",
                    "1300.00"};
            for (int i = 0; i < nombres.length; i++) {
                assertEquals(nombres[i], 0,
                        new BigDecimal(importes[i]).compareTo(valores.get(nombres[i])));
            }
        }
    }

    @Test
    public void abortoAntesDeCommitRestauraTodosLosSalarios() throws Exception {
        try (Connection c = base(false, "emp.sql")) {
            Map<String, BigDecimal> iniciales = salarios(c);
            try {
                ActualizarSalarios.actualizar(c, true);
                fail("Debió abortar antes de commit");
            } catch (SQLException esperada) {
                assertEquals(iniciales, salarios(c));
                assertTrue(c.getAutoCommit());
            }
        }
    }

    @Test
    public void prioridadFechaLimiteYRedondeo() {
        BigDecimal cien = new BigDecimal("100.00");
        assertEquals(new BigDecimal("110.00"),
                ActualizarSalarios.nuevoSalario("MANAGER", LocalDate.of(1980, 1, 1), 20, cien));
        assertEquals(new BigDecimal("115.00"),
                ActualizarSalarios.nuevoSalario("SALESMAN", LocalDate.of(1981, 8, 31), 30, cien));
        assertEquals(new BigDecimal("108.00"),
                ActualizarSalarios.nuevoSalario("SALESMAN", LocalDate.of(1981, 9, 1), 30, cien));
        assertEquals(new BigDecimal("105.00"),
                ActualizarSalarios.nuevoSalario("ANALYST", null, 20, cien));
        assertEquals(new BigDecimal("100.00"),
                ActualizarSalarios.nuevoSalario("ANALYST", null, 10, cien));
        assertEquals(new BigDecimal("1.16"),
                ActualizarSalarios.nuevoSalario(
                        "CLERK", LocalDate.of(1980, 1, 1), 10, new BigDecimal("1.01")));
    }

    @Test
    public void entradaNoNumericaSeExplicaSinAbrirConexion() throws Exception {
        InputStream anteriorIn = System.in;
        PrintStream anteriorErr = System.err;
        ByteArrayOutputStream salida = new ByteArrayOutputStream();
        try {
            System.setIn(new ByteArrayInputStream(
                    "Spain\nno-es-numero\n".getBytes(StandardCharsets.UTF_8)));
            System.setErr(new PrintStream(salida, true, StandardCharsets.UTF_8));
            BuscadorCiudades.main(new String[0]);
            assertTrue(salida.toString(StandardCharsets.UTF_8).contains("entero válido"));
        } finally {
            System.setIn(anteriorIn);
            System.setErr(anteriorErr);
        }
    }

    @Test
    public void alumnosYMetadatosDeColumnas() throws Exception {
        for (boolean sqlite : new boolean[] {false, true}) {
            try (Connection c = base(sqlite, "world-minimo.sql")) {
                EjemplosJdbc.crearAlumnos(c);
                assertEquals(3, valor(c, "SELECT COUNT(*) FROM alumnos"));
                List<String> columnas = EjemplosJdbc.describirColumnas(c);
                assertEquals(2, columnas.size());
                assertTrue(columnas.get(0).toLowerCase().startsWith("dni:"));
            }
        }
    }

    @Test
    public void ventasConMapYRollback() throws Exception {
        try (Connection c = base(true, "world-minimo.sql"); Statement s = c.createStatement()) {
            s.execute("CREATE TABLE COFFEES (COF_NAME VARCHAR(60) PRIMARY KEY, "
                    + "SALES INTEGER NOT NULL, TOTAL INTEGER NOT NULL)");
            s.execute("INSERT INTO COFFEES VALUES ('Colombian', 0, 100)");
            EjemplosJdbc.actualizarVentas(c, Map.of("Colombian", 50));
            assertEquals(50, valor(c, "SELECT SALES FROM COFFEES"));
            assertEquals(150, valor(c, "SELECT TOTAL FROM COFFEES"));
            Map<String, Integer> ventas = new java.util.LinkedHashMap<>();
            ventas.put("Colombian", 10);
            ventas.put("Inexistente", 20);
            try {
                EjemplosJdbc.actualizarVentas(c, ventas);
                fail();
            } catch (SQLException esperada) {
                assertEquals(50, valor(c, "SELECT SALES FROM COFFEES"));
                assertEquals(150, valor(c, "SELECT TOTAL FROM COFFEES"));
            }
        }
    }

    @Test
    public void cursorActualizaInsertaYBorra() throws Exception {
        try (Connection c = base(false, "world-minimo.sql")) {
            EjemplosJdbc.crearAlumnos(c);
            EjemplosJdbc.editarConCursor(c);
            assertEquals(3, valor(c, "SELECT COUNT(*) FROM alumnos"));
            assertEquals(1,
                    valor(c,
                            "SELECT COUNT(*) FROM alumnos WHERE dni = '1' AND nombre = 'Ana "
                            + "Maria'"));
            assertEquals(0, valor(c, "SELECT COUNT(*) FROM alumnos WHERE dni = '2'"));
            assertEquals(1,
                    valor(c, "SELECT COUNT(*) FROM alumnos WHERE dni = '4' AND nombre = 'Marta'"));
        }
    }
}
```

[↑ Volver al índice](#indice)

<a id="nav-reproducir-las-pruebas-desde-los-documentos"></a>
## 7. Reproducir las pruebas desde los documentos

Desde `entrega-final/UT02`, copiar y ejecutar voluntariamente el siguiente bloque. Solo materializa los archivos completos; no ejecuta los ejemplos SQL dirigidos a servidores ni abre las bases del usuario.

```python
from pathlib import Path
import re
import subprocess
import tempfile

base = Path.cwd()
destino = Path(tempfile.mkdtemp(prefix="ut02-final-", dir="/tmp/opencode"))
documentos = sorted((base / "contenidos").glob("*.md"))
documentos += sorted((base / "ejercicios").glob("*.md"))
documentos += [base / "documentacion/entorno-y-pruebas.md"]
patron = r"^### `(pom\.xml|src/[^`]+)`\n\n```(?:java|xml|sql)\n(.*?)^```"
archivos = set()
for documento in documentos:
    for ruta, contenido in re.findall(patron, documento.read_text(), re.M | re.S):
        relativa = Path(ruta)
        if relativa.is_absolute() or ".." in relativa.parts or ruta in archivos:
            raise ValueError(f"Ruta inválida o repetida: {ruta}")
        archivos.add(ruta)
        archivo = destino / relativa
        archivo.parent.mkdir(parents=True, exist_ok=True)
        archivo.write_text(contenido, encoding="utf-8")
if len(archivos) != 14:
    raise ValueError(f"Se esperaban 14 archivos completos, encontrados {len(archivos)}")
print(destino, flush=True)
subprocess.run(["mvn", "-B", "test"], cwd=destino, check=True)
```

La carga de SQL de la suite divide este **fixture controlado** por punto y coma. No es un importador SQL general y no debe usarse para rutinas, delimitadores o cadenas arbitrarias.

Los resultados efectivos, versiones y límites de esta edición se publican en [VALIDACION](../../documentacion/VALIDACION.md). Las pruebas en H2/SQLite no certifican todos los detalles del driver MySQL ni los procedimientos almacenados de servidor.

[↑ Volver al índice](#indice)
