# Solución Ejercicio 2 - Tablas de una Base de datos

[← UT02 · Índice de la unidad](../INDICE.md)

> **Unidad:** UT02 · Manejo de conectores  
> **Tipo de recurso:** Solución  
> **Fuente:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218446)

> **Criterio editorial:** contenido del aula sin resumir ni actualizar sus versiones. Se mejora la estructura y se normalizan los espacios de sangría del código; los archivos originales permanecen intactos.

## Índice

- [Enunciado](#enunciado)
- [Solución propuesta en el aula](#solucion-propuesta-en-el-aula)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="contenido"></a>
<a id="enunciado"></a>
## Enunciado

**Ejercicio 2 – No evaluable**

Descubre con un programa en Java cuáles y cuantas tablas tiene la base de datos “World”. Usa el método getTables de la interfaz DatabaseMetaData. Recuerda que en MYSQL no usa esquemas.

Obtén para cada tabla la siguiente información y escríbela por pantalla: Nombre, Esquema, Tipo y Catálogo.

<a id="solucion-propuesta-en-el-aula"></a>
## Solución propuesta en el aula

```java
import java.sql.*;

 

public class ListarTablasMetaData {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/tu_base_de_datos";

        String usuario = "tu_usuario";

        String contraseña = "tu_contraseña";

 

        try (Connection conn = DriverManager.getConnection(url, usuario, contraseña)) {

 

            DatabaseMetaData metaData = conn.getMetaData();

 

            // Parámetros: catalog, schemaPattern, tableNamePattern, types

            // - catalog: nombre de la base de datos (en MySQL)

            // - schemaPattern: null (MySQL no usa schemas como PostgreSQL/Oracle)

            // - tableNamePattern: "%" para todas las tablas

            // - types: new String[]{"TABLE"} para solo tablas (excluye vistas)

            try (ResultSet rs = metaData.getTables(

                    "tu_base_de_datos",  // catalog

                    null,                // schemaPattern

                    "%",                 // tableNamePattern

                    new String[]{"TABLE"} // types

            )) {

                while (rs.next()) {

                    String nombreTabla = rs.getString("TABLE_NAME");

                    String tipoTabla   = rs.getString("TABLE_TYPE");

                    String esquema     = rs.getString("TABLE_SCHEM");

                    String catalogo    = rs.getString("TABLE_CAT");

                    System.out.println("Tabla: " + nombreTabla

                            + " | Tipo: " + tipoTabla

                            + " | Catálogo: " + catalogo

                            + " | Esquema: " + esquema);

                }

            }

 

        } catch (SQLException e) {

            e.printStackTrace();

        }

    }

}
```

<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

<details>
<summary>Consultar los HTML y archivos originales</summary>

- [contenido.html](../originales/UT02-manejo-de-conectores/218446-Soluci%C3%B3n%20Ejercicio%202%20-%20Tablas%20de%20una%20Base%20de%20datos%20P%C3%A1gina/contenido.html)

</details>
