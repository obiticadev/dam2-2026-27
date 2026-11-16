Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36211

### 9. Ejecucion de sentencias de la base de datos II

#### 9.3. Sentencias DML: actualizacion, borrado e insercion.

Veamos como ejecutar sentencias DML (UPDATE, DELETE, INSERT)

La ejecución de estas sentencias no devuelve un ResultSet.

Pese a que se trata de sentencias muy dispares, desde el punto de vista de la comunicación con el SGBD se comportan de manera muy similar, siguiendo el siguiente patrón:

1. A partir de una conexión activa, instanciamos un objeto **Statement**.
2. Ejecutamos la sentencia SQL, método executeUpdate.

El metodo executeUpdate devuelve un número entero que representa el número de filas afectadas por la instrucción SQL. 

Veamos el ejemplo siguiente, insertamos una linea y luego borramos todas las filas de la tabla jobs

```
public class Actualizacion {  
    public static void main(String[] args) {  
    // establecemos la conexion  
    Connection conexion;  
    try {  
        String urljdbc = "jdbc:oracle:thin:ejemplo/ejemplo@//localhost:1521/XE";  
        conexion = DriverManager.getConnection(urljdbc, "scott", "tiger");  
        // crea la sentencia  
        Statement stm = conexion.createStatement();  
        // ejecuta la actualizacion la ejecucion devuelve 1, numero de filas afectadas  
        System.out.println(stm.executeUpdate("insert into jobs values ('ID TEACH', 'PROFESOR IT', 2500, 5000)"));  
        // ejecuta el borrado, la ejecucion devuelve 19, numero de filas afectadas  
        System.out.println(stm.executeUpdate("delete from jobs "));  
        stm.close(); // Cerrar Statement  
        conexion.close(); //cerrar conexion  
        } catch (SQLException e) {  
            e.printStackTrace();  
        }  
    }  
}
```

**Ejemplo de actualización (UPDATE, INSERT, DELETE)**

En este caso se usa el método **`executeUpdate`**

```
package conectaBD;  
import java.sql.*;
public class ModificaBBDD {

    public static void main(String[] args) {

        try {
            // 1. Crear la conexión con la base de datos
            Connection miConexion = DriverManager.getConnection("jdbc:mysql://localhost:3306/pruebas", "root", "");

            // 2. Crear el objeto Statement
            Statement miStatement = miConexion.createStatement();

            // -------------------------------------------------------------------
            // OPCIÓN 1: INSERTAR UN REGISTRO (Insert Into)
            // -------------------------------------------------------------------
            String instruccionSql = "INSERT INTO PRODUCTOS (CÓDIGOARTÍCULO, NOMBREARTÍCULO, PRECIO) "
                                  + "VALUES ('AR77', 'PANTALÓN', 25.35)";

            /*
            // -------------------------------------------------------------------
            // OPCIÓN 2: ACTUALIZAR UN REGISTRO (Update)
            // -------------------------------------------------------------------
               String instruccionSql = "UPDATE PRODUCTOS SET PRECIO = PRECIO * 2 WHERE CÓDIGOARTÍCULO = 'AR77'";
            */

            /*
            // -------------------------------------------------------------------
            // OPCIÓN 3: ELIMINAR UN REGISTRO (Delete)
            // -------------------------------------------------------------------
            String instruccionSql = "DELETE FROM PRODUCTOS WHERE CÓDIGOARTÍCULO = 'AR77'";
            */

            // 3. Ejecutar la instrucción SQL de modificación
            miStatement.executeUpdate(instruccionSql);

            System.out.println("Datos modificados correctamente");

        } catch (Exception e) {
            System.out.println("No se ha podido conectar o ejecutar la instrucción.");
            e.printStackTrace();
        }
    }
}  

```

**Haz el ejercición 3 - Sentencias DML**

```
                                      
```