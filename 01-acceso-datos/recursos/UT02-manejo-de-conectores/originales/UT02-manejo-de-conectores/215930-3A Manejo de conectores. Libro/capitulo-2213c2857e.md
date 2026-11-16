Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36198

### 3. Conexión a bases de datos con API JDBC

#### 3.2. Conectores o Drivers.

**Un conector o driver es un conjunto de clases encargadas de implementar los interfaces del API y acceder a la base de datos.**

Para poder conectarse a una base de datos y lanzar consultas, una aplicación necesita tener un driver adecuado.

El conector lo proporciona el fabricante de la base de datos o bien un tercero.

Cuando se construye una aplicación de base de datos, **JDBC oculta lo específico de cada base de datos**, de modo que el programador se ocupe sólo de su aplicación.  El código de nuestra aplicación no depende del driver, puesto que trabajamos mediante los paquetes**java.sql** y **javax.sql.**

JDBC ofrece las clases e interfaces para:

* Establecer una conexión a una base de datos.
* Ejecutar una consulta.
* Procesar los resultados.

**La clase usada es DriverManager**

Es la **clase usada** de JDBC para gestionar los drivers de bases de datos y establecer conexiones. Esta en desuso, y se usa más la interfaz **DataSource**

**Responsabilidades principales:**

* + Registrar y administrar los drivers JDBC disponibles.
  + Proporcionar el método `getConnection()` para obtener una conexión a la base de datos.

**Las interfaces más usadas son:**

1. **Connection:**Representa una **sesión de conexión**con una base de datos específica. Es el punto de partida para ejecutar sentencias SQL.
2. **Statement:** Se utiliza para **ejecutar sentencias SQL estáticas**(sin parámetros) y obtener sus resultados.
3. **ResultSet:** Representa el conjunto de **resultados** **devuelto por una consulta** (normalmente un `SELECT`). Mantiene un cursor que apunta a la fila actual.
4. **DataSource:**Alternativa moderna a `DriverManager`. Representa una **fuente de datos** y suele implementarse mediante **pooling de conexiones** (como HikariCP, Apache DBCP, etc.).

**Ejemplo:**

programa que lista números de empleado, nombre y oficio:

`import java.sql.Connection;`  
`import java.sql.DriverManager;  
import java.sql.ResultSet;  
import java.sql.SQLException;  
import java.sql.Statement;  
public class ConsultaSencilla {  
 public static void main(String[] args) {  
 Connection conexion;  
 try {  
 String urljdbc = "jdbc:oracle:thin:@localhost:1521:XE";  
        //la base de datos esta en local y el servicio Oracle es XE   
        //se utiliza   thin driver   
 conexion = DriverManager.getConnection(urljdbc, "ejemplo", ejemplo");   
 Statement smt = conexion.createStatement();  
 ResultSet rset = smt.executeQuery("select  empno, ename , job from emp order by 1");  
 while (rset.next())  
 System.out.println("empleado numero " + rset.getString(1) + " nombre " + rset.getString(2) + " oficio "  + rset.getString(3));  
 conexion.close();  
 } catch (SQLException e) {  
 e.printStackTrace();  
 }  
 }  
}`

La API de JDBC provee acceso a datos desde Java. Usando esta API podemos acceder a variadas fuentes de datos: bases de datos relacionales, hojas de cálculo (spreadsheets) y archivos planos.

Aquí encontraras un tutorial  bastante completo de JDBC con bases de datos Oracle:

[I](https://www.oracle.com/technetwork/database/application-development/jdbc/overview/quickstart-4308895.html)[ntroduccion a JDBC Oracle](https://www.oracle.com/technetwork/database/application-development/jdbc/overview/quickstart-4308895.html)

Hay cinco tipos de drivers JDBC: Tipo 1, Tipo 2, Tipo 3 , Tipo 4 y Tipo 5, que veremos a continuación.