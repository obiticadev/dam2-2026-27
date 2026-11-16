# 7 · Procedimientos almacenados y CallableStatement

[Todos los ejercicios](INDICE.md) · [Tema: procedimientos](../contenidos/3A-manejo-de-conectores.md#procedimientos)

**Procedencia:** actividad integrada en el apartado de procedimientos de MySQL del libro 3A, más el ejemplo de llamada Oracle. Se reúnen aquí SQL, llamada Java y comprobaciones; no se presenta como una nueva actividad evaluable.

## Enunciado

Crear una tabla de clientes en una base de prácticas MySQL, definir un procedimiento que inserte un cliente e invocarlo desde Java. Repetir una clave primaria para comprobar el tratamiento de errores.

## 1. Tabla y procedimiento MySQL

Ejecutar **en un esquema de prácticas seleccionado previamente**, con permisos suficientes y sin tablas o rutinas del mismo nombre. No se borran bases ni se impone un DEFINER de administrador.

```sql
CREATE TABLE clientes (
    Cod_Cliente INTEGER NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(30),
    PRIMARY KEY (Cod_Cliente)
) ENGINE = InnoDB;
```

El bloque siguiente es para un cliente que entiende `DELIMITER`, como la consola MySQL. `DELIMITER` es una orden del cliente, **no una sentencia para enviarla mediante JDBC**.

```sql
DELIMITER $$

CREATE PROCEDURE insertaCliente (
    IN p_codigo INTEGER,
    IN p_nombre VARCHAR(100),
    IN p_telefono VARCHAR(30)
)
BEGIN
    INSERT INTO clientes (Cod_Cliente, Nombre, Telefono)
    VALUES (p_codigo, p_nombre, p_telefono);
END$$

DELIMITER ;
```

Los nombres de los parámetros llevan prefijo `p_` para no confundirlos con las columnas. El procedimiento no hace commit: la transacción la controla quien lo llama.

## 2. Llamada Java completa

### `src/main/java/jdbc/Procedimientos.java`

```java
package jdbc;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;

public final class Procedimientos {
    private Procedimientos() {
    }

    public static void insertarCliente(
            Connection conexion, int codigo, String nombre, String telefono) throws SQLException {
        Transacciones.ejecutar(conexion, () -> {
            try (CallableStatement llamada =
                            conexion.prepareCall("{call insertaCliente(?, ?, ?)}")) {
                llamada.setInt(1, codigo);
                llamada.setString(2, nombre);
                if (telefono == null) {
                    llamada.setNull(3, Types.VARCHAR);
                } else {
                    llamada.setString(3, telefono);
                }
                llamada.execute();
            }
            return null;
        });
    }

    public static void eliminarEmpleadoOracle(Connection conexion, int numero) throws SQLException {
        Transacciones.ejecutar(conexion, () -> {
            try (CallableStatement llamada = conexion.prepareCall("{call remove_emp(?)}")) {
                llamada.setInt(1, numero);
                llamada.execute();
            }
            return null;
        });
    }

    public static void main(String[] args) {
        try (Connection conexion = Conexion.abrir()) {
            insertarCliente(conexion, 765, "Antonio Perez", "950121314");
            System.out.println("Cliente insertado y transacción confirmada.");
        } catch (SQLException ex) {
            System.err.printf("Error en el procedimiento: %s | SQLState: %s%n", ex.getMessage(),
                    ex.getSQLState());
        }
    }
}
```

## 3. Variante de procedimiento Oracle

Ejemplo para el esquema de prácticas que contiene `emp(empno, ...)`, no para MySQL. El método Java `eliminarEmpleadoOracle` lo invoca; el `main` anterior sigue siendo el ejemplo de inserción MySQL.

```sql
CREATE OR REPLACE PROCEDURE remove_emp (p_empno IN NUMBER) AS
BEGIN
    DELETE FROM emp
    WHERE empno = p_empno;
END;
/
```

La barra final es un separador de clientes como SQL*Plus. No enviarla como parte del SQL mediante JDBC. Se retira la variable `tot_emps` del ejemplo histórico: estaba sin inicializar y su decremento no guardaba ningún recuento útil. Para informar de filas borradas se podría añadir un parámetro OUT con `SQL%ROWCOUNT`.

## 4. Comprobación y límites

1. Conectar al esquema MySQL aislado y ejecutar el DDL.
2. Invocar `insertarCliente` y consultar `clientes` para localizar el código 765.
3. Volver a invocarlo con el mismo código: debe fallar por PK duplicada y no dejar una segunda fila.
4. Para Oracle, preparar el procedimiento en otro esquema de prácticas y comprobar el borrado antes y después del commit.

**Validación disponible:** la clase Java forma parte de la compilación común. La sintaxis y el uso transaccional se revisan, pero la creación e invocación de estas rutinas **requieren servidores MySQL/Oracle y no se declaran probadas en ellos**. H2 o SQLite no certifican la semántica de sus procedimientos.

**Fuente:** libro [3A del aula](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930), apartados de procedimientos Oracle y MySQL.
