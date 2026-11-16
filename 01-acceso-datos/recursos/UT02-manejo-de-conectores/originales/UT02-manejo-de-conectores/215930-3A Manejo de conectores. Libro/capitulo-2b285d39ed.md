Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36223

### 12. Transacciones

La propiedad Autocommit que se crea en la conexión esta definida por defecto a TRUE.

 El control de la **transacción** es realizado por el objeto de la **conexión**. Cuando se crea una conexión, por **defecto esta en el modo activado**. Esto significa que cada operación DML (`INSERT, UPDATE, DELETE` ) **es tratada como transacción** por sí misma que se valida **automáticamente** en cuanto se ejecute.

A veces **necesitamos agrupar varias sentencias SQL en una única transacción**, para ello:

1. modificamos el autocommit antes de ejecutar las consultas que deban estar en la misma transacccion:  `conexion.setAutoCommit(false)`
2. ejecutamos las sentencias
3. finalizaremos de forma manual la transacción. `conexion.Commit.`

**Ejemplo:**

El siguiente programa actualiza la tabla *COFFEES* con los datos de las ventas que se envían al programa como un objeto de tipo **HashMap** (colección que almacena datos asociando una clave a un valor ), **las actualizaciones se tratan como una única transacción** de forma que si se ha podido completar todas las actualizaciones, se validan y en caso de que falle alguna, el gestor de errores deshace los cambios (  `con.rollback()`).

Ejemplo de un `HashMap<String, Integer>`. 

| clave (String) | valor (Integer) |
| --- | --- |
| "Colombian" | 50 |
| "French\_Roast" | 30 |
| "Espresso" | 100 |

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

```
public void updateCoffeeSales(HashMap<String, Integer> salesForWeek)
    throws SQLException {

    PreparedStatement updateSales = null;
    PreparedStatement updateTotal = null;

    String updateString =
        "update " +  "COFFEES " +
        "set SALES = ? where COF_NAME = ?";

    String updateStatement =
        "update " +  "COFFEES " +
        "set TOTAL = TOTAL + ? " +
        "where COF_NAME = ?";

    try {
        con.setAutoCommit(false);
        updateSales = con.prepareStatement(updateString);
        updateTotal = con.prepareStatement(updateStatement);

        for (Map.Entry<String, Integer> e : salesForWeek.entrySet()) {
            updateSales.setInt(1, e.getValue().intValue());
            updateSales.setString(2, e.getKey());
            updateSales.executeUpdate();
            updateTotal.setInt(1, e.getValue().intValue());
            updateTotal.setString(2, e.getKey());
            updateTotal.executeUpdate();
        }
```

```
        con.commit();  

    } catch (SQLException e ) {
        JDBCTutorialUtilities.printSQLException(e);
        if (con != null) {
            try {
                System.err.print("Transaction is being rolled back");
                con.rollback();
            } catch(SQLException excep) {
                JDBCTutorialUtilities.printSQLException(excep);
            }
        }
```

```
    } finally {
        if (updateSales != null) {
            updateSales.close();
        }
        if (updateTotal != null) {
            updateTotal.close();
        }
        con.setAutoCommit(true);
    }
}  
  
________
```

```
for ( Map.Entry<String, Integer>  e  :  salesForWeek.entrySet() ) {
      └────── tipo de cada elemento ──┘  └ variable ┘  └──── colección a recorrer ────┘
```

Esto se llama **for-each** (o "for mejorado"). Se lee así:

> *"Para cada elemento `e` de tipo `Map.Entry<String,Integer>` dentro de `salesForWeek.entrySet()`, ejecuta el cuerpo."*

Pista: [Recuperar datos de un Map](https://www.mkyong.com/java/java-how-to-get-keys-and-values-from-map/)

**Haz el [Ejercicio 5 - Transacciones JDBC](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/page/view.php?id=218716 "Ejercicio 5 - Transacciones JDBC")**