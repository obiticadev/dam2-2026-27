Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36208

### 9. Ejecucion de sentencias de la base de datos II

#### 9.1. Sentencias que devuelven varias filas (consultas)

**Veamos en primer lugar consultas que devuelven datos (SELECT).**

**Interfaz Statement**

Antes de poder ejecutar una sentencia SQL, es necesario obtener un objeto de tipo Statement. Una vez creado dicho objeto, podrá ser utilizado para ejecutar cualquier operación contra la base de datos.

El siguiente método crea un objeto Statement, que podemos utilizar para enviar instrucciones SQL a la base de datos a partir de la conexión a la base de datos.

Statement createStatement() throws SQLException  
  
conexion.createStatement()

La finalidad de un objeto Statement es ejecutar una instrucción SQL que puede o no devolver resultados. Para ello, la interfaz Statement dispone de los siguiente **métodos:**

- executeQuery(String query), para sentencias SQL que recuperen datos de un único objeto ResultSet.

- executeUpdate(String sentenciaDML), para realizar actualizaciones que no devuelvan un ResultSet. Por ejemplo, sentencias DML SQL (las veremos mas adelante)

La Interfaz ResultSet

**Al ejecutar la consulta con el método executeQuery ( String query ) obtenemos  un único objeto de esta interfaz.**

ResultSet rset= smt.executeQuery(*sentencia\_sql)*

El   objeto **ResultSet mantiene un cursor** , inicialmente el cursor esta apuntando antes de la primera fila.   
El **método next mueve el cursor a la siguiente fila**, devuelve true si hay una fila y false cuando no hay más filas en el objeto ResultSet. De esta forma, puede usarse en un bucle while para recorrer el conjunto de resultados.

Un  objeto ResultSet predeterminado no es actualizable y tiene un cursor que sólo se mueve hacia adelante**. Por lo tanto, puede recorrerlo solo una vez y solo desde la primera fila hasta la última fila.** Mas adelante se explicarán ResultSet para actualización 

**Métodos aplicables a un ResultSet**

* **Para** **pasar al siguiente registro se usa el método next().** Devuelve false cuando no hay más registros  
  rset.next()
* **Para obtener el valor de cada campo** hay que usar el **método getX**("campo") correspondiente al tipo del valor SQL:

|  |  |
| --- | --- |
| • getInt | ß INTEGER |
| • getLong | ß BIG INT |
| • getFloat | ß REAL |
| • getDouble | ß FLOAT |
| • getBignum | ß DECIMAL |
| • getBoolean | ß BIT |
| • getString | ß VARCHAR |
| • getString | ß CHAR |
| • getDate | ß DATE |
| • getTime | ß TIME |
| • getTimesstamp | ß TIME STAMP |

Todos estos métodos requieren el nombre de la columna (campo String ) o el índice de la columna (indice int) como argumento. La sintaxis para las dos variantes del método del método getString:

public String getString(int columnIndex) throws SQLException public String getString(String columnName) throws SQLException

Ejemplo: la consulta muestra los numero, nombre y oficio de los empleados ordenado por numero de empleado

```
public void queryEmpleados() throws SQLException {  
     String sqlString =  
       "SELECT empno, apellido,oficio  +  
       "FROM emple order by 1;  
     Statement statement = connection.createStatement();  
     ResultSet rs = statement.executeQuery(sqlString);  
     while (rs.next()) {  
         System.out.println(rs.getInt("empno") +  
                            rs.getString("apellido") +  
                            rs.getString("oficio"));  
         //utilizando indices  
         System.out.println("empleado numero " + rs.getInt(1) +   
                            " nombre " + rs.getString(2) +  
                            " oficio "+ rs.getString(3));  
     }       
}
```

**Interfaz ResultSetMetaData**

Si no tenemos muy claro qué campos nos devuelve una consulta, nos puede resultar de utilidad la interfaz ResultSetMetaData. ya que nos permite obtener información de los datos contenidos en un ResultSet  
Veamos un ejemplo:

```
 
```

```
public class EjemploResultSetMetadata {
	public static void main(String[] args) throws SQLException {  
		Connection conexion = DriverManager.getConnection("jdbc:mysql://localhost/ejemplo", "root", "system");  
		Statement stm = conexion.createStatement();  
		ResultSet resul = stm.executeQuery("select * from DEPART");  
		ResultSetMetaData rsmd = resul.getMetaData();  
		for (int i = 1; i <= rsmd.getColumnCount(); i++) {  
			System.out.println("columna=" + rsmd.getTableName(i) + "." + rsmd.getColumnName(i) + " --> "  
					+ rsmd.getColumnTypeName(i));  
		}  
		conexion.close();
	}
} 
```

El resultado seria el siguiente:

```
columna=depart.DEPT_NO --> DECIMAL  
columna=depart.DNOMBRE --> VARCHAR  
columna=depart.LOC --> VARCHAR
```

**Haz el Ejercicio 1 - Recorrer una selección múltiple**

```
 
```

```
Consulta la documentación   de esta Interfaz
```