# 3 · Insertar, actualizar y borrar

[Todos los ejercicios](INDICE.md) · [Tema: DML](../contenidos/3A-manejo-de-conectores.md#crear-modificar)

## Enunciado

Adaptar el ejemplo docente para realizar **una inserción, una actualización y un borrado** en una tabla de world.

## Solución revisada

Se usa `city` y una ciudad temporal de España. El identificador se pasa como argumento y debe estar libre. Si ya existe, la inserción falla y no se altera esa ciudad. No se utiliza el DELETE sin filtro del ejemplo original.

### `src/main/java/jdbc/ModificarCiudad.java`

```java
package jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public final class ModificarCiudad {
    private ModificarCiudad() {
    }

    public static void ejecutar(Connection conexion, int id) throws SQLException {
        if (id <= 0) {
            throw new IllegalArgumentException("El identificador debe ser positivo");
        }
        Transacciones.ejecutar(conexion, () -> {
            String insertar = "INSERT INTO city (ID, Name, CountryCode, District, Population) "
                    + "VALUES (?, ?, ?, ?, ?)";
            try (PreparedStatement sentencia = conexion.prepareStatement(insertar)) {
                sentencia.setInt(1, id);
                sentencia.setString(2, "Ciudad de prueba");
                sentencia.setString(3, "ESP");
                sentencia.setString(4, "Pruebas");
                sentencia.setInt(5, 1000);
                exigirUnaFila(sentencia.executeUpdate());
            }

            try (PreparedStatement sentencia = conexion.prepareStatement(
                         "UPDATE city SET Population = ? WHERE ID = ?")) {
                sentencia.setInt(1, 2000);
                sentencia.setInt(2, id);
                exigirUnaFila(sentencia.executeUpdate());
            }

            try (PreparedStatement sentencia =
                            conexion.prepareStatement("DELETE FROM city WHERE ID = ?")) {
                sentencia.setInt(1, id);
                exigirUnaFila(sentencia.executeUpdate());
            }
            return null;
        });
    }

    private static void exigirUnaFila(int filas) throws SQLException {
        if (filas != 1) {
            throw new SQLException("Se esperaba modificar exactamente una fila");
        }
    }

    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Uso: ModificarCiudad <identificador-libre>");
            return;
        }
        try (Connection conexion = Conexion.abrir()) {
            ejecutar(conexion, Integer.parseInt(args[0]));
            System.out.println("Inserción, actualización y borrado completados.");
        } catch (SQLException | IllegalArgumentException ex) {
            System.err.println("Operación cancelada: " + ex.getMessage());
        }
    }
}
```

## Resultado y comprobaciones

Al terminar correctamente, la fila temporal ya no existe y las ciudades originales mantienen sus valores. La transacción evita que un fallo intermedio deje la ciudad parcialmente modificada. El helper `Transacciones` se encuentra en la [preparación común](../documentacion/entorno-y-pruebas.md).

La suite comprueba la secuencia completa y una colisión de clave primaria: una fila existente no puede sobrescribirse ni borrarse accidentalmente.

**Fuente:** [Ejercicio 3 del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218620). Se corrige la discrepancia del ejemplo, que utilizaba una tabla PRODUCTOS ajena a world.
