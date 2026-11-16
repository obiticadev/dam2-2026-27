Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36215

### 14. Ejemplo completo de uso ResultSet para actualización

El siguiente programa utiliza un **ResultSet** para:

* Actualizar  fila a fila actualiza el salario de los empleados  de la tabla EMPLOYEES  que recupera el  **ResultSet**, en el ejemplo todos los de la tabla.
* Borra los datos de un empleado, aplicando el método **deleteRow()**,  se borra la fila apuntada por el cursor del ResultSet.
* Inserta una linea en la tabla, posicionando el cursor en el espacio reservado para una nueva linea utilizando el método **moveToInsertRow()**

```
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.ResultSet;  
import java.sql.SQLException;  
import java.sql.Statement;  
public class JDBCExample {  
	// Establecer Driver JDBC  
	// y URL de la conexion a la Base de Datos  
	static final String DB_URL = "jdbc:oracle:thin:@localhost:1521:XE";  
	// Usuario y contraseña de la BD  
	// usamos scott/tiger  
	static final String USER = "scott";  
	static final String PASS = "tiger";  
	public static void main(String[] args) {  
		Connection conn = null;  
		try {  
			// CREAR LA CONEXION A LA BD  
			System.out.println("Connecting to database...");  
			conn = DriverManager.getConnection(DB_URL, USER, PASS);  
			// ACTUALIZACION DE VALORES  
			// creamos la sentencia de consulta  
			// Los parametros del RS deben permitir la actualizacion  
			// y mover el cursor .  
			System.out.println("Creating statement...");  
			Statement stmt = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_UPDATABLE);  
			// Ejecutamos la consulta que devuelva las filas a actualizar  
			String sql = "SELECT EMPLOYEE_ID, first_name, last_name, salary, email, hire_date " + " FROM Employees";  
			ResultSet rs = stmt.executeQuery(sql);  
			System.out.println("List result set for reference....");  
			printRs(rs);  
			// Repetitiva que recupera fila a fila el resultado de la ejecucion  
			// posicionamos el puntero antes de la primera fila  
			rs.beforeFirst();  
			// Extraemos datos del RS  
			while (rs.next()) {  
				// Recuperamos utilizando los metodos correspondientes a los tipos  
				// de datos de cada una de las columnas especificadas en la consulta  
				// indexamos por el nombre de la columna ("salary")  
				int newAge = rs.getInt("salary") + 5;  
				rs.updateDouble("salary", newAge);  
				rs.updateRow();// actualiza la fila de la tabla correspondiente a la fila apuntada por el  
								// ResultSet  
			}  
			System.out.println("List result set showing new salarys...");// lista los datos una vez actualizado el  
																			// salario  
			printRs(rs);  
			// INSERTAR FILAS  
			// movemos el cursor al espacio dedicado para la creacion de lineas  
			// y con el metodo update correspodiente damos valores a los campos de la nueva  
			// linea  
			System.out.println("Inserting a new record...");  
			rs.moveToInsertRow();  
			rs.updateInt("EMPLOYEE_ID", 300);  
			rs.updateString("first_name", "John");  
			rs.updateString("last_name", "Paul");  
			rs.updateInt("salary", 40);  
			rs.updateString("email", "ana@ana");  
			rs.updateTimestamp("hire_date", null);  
			// insertamos la linea  
			rs.insertRow();  
			System.out.println("List result set showing new set...");  
			printRs(rs);  
			// BORRAR FILAS  
			// Borramos la segunda linea del ResultSet.  
			// Posicionamos el cursor apuntando la fila que queremos borrar  
			rs.absolute(2);  
			// Listamos el contenido de la 2º fila del RS antes de borrarla  
			System.out.println("List the record before deleting...");  
			// recuperamos con el metodo correspondiente, indexando  
			int EMPLOYEE_ID = rs.getInt(1);  
			int age = rs.getInt(4);  
			String first_name = rs.getString(2);  
			String last_name = rs.getString(3);  
			// Display values  
			System.out.print("EMPLOYEE_ID: " + EMPLOYEE_ID);  
			System.out.print(", salary: " + age);  
			System.out.print(", first_name: " + first_name);  
			System.out.println(", last_name: " + last_name);  
			// borramos la fila apuntada por el RS  
			rs.deleteRow();  
			System.out.println("List result set after deleting one records...");  
			printRs(rs);  
			// LIBERAR RECURSOS  
			rs.close();  
			stmt.close();  
			conn.close();  
		} catch (SQLException se) {  
			// Handle errors for JDBC  
			se.printStackTrace();  
		} catch (Exception e) {  
			// Handle errors for Class.forName  
			e.printStackTrace();  
		} finally {  
			// finally libera recursos  
			try {  
				if (conn != null)  
					conn.close();  
			} catch (SQLException se) {  
				se.printStackTrace();  
			} // end finally try  
		} // end try  
		System.out.println("Goodbye!");  
	}// end main  
	public static void printRs(ResultSet rs) throws SQLException {  
		// Ensure we start with first_name row  
		rs.beforeFirst();  
		while (rs.next()) {  
			// Retrieve by column name  
			int EMPLOYEE_ID = rs.getInt("EMPLOYEE_ID");  
			int age = rs.getInt("salary");  
			String first_name = rs.getString("first_name");  
			String last_name = rs.getString("last_name");  
			// Display values  
			System.out.print("EMPLOYEE_ID: " + EMPLOYEE_ID);  
			System.out.print(", Salary: " + age);  
			System.out.print(", first_name: " + first_name);  
			System.out.println(", last_name: " + last_name);  
		}  
		System.out.println();  
	}// end printRs()  
}// end JDBCExample
```