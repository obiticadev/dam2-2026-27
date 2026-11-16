# 6 · Práctica evaluable: actualización de salarios

[Todos los ejercicios](INDICE.md) · [Tema: ResultSet actualizable](../contenidos/3A-manejo-de-conectores.md#cursores)

## Enunciado y requisitos

Crear un proyecto **JDBCMySQL** y una clase con `main` que recupere los empleados de `emp` mediante un `ResultSet`, recorra las filas y actualice su salario. **Todas las modificaciones constituyen una única transacción.**

Aplicar **una sola subida** por empleado, en este orden:

| Prioridad | Condición | Incremento |
|---|---|---|
| 1 | Oficio MANAGER. | 10 % |
| 2 | Si no es MANAGER, alta anterior al **1 de septiembre de 1981**. | 15 % |
| 3 | Si no cumple las anteriores, ANALYST del departamento 20. | 5 % |
| 4 | Si no cumple las anteriores, SALESMAN. | 8 % |
| 5 | Cualquier otro caso. | Sin cambio. |

> **Prioridad, no acumulación.** BLAKE es gerente y tiene antigüedad suficiente: recibe solo el 10 %. ALLEN es vendedor contratado antes de la fecha: recibe el 15 %, no el 8 % ni ambos.

## Preparación de datos

El script original de EmpDept se conserva en el archivo de extracción, fuera de esta entrega. Empieza con **DROP DATABASE**: no debe ejecutarse contra una base que se quiera conservar. La [guía de pruebas](../documentacion/entorno-y-pruebas.md) contiene una carga portátil y explícita de los catorce empleados, sin borrar bases de datos existentes.

Para MySQL hay que preparar un esquema aislado con `emp` en un motor transaccional, como InnoDB. La consulta incluye la clave primaria y solo una tabla, para que el driver pueda ofrecer un resultado actualizable.

## Solución revisada

### `src/main/java/jdbc/ActualizarSalarios.java`

```java
package jdbc;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.sql.Statement;
import java.time.LocalDate;

public final class ActualizarSalarios {
    private static final LocalDate CORTE = LocalDate.of(1981, 9, 1);

    private ActualizarSalarios() {
    }

    public static BigDecimal nuevoSalario(
            String oficio, LocalDate alta, int departamento, BigDecimal salario) {
        if (salario == null || salario.signum() < 0) {
            throw new IllegalArgumentException("El salario debe ser no nulo y no negativo");
        }

        BigDecimal factor = BigDecimal.ONE;
        if ("MANAGER".equals(oficio)) {
            factor = new BigDecimal("1.10");
        } else if (alta != null && alta.isBefore(CORTE)) {
            factor = new BigDecimal("1.15");
        } else if ("ANALYST".equals(oficio) && departamento == 20) {
            factor = new BigDecimal("1.05");
        } else if ("SALESMAN".equals(oficio)) {
            factor = new BigDecimal("1.08");
        }
        return salario.multiply(factor).setScale(2, RoundingMode.HALF_UP);
    }

    public static int actualizar(Connection conexion, boolean abortarAntesDeCommit)
            throws SQLException {
        return Transacciones.ejecutar(conexion, () -> {
            int procesados = 0;
            try (Statement sentencia = conexion.createStatement(
                         ResultSet.TYPE_FORWARD_ONLY, ResultSet.CONCUR_UPDATABLE);
                    ResultSet filas = sentencia.executeQuery(
                            "SELECT empno, ename, job, hiredate, sal, deptno FROM emp")) {
                if (filas.getConcurrency() != ResultSet.CONCUR_UPDATABLE) {
                    throw new SQLFeatureNotSupportedException(
                            "El driver no ofrece un ResultSet actualizable para esta consulta");
                }

                while (filas.next()) {
                    Date fecha = filas.getDate("hiredate");
                    LocalDate alta = fecha == null ? null : fecha.toLocalDate();
                    int departamento = filas.getInt("deptno");
                    if (filas.wasNull()) {
                        departamento = -1;
                    }
                    BigDecimal salario = nuevoSalario(
                            filas.getString("job"), alta, departamento, filas.getBigDecimal("sal"));
                    filas.updateBigDecimal("sal", salario);
                    filas.updateRow();
                    procesados++;
                }
            }

            if (abortarAntesDeCommit) {
                throw new SQLException("Aborto de demostración antes de commit");
            }
            return procesados;
        });
    }

    public static void main(String[] args) {
        boolean abortar = args.length > 0 && "--abortar".equals(args[0]);
        try (Connection conexion = Conexion.abrir()) {
            int filas = actualizar(conexion, abortar);
            System.out.println("Transacción confirmada. Empleados procesados: " + filas);
        } catch (SQLException | IllegalArgumentException ex) {
            System.err.println("No se confirmó la actualización: " + ex.getMessage());
        }
    }
}
```

### Decisiones de implementación

- `BigDecimal` evita errores de redondeo binario; los factores se construyen desde cadenas.
- Se redondea a dos decimales con HALF_UP.
- La fecha límite es **exclusiva**: un alta el 01/09/1981 no cumple «anterior al».
- Un alta nula no satisface la condición de antigüedad. Un departamento nulo no es el 20.
- La lectura de cada fila se realiza con ResultSet y su actualización con `updateRow()`, como pide la práctica.
- La opción `--abortar` provoca un fallo después de actualizar las filas y antes del commit; la transacción debe deshacerlas todas.

## Resultados esperados con los catorce empleados

| Empleado | Inicial | Regla aplicada | Final |
|---|---:|---|---:|
| KING | 5000,00 | Ninguna | 5000,00 |
| BLAKE | 2850,00 | Gerente, 10 % | 3135,00 |
| CLARK | 2450,00 | Gerente, 10 % | 2695,00 |
| JONES | 2975,00 | Gerente, 10 % | 3272,50 |
| SCOTT | 3000,00 | Analista del 20, 5 % | 3150,00 |
| FORD | 3000,00 | Analista del 20, 5 % | 3150,00 |
| SMITH | 800,00 | Antigüedad, 15 % | 920,00 |
| ALLEN | 1600,00 | Antigüedad, 15 % | 1840,00 |
| WARD | 1250,00 | Antigüedad, 15 % | 1437,50 |
| MARTIN | 1250,00 | Vendedor, 8 % | 1350,00 |
| TURNER | 1500,00 | Vendedor, 8 % | 1620,00 |
| ADAMS | 1100,00 | Ninguna | 1100,00 |
| JAMES | 950,00 | Ninguna | 950,00 |
| MILLER | 1300,00 | Ninguna | 1300,00 |

Para comparar desde el cliente SQL:

```sql
SELECT empno, ename, job, hiredate, deptno, sal
FROM emp
ORDER BY empno;
```

## Preparación de la corrección oral y de la entrega oficial

1. Cargar los datos iniciales y mostrar la consulta anterior.
2. Ejecutar sin argumentos; verificar los catorce resultados de la tabla.
3. Restaurar los datos y ejecutar con `--abortar`; todos los salarios deben permanecer como al principio.
4. Explicar conexión, sentencia, cursor, condiciones de prioridad, commit y rollback.
5. Demostrar un error de conexión o una sentencia inválida sin ocultar el diagnóstico.

El aula pide comprimir el proyecto con las bibliotecas en una carpeta `librerias/` y usar el nombre **`apellido1_apellido2_nombre_3J_Tarea.zip`**, sin tildes, ñ ni caracteres especiales. Esta carpeta de apuntes **no es ese ZIP de entrega**. Maven puede copiar las dependencias con `dependency:copy-dependencies`; comprobar que el proyecto resultante cumple las instrucciones del profesor antes de enviarlo.

Las fechas de las indicaciones conservadas son 13/11/2026 para entrega y 17/09/2026 para corrección oral; se documenta la discrepancia, sin adivinar una fecha corregida. En la indicación oral se permite usar otro motor: las pruebas locales del ResultSet actualizable se realizan en H2, no certifican un servidor MySQL del usuario.

**Fuente:** [Práctica evaluable UT02 del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/assign/view.php?id=219702).
