Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36203

### 9. Ejecucion de sentencias de la base de datos II

#### 9.4. Sentencias preparadas

#### Sentencias"preparadas" PreparedStatement

Con este interfaz **podemos pasar parámetros a la sentencia SQL** que hemos preparado. Para ello usamos el objeto **PreparedStatement** para enviar sentencias de SQL a la base de datos. Este tipo especial de declaración se deriva de la interfaz  **Statement**.

Una Prepared Statement es una sentencia SQL de base de datos **precompilada (Cargada en memoria)**. Al estar precompilada su **ejecución será más rápida** que una SQL normal, por lo que es adecuada cuando vamos a **ejecutar la misma sentencia SQL (con distintos valores) muchas veces**.

**Veamos como se usa :**

* Simplemente **ponemos interrogantes donde irán los valores concretos que vayamos a necesitar en la sentencia**.
* Cada interrogante s**e identifica luego con un número**, de forma que el primer interrogante que aparece es el 1, el segundo el 2, etc.
* Después, con los métodos set() correspondientes rellenamos esos valores.
* El primer parámetro es el número del interrogante y el segundo el valor que queremos insertar.
* Finalmente **ejecutamos la sentencia, utilizando el método executeQuery() o  executeUpdate().**

Consulta no preparada:

`SELECT * FROM usuarios WHERE email = "hola@gmail" AND password = "123456"`  
  
Consulta preparada:

```
SELECT * FROM usuarios WHERE email = ? AND password = ?
```

Luego, con la misma PreparedStatement, ponemos otros valores volviendo a llamar a los métodos set() y volvemos a ejecutar la sentencia

Cuando ponemos los interrogantes no **indicamos comillas ni realizamos conversiones**, son las llamadas a **setInt(), setString()**, ya hacen todas las conversiones adecuadas para nosotros.

**SQL Inyecion:** PreparedStatement hace que sean especialmente útil para eviar el SQL Inyection. Ya que la precompilación hace que el motor de SQL esta esperando recibir **unos parámetros** no un SQL completo -->[Explicación detallada](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290986/mod_book/chapter/36203/jdbc-sql-injection.html)

El siguiente ejemplo utiliza un único objeto PreparedStatement, dándole valores a los parámetros:

```
public class actualizaSentenciaPreparada {  
	public static void main(String[] args) throws SQLException {  
		String urljdbc = "jdbc:oracle:thin:@localhost:1521:XE";  
		Connection conexion = DriverManager.getConnection(urljdbc, "scott", "tiger");  
		PreparedStatement pstmt = conexion.prepareStatement("UPDATE EMP " +  
		"SET SAL = ? WHERE empno = ?");  
		pstmt.setInt(1, 1);  
		pstmt.setInt(2,7844 );  
		pstmt.executeUpdate();  
		pstmt.close();  
		conexion.close();  
	}  
}
```

**Los métodos de la interfaz PreparedStatement que permiten pasar parámetros**a  la sentencia empiezan por set:

`void setBigDecimal(int parameterIndex, BigDecimal x)  
void setBinaryStream(int parameterIndex, InputStream x)  
void setDate(int parameterIndex, Date x)`  
`void setDouble(int parameterIndex, double x)  
void setInt(int parameterIndex, int x)`  
`void setString(int parameterIndex, String x)`  
etc...

**Para asignar un null de SQL al parámetro:**

`void setNull(int parameterIndex, int sqlType)`  
En caso de error se levanta la excepcion SQLExceptionSets   
ejemplo :  
 `prcProcedimientoAlmacenado.setNull(3, java.sql.Types.VARCHAR);`

Los tipos validos son los del [enlace](https://docs.oracle.com/javase/7/docs/api/java/sql/Types.html)

**Haz el ejercición 4 - Buscador de Ciudades - PreparedStatement**