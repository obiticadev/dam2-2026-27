Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218465

## Solución Ejercicio 1 - Recorrer una selección múltiple

Requisitos de finalización

Instala una instancia de MySQL y MySQL workbench con la base de datos “world” lleva por defecto.

Descarga e instala en tu IDE la librería del Conector/J de MySQL

Con un programa Java imprime en pantalla los idiomas que se hablan en España

`import java.sql.Connection;`  
`import java.sql.DriverManager;`  
`import java.sql.PreparedStatement;`  
`import java.sql.ResultSet;`  
`import java.sql.SQLException;`

`public class IdiomasEspana {`  
`public static void main(String[] args) {`  
`// Datos de conexión (ajusta usuario y contraseña según tu configuración)`  
`String url = "jdbc:mysql://localhost:3306/world";`  
`String usuario = "root";`  
`String contrasena = "tu_contraseña";`

`// Consulta SQL: une country y countrylanguage para España (ESP)`  
`String sql = "SELECT cl.Language, cl.Percentage, cl.IsOfficial " +`  
`"FROM countrylanguage cl " +`  
`"INNER JOIN country co ON cl.CountryCode = co.Code " +`  
`"WHERE co.Code = 'ESP' " +`  
`"ORDER BY cl.Percentage DESC";`

`try (Connection conn = DriverManager.getConnection(url, usuario, contrasena);`  
`PreparedStatement pstmt = conn.prepareStatement(sql);`  
`ResultSet rs = pstmt.executeQuery()) {`

`System.out.println("Idiomas hablados en España:");`  
`System.out.println("----------------------------------------");`

`while (rs.next()) {`  
`String idioma = rs.getString("Language");`  
`double porcentaje = rs.getDouble("Percentage");`  
`String oficial = rs.getString("IsOfficial");`

`// Mostrar si es oficial (T) o no (F)`  
`String marcaOficial = "T".equals(oficial) ? " (Oficial)" : "";`

`System.out.printf("%-15s %6.1f%%%s%n", idioma, porcentaje, marcaOficial);`  
`}`

`} catch (SQLException e) {`  
`System.err.println("Error al conectar o consultar la base de datos:");`  
`e.printStackTrace();`  
`}`  
`}`  
`}`

Última modificación: lunes, 26 de octubre de 2026, 20:24

[◄ Ejercicio 1 - Recorrer una selección múltiple (No evaluable)](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218463&forceview=1)

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
Ejercicio 2 - Tablas de una base de datos (No evaluable)
Solución Ejercicio 2 - Tablas de una Base de datos
Ejercicio 3 - Sentencias DML
Ejercicio 4 - Buscador de Ciudades - PreparedStatement
Ejercicio 5 - Transacciones JDBC
Práctica Evaluable - UT02
4A Mapeo Objeto Relacional ORM
4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. Maven
4C Lenguaje de consultas de Hibernate (HQL)
Ficheros de configuración
Entrega de Anteproyecto

[Ejercicio 2 - Tablas de una base de datos (No evaluable) ►](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218444&forceview=1)