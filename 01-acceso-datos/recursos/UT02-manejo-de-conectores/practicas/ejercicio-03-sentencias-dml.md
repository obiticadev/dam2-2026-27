# Ejercicio 3 - Sentencias DML

[← UT02 · Índice de la unidad](../INDICE.md)

> **Unidad:** UT02 · Manejo de conectores  
> **Tipo de recurso:** Ejercicio  
> **Fuente:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218620)

> **Criterio editorial:** contenido del aula sin resumir ni actualizar sus versiones. Se mejora la estructura y se normalizan los espacios de sangría del código; los archivos originales permanecen intactos.

## Índice

- [Enunciado](#enunciado)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="contenido"></a>
<a id="enunciado"></a>
## Enunciado

Adapta el siguiente ejemplo para hacer una actualización, insercion y borrado en alguna tabla de la base de datos "world" de MySQL.

```java
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

<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

<details>
<summary>Consultar los HTML y archivos originales</summary>

- [contenido.html](../originales/UT02-manejo-de-conectores/218620-Ejercicio%203%20-%20Sentencias%20DML%20P%C3%A1gina/contenido.html)

</details>
