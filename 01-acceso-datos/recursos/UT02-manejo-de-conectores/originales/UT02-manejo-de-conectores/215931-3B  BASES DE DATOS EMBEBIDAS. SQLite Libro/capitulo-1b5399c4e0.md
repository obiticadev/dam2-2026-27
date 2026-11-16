Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215931&chapterid=36232

### 1. Introducción

#### 1.8. Conexion JDBC

la conexion de una base de datos creada con SQLite se realiza utilizando el driver JDBC correspondiente, todo lo aprendido en la conexion a bases de datos Oracle o MySQL es aplicable a SQLite.

**Para conectarnos a una base de datos creada con sqlite3**

1. [Descarga el driver sqlite-jdbc-3.23.1](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290987/mod_book/chapter/36232/driver%20sqlite-3.23.1.jar "https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290987/mod_book/chapter/36232/driver%20sqlite-3.23.1.jar")
2. La cadena de conexión de forma similar a las de otros gestores de bases de datos:   
    urljdbc = "jdbc:sqlite:E:\\chinook.db";

Ejemplo:

En este programa se utiliza la base de datos chinook.db. Se muestra  información del diccionario, y el nombre de las tablas que tiene la base de datos.

```
public class main {  
	public static void main(String[] args) {  
		Connection conexion;  
		try {  
			String urljdbc = "jdbc:sqlite:E:\\chinook.db";  
			conexion = DriverManager.getConnection(urljdbc);  
			System.out.println("conecta");  
			java.sql.DatabaseMetaData dbmd = conexion.getMetaData();// Creamos  
			// objeto DatabaseMetaData  
			ResultSet resul = null;  
			String nombre = dbmd.getDatabaseProductName();  
			String driver = dbmd.getDriverName();  
			String url = dbmd.getURL();  
			String usuario = dbmd.getUserName();  
			System.out.println("INFORMACIÓN SOBRE LA BASE DE DATOS:");  
			System.out.println("===================================");  
			System.out.printf("Nombre : %s %n", nombre);  
			System.out.printf("Driver : %s %n", driver);  
			System.out.printf("URL    : %s %n", url);  
			System.out.printf("Usuario: %s %n", usuario);  
			// Obtener información de las tablas y vistas que hay  
			resul = dbmd.getTables(null, null, "%", null);  
			while (resul.next()) {  
				String catalogo = resul.getString(1);// columna 1  
				String esquema = resul.getString(2); // columna 2  
				String tabla = resul.getString(3); // columna 3  
				String tipo = resul.getString(4); // columna 4  
				System.out.printf("%s - Catalogo: %s, Esquema: %s, Nombre: %s %n", tipo, catalogo, esquema, tabla);  
			}  
			//Obtener información de las tablas y vistas que hay 		         
			     
			conexion.close(); // Cerrar conexion  
		} catch (SQLException e) {  
			System.out.println(e.getMessage());  
			System.out.println(e.getErrorCode());  
			System.out.println(e.getSQLState());  
		}  
		  
	}  
}
```