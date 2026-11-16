Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218446

## Solución Ejercicio 2 - Tablas de una Base de datos

Requisitos de finalización

**Ejercicio 2 – No evaluable**

Descubre con un programa en Java cuáles y cuantas tablas tiene la base de datos “World”. Usa el método getTables de la interfaz DatabaseMetaData. Recuerda que en MYSQL no usa esquemas.

Obtén para cada tabla la siguiente información y escríbela por pantalla: Nombre, Esquema, Tipo y Catálogo.

\_\_\_\_

Solución.

`import java.sql.*;`

`public class ListarTablasMetaData {`

`public static void main(String[] args) {`

`String url = "jdbc:mysql://localhost:3306/tu_base_de_datos";`

`String usuario = "tu_usuario";`

`String contraseña = "tu_contraseña";`

`try (Connection conn = DriverManager.getConnection(url, usuario, contraseña)) {`

`DatabaseMetaData metaData = conn.getMetaData();`

`// Parámetros: catalog, schemaPattern, tableNamePattern, types`

`// - catalog: nombre de la base de datos (en MySQL)`

`// - schemaPattern: null (MySQL no usa schemas como PostgreSQL/Oracle)`

`// - tableNamePattern: "%" para todas las tablas`

`// - types: new String[]{"TABLE"} para solo tablas (excluye vistas)`

`try (ResultSet rs = metaData.getTables(`

`"tu_base_de_datos",  // catalog`

`null,                // schemaPattern`

`"%",                 // tableNamePattern`

`new String[]{"TABLE"} // types`

`)) {`

`while (rs.next()) {`

`String nombreTabla = rs.getString("TABLE_NAME");`

`String tipoTabla   = rs.getString("TABLE_TYPE");`

`String esquema     = rs.getString("TABLE_SCHEM");`

`String catalogo    = rs.getString("TABLE_CAT");`

`System.out.println("Tabla: " + nombreTabla`

`+ " | Tipo: " + tipoTabla`

`+ " | Catálogo: " + catalogo`

`+ " | Esquema: " + esquema);`

`}`

`}`

`} catch (SQLException e) {`

`e.printStackTrace();`

`}`

`}`

`}`

Última modificación: lunes, 26 de octubre de 2026, 20:24

[◄ Ejercicio 2 - Tablas de una base de datos (No evaluable)](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218444&forceview=1)

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
Ejercicio 3 - Sentencias DML
Ejercicio 4 - Buscador de Ciudades - PreparedStatement
Ejercicio 5 - Transacciones JDBC
Práctica Evaluable - UT02
4A Mapeo Objeto Relacional ORM
4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. Maven
4C Lenguaje de consultas de Hibernate (HQL)
Ficheros de configuración
Entrega de Anteproyecto

[Ejercicio 3 - Sentencias DML ►](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218620&forceview=1)