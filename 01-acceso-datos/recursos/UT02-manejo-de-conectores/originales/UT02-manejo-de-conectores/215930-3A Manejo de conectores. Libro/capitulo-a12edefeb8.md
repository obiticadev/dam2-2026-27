Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36197

### 9. Ejecucion de sentencias de la base de datos II

#### 9.2. Consultas al Diccionario de Datos

La Interfaz **DatabaseMetaData** (de la API java.sql) permite obtener Información  sobre la base de datos en su conjunto.

Algunos métodos de la interfaz DatabaseMetaData devuelven listas de información en forma de objetos  **ResultSet**, que se pueden recorrer en una repetitiva para obtener los metadatos. Para ello utilizaremos metodos**getString,  getInt**, etc. [Consulta la documentación de la API JDBC.](https://docs.oracle.com/javase/8/docs/api/java/sql/DatabaseMetaData.html)

Algunos métodos DatabaseMetaData tienen  argumentos que son patrones de cadena. Es posible usar patrones dentro de estas cadenas,  "%" representa  cualquier subcadena de 0 o más caracteres, y "\_" representa  un  carácter.

Algunos métodos útiles son:

* **getColumns(String catalog, String schemaPattern, String tableNamePattern, String columnNamePattern)**

Devuelve en un ResultSet  la descripción de las columnas de la tabla disponibles en el catálogo especificado.

* **getDriverName()**

Devuelve en un String, el nombre del controlador JDBC.

* **getDriverVersion()**

Devuelve en un String, el número de versión de este controlador JDBC como a String.

* **getExportedKeys(String catalog, String schema, String table)**

Devuelve en un ResultSet  la  descripción de las columnas de clave Foranea que hacen referencia a las columnas de clave principal de la tabla dada.

* **getFunctions(String catalog, String schemaPattern, String functionNamePattern)**

Devuelve en un ResultSet la descripción del sistema y las funciones de usuario disponibles en el catálogo dado.

* **getMaxConnections()**

Recupera el número máximo de conexiones simultáneas a esta base de datos que son posibles.

* **getPrimaryKeys(String catalog, String schema, String table)**

Devuelve en un ResultSet  una descripción de las columnas de clave primaria de la tabla dada.

* **getProcedures(String catalog, String schemaPattern, String procedureNamePattern)**

Recupera una descripción de los procedimientos almacenados disponibles en el catálogo dado.

* **getSchemas()**

Devuelve en un ResultSet los nombres de esquema disponibles en esta base de datos.

* **getSQLKeywords()**

Recupera una lista separada por comas de todas las palabras clave de SQL de esta base de datos que NO son también palabras clave de SQL: 2003.

* **getStringFunctions()**

Recupera una lista separada por comas de funciones de cadena disponibles con esta base de datos.

* **supportsAlterTableWithAddColumn()**

Recupera si esta base de datos admite ALTER TABLE con añadir columna. Devuelve un booleano

* **supportsAlterTableWithDropColumn()**

Recupera si esta base de datos es posible borrar una columna con  ALTER TABLE.  Devuelve un booleano.

* **supportsTransactions()**

Recupera si esta base de datos admite transacciones.

* **getTables****(String catalog, String schemaPattern, String tableNamePattern, String[] types) throws SQLException;**

Se utiliza para recuperar información sobre las tablas de la base de datos. Al llamar a este método, puedes obtener un ResultSet  que tiene informacion sobre las tablas que cumplen  criterios de filtrado.

* catalog : El nombre del catálogo (o base de datos) para el cual se desea obtener la información. Puede ser null para indicar que se utilizará el catálogo predeterminado.
* schemaPattern: El patrón para los nombres de los esquemas que se deben incluir. Puede ser null para indicar que se incluirán todos los esquemas.
* tableNamePattern : El patrón para los nombres de las tablas que se deben incluir. Puede ser null para indicar que se incluirán todas las tablas.
* types : Un array de tipos de tabla como filtro. Ejemplos comunes son {"TABLE"}, {"VIEW"}, {"SYNONYM"}, o null  para incluir todos los tipos.

Al llamar a getTables  , el ResultSet devuelto contendrá filas con información sobre las tablas que coinciden con los criterios especificados. Cada fila representará una tabla y contendrá información como:

* TABLE\_CAT  : Nombre del catálogo (base de datos).
* TABLE\_SCHEM: Nombre del esquema al que pertenece la tabla.
* TABLE\_NAME : Nombre de la tabla.
* TABLE\_TYPE : Tipo de tabla (ejemplo: "TABLE", "VIEW", "SYSTEM TABLE", etc.).
* REMARKS : Comentarios y descripciones de la tabla.

**Ejemplo:**

Obtener los siguientes datos de la BD: Catalogo, Esquema, Nombre y Tipo

```
 
```

```
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.ResultSet;  
import java.sql.SQLException;  
import java.sql.DatabaseMetaData;  
public class EjemploMetadata {  
	public static void main(String[] args) throws SQLException  {  
			Connection conexion = DriverManager.getConnection("jdbc:mysql://localhost/ejemplo", "ejemplo", "ejemplo");  
			DatabaseMetaData dbmd = conexion.getMetaData();// Creamos objeto DatabaseMetaData  
			ResultSet resul = null;  
			String nombre = dbmd.getDatabaseProductName();  
			String driver = dbmd.getDriverName();  
			String url = dbmd.getURL();  
			String usuario = dbmd.getUserName();  
			System.out.println("INFORMACIÓN SOBRE LA BASE DE DATOS:");			  
			System.out.printf("Nombre : %s %n", nombre);  
			System.out.printf("Driver : %s %n", driver);  
			System.out.printf("URL    : %s %n", url);  
			System.out.printf("Usuario: %s %n", usuario);  
			// Obtener información de las tablas y vistas que hay  
			resul = dbmd.getTables(null, "ejemplo", null, null);  
			while (resul.next()) {  
				String catalogo = resul.getString(1);// columna 1  
				String esquema = resul.getString(2); // columna 2  
				String tabla = resul.getString(3); // columna 3  
				String tipo = resul.getString(4); // columna 4  
				System.out.printf("%s - Catalogo: %s, Esquema: %s, Nombre: %s %n", tipo, catalogo, esquema, tabla);  
			}  
			conexion.close(); // Cerrar conexion  
		}   
}
```

**Haz el [Ejercicio 2 - Tablas de una base de datos (No evaluable)](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218444 "Ejercicio 2 - Tablas de una base de datos (No evaluable)")**

```
 
```