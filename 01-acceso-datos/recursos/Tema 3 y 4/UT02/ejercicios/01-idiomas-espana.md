# 1 · Idiomas hablados en España

[Todos los ejercicios](INDICE.md) · [Tema: consultas JDBC](../contenidos/3A-manejo-de-conectores.md#consultas-parametros)

## Enunciado

Preparar MySQL con la base de ejemplo **world**, añadir Connector/J al proyecto Java y mostrar los **idiomas hablados en España y su porcentaje de hablantes**. Es una actividad no evaluable del aula.

## Solución revisada

Se consulta `countrylanguage` filtrando por el código de España, `ESP`. El resultado se ordena por porcentaje descendente y, en caso de empate, por idioma. El porcentaje pertenece al conjunto de datos de world: no representa una estadística actualizada.

### `src/main/java/jdbc/IdiomasEspana.java`

```java
package jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public final class IdiomasEspana {
    private IdiomasEspana() {
    }

    public static List<String> consultar(Connection conexion) throws SQLException {
        String sql = "SELECT Language, Percentage FROM countrylanguage "
                + "WHERE CountryCode = ? ORDER BY Percentage DESC, Language";
        List<String> idiomas = new ArrayList<>();

        try (PreparedStatement sentencia = conexion.prepareStatement(sql)) {
            sentencia.setString(1, "ESP");
            try (ResultSet filas = sentencia.executeQuery()) {
                while (filas.next()) {
                    idiomas.add(filas.getString("Language") + ": "
                            + filas.getBigDecimal("Percentage").toPlainString() + " %");
                }
            }
        }
        return idiomas;
    }

    public static void main(String[] args) {
        try (Connection conexion = Conexion.abrir()) {
            List<String> idiomas = consultar(conexion);
            if (idiomas.isEmpty()) {
                System.out.println("No hay idiomas registrados para ESP.");
            } else {
                idiomas.forEach(System.out::println);
            }
        } catch (SQLException ex) {
            System.err.println("No se pudieron consultar los idiomas: " + ex.getMessage());
        }
    }
}
```

## Por qué funciona

- El parámetro empieza en 1 y recibe un código de país, no un nombre traducido.
- Se recorre cada fila con `next()` antes de leerla.
- Se incluyen **idioma y porcentaje**, aunque una versión del enunciado de la solución del aula omitía este último en su texto.
- Se cierran sentencia y resultado, pero el método no cierra la conexión que recibe.

## Comprobaciones

Con los datos mínimos de prueba deben aparecer Spanish y Catalan en ese orden. También se prueba que otras lenguas de otros países no se incluyan y que una tabla sin datos para ESP devuelva una lista vacía.

**Fuente:** [Ejercicio 1 del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218463) y [solución docente](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218465).
