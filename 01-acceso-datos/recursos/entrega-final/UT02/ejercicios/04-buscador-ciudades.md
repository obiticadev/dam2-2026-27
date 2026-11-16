# 4 · Buscador de ciudades por país y población

[Todos los ejercicios](INDICE.md) · [Tema: parámetros y consultas](../contenidos/3A-manejo-de-conectores.md#consultas-parametros)

## Enunciado

En world, crear un programa que:

1. Pida por teclado el **nombre de un país**, por ejemplo `Spain`, y una **población mínima**, por ejemplo `100000`.
2. Consulte las ciudades de ese país con población igual o superior al umbral.
3. Muestre nombre, distrito y población, en orden descendente de población.
4. Informe si no encuentra resultados.
5. Controle `SQLException` e `InputMismatchException`.

**Requisito:** utilizar `PreparedStatement` con parámetros, sin concatenar entradas en SQL.

## Solución revisada

### `src/main/java/jdbc/BuscadorCiudades.java`

```java
package jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Scanner;

public final class BuscadorCiudades {
    private BuscadorCiudades() {
    }

    public static List<String> buscar(Connection conexion, String pais, long minimo)
            throws SQLException {
        if (pais == null || pais.isBlank() || minimo < 0) {
            throw new IllegalArgumentException("Indica un país y una población no negativa");
        }
        String sql = "SELECT ci.Name, ci.District, ci.Population "
                + "FROM city ci JOIN country co ON co.Code = ci.CountryCode "
                + "WHERE co.Name = ? AND ci.Population >= ? "
                + "ORDER BY ci.Population DESC, ci.Name";
        List<String> ciudades = new ArrayList<>();

        try (PreparedStatement sentencia = conexion.prepareStatement(sql)) {
            sentencia.setString(1, pais.trim());
            sentencia.setLong(2, minimo);
            try (ResultSet filas = sentencia.executeQuery()) {
                while (filas.next()) {
                    ciudades.add(filas.getString("Name") + " | " + filas.getString("District")
                            + " | " + filas.getLong("Population"));
                }
            }
        }
        return ciudades;
    }

    public static void main(String[] args) {
        try (Scanner entrada = new Scanner(System.in)) {
            System.out.print("Nombre del país: ");
            String pais = entrada.nextLine();
            System.out.print("Población mínima: ");
            long minimo = entrada.nextLong();

            try (Connection conexion = Conexion.abrir()) {
                List<String> ciudades = buscar(conexion, pais, minimo);
                if (ciudades.isEmpty()) {
                    System.out.println("No hay ciudades que cumplan los criterios.");
                } else {
                    ciudades.forEach(System.out::println);
                }
            }
        } catch (InputMismatchException ex) {
            System.err.println("La población debe ser un número entero válido.");
        } catch (NoSuchElementException ex) {
            System.err.println("No se han recibido todos los datos de entrada.");
        } catch (SQLException | IllegalArgumentException ex) {
            System.err.println("No se pudo realizar la búsqueda: " + ex.getMessage());
        }
    }
}
```

## Explicación

La unión encuentra el país a partir de su **nombre** y relaciona sus ciudades por `CountryCode`. No se presupone que el nombre sea `España`: debe coincidir con el guardado en world, normalmente `Spain`. Los empates se ordenan por nombre para dar una salida estable.

Una entrada que contenga comillas no rompe la consulta. La parametrización protege los valores; no se crea una consulta diferente al cambiar de país.

## Comprobaciones

- País válido y umbral con resultados, verificando el orden.
- Umbral demasiado alto o país inexistente: lista vacía.
- Nombre con apóstrofo e intento de inyección: se tratan como datos.
- Población negativa: validación antes de ejecutar SQL.
- Entrada no numérica: mensaje específico de `InputMismatchException`.

**Fuente:** [Ejercicio 4 del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218671).
