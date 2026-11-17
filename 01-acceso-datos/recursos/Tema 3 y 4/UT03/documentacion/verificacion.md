# UT03 · Pruebas reproducibles

[Inicio de la entrega](../../INDICE.md) · [Documentación de UT03](INDICE.md) · [Ejemplos resueltos](../ejercicios/INDICE.md)

<a id="indice"></a>
## Índice de apartados

- [Qué comprueban](#nav-que-comprueban)
- [Reproducir](#nav-reproducir)
- [Clase de pruebas completa](#nav-clase-de-pruebas-completa)
- [Cobertura de las trece pruebas](#nav-cobertura-de-las-trece-pruebas)
- [Resultados y límites](#nav-resultados-y-limites)

<a id="nav-que-comprueban"></a>
## Qué comprueban

Las pruebas extraen **los archivos completos de esta entrega**, no una implementación paralela. Compilan el proyecto con nivel Java 11 y ejecutan doce pruebas sobre H2 en memoria y una de CRUD SQLite con esquema explícito.

No se ejecutan los originales defectuosos ni se accede a los servidores, credenciales o bases de datos del usuario. El bloque SQL SQLite utiliza el driver y dialecto históricos de 4B y solo valida Usuario, no todos los mapeos ni todas las políticas de generación de esquema.

[↑ Volver al índice](#indice)

<a id="nav-reproducir"></a>
## Reproducir

Desde `entrega-final/UT03`, con Java 11+ y Maven, ejecutar voluntariamente el bloque siguiente. Se materializa un proyecto en `/tmp/opencode` —crear esa carpeta si se reproduce en otro equipo—. Maven necesita red en la primera ejecución para resolver sus dependencias.

```python
from pathlib import Path
import re
import subprocess
import tempfile

base = Path.cwd()
destino = Path(tempfile.mkdtemp(prefix="ut03-final-", dir="/tmp/opencode"))
documentos = [
    base / "contenidos/4B-proyecto-hibernate.md",
    base / "ejercicios/01-relaciones-claves.md",
    base / "ejercicios/02-consultas.md",
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

[↑ Volver al índice](#indice)

<a id="nav-clase-de-pruebas-completa"></a>
## Clase de pruebas completa

### `src/test/java/revision/RevisionTest.java`

```java
package revision;

import static org.junit.Assert.*;

import consultas.Consultas;
import java.util.*;
import java.util.function.Function;
import javax.persistence.LockModeType;
import modelo.Mapeos;
import modelo.Mapeos.*;
import modelo.Usuario;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import org.junit.Test;

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
                    if (tx.isActive()) {
                        tx.rollback();
                    }
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

    @Test
    public void crudDocumentado() {
        // También prueba la construcción desde el hibernate.cfg.xml documentado.
        programas.Main.main(new String[0]);
    }

    @Test
    public void rollbackNoGuardaCambios() {
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
            tx(sf, s -> {
                assertNull(s.get(Usuario.class, 99));
                return null;
            });
        }
    }

    @Test
    public void relacionesUnoAUnoYUnoAMuchos() {
        try (SessionFactory sf = factory()) {
            Integer id = tx(sf, s -> {
                Profesor p = profesor("Sara");
                p.perfil = new Perfil();
                p.perfil.descripcion = "Docente";
                Direccion d = new Direccion();
                d.calle = "Plaza";
                p.setDireccion(d);
                p.addAviso("Primero");
                p.addAviso("Segundo");
                p.addCorreo("b@ejemplo.invalid");
                p.addCorreo("a@ejemplo.invalid");
                s.persist(p);
                return p.id;
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
                p.correos.remove(0);
                return null;
            });
            tx(sf, s -> {
                assertEquals(Long.valueOf(1),
                        s.createQuery("select count(c) from Correo c", Long.class).uniqueResult());
                s.remove(s.get(Profesor.class, id));
                return null;
            });
            tx(sf, s -> {
                for (String entidad : Arrays.asList("Correo", "Aviso", "Direccion", "Perfil")) {
                    assertEquals(Long.valueOf(0),
                            s.createQuery("select count(e) from " + entidad + " e", Long.class)
                                    .uniqueResult());
                }
                return null;
            });
        }
    }

    @Test
    public void muchosAMuchosNoBorraModuloCompartido() {
        try (SessionFactory sf = factory()) {
            Integer[] ids = tx(sf, s -> {
                Modulo m = new Modulo();
                m.nombre = "Acceso a datos";
                Profesor p1 = profesor("Ana");
                Profesor p2 = profesor("Luis");
                p1.addModulo(m);
                p2.addModulo(m);
                s.persist(p1);
                s.persist(p2);
                return new Integer[] {p1.id, p2.id, m.id};
            });
            tx(sf, s -> {
                Profesor p = s.get(Profesor.class, ids[0]);
                for (Modulo m : new HashSet<>(p.modulos)) {
                    p.removeModulo(m);
                }
                s.remove(p);
                return null;
            });
            tx(sf, s -> {
                assertNotNull(s.get(Modulo.class, ids[2]));
                assertEquals(1, s.get(Profesor.class, ids[1]).modulos.size());
                return null;
            });
        }
    }

    @Test
    public void claveCompuestaYTelefono() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                Company c = new Company(1L, "Almacenes");
                c.addEmployee(7L, "Lopez");
                s.persist(c);
                s.flush();
                Phone phone = new Phone();
                phone.numero = "555-0100";
                phone.employee = c.employees.iterator().next();
                s.persist(phone);
                return null;
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
            assertEquals(a, b);
            assertEquals(a.hashCode(), b.hashCode());
            assertNotEquals(a, new EmployeeId(1L, 8L));
        }
    }

    @Test
    public void consultasNombradasCriteriaYParametros() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                s.persist(profesor("O'Connor"));
                return null;
            });
            tx(sf, s -> {
                assertEquals(1, Consultas.buscar(s, "O'Connor", "CORTINA", "GARCIA").size());
                assertEquals(
                        1, Consultas.buscarNombrada(s, "O'Connor", "CORTINA", "GARCIA").size());
                assertEquals(
                        1, Consultas.buscarCriteria(s, "O'Connor", "CORTINA", "GARCIA").size());
                assertTrue(Consultas.buscar(s, "' or 1=1 --", "CORTINA", "GARCIA").isEmpty());
                assertEquals(
                        1, s.createNamedQuery("Profesores.findAll", Profesor.class).list().size());
                assertNull(Consultas.porId(s, -1));
                return null;
            });
        }
    }

    @Test
    public void proyeccionesPaginacionYAgregados() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                Profesor p = profesor("Ana");
                s.persist(p);
                s.persist(profesor("Ana"));
                s.persist(profesor("Luis"));
                for (int horas : new int[] {100, 200}) {
                    Ciclo c = new Ciclo();
                    c.nombre = "Ciclo" + horas;
                    c.horas = horas;
                    c.profesor = p;
                    s.persist(c);
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

    @Test
    public void dmlMasiva() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                Person p = new Person();
                p.id = 77;
                p.nombre = "Pepe";
                p.ape1 = "Uno";
                p.ape2 = "Dos";
                s.persist(p);
                assertEquals(1, Consultas.insertarDesdePerson(s));
                assertEquals("Pepe", Consultas.porId(s, 77).nombre);
                assertEquals(1, Consultas.renombrar(s, "Pepe", "Jose"));
                assertEquals("Jose", Consultas.porId(s, 77).nombre);
                assertEquals(1, Consultas.borrarSinRelaciones(s, "Jose"));
                assertNull(Consultas.porId(s, 77));
                return null;
            });
        }
    }

    @Test
    public void mergeRefreshYBloqueo() {
        try (SessionFactory sf = factory()) {
            Profesor detached = tx(sf, s -> {
                Profesor p = profesor("Original");
                s.persist(p);
                return p;
            });
            detached.nombre = "Actualizado";
            tx(sf, s -> {
                Profesor managed = (Profesor) s.merge(detached);
                assertNotSame(detached, managed);
                assertTrue(s.contains(managed));
                return null;
            });
            tx(sf, s -> {
                Profesor p = s.find(Profesor.class, detached.id, LockModeType.PESSIMISTIC_WRITE);
                assertEquals("Actualizado", p.nombre);
                p.nombre = "Cambio descartado";
                s.refresh(p);
                assertEquals("Actualizado", p.nombre);
                return null;
            });
        }
    }

    @Test
    public void cargaDiferidaYFetch() {
        try (SessionFactory sf = factory()) {
            Integer id = tx(sf, s -> {
                Profesor p = profesor("Lazy");
                p.addCorreo("uno@ejemplo.invalid");
                s.persist(p);
                return p.id;
            });
            Profesor sinFetch = tx(sf, s -> s.get(Profesor.class, id));
            assertFalse(Hibernate.isInitialized(sinFetch.correos));
            try {
                sinFetch.correos.size();
                fail("Debió fallar fuera de sesión");
            } catch (LazyInitializationException esperada) { /* Contraejemplo intencionado. */
            }
            Profesor conFetch = tx(sf, s -> Consultas.conCorreos(s, id));
            assertTrue(Hibernate.isInitialized(conFetch.correos));
            assertEquals(1, conFetch.correos.size());
        }
    }

    @Test
    public void resultadoNoUnico() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                s.persist(profesor("Ana"));
                s.persist(profesor("Ana"));
                return null;
            });
            try {
                tx(sf,
                        s
                        -> s.createQuery("select p from Profesor p where p.nombre=:nombre",
                                    Profesor.class)
                                .setParameter("nombre", "Ana")
                                .uniqueResult());
                fail("Debió detectar varios resultados");
            } catch (NonUniqueResultException esperada) { /* Comportamiento documentado. */
            }
        }
    }

    @Test
    public void limitesPaginacionYTablaVacia() {
        try (SessionFactory sf = factory()) {
            tx(sf, s -> {
                assertEquals(0L, Consultas.paginas(s, 10));
                assertTrue(Consultas.pagina(s, 0, 10).isEmpty());
                try {
                    Consultas.pagina(s, -1, 10);
                    fail();
                } catch (IllegalArgumentException esperada) {
                }
                try {
                    Consultas.paginas(s, 0);
                    fail();
                } catch (IllegalArgumentException esperada) {
                }
                try {
                    Consultas.pagina(s, Integer.MAX_VALUE, 10);
                    fail();
                } catch (ArithmeticException esperada) {
                }
                return null;
            });
        }
    }

    @Test
    public void sqliteCrudConEsquemaExplicito() {
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
                                + "creacionUsuario varchar(255), modificaFecha date, "
                                + "modificaUsuario varchar(255))");
                    }
                });
                s.persist(new Usuario(1, "SQLite"));
                s.flush();
                s.clear();
                Usuario usuario = s.get(Usuario.class, 1);
                assertEquals("SQLite", usuario.getUserNombre());
                usuario.setUserNombre("Actualizado");
                s.flush();
                s.clear();
                usuario = s.get(Usuario.class, 1);
                assertEquals("Actualizado", usuario.getUserNombre());
                s.remove(usuario);
                s.flush();
                s.clear();
                assertNull(s.get(Usuario.class, 1));
                return null;
            });
        }
    }
}
```

[↑ Volver al índice](#indice)

<a id="nav-cobertura-de-las-trece-pruebas"></a>
## Cobertura de las trece pruebas

| Prueba | Cobertura |
|---|---|
| CRUD | Creación, lectura después de clear, cambio y borrado de Usuario. |
| Rollback | Fallo tras flush y ausencia de la fila al reabrir sesión. |
| Relaciones | Uno a uno, Set, List, reordenación, cascadas y huérfanos. |
| Muchos a muchos | Un módulo compartido sobrevive al borrado de uno de sus profesores. |
| Clave compuesta | MapsId, referencia de dos columnas y equals/hashCode. |
| Parámetros | HQL, NamedQuery y Criteria equivalentes, apóstrofos e intento de inyección. |
| Agregados y páginas | Tipos de proyecciones, agrupación, subconsulta, join y páginas. |
| DML | INSERT SELECT, UPDATE y DELETE con relectura tras clear. |
| Persistencia | Merge, refresh y API de bloqueo dentro de transacción. |
| LAZY | Excepción intencionada fuera de sesión y solución mediante fetch. |
| Resultado único | Excepción esperada para un resultado múltiple. |
| Límites | Tabla vacía, tamaño inválido, página negativa y overflow. |
| SQLite | CRUD real de Usuario sobre base en memoria y esquema explícito. |

[↑ Volver al índice](#indice)

<a id="nav-resultados-y-limites"></a>
## Resultados y límites

Los resultados de la **edición final** se registran en [VALIDACION](../../documentacion/VALIDACION.md), junto con la comprobación de los archivos documentados. Una ejecución con JDK moderno y `--release 11` no equivale a haber probado todos los JDK desde Java 11.

No se certifica integración contra Oracle/MySQL, concurrencia real de varios clientes ni migraciones de producción. Los dos diagramas HQL externos inaccesibles y el proyecto oficial ausente de 4B siguen señalados; no se han sustituido por recursos inventados.

[↑ Volver al índice](#indice)
