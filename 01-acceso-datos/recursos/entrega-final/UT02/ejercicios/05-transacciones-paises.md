# 5 · Actualización transaccional de dos países

[Todos los ejercicios](INDICE.md) · [Tema: transacciones](../contenidos/3A-manejo-de-conectores.md#transacciones)

## Enunciado

En la tabla `country` de world:

1. Sumar **1 000 000** de habitantes a España (`ESP`).
2. Restar esa misma cantidad a Francia (`FRA`).
3. Aplicar ambos cambios de manera **atómica**.
4. Provocar un fallo y demostrar que tampoco se confirma el primer cambio.

## Solución revisada

### `src/main/java/jdbc/TransferirPoblacion.java`

```java
package jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public final class TransferirPoblacion {
    private TransferirPoblacion() {
    }

    public static void transferir(Connection conexion, String paisOrigen) throws SQLException {
        long cantidad = 1_000_000L;
        if (paisOrigen == null || paisOrigen.isBlank() || "ESP".equals(paisOrigen)) {
            throw new IllegalArgumentException("El país de origen debe ser distinto de ESP");
        }

        Transacciones.ejecutar(conexion, () -> {
            try (PreparedStatement suma = conexion.prepareStatement(
                         "UPDATE country SET Population = Population + ? WHERE Code = ?")) {
                suma.setLong(1, cantidad);
                suma.setString(2, "ESP");
                exigirUnaFila(suma.executeUpdate(), "España no existe");
            }

            String sql = "UPDATE country SET Population = Population - ? "
                    + "WHERE Code = ? AND Population >= ?";
            try (PreparedStatement resta = conexion.prepareStatement(sql)) {
                resta.setLong(1, cantidad);
                resta.setString(2, paisOrigen);
                resta.setLong(3, cantidad);
                exigirUnaFila(resta.executeUpdate(),
                        "El país de origen no existe o no tiene suficiente población");
            }
            return null;
        });
    }

    private static void exigirUnaFila(int filas, String mensaje) throws SQLException {
        if (filas != 1) {
            throw new SQLException(mensaje);
        }
    }

    public static void main(String[] args) {
        String origen = args.length == 0 ? "FRA" : args[0];
        try (Connection conexion = Conexion.abrir()) {
            transferir(conexion, origen);
            System.out.println("Ambos cambios se han confirmado.");
        } catch (SQLException | IllegalArgumentException ex) {
            System.err.println("Transferencia cancelada: " + ex.getMessage());
        }
    }
}
```

El método utiliza el [helper transaccional común](../documentacion/entorno-y-pruebas.md). Requiere una conexión inicialmente en autocommit, de modo que no confirme accidentalmente trabajo pendiente del llamante.

> **El detalle importante.** Un país inexistente hace que UPDATE devuelva **0**, no necesariamente que lance una excepción SQL. La comprobación del recuento convierte esa situación en un fallo y activa el rollback del primer UPDATE.

## Demostración de éxito y de fallo

Partiendo de los datos mínimos de prueba:

| Caso | España antes → después | Francia antes → después |
|---|---|---|
| Origen FRA | 40 000 000 → 41 000 000 | 60 000 000 → 59 000 000 |
| Origen XXX, país inexistente | 40 000 000 → 40 000 000 | 60 000 000 → 60 000 000 |

Restablecer los datos antes de cada caso. El programa acepta `XXX` como argumento para provocar la segunda situación. No ejecutar repetidamente sobre los datos reales sin restaurarlos: cada ejecución correcta aplica una nueva transferencia.

**Fuente:** [Ejercicio 5 del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218716).
