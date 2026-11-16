Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36212

### 9. Ejecucion de sentencias de la base de datos II

#### 9.5. Ejemplo sentencias de creación de tablas y de inserción de filas

**En este ejemplo creamos una tabla alumnos, insertamos tres alumnos**

1. Creamos la clase Alumnos

```
public class Alumno {  
	String dni ;  
	String nombre;  
	String ape1;  
	String ape2;  
	public Alumno() {  
		super();	  
		}  
	public Alumno(String dni, String nombre, String ape1, String ape2) {  
		super();  
		this.dni = dni;  
		this.nombre = nombre;  
		this.ape1 = ape1;  
		this.ape2 = ape2;  
	}  
}
```

2.Programa que crea la tabla e inserta tres alumnos, utilizamos una sentencia(Statement) y una sentencia preparada (PreparedStatement)

```
public class CreaTablaAlumnos {  
	public static void main(String[] args) throw SQLException {  
			// Establecemos la conexion con la BD  
			Connection conexion = DriverManager.getConnection("jdbc:mysql://localhost/ejemplo", "root", "system");  
			// sentencia sql de creacion de la tabla, devuelve un int  
			Statement sentencia = conexion.createStatement();  
			sentencia.executeUpdate("create table alumnos(dni varchar(10), nombre varchar(10),"  
					+ "ape1 varchar(60)," + "ape2 varchar(60))");  
  
                       // instancio un array de objetos de la clase Alumnos  
                       Alumno[] alumnos = { new Alumno("1", "ana", "lopez", "blanco"), new Alumno("2", "pepe", "ruiz", "negro"),  
                       new Alumno("3", "dani", "rey", "blnaco") };  
  
                      //la sentencia preparada inserta una linea en la tabla alumnos  
                       PreparedStatement pst = conexion.prepareStatement("insert into alumnos " + "	values (?,?,?,?)");  
                     //recorro el array de Alumnos para ir asignando valores de dni, nombre etc... a la sentencia preparada  
  
                       for (Alumno al : alumnos) {
				pst.setString(1, al.dni);
				pst.setString(2, al.nombre);
				pst.setString(3, al.ape1);
				pst.setString(4, al.ape2);
				pst.executeUpdate();//inserta una linea
			}
			pst.close();//Cerrar PreparedStatement
			sentencia.close(); // Cerrar Statement
			conexion.close(); // Cerrar conexión
	}
```

```
}
```

```
			
```

```
			
```

```
			
```