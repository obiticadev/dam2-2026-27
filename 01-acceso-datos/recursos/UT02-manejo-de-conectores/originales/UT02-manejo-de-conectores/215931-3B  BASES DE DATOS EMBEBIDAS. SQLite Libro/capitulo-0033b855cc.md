Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215931&chapterid=36228

### 1. Introducción

#### 1.4. Sintaxis SQL de SQLite

**Case Sensitivity**

Sqlite es case insensitive, sin embargo , algunos de los parámetros son diferentes en mayúscula y minúscula

**Comentarios:**

Se pueden usar comodines  -- sirve para comentarios de una linea y /\* y \*/ para comentarios multilínea

Sentencias SQLite  
  
Todas las sentencias SQLite comienzan con cualquiera de las palabras reservadas: SELECT, INSERT, UPDATE, DELETE, ALTER, DROP, etc., y todas las sentencias terminan con un punto y coma (;).

**Tipos de datos**

SQLite admite varios tipos de datos que puedes usar para definir las columnas en las tablas de la base de datos. Aquí tienes una lista de algunos de los tipos de datos más comunes admitidos por SQLite:

1. **INTEGER:** Para almacenar valores enteros. Puede ser `INT`, `INTEGER`, `TINYINT`, `SMALLINT`, `MEDIUMINT`, `BIGINT`, entre otros.
2. **REAL:** Para almacenar valores numéricos de punto flotante.
3. **TEXT:** Para almacenar texto. Puede contener cadenas de caracteres de longitud variable.
4. **BLOB:** Para almacenar datos binarios, como archivos (imágenes, archivos de audio, etc.).
5. **NUMERIC:** Puede almacenar valores enteros o de punto flotante. Se utiliza como un tipo de datos genérico para valores numéricos.

  
SQLite no tiene una clase de almacenamiento booleana separada. En cambio, los valores booleanos se almacenan como enteros 0 (falso) y 1 (verdadero).

SQLite no tiene una clase de almacenamiento reservada para almacenar fechas y / u horas. En cambio, las funciones de fecha y hora integradas de SQLite son capaces de almacenar fechas y horas como valores TEXT, REAL o INTEGER:

**Transacciones**La base de datos funciona en modo autocommit, es decir que cada instrucción de inserción, borrado de lineas o actualización de valores en uno o varias columnas, produce un commit automático.  
Para trabajar con transacciones es necesario   

1. iniciar la transacción,
2. escribir a continuación las instrucciones que forman parte de la transacción
3. terminar la transacción validando los cambios (COMMIT) o deshaciéndolos hasta el principio de la transaccion (ROLLBACK)

Sintaxis asociada:





- inicio de transaccion

BEGIN [DEFERRED|INMEDIATE|EXCLUSIVE] [TRANSACTION]

```
sentencias
```

```
...
```

```
* validacion de la transaccion
```

{COMMIT|END} Statement;

```
```
SQLite ROLLBACK StatementROLLBACK;
```
```

##### ``` - deshacer cambios asociados a la transacción ```

```
```
ROLLBACK [TRANSACTION  TO [SAVEPOINT] punto_salvaguarda
```
```

```
* Establecer un punto de salvaguarda (punto de retorno)
```

```
```
SAVEPOINT punto_salvaguarda
```
```

#####