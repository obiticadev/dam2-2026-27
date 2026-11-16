Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218620

## Ejercicio 3 - Sentencias DML

Requisitos de finalización

Adapta el siguiente ejemplo para hacer una actualización, insercion y borrado en alguna tabla de la base de datos "world" de MySQL.

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

Última modificación: miércoles, 21 de octubre de 2026, 12:07

[◄ Solución Ejercicio 2 - Tablas de una Base de datos](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218446&forceview=1)

Saltar a actividad

Saltar a actividad
Avisos
Novedades
foro de dudas
Organización del proyecto Intermodular
Programación para Proyectos
Título y sinopsis del Proyecto Intermodular
Horario Curso
Procedimiento de reclamaciones
Curriculums para FFE
2A Manejo de ficheros
2B Librerías de tratamiento de XML en Java.
2B Librerías de tratamiento de XML en Java. Alternativa
Clases - Flujos de datos
Ejemplo de código Serialización
Ejemplo de manejo de Nodos en DOM
Fichero cd\_catalog.xml para ejemplo 2.1. Ejemplo de DOM
Presentación del curso
Ejercicio1 - Clase File
Solución - Ejercicio1 - Clase File
Ejercicio2 - Visualizar fichero
Solución - Ejercicio2 - Visualizar fichero
Ejercicio3- Fichero de acceso aelatorio
Solución - Ejercicio3 - Fichero de acceso aelatorio
Práctica Evaluable - UT01
Solución - Práctica Evaluable - UT01
Entrega Examen Ejercicio 04/11/2026
3A Manejo de conectores.
3B BASES DE DATOS EMBEBIDAS. SQLite
Ejercicio 1 - Recorrer una selección múltiple (No evaluable)
Solución Ejercicio 1 - Recorrer una selección múltiple
Ejercicio 2 - Tablas de una base de datos (No evaluable)
Solución Ejercicio 2 - Tablas de una Base de datos
Ejercicio 4 - Buscador de Ciudades - PreparedStatement
Ejercicio 5 - Transacciones JDBC
Práctica Evaluable - UT02
4A Mapeo Objeto Relacional ORM
4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. Maven
4C Lenguaje de consultas de Hibernate (HQL)
Ficheros de configuración
Entrega de Anteproyecto

[Ejercicio 4 - Buscador de Ciudades - PreparedStatement ►](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218671&forceview=1)