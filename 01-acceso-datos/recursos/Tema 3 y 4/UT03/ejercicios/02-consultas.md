# 2 · HQL y Criteria: consultas resueltas

[Todos los ejemplos](INDICE.md) · [Explicación de HQL](../contenidos/4C-consultas.md) · [Entidades utilizadas](01-relaciones-claves.md)

## Enunciado de trabajo

Sobre el modelo de referencia, resolver filtros por nombre y apellidos, consulta nombrada equivalente, proyecciones, búsqueda única por ID, paginación, agregados, agrupación, subconsulta, unión y modificaciones masivas. Añadir una consulta Criteria equivalente al filtro inicial.

**Procedencia:** desarrollo editorial de los ejemplos HQL de 4C. Criteria es una ampliación identificada, no una solución docente recuperada.

## Archivo completo

### `src/main/java/consultas/Consultas.java`

```java
package consultas;

import java.util.List;
import javax.persistence.criteria.*;
import modelo.Mapeos.*;
import org.hibernate.Session;

public final class Consultas {
    private Consultas() {
    }

    public static List<Profesor> buscar(Session s, String nombre, String ape1, String ape2) {
        return s.createQuery("select p from Profesor p where p.nombre=:nombre "
                                + "and p.ape1=:ape1 and p.ape2=:ape2",
                        Profesor.class)
                .setParameter("nombre", nombre)
                .setParameter("ape1", ape1)
                .setParameter("ape2", ape2)
                .list();
    }

    public static List<Profesor> buscarNombrada(
            Session s, String nombre, String ape1, String ape2) {
        return s.createNamedQuery("Profesores.ByName", Profesor.class)
                .setParameter("nombre", nombre)
                .setParameter("ape1", ape1)
                .setParameter("ape2", ape2)
                .list();
    }

    public static List<Profesor> buscarCriteria(
            Session s, String nombre, String ape1, String ape2) {
        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<Profesor> cq = cb.createQuery(Profesor.class);
        Root<Profesor> p = cq.from(Profesor.class);
        cq.select(p).where(cb.equal(p.get("nombre"), nombre), cb.equal(p.get("ape1"), ape1),
                cb.equal(p.get("ape2"), ape2));
        return s.createQuery(cq).list();
    }

    public static List<Object[]> proyectar(Session s) {
        return s.createQuery("select p.id,p.nombre from Profesor p order by p.id", Object[].class)
                .list();
    }

    public static List<String> nombres(Session s) {
        return s.createQuery("select p.nombre from Profesor p order by p.id", String.class).list();
    }

    public static Profesor porId(Session s, int id) {
        // PK única: cero o un resultado. El llamante comprueba null.
        return s.createQuery("select p from Profesor p where p.id=:id", Profesor.class)
                .setParameter("id", id)
                .uniqueResult();
    }

    public static List<Profesor> pagina(Session s, int pagina, int tamanyo) {
        if (pagina < 0 || tamanyo <= 0) {
            throw new IllegalArgumentException("Página >= 0 y tamaño > 0");
        }
        int inicio = Math.multiplyExact(pagina, tamanyo);
        return s.createQuery("select p from Profesor p order by p.id", Profesor.class)
                .setFirstResult(inicio)
                .setMaxResults(tamanyo)
                .list();
    }

    public static long paginas(Session s, int tamanyo) {
        if (tamanyo <= 0) {
            throw new IllegalArgumentException("Tamaño > 0");
        }
        long total = s.createQuery("select count(p) from Profesor p", Long.class).uniqueResult();
        return total / tamanyo + (total % tamanyo == 0 ? 0 : 1);
    }

    public static List<Object[]> estadisticas(Session s) {
        return s.createQuery("select avg(c.horas),sum(c.horas),min(c.horas),"
                                + "max(c.horas),count(c) from Ciclo c",
                        Object[].class)
                .list();
    }

    public static List<Object[]> repetidos(Session s) {
        return s.createQuery("select p.nombre,count(p) from Profesor p group by p.nombre "
                                + "having count(p)>1 order by p.nombre",
                        Object[].class)
                .list();
    }

    public static List<Ciclo> sobreMedia(Session s) {
        return s.createQuery("select c from Ciclo c where c.horas > "
                                + "(select avg(c2.horas) from Ciclo c2)",
                        Ciclo.class)
                .list();
    }

    public static List<Object[]> ciclosConProfesor(Session s) {
        return s.createQuery("select c.nombre,p.nombre from Ciclo c join c.profesor p "
                                + "order by c.id",
                        Object[].class)
                .list();
    }

    public static Profesor conCorreos(Session s, int id) {
        return s.createQuery("select distinct p from Profesor p left join fetch p.correos "
                                + "where p.id=:id",
                        Profesor.class)
                .setParameter("id", id)
                .uniqueResult();
    }

    public static int renombrar(Session s, String anterior, String nuevo) {
        s.flush();
        int filas = s.createQuery("update Profesor p set p.nombre=:nuevo where p.nombre=:anterior")
                            .setParameter("nuevo", nuevo)
                            .setParameter("anterior", anterior)
                            .executeUpdate();
        s.clear();
        return filas;
    }

    public static int insertarDesdePerson(Session s) {
        s.flush();
        // Solo para esta demostración: tabla destino vacía y sin conflictos de ID.
        int filas = s.createQuery("insert into Profesor (id,nombre,ape1,ape2) "
                             + "select p.id,p.nombre,p.ape1,p.ape2 from Person p")
                            .executeUpdate();
        s.clear();
        return filas;
    }

    public static int borrarSinRelaciones(Session s, String nombre) {
        s.flush();
        // No usar con profesores que tengan hijos o filas de tabla intermedia.
        int filas = s.createQuery("delete from Profesor p where p.nombre=:nombre")
                            .setParameter("nombre", nombre)
                            .executeUpdate();
        s.clear();
        return filas;
    }
}
```

## Métodos y resultado esperado

| Métodos | Qué resuelven |
|---|---|
| buscar / buscarNombrada / buscarCriteria | El mismo filtro con parámetros, por tres vías. |
| proyectar / nombres | Tuplas ID-nombre y escalares String. |
| porId | Una entidad por PK o null. |
| pagina / paginas | Página con orden estable y recuento long. |
| estadisticas / repetidos | Agregados de horas y nombres con más de una aparición. |
| sobreMedia | Ciclos con más horas que la media. |
| ciclosConProfesor | Unión sobre la asociación real Ciclo.profesor. |
| conCorreos | Carga de la colección antes de cerrar la sesión. |
| renombrar / insertarDesdePerson / borrarSinRelaciones | DML masiva con parámetros y control del contexto. |

## Condiciones de uso

- Los métodos reciben una sesión abierta y se invocan dentro de una transacción; no cierran la sesión ajena.
- Comprobar null al llamar a porId. La prueba de varios resultados demuestra la excepción de uniqueResult cuando el filtro no es único.
- La paginación empieza en cero, rechaza tamaños no positivos y detecta desbordamiento del desplazamiento.
- Los métodos DML hacen flush y clear; clear desconecta también otras entidades de la misma sesión.
- El INSERT SELECT se demuestra con destino vacío y sin conflictos de ID. Insertar IDs explícitos puede desajustar el generador automático: no utilizarlo como importador general sin gestionar ese problema.
- El borrado masivo se limita a entidades sin hijos ni filas de tabla intermedia. Para borrar un grafo gestionado utilizar remove y las cascadas apropiadas.

**Comprobaciones:** parámetros con apóstrofos e intento de inyección, equivalencia de HQL/NamedQuery/Criteria, páginas vacías, agregados con valores conocidos, INSERT/UPDATE/DELETE y lectura diferida con fetch. El código de las pruebas está disponible en la [guía reproducible](../documentacion/verificacion.md).
