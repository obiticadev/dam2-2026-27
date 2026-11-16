# Verificación técnica reproducible de UT03

## Alcance

La prueba toma **los bloques documentados**, no una implementación paralela. Combina los archivos completos revisados de [4B](../contenidos/4B-proyecto-hibernate-oracle-maven.md#proyecto-revisado), [4A](../contenidos/4A-mapeo-objeto-relacional.md#ejemplos-revisados) y [4C](../contenidos/4C-consultas-hql-y-criterios.md#consultas-revisadas). Los originales no se ejecutan. Se usa una base H2 en memoria independiente por prueba y el `Main` usa otra base H2 en memoria. Una prueba adicional hace CRUD sobre SQLite en memoria, con esquema explícito. No hay acceso a los servidores ni a las credenciales del usuario.

Java 11+ y Maven. Hibernate 5.4.33.Final y H2 1.4.200 se eligen por compatibilidad con la lección, no como versiones de producción actuales. La compilación usa `--release 11`; eso comprueba el nivel de lenguaje/API Java, no demuestra una ejecución sobre todas las versiones del JDK.

## Reproducir fuera de los apuntes

Desde `recursos/UT03-mapeo-objeto-relacional`, copiar y ejecutar voluntariamente este bloque. Solo extrae encabezados con una ruta de archivo completo; no ejecuta los bloques originales. Necesita acceso a Maven Central la primera vez. La carpeta temporal creada se imprime al terminar la extracción.

```python
from pathlib import Path
import re
import subprocess
import tempfile

base = Path.cwd()
destino = Path(tempfile.mkdtemp(prefix="ut03-", dir="/tmp/opencode"))
documentos = [
    base / "contenidos/4B-proyecto-hibernate-oracle-maven.md",
    base / "contenidos/4A-mapeo-objeto-relacional.md",
    base / "contenidos/4C-consultas-hql-y-criterios.md",
    base / "documentacion/verificacion.md",
]
patron = r"^### `(pom\.xml|src/[^`]+)`\n\n```(?:java|xml)\n(.*?)^```"
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
if len(archivos) != 8:
    raise ValueError(f"Se esperaban 8 archivos completos, encontrados {len(archivos)}")
print(destino, flush=True)
subprocess.run(["mvn", "-B", "test"], cwd=destino, check=True)
```

### `src/test/java/revision/RevisionTest.java`

```java
package revision;

import java.util.*;
import java.util.function.Function;
import javax.persistence.LockModeType;
import consultas.Consultas;
import modelo.Mapeos;
import modelo.Mapeos.*;
import modelo.Usuario;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import org.junit.Test;
import static org.junit.Assert.*;

public class RevisionTest {
    private SessionFactory factory() {
        Configuration cfg = new Configuration().configure();
        cfg.setProperty("hibernate.connection.url",
            "jdbc:h2:mem:t" + UUID.randomUUID().toString().replace("-", ""));
        for (Class<?> entidad : Mapeos.class.getDeclaredClasses()) {
            if (entidad.isAnnotationPresent(javax.persistence.Entity.class)) {
                cfg.addAnnotatedClass(entidad);
            }
        }
        return cfg.buildSessionFactory();
    }

    private <T> T tx(SessionFactory sf, Function<Session, T> accion) {
        try (Session s = sf.openSession()) {
            Transaction tx = s.beginTransaction();
            try {
                T valor = accion.apply(s);
                tx.commit();
                return valor;
            } catch (RuntimeException | Error ex) {
                try {
                    if (tx.isActive()) { tx.rollback(); }
                } catch (RuntimeException rollbackError) {
                    ex.addSuppressed(rollbackError);
                }
                throw ex;
            }
        }
    }

    private Profesor profesor(String nombre) {
        return new Profesor(nombre, "CORTINA", "GARCIA");
    }

    @Test public void crudDocumentado() {
        // También prueba la construcción desde el hibernate.cfg.xml documentado.
        programas.Main.main(new String[0]);
    }

    @Test public void rollbackNoGuardaCambios() {
        try (SessionFactory sf = factory()) {
            try {
                tx(sf, s -> {
                    s.persist(new Usuario(99, "Rollback"));
                    s.flush();
                    throw new IllegalStateException("Fallo simulado");
                });
                fail("Debió propagar el error");
            } catch (IllegalStateException esperada) {
                assertEquals("Fallo simulado", esperada.getMessage());
            }
            tx(sf, s -> { assertNull(s.get(Usuario.class, 99)); return null; });
        }
    }

    @Test public void relacionesUnoAUnoYUnoAMuchos() {
        try (SessionFactory sf = factory()) {
            Integer id = tx(sf, s -> {
                Profesor p = profesor("Sara");
                p.perfil = new Perfil(); p.perfil.descripcion = "Docente";
                Direccion d = new Direccion(); d.calle = "Plaza";
                p.setDireccion(d);
                p.addAviso("Primero"); p.addAviso("Segundo");
                p.addCorreo("b@ejemplo.invalid"); p.addCorreo("a@ejemplo.invalid");
                s.persist(p); return p.id;
            });
            tx(sf, s -> {
                Profesor p = s.get(Profesor.class, id);
                assertEquals("Docente", p.perfil.descripcion);
                assertEquals("Plaza", p.direccion.calle);
                assertSame(p, p.direccion.profesor);
                assertEquals(2, p.avisos.size());
                assertEquals("b@ejemplo.invalid", p.correos.get(0).direccion);
                Collections.swap(p.correos, 0, 1);
                return null;
            });
            tx(sf, s -> {
                Profesor p = s.get(Profesor.class, id);
                assertEquals("a@ejemplo.invalid", p.correos.get(0).direccion);
                p.correos.remove(0); return null;
            });
            tx(sf, s -> {
                assertEquals(Long.valueOf(1), s.createQuery("select count(c) from Correo c", Long.class).uniqueResult());
                s.remove(s.get(Profesor.class, id)); return null;
            });
            tx(sf, s -> {
                for (String entidad : Arrays.asList("Correo", "Aviso", "Direccion", "Perfil")) {
                    assertEquals(Long.valueOf(0), s.createQuery("select count(e) from " + entidad + " e", Long.class).uniqueResult());
                }
                return null;
            });
        }
    }

    @Test public void muchosAMuchosNoBorraModuloCompartido() {
        try (SessionFactory sf = factory()) {
            Integer[] ids = tx(sf, s -> {
                Modulo m = new Modulo(); m.nombre = "Acceso a datos";
                Profesor p1 = profesor("Ana"); Profesor p2 = profesor("Luis");
                p1.addModulo(m); p2.addModulo(m);
                s.persist(p1); s.persist(p2);
                return new Integer[] {p1.id, p2.id, m.id};
            });
            tx(sf, s -> {
                Profesor p = s.get(Profesor.class, ids[0]);
                for (Modulo m : new HashSet<>(p.modulos)) { p.removeModulo(m); }
                s.remove(p); return null;
            });
            tx(sf, s -> {
                assertNotNull(s.get(Modulo.class, ids[2]));
                assertEquals(1, s.get(Profesor.class, ids[1]).modulos.size());
                return null;
            });
        }
    }

    @Test public void claveCompuestaYTelefono() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                Company c = new Company(1L, "Almacenes");
                c.addEmployee(7L, "Lopez");
                s.persist(c); s.flush();
                Phone phone = new Phone(); phone.numero = "555-0100";
                phone.employee = c.employees.iterator().next();
                s.persist(phone); return null;
            });
            tx(sf, s -> {
                Employee e = s.get(Employee.class, new EmployeeId(1L, 7L));
                assertEquals("Lopez", e.nombre);
                assertEquals(Long.valueOf(1), e.company.getId());
                assertSame(e, s.get(Phone.class, "555-0100").employee);
                return null;
            });
            EmployeeId a = new EmployeeId(1L, 7L);
            EmployeeId b = new EmployeeId(1L, 7L);
            assertEquals(a, b); assertEquals(a.hashCode(), b.hashCode());
            assertNotEquals(a, new EmployeeId(1L, 8L));
        }
    }

    @Test public void consultasNombradasCriteriaYParametros() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> { s.persist(profesor("O'Connor")); return null; });
            tx(sf, s -> {
                assertEquals(1, Consultas.buscar(s, "O'Connor", "CORTINA", "GARCIA").size());
                assertEquals(1, Consultas.buscarNombrada(s, "O'Connor", "CORTINA", "GARCIA").size());
                assertEquals(1, Consultas.buscarCriteria(s, "O'Connor", "CORTINA", "GARCIA").size());
                assertTrue(Consultas.buscar(s, "' or 1=1 --", "CORTINA", "GARCIA").isEmpty());
                assertEquals(1, s.createNamedQuery("Profesores.findAll", Profesor.class).list().size());
                assertNull(Consultas.porId(s, -1)); return null;
            });
        }
    }

    @Test public void proyeccionesPaginacionYAgregados() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                Profesor p = profesor("Ana"); s.persist(p); s.persist(profesor("Ana"));
                s.persist(profesor("Luis"));
                for (int horas : new int[] {100, 200}) {
                    Ciclo c = new Ciclo(); c.nombre = "Ciclo" + horas;
                    c.horas = horas; c.profesor = p; s.persist(c);
                }
                return null;
            });
            tx(sf, s -> {
                assertEquals(3, Consultas.proyectar(s).size());
                assertEquals(3, Consultas.nombres(s).size());
                assertEquals(2, Consultas.pagina(s, 0, 2).size());
                assertEquals(1, Consultas.pagina(s, 1, 2).size());
                assertTrue(Consultas.pagina(s, 2, 2).isEmpty());
                assertEquals(2L, Consultas.paginas(s, 2));
                assertEquals(1, Consultas.repetidos(s).size());
                Object[] datos = Consultas.estadisticas(s).get(0);
                assertEquals(150.0, ((Number) datos[0]).doubleValue(), 0.001);
                assertEquals(300L, ((Number) datos[1]).longValue());
                assertEquals(100, ((Number) datos[2]).intValue());
                assertEquals(200, ((Number) datos[3]).intValue());
                assertEquals(2L, ((Number) datos[4]).longValue());
                assertEquals(200, Consultas.sobreMedia(s).get(0).horas);
                assertEquals(2, Consultas.ciclosConProfesor(s).size());
                return null;
            });
        }
    }

    @Test public void dmlMasiva() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                Person p = new Person(); p.id = 77; p.nombre = "Pepe";
                p.ape1 = "Uno"; p.ape2 = "Dos"; s.persist(p);
                assertEquals(1, Consultas.insertarDesdePerson(s));
                assertEquals("Pepe", Consultas.porId(s, 77).nombre);
                assertEquals(1, Consultas.renombrar(s, "Pepe", "Jose"));
                assertEquals("Jose", Consultas.porId(s, 77).nombre);
                assertEquals(1, Consultas.borrarSinRelaciones(s, "Jose"));
                assertNull(Consultas.porId(s, 77)); return null;
            });
        }
    }

    @Test public void mergeRefreshYBloqueo() {
        try (SessionFactory sf = factory()) {
            Profesor detached = tx(sf, s -> {
                Profesor p = profesor("Original"); s.persist(p); return p;
            });
            detached.nombre = "Actualizado";
            tx(sf, s -> {
                Profesor managed = (Profesor) s.merge(detached);
                assertNotSame(detached, managed); assertTrue(s.contains(managed));
                return null;
            });
            tx(sf, s -> {
                Profesor p = s.find(Profesor.class, detached.id, LockModeType.PESSIMISTIC_WRITE);
                assertEquals("Actualizado", p.nombre);
                p.nombre = "Cambio descartado"; s.refresh(p);
                assertEquals("Actualizado", p.nombre); return null;
            });
        }
    }

    @Test public void cargaDiferidaYFetch() {
        try (SessionFactory sf = factory()) {
            Integer id = tx(sf, s -> {
                Profesor p = profesor("Lazy"); p.addCorreo("uno@ejemplo.invalid");
                s.persist(p); return p.id;
            });
            Profesor sinFetch = tx(sf, s -> s.get(Profesor.class, id));
            assertFalse(Hibernate.isInitialized(sinFetch.correos));
            try { sinFetch.correos.size(); fail("Debió fallar fuera de sesión"); }
            catch (LazyInitializationException esperada) { /* Contraejemplo intencionado. */ }
            Profesor conFetch = tx(sf, s -> Consultas.conCorreos(s, id));
            assertTrue(Hibernate.isInitialized(conFetch.correos));
            assertEquals(1, conFetch.correos.size());
        }
    }

    @Test public void resultadoNoUnico() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> { s.persist(profesor("Ana")); s.persist(profesor("Ana")); return null; });
            try {
                tx(sf, s -> s.createQuery("select p from Profesor p where p.nombre=:nombre", Profesor.class)
                    .setParameter("nombre", "Ana").uniqueResult());
                fail("Debió detectar varios resultados");
            } catch (NonUniqueResultException esperada) { /* Comportamiento documentado. */ }
        }
    }

    @Test public void limitesPaginacionYTablaVacia() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                assertEquals(0L, Consultas.paginas(s, 10));
                assertTrue(Consultas.pagina(s, 0, 10).isEmpty());
                try { Consultas.pagina(s, -1, 10); fail(); }
                catch (IllegalArgumentException esperada) { }
                try { Consultas.paginas(s, 0); fail(); }
                catch (IllegalArgumentException esperada) { }
                try { Consultas.pagina(s, Integer.MAX_VALUE, 10); fail(); }
                catch (ArithmeticException esperada) { }
                return null;
            });
        }
    }

    @Test public void sqliteCrudConEsquemaExplicito() {
        Configuration cfg = new Configuration().configure();
        cfg.setProperty("hibernate.connection.driver_class", "org.sqlite.JDBC");
        cfg.setProperty("hibernate.connection.url", "jdbc:sqlite::memory:");
        cfg.setProperty("hibernate.dialect", "org.sqlite.hibernate.dialect.SQLiteDialect");
        cfg.setProperty("hibernate.hbm2ddl.auto", "none");
        cfg.setProperty("hibernate.connection.pool_size", "1");
        try (SessionFactory sf = cfg.buildSessionFactory()) {
            tx(sf, s -> {
                s.doWork(connection -> {
                    try (java.sql.Statement st = connection.createStatement()) {
                        st.executeUpdate("create table usuarios (seq integer primary key, "
                            + "userNombre varchar(255) not null unique, creacionFecha date, "
                            + "creacionUsuario varchar(255), modificaFecha date, modificaUsuario varchar(255))");
                    }
                });
                s.persist(new Usuario(1, "SQLite")); s.flush(); s.clear();
                Usuario usuario = s.get(Usuario.class, 1);
                assertEquals("SQLite", usuario.getUserNombre());
                usuario.setUserNombre("Actualizado"); s.flush(); s.clear();
                usuario = s.get(Usuario.class, 1);
                assertEquals("Actualizado", usuario.getUserNombre());
                s.remove(usuario); s.flush(); s.clear();
                assertNull(s.get(Usuario.class, 1)); return null;
            });
        }
    }
}
```

## Resultado de la ejecución

Ejecutado el **16 de noviembre de 2026**, en Linux, OpenJDK **25.0.5**, Maven **3.9.11**, compilando con `--release 11`.

```text
Tests run: 13, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

| Prueba | Comportamiento comprobado |
|---|---|
| crudDocumentado | Arranque XML, persistencia, lectura tras clear, cambio y borrado del Main de 4B. |
| rollbackNoGuardaCambios | Error simulado tras flush, rollback y ausencia de la fila en otra sesión. |
| relacionesUnoAUnoYUnoAMuchos | Cascadas, uno a uno uni/bidireccional, Set, orden de List tras reabrir sesión, reordenación y orphanRemoval. |
| muchosAMuchosNoBorraModuloCompartido | Eliminar un profesor no elimina un módulo usado por otro. |
| claveCompuestaYTelefono | MapsId, PK compuesta, FK de dos columnas, lectura por clave, igualdad/hashCode de la clave. |
| consultasNombradasCriteriaYParametros | HQL, NamedQuery y Criteria equivalentes, apóstrofos y entrada de intento de inyección, null de fila inexistente. |
| proyeccionesPaginacionYAgregados | Tuplas, escalares, páginas, count, group/having, subconsulta y join con datos reales. |
| dmlMasiva | INSERT SELECT, UPDATE y DELETE, recuentos y relectura tras clear. |
| mergeRefreshYBloqueo | Copia del objeto separado a instancia gestionada, refresh y bloqueo dentro de la transacción. |
| cargaDiferidaYFetch | Fallo LAZY intencionado fuera de sesión y lectura correcta con join fetch. |
| resultadoNoUnico | Excepción esperada ante varios resultados. |
| limitesPaginacionYTablaVacia | Tabla vacía, tamaño inválido, página negativa y overflow. |
| sqliteCrudConEsquemaExplicito | Driver y dialecto del aula, esquema SQLite en memoria y CRUD de Usuario. |

La primera ejecución detectó acceso directo a un campo de un proxy LAZY; se corrigió con un getter y se repitió la suite. No se ocultó el fallo ni se sustituyó la aserción por una condición más débil.

Comprobaciones documentales adicionales:

- Comparación con la versión anterior: **144/144 bloques originales conservados sin cambios**; mismo texto y estructura originales salvo avisos editoriales, entradas nuevas del índice y textos alternativos descriptivos de imágenes.
- **8/8 archivos de texto del ZIP integrados**, contrastados con las copias extraídas. **114 archivos de fuentes, adjuntos e imágenes** conservados byte a byte, incluidos los índices históricos de extracción. Se retiran trece Markdown redundantes, no sus datos originales.
- **12/12 imágenes** decodificadas, revisadas visualmente en hoja de contacto y enlazadas en sus capítulos (13 inserciones, una imagen reutilizada).
- Rutas y anclas de los nueve Markdown de lectura/índices de UT03 verificadas automáticamente, excluyendo el contenido literal de los bloques de código. Ningún destino local ausente. El manifiesto guarda el recuento y las huellas actuales.
- Las comprobaciones documentales no intentan validar todos los enlaces web ni reproducir todas las variantes históricas del código.

### Incidencia previa del manifiesto

Al comprobar las huellas se detectaron **17 discrepancias preexistentes en fuentes/adjuntos de UT03** entre el manifiesto anterior y los archivos del directorio. No se atribuye una causa sin evidencia: se contrastaron los 114 archivos de conservación con su contenido en Git al iniciar la tarea y son idénticos. Se actualizan las huellas de UT03 conservando los valores anteriores bajo `huella_previa_en_manifiesto`. Esto distingue la conservación durante esta revisión de la concordancia con la extracción histórica.

Se detectaron también **25 discrepancias históricas en UT02**, fuera del alcance de esta tarea; no se modifican sus fuentes ni se reescriben sus huellas. Por ello no se afirma que el manifiesto global anterior estuviese íntegramente validado. Las métricas antiguas se interpretan en su contexto histórico; los resultados actuales están en `reorganizacion_ut03`.

## Límites que no cubren estas pruebas

- No se prueba integración con servidores Oracle/MySQL, ni concurrencia real de bloqueos, ni migraciones de esquemas de producción.
- Los fragmentos históricos no constituyen un único programa: hay versiones alternativas de las mismas clases, pseudocódigo y errores provocados a propósito. Su revisión queda documentada [por bloques](revision-codigo.md), no se declara que todos compilen.
- No se han recuperado los diagramas 404 ni el adjunto que falta en 4B. Los enlaces web no se han certificado globalmente.
- No hay ingesta a Obsidian ni modificaciones en `temario/`; los apuntes son Markdown con código estático. Las pruebas solo se materializan al extraerlos voluntariamente en una carpeta temporal.
