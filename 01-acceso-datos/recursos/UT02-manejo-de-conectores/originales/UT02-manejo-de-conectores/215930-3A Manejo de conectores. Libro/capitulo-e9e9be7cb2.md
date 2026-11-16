Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36222

### 7. JDBC Conexión a una base de datos.

La API **JDBC c**onsta de los paquetes **java.sql** (contiene las interfaces **core** de JDBC) y **javax.sql** (contiene interfaces **opcionales/avanzadas)**. [Consulta la documentación del paquete java.sql](https://docs.oracle.com/javase/8/docs/api/java/sql/package-summary.html) y [paquete javax.sql](https://docs.oracle.com/javase/8/docs/api/javax/sql/package-summary.html)

* **JDBC** aparte de algunas clases especificas, **mayoritariamente está compuesto de interfaces que el controlador (driver) implementa dándoles la funcionalidad adecuada.** El fabricante hace las implementaciones de las interfaces.
* Para asegurar la interoperabilidad (que nuestro código no dependa de la base de datos/Driver), las **aplicaciones** no referenciarán nunca las clases concretas de ningún controlador  sino las **interfaces estándares de la****API****JDBC.**Para ello, **la aplicación nunca podrá instanciar directamente los objetos JDBC** con una sentencia *new* , sino que se crearán indirectamente llamando algún método de alguna clase u objeto ya existente.

###### Registrar el driver en el IDE

Para conectar programas Java a un gestor de base de datos es necesario que **configuremos el proyecto** para que utilice las librerías correspondientes al controlador del gestor de base de datos correspondiente:

**En Eclipse**:  
proyecto --> botón derecho --> Build Path --> configure Build Path . Añade el driver adecuado para la BD que quieras utilizar.

###### **Descargar drivers**

* **Oracle**: además del que puedes encontrar en la ruta: C:\oraclexe\app\oracle\product\11.2.0\server\jdbc\lib.   
  Puedes descargar drivers en la [pagina](https://www.oracle.com/database/technologies/jdbcdriver-ucp-downloads.html) :ojdbc8.jar, ojdbc14.jar
* **MySQL**:  El driver a utilizar es Conector/J que puedes descargar en la [pagina](https://www.mysql.com/products/connector/)

**Registrar un controlador y cerrarlo**  
La clase  **DriverManager** s**e encargan de gestionar la conexión y todas las comunicaciones con la BD, necesita conocer los controladores específicos para las BD que se vayan a utilizar.**

La interfaz `Connection`representa una conexión a la base de datos, una vía de comunicación entre la aplicación y el SGBD. **Los objetos****`Connection`mantendrán la capacidad de comunicarse con el sistema gestor mientras permanezcan abiertos. Esto es, desde que se crean hasta que se cierran utilizando el método `close`.**

El objeto `Connection s`e obtiene utilizando  el método `getConnection()`de la clase `DriverManager`. Este método recibe como parámetro la URL JDBC que identifica a la base de datos con la que queremos realizar la conexión. Está totalmente vinculado a una fuente de datos, por eso en pedir la conexión hay que especificar de qué fuente se trata siguiendo el protocolo JDBC e indicando la url de los datos, y en su caso el usuario y password .

`getConnection(String url)`

`getConnection(String url, Properties info)`

getConnection(String URL, String user, String password);

Cuando se presenta con una **URL específica,**`DriverManager` itera sobre la colección de drivers registrados hasta que uno de ellos reconoce la URL especificada. Si no se encuentra ningún conector adecuado, se lanza una `SQLException.`

 **Los controladores se identifican con un URL JDBC.** La forma más sencilla es una lista de tres valores separados mediante dos puntos de la forma jdbc:subprotocolo:localizadorBD:

* El primer valor de la lista representa el protocolo, que es siempre `jdbc` para los URL JDBC.
* El segundo valor es el **subprotocolo** .
* El tercer valor es el nombre de sistema para establecer la conexión con un sistema específico, dependerá del tipo de controlador utilizado, del *host* donde se aloje el SGBD, del puerto que este use para escuchar las peticiones y del nombre de la base de datos o esquema con el que queremos trabajar.  
  Existen dos valores especiales que pueden utilizarse para conectarse con la base de datos local. Son \*LOCAL y localhost (ambos son sensibles a mayúsculas y minúsculas).

Prueba el siguiente ejemplo en un nuevo proyecto, configurar tu proyecto para incluir las bibliotecas JDBC de Oracle en la construcción de su ruta.  `proyecto --> boton derecho --> Build Path --> configure Build Path . Añade ojdbcX.jar`

[Para obtener mas información de los drivers de Oracle disponibles](https://docs.oracle.com/cd/E11882_01/appdev.112/e13995/oracle/jdbc/OracleDriver.html)  y de la sintaxis de url correspondiente a cada uno de ellos.

Para conectarnos a una base de datos Oracle 11XE:

```
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.SQLException;  
public class PrimeraConexion {  
public static void main(String[] args) throws SQLException {  
		Connection conexion;  
		//url oracle con formato jdbc:oracle:thin:@/<hostname>:<port>/<servicename>  
                 String urljdbc = "jdbc:oracle:thin:@//localhost:1521/XE";  
                //establecemos la conexion utilizando el metodo getConnection  
                // damos url, nombre del usuario y contraseña  
		conexion = DriverManager.getConnection(urljdbc, "ejemplo", "ejemplo");  
                 System.out.println("conecta");   
		 conexion.close(); 
            }  
}
```

Para establecer la conexión con la BD MySQL, únicamente hay que utilizar el driver JDBC  correspondiente y configurar el proyecto para añadir el driver mysql-connector-java-8.0.22.jar

```

```

[Para obtener mas información de los drivers de mysql disponibles](https://dev.mysql.com/doc/connector-j/8.0/en/connector-j-reference-jdbc-url-format.html) y de la sintaxis de url correspondiente a cada uno de ellos.

La url para una BD local es***"jdbc:mysql://localhost/base datos".   
Si el servidor de base de datos MySQL no tiene establecido la zona horaria. Da un error que se resuelve cambiando la zona horaria en Mysql o bien estableciendo la zona horaria en la urljdbc***

***"jdbc:mysql://localhost/base datos?serverTimezone=UTC" UTC es la zona horaria .***

***Para cambiar zona horaria en MySQL consulta la [documentación de la DB](https://dev.mysql.com/doc/refman/8.0/en/time-zone-support.html#time-zone-variables)***

```
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.SQLException;  
public class PrimeraConexion {  
	public static void main(String[] args) throws SQLException {  
		// Establecemos la conexion con la BD  
		Connection conexion =   
               DriverManager.getConnection("jdbc:mysql://localhost/ejemplo", "root", "system");  
		// Cerrar conexión  
		conexion.close();  
	}  
}
```