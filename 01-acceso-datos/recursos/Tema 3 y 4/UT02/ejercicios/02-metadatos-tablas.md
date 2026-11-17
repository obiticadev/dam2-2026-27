# 2 · Tablas y metadatos de una base de datos

[Todos los ejercicios](INDICE.md) · [Tema: metadatos](../contenidos/3A-manejo-de-conectores.md#metadatos)

## Enunciado

Descubrir mediante Java **cuáles y cuántas tablas** tiene la base world. Mostrar, para cada una, su **nombre, esquema, tipo y catálogo**, utilizando `DatabaseMetaData.getTables()`.

## Solución revisada

El catálogo y esquema se obtienen de la conexión, en vez de dejar el marcador `tu_base_de_datos`. En MySQL el catálogo suele identificar la base; en otros motores puede ser necesario el esquema. Los campos pueden ser nulos y eso no es un error.

### `src/main/java/jdbc/ListarTablas.java`

```java
package jdbc;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.util.ArrayList;
import java.util.List;

public final class ListarTablas {
    private ListarTablas() {
    }

    public static List<String> listar(Connection conexion) throws SQLException {
        DatabaseMetaData metadatos = conexion.getMetaData();
        String esquema;
        try {
            esquema = conexion.getSchema();
        } catch (SQLFeatureNotSupportedException ex) {
            esquema = null;
        }

        List<String> tablas = new ArrayList<>();
        try (ResultSet filas = metadatos.getTables(
                     conexion.getCatalog(), esquema, "%", new String[] {"TABLE"})) {
            while (filas.next()) {
                tablas.add("Nombre: " + filas.getString("TABLE_NAME")
                        + " | Esquema: " + filas.getString("TABLE_SCHEM")
                        + " | Tipo: " + filas.getString("TABLE_TYPE")
                        + " | Catálogo: " + filas.getString("TABLE_CAT"));
            }
        }
        tablas.sort(String::compareTo);
        return tablas;
    }

    public static void main(String[] args) {
        try (Connection conexion = Conexion.abrir()) {
            List<String> tablas = listar(conexion);
            tablas.forEach(System.out::println);
            System.out.println("Total de tablas: " + tablas.size());
        } catch (SQLException ex) {
            System.err.println("No se pudieron listar las tablas: " + ex.getMessage());
        }
    }
}
```

## Comprobaciones

En una instalación habitual de world deben localizarse `city`, `country` y `countrylanguage`, salvo diferencias del esquema importado. Las vistas no cuentan como tablas en este filtro. La suite comprueba los nombres y el recuento en una base aislada.

> **Corrección respecto al ejemplo original.** Ahora se muestra el total, se eliminan los espacios no separables que aparecían dentro del Java y se cierran los resultados mediante `try-with-resources`.

**Fuente:** [Ejercicio 2 del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218444) y [solución docente](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218446).
