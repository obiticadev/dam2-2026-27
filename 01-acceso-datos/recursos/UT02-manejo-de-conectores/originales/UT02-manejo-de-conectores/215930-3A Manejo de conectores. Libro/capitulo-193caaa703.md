Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36207

### 11. Ejecución de procedimientos almacenados en la base de datos de MySQL.

##### Realizar estos pasos como **Ejercicio**

A continuación, vamos a realizar un procedimiento almacenado en MySQL, que simplemente insertará datos en la tabla clientes. Desde el programa Java que realizamos, llamaremos para ejecutar a ese procedimiento almacenado. Por tanto, ¿cuál sería la secuencia que seguiríamos para realizar esto?

* Si no tenemos creada la tabla de clientes, la creamos. Por simplicidad, en este ejemplo, trabajamos sobre la base de datos que viene por defecto en MySQL, el esquema denominado: test. Para crear la tabla de clientes, el script correspondiente es: 

  [Crear tabla en MySQL.](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290986/mod_book/chapter/36207/AD03_CONT_R28_CrearTabla.txt "Descargar código para crear tabla en MySQL. [.txt - 1 KB]")  (1 KB)
* Creamos el procedimiento almacenado en la base de datos. Sería tan fácil como lo que ves en el siguiente enlace: 

  [DDL rutina insertar cliente.](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290986/mod_book/chapter/36207/AD03_CONT_R28_01_RutinainsertarCliente.txt "Descargar rutina insertar cliente. [txt - 1 KB]")  (1 KB)
* Crear la clase Java para desde aquí, llamar al procedimiento almacenado: 

  <https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290986/mod_book/chapter/36207/inserConProcAlma.java>

Si hemos definido la tabla correctamente, con su clave primaria, y ejecutamos el programa, intentando insertar una fila igual que otra insertada, o sea, con la misma clave primaria, obtendremos un mensaje al capturar la excepción de este tipo:

```
SQL Exception: 
```

```
com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException: 
```

```
Duplicate entry '765' for key 'PRIMARY'
```

**Recomendación**

Enlace a la [documentación de MySQL](http://www.mysqltutorial.org/getting-started-with-mysql-stored-procedures.aspx) donde se explica como se crean los procedimientos y las funciones   
y cómo se ejecutan desde línea de comando. **Para saber más**