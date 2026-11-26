# Corrección del examen tipo test · Tema 3: JDBC y SQLite

**25/11/2026 · Nota del Aula Virtual: 5,83 / 10**

🟢 Correcta · 🔴 Respuesta marcada que se considera errónea · ⚪ Sin responder

## Cómo sale la nota

| Resultado | Preguntas | Puntos |
| --- | --- | ---: |
| 🟢 13 aciertos | 2, 3, 4, 7, 9, 10, 11, 14, 15, 16, 17, 19 y 20 | `13 × 0,50 = 6,50` |
| 🔴 4 fallos | 1, 6, 8 y 13 | `4 × (−1/6) ≈ −0,67` |
| ⚪ 3 en blanco | 5, 12 y 18 | `0,00` |
| **Total** | **20** | **5,83 / 10** |

El resumen del intento (20:49–20:52 de la grabación) confirma **17 respuestas guardadas y 3 en blanco**. Cada acierto suma `0,50` y cada fallo resta `0,166667`. Con 17 contestadas, solo **13 aciertos y 4 fallos** reproducen la nota: `13 × 0,50 − 4 × 0,166667 = 5,833332`, que se redondea a `5,83`.

Las letras son las de la grabación, en el orden original. El Aula Virtual no permitió revisar el intento: la nota confirma cuántas respuestas contaron como buenas, y la comparación de las selecciones finales con las soluciones razonadas identifica cuáles encajan con esa nota.

## Preguntas y corrección

### 1. ¿Qué información permite obtener `ResultSetMetaData`?

- 🟢 **a.** Información sobre los datos contenidos en un `ResultSet`. **Correcta.**
- **b.** Información sobre los datos contenidos en un `Statement`.
- 🔴 **c.** Ninguna de las otras respuestas es correcta. **Tu respuesta.**
- **d.** `ResultSetMetaData` no es una interfaz, sino una clase.

**Por qué:** Describe las **columnas** de un resultado: cantidad, etiquetas, tipos, etc. No lee los valores de las filas (eso lo hace `ResultSet`) ni describe la sentencia (b). Sí es una interfaz de `java.sql` (d), así que c tampoco vale.

### 2. ¿Qué devuelve `DatabaseMetaData.getDriverName()`?

- **a.** Todas las demás respuestas son correctas.
- 🟢 **b.** El nombre del controlador JDBC en un `String`. **Tu respuesta, correcta.**
- **c.** El número máximo de conexiones simultáneas a la base de datos.
- **d.** La versión del controlador JDBC en un `String`.

**Por qué:** `getDriverName()` obtiene el nombre. El límite de conexiones se consulta con `getMaxConnections()` (c) y la versión con `getDriverVersion()` (d). Por eso no son todas correctas (a).

### 3. ¿Para qué se usa `PreparedStatement`?

- **a.** Para implementar sentencias SQL simples sin parámetros.
- 🟢 **b.** Para preparar sentencias SQL que pueden contener parámetros de entrada. **Tu respuesta, correcta.**
- **c.** Todas las demás respuestas son correctas.
- **d.** Para ejecutar procedimientos almacenados que pueden contener parámetros de entrada y salida.

**Por qué:** `PreparedStatement` permite preparar SQL, asignar valores a los marcadores `?` y reutilizar la sentencia. También admite SQL sin parámetros, pero eso no lo distingue de `Statement` (a). JDBC dedica `CallableStatement` a las rutinas con parámetros de salida (d), así que c no vale.

### 4. ¿Las sentencias preparadas evitan la inyección SQL?

- **a.** Incorrecto.
- **b.** Ninguna de las demás respuestas es correcta.
- **c.** Las sentencias preparadas no tienen nada que ver con la inyección SQL.
- 🟢 **d.** Correcto. **Tu respuesta, correcta.**

**Por qué:** Los valores vinculados a `?` se tratan como datos y no como sintaxis SQL; la protección existe y es directamente relevante (a y c), así que b tampoco vale. El matiz es que crear un `PreparedStatement` no protege entradas que ya se hayan concatenado en el texto SQL.

### 5. Si no necesitas gestionar transacciones manualmente en Java, ¿qué haces?

**⚪ Sin responder.**

- **a.** Terminas el código con `conexion.commit()`.
- 🟢 **b.** No hay que hacer nada en el código. **Correcta.**
- **c.** Hay que poner `autoCommit` a `false`.
- **d.** Ninguna de las otras respuestas es correcta.

**Por qué:** Una conexión JDBC nueva tiene `autoCommit` activado por defecto. Si se mantiene así, cada sentencia se confirma al completarse y no hace falta un `commit()` explícito (a). Ponerlo a `false` habilita precisamente la gestión manual (c). Por eso d no vale.

### 6. ¿Qué afirmación sobre ODBC y JDBC es falsa?

- **a.** JDBC es un estándar adaptado a las características de Java.
- 🔴 **b.** ODBC puede conectar con distintos gestores, aunque no sean de Microsoft. **Tu respuesta.**
- 🟢 **c.** Con ODBC no hace falta que los desarrolladores de gestores creen controladores de conexión; ese fue su gran avance. **Correcta para lo que pide el examen: es la afirmación falsa.**
- **d.** Ambos ofrecen una interfaz estándar para conectar con distintos gestores.

**Por qué:** El estándar ODBC unifica la interfaz, pero para conectarse sigue haciendo falta un **controlador compatible con el gestor**, suministrado por el fabricante o por un tercero. Un producto ajeno a Microsoft puede tener su propio controlador, por lo que b es verdadera. También son verdaderas a y d. La redacción de c es imprecisa: el fabricante no tiene que escribirlo personalmente si ya existe un controlador de terceros.

### 7. ¿Qué interfaz y qué método de `Connection` se usan para invocar rutinas almacenadas?

- **a.** `PreparedStatement` con `prepareStatement()`.
- 🟢 **b.** `CallableStatement` con `prepareCall()`. **Tu respuesta, correcta.**
- **c.** `DatabaseMetaData` con `getMetaData()`.
- **d.** `Statement` con `createStatement()`.

**Por qué:** `prepareCall()` crea un `CallableStatement`, que permite invocar procedimientos o funciones y registrar parámetros de salida. `prepareStatement()` prepara SQL (a), `getMetaData()` describe el gestor y sus capacidades (c) y `createStatement()` crea una sentencia general (d).

### 8. ¿Cuál es el tipo de controlador JDBC más habitual?

- 🔴 **a.** Tipo 3. **Tu respuesta.**
- **b.** Tipo 1.
- 🟢 **c.** Tipo 4. **Correcta.**
- **d.** Tipo 2.

**Por qué:** El tipo 4 es el habitual: está escrito en Java y habla directamente el protocolo del gestor. El tipo 3 usa un servidor intermediario (a), el tipo 1 es el puente JDBC–ODBC (b) y el tipo 2 depende de bibliotecas nativas (d).

### 9. ¿Qué no dice la URL `jdbc:mysql://localhost:3306/world`?

- **a.** El servidor está en el mismo host que el programa Java.
- 🟢 **b.** La base de datos está levantada para recibir peticiones. **Tu respuesta, correcta.**
- **c.** El nombre de la base de datos.
- **d.** El servidor está en el puerto `3306`.

**Por qué:** La URL indica el **destino**: host local (`localhost`, a), base de datos `world` (c) y puerto `3306` (d). No demuestra que el servidor esté activo ni que responda. Para comprobar eso, hay que intentar conectarse.

### 10. ¿Qué tipo de cursor permite ir en ambos sentidos y es sensible a cambios concurrentes?

- **a.** `ResultSet.TYPE_SCROLL_INSENSITIVE`.
- 🟢 **b.** `ResultSet.TYPE_SCROLL_SENSITIVE`. **Tu respuesta, correcta.**
- **c.** `ResultSet.CONCUR_UPDATABLE`.
- **d.** `ResultSet.TYPE_FORWARD_ONLY`.

**Por qué:** `TYPE_SCROLL_SENSITIVE` permite desplazarse en ambos sentidos y normalmente refleja cambios en los datos subyacentes. «En tiempo real» no es una garantía: la visibilidad depende del controlador, del motor y del aislamiento. El tipo `INSENSITIVE` también es desplazable, pero normalmente no refleja cambios (a). `CONCUR_UPDATABLE` se refiere a actualizar filas (c), y `FORWARD_ONLY` solo avanza (d).

### 11. ¿Cómo funciona un controlador JDBC de tipo 1?

- **a.** Es Java puro y habla directamente el protocolo del gestor.
- **b.** Traduce JDBC a una API nativa sin pasar por ODBC.
- 🟢 **c.** Es un puente JDBC–ODBC: traduce llamadas JDBC a ODBC. **Tu respuesta, correcta.**
- **d.** Es un controlador de red en Java puro que usa un servidor intermediario.

**Por qué:** El tipo 1 delega el acceso en el controlador ODBC. La comunicación directa en Java es del tipo 4 (a), la API nativa corresponde al tipo 2 (b) y el servidor intermediario al tipo 3 (d).

### 12. ¿Es más lenta una sentencia preparada que una no preparada?

**⚪ Sin responder.**

- **a.** Sí, al estar precompilada tarda más en ejecutarse.
- **b.** No, son iguales.
- **c.** Ninguna de las otras respuestas es correcta.
- 🟢 **d.** No, es más rápida. **Respuesta esperada según el temario.**

**Por qué:** Reutilizar la preparación para varias ejecuciones puede reducir el trabajo del motor. El coste inicial de preparar no implica que el conjunto sea más lento (a), ni que ambas alternativas rindan igual (b). Si se leen las comparaciones como afirmaciones absolutas, c también es defendible: para una sola ejecución o con ciertos controladores, no se garantiza que la preparada sea más rápida. Como quedó en blanco, la nota no permite determinar qué clave usaba el Aula Virtual para esta pregunta.

### 13. ¿Cuáles son los paquetes de la API JDBC?

- **a.** Ninguna de las otras respuestas es correcta.
- **b.** `java.sql.*`, `javay.sql.*` y `javax.sql.*`.
- 🟢 **c.** `java.sql.*` y `javax.sql.*`. **Correcta.**
- 🔴 **d.** Solo `java.sql.*`. **Tu respuesta.**

**Por qué:** `java.sql` contiene `Connection`, `Statement` y `ResultSet`, entre otros; `javax.sql` aporta tipos como `DataSource`. La opción d omite el segundo paquete, `javay.sql` no existe en JDBC (b) y sí hay una respuesta completa (a).

### 14. ¿Qué devuelve `executeUpdate()` al insertar una fila sin errores?

La llamada del examen es `executeUpdate("insert into jobs values ('ID TEACH', 'PROFESOR IT', 2500, 5000)")`.

- **a.** `0`.
- 🟢 **b.** `1`. **Tu respuesta, correcta.**
- **c.** No devuelve nada.
- **d.** `"0"`.

**Por qué:** Devuelve un `int` con el número de filas afectadas. Este `INSERT` inserta una fila, no cero (a); el método no es `void` (c) ni devuelve un `String` (d).

### 15. ¿Qué afirmación sobre el cierre de recursos JDBC es falsa?

- **a.** Conviene cerrar `Connection`.
- **b.** Conviene cerrar `CallableStatement`, `Statement`, `PreparedStatement` y `ResultSet` para liberar recursos.
- 🟢 **c.** Dejar abiertos los objetos usados en las consultas no tiene impacto en los recursos del programa. **Tu respuesta, correcta: es la afirmación falsa.**
- **d.** Es recomendable liberar recursos en el bloque `finally` del `try`–`catch`.

**Por qué:** Dejar recursos abiertos puede retener conexiones y cursores, de modo que c es falsa. Se cierra la **instancia** de `Connection` (a), así como las sentencias y resultados que ya no se necesitan (b). `finally` es válido para un cierre manual (d); en código nuevo suele preferirse `try` con recursos.

### 16. ¿Qué significa JDBC?

- **a.** Java Data Binding Contract.
- **b.** Java Bridge for Database Connectivity.
- 🟢 **c.** Java Database Connectivity. **Tu respuesta, correcta.**
- **d.** Joint Database Communication Layer.

**Por qué:** «Java Database Connectivity» es la denominación del temario. *Data binding* no describe esta API (a), el puente es solo una implementación histórica (b) y «Joint Database Communication Layer» no es su nombre (d).

### 17. ¿Qué permite `CONCUR_UPDATABLE` en un `ResultSet`?

- **a.** Modificar columnas de una fila.
- 🟢 **b.** Todas las otras respuestas son correctas. **Tu respuesta, correcta.**
- **c.** Insertar una fila.
- **d.** Borrar una fila.

**Por qué:** Si el controlador y la consulta permiten un resultado actualizable, puedes modificar y aplicar cambios con `updateRow()` (a), insertar con `insertRow()` (c) y borrar con `deleteRow()` (d). Elegir solo una de esas operaciones sería incompleto.

### 18. ¿Cómo es la arquitectura de conexión de la API JDBC?

**⚪ Sin responder.** En la grabación llegaste a seleccionar d, pero quitaste la selección antes del envío.

- **a.** La API es común y el mismo controlador sirve aunque cambie el fabricante.
- **b.** Ninguna de las otras respuestas es correcta.
- **c.** La API es la implementación; el controlador contiene las interfaces que cambian con el fabricante.
- 🟢 **d.** La API ofrece interfaces y métodos comunes; el controlador implementa esas interfaces y puede variar según el gestor. **Correcta.**

**Por qué:** El código Java usa contratos comunes, como `Connection`, y el controlador implementa esos contratos para hablar con el gestor. No se puede dar por hecho que el mismo controlador sirva con otro gestor (a). La opción c invierte los papeles y sí hay una respuesta válida (b).

### 19. ¿Qué tipos de sentencias se pueden ejecutar con JDBC?

- **a.** Consultas.
- **b.** Sentencias DDL.
- 🟢 **c.** Todas las otras respuestas son correctas. **Tu respuesta, correcta.**
- **d.** Sentencias DML.

**Por qué:** JDBC permite ejecutar consultas como `SELECT` (a), DDL como `CREATE TABLE` (b) y DML como `INSERT`, `UPDATE` o `DELETE` (d). Las otras opciones son ciertas, pero nombran solo un tipo.

### 20. ¿Qué base de datos conviene para guardar lecturas climáticas en un dispositivo con pocos recursos e Internet intermitente?

- **a.** Ambas soluciones son adecuadas.
- **b.** Una base de datos cliente-servidor en local.
- **c.** Ninguna solución es adecuada.
- 🟢 **d.** Una base de datos embebida. **Tu respuesta, correcta.**

**Por qué:** Una base embebida como SQLite guarda las lecturas localmente sin un proceso servidor independiente ni conexión a Internet. Un servidor local podría funcionar sin Internet, pero añade consumo y mantenimiento (b), así que las dos alternativas no encajan igual de bien con el caso (a). Sí hay una solución adecuada (c).
