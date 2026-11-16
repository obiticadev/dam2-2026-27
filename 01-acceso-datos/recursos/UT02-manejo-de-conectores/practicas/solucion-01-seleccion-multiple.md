# Solución Ejercicio 1 - Recorrer una selección múltiple

[← UT02 · Índice de la unidad](../INDICE.md)

> **Unidad:** UT02 · Manejo de conectores  
> **Tipo de recurso:** Solución  
> **Fuente:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218465)

> **Criterio editorial:** contenido del aula sin resumir ni actualizar sus versiones. Se mejora la estructura y se normalizan los espacios de sangría del código; los archivos originales permanecen intactos.

## Índice

- [Enunciado](#enunciado)
- [Solución propuesta en el aula](#solucion-propuesta-en-el-aula)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="contenido"></a>
<a id="enunciado"></a>
## Enunciado

Instala una instancia de MySQL y MySQL workbench con la base de datos “world” lleva por defecto.

Descarga e instala en tu IDE la librería del Conector/J de MySQL

Con un programa Java imprime en pantalla los idiomas que se hablan en España

<a id="solucion-propuesta-en-el-aula"></a>
## Solución propuesta en el aula

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class IdiomasEspana {
    public static void main(String[] args) {
        // Datos de conexión (ajusta usuario y contraseña según tu configuración)
        String url = "jdbc:mysql://localhost:3306/world";
        String usuario = "root";
        String contrasena = "tu_contraseña";

        // Consulta SQL: une country y countrylanguage para España (ESP)
        String sql = "SELECT cl.Language, cl.Percentage, cl.IsOfficial " +
                     "FROM countrylanguage cl " +
                     "INNER JOIN country co ON cl.CountryCode = co.Code " +
                     "WHERE co.Code = 'ESP' " +
                     "ORDER BY cl.Percentage DESC";

        try (Connection conn = DriverManager.getConnection(url, usuario, contrasena);
             PreparedStatement pstmt = conn.prepareStatement(sql);
             ResultSet rs = pstmt.executeQuery()) {

            System.out.println("Idiomas hablados en España:");
            System.out.println("----------------------------------------");

            while (rs.next()) {
                String idioma = rs.getString("Language");
                double porcentaje = rs.getDouble("Percentage");
                String oficial = rs.getString("IsOfficial");

                // Mostrar si es oficial (T) o no (F)
                String marcaOficial = "T".equals(oficial) ? " (Oficial)" : "";

                System.out.printf("%-15s %6.1f%%%s%n", idioma, porcentaje, marcaOficial);
            }

        } catch (SQLException e) {
            System.err.println("Error al conectar o consultar la base de datos:");
            e.printStackTrace();
        }
    }
}
```

<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

<details>
<summary>Consultar los HTML y archivos originales</summary>

- [contenido.html](../originales/UT02-manejo-de-conectores/218465-Soluci%C3%B3n%20Ejercicio%201%20-%20Recorrer%20una%20selecci%C3%B3n%20m%C3%BAltiple%20P%C3%A1gina/contenido.html)

</details>
