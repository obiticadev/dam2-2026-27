Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/pluginfile.php/290986/mod_book/chapter/36203/jdbc-sql-injection.html

**JDBC / Laboratorio visual**Java · Acceso a datos

# Una entrada debe ser un dato. No una instrucción SQL.

Si concatenas una entrada en la consulta de un `Statement`, puede cambiar su significado. Con `PreparedStatement`, los valores enlazados a `?` se tratan como datos.

La salvaguarda es la **parametrización**: usar `?` y métodos como `setString()`.



01 / Comprueba la diferencia

## La misma entrada. Dos consultas.

Buscamos usuarios por su nombre en una tabla ficticia de cuatro filas. Introduce un nombre o carga un ejemplo.

Nombre recibido por la aplicación

Simulación local en JavaScript: no conecta a una base de datos ni ejecuta Java. Los ejemplos se comparan automáticamente; tu propia entrada se compara al pulsar el botón.

ENTRADA CONCATENADA

### Statement

La entrada pasa a formar parte del texto SQL.

Texto SQL construido por la aplicación

Resultado simulado

VALOR PARAMETRIZADO

### PreparedStatement

La estructura SQL y el valor se mantienen separados.

Plantilla SQL fija

```
SELECT id, nombre, rol
FROM usuarios
WHERE nombre = ?
```

**Parámetro 1 · String**

Resultado simulado

### ¿Cómo cambia la consulta `' OR 1=1 --` ?

`'`

**Cierra la cadena.**  
La comilla termina el valor que empezó después de `nombre =`.

`OR 1=1`

**Añade una condición verdadera.**  
Con `OR`, basta con que `1=1` sea verdadero para devolver cada fila.

`--` 

**Comenta el resto.**  
La comilla final añadida por la aplicación queda dentro del comentario.

Ver los cuatro usuarios ficticios

02 / Entiende el mecanismo

## Primero la consulta. Después el dato.

###

El valor puede cambiar. La estructura SQL permanece fija.

03 / Llévalo a Java

## La diferencia está en estas líneas

Concatenación vulnerableLa aplicación construye SQL con la entrada.

```
// con: Connection abierta; entrada: String recibido
String sql = "SELECT id, nombre, rol "
    + "FROM usuarios WHERE nombre = '"
    + entrada + "'";

try (Statement st = con.createStatement();
     ResultSet rs = st.executeQuery(sql)) {
    while (rs.next()) {
        System.out.println(rs.getString("nombre"));
    }
}
```

Consulta parametrizadaEl dato se asigna a un parámetro de tipo String.

```
// con: Connection abierta; entrada: String recibido
String sql = "SELECT id, nombre, rol "
    + "FROM usuarios WHERE nombre = ?";

try (PreparedStatement ps = con.prepareStatement(sql)) {
    ps.setString(1, entrada);
    try (ResultSet rs = ps.executeQuery()) {
        while (rs.next()) {
            System.out.println(rs.getString("nombre"));
        }
    }
}
```

Los fragmentos van dentro de un método que gestione o declare `SQLException`, con `import java.sql.*;`. Los índices empiezan en **1**. El `?` va sin comillas; `executeQuery()` no recibe el texto SQL en el caso preparado. Concatenar dos cadenas constantes, como en el ejemplo seguro, no incorpora entradas externas.

Usar PreparedStatement correctamente

* **El nombre de la interfaz no basta.** Si concatenas la entrada antes de preparar, el problema permanece:

  ```
  // Sigue siendo vulnerable:
  con.prepareStatement(
      "SELECT id, nombre, rol FROM usuarios WHERE nombre = '"
      + entrada + "'");
  ```
* **Los parámetros representan valores.** No sirven para elegir nombres de tablas, columnas ni `ASC / DESC`. Para estas partes dinámicas, selecciona entre opciones fijas permitidas por la aplicación.
* **No es un filtro de palabras.** `setString()` no elimina `OR`, comillas o comentarios: los conserva dentro del dato. El método también admite nombres legítimos con apóstrofos.
* **Statement puede ejecutar SQL fijo.** El riesgo de este ejemplo es concatenar datos externos. La protección mostrada cubre los valores enlazados; no sustituye la autorización ni los permisos mínimos de la base de datos.

**Alcance de la simulación.** El panel vulnerable interpreta solo comparaciones `=` entre cadenas, enteros y columnas de esta tabla, combinadas con `AND`, `OR`, paréntesis y comentarios `--` o `/* … */`. Respeta la precedencia de `AND` sobre `OR`. Usa cadenas con comillas simples y escape `''`, como SQLite; los detalles pueden variar según el motor. Una entrada fuera de este subconjunto se marca como error o no compatible, sin inventar un resultado. El panel preparado simula la igualdad exacta del nombre con el parámetro.

**Referencia oficial:**

[Oracle · Prepared Statements](https://docs.oracle.com/javase/tutorial/jdbc/basics/prepared.html)[Java · API PreparedStatement](https://docs.oracle.com/en/java/javase/25/docs/api/java.sql/java/sql/PreparedStatement.html)[OWASP · Prevención de inyección SQL](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)

HTML + CSS + JavaScript · Sin dependencias · Funciona sin conexión


Activa JavaScript para ver las consultas y sus resultados. Los ejemplos Java y la explicación siguen disponibles.