Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221732&chapterid=36561

### 2. Consultas por criterios

* Hibernate tiene el objeto [`Query`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html) que nos da acceso a todas las funcionalidades para poder leer objetos desde la base de datos. Veamos ahora un sencillo ejemplo de cómo funciona y posteriormente explicaremos más funcionalidades de la clase [`Query`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html).

```
1: Query query = session.createQuery("SELECT p FROM Profesor p");
2: List<Profesor> profesores = query.list();
3: for (Profesor profesor : profesores) {
4:     System.out.println(profesor.toString());
5: }
```

Lanzar una consulta con Hibernate es bastante simple. Usando la `session` llamamos al método `createQuery(String queryString)` con la consulta en formato HQL y nos retorna un objeto `Query` (Línea 1). Después, sobre el objeto `Query` llamamos al método `list()` que nos retorna una lista de los objetos que ha retornado (Línea 2).

Por último en las líneas de la 4 a la 6 podemos ver cómo usar la lista de objetos `Profesor` aunque este código ya es simplemente el uso de la clase `java.util.List` que no tiene nada que ver con Hibernate.

**Modelo**

En los ejemplos que vamos a realizar van a usarse las siguientes clases Java y tablas, que solo mostraremos en formato UML. No vamos a poner el código fuente ni los ficheros de hibernate de mapeo ya que no todas la características que usan han sido explicadas en lecciones anteriores.

El modelo de clases Java es el siguiente:

### 

[![PlantUML Graph](http://cursohibernate.es/lib/plugins/plantuml/img.php?width=0&height=0&title=PlantUML%20Graph&align=&version=2011-07-16&md5=e542bd1307d761deebcc1ac2c6cfcbff "PlantUML Graph")](http://cursohibernate.es/lib/plugins/plantuml/img.php?width=0&height=0&title=PlantUML%20Graph&align=&version=2011-07-16&md5=e542bd1307d761deebcc1ac2c6cfcbff "PlantUML Graph")

### 

El modelo de tablas es el siguiente:

[![PlantUML Graph](http://cursohibernate.es/lib/plugins/plantuml/img.php?width=0&height=0&title=PlantUML%20Graph&align=&version=2011-07-16&md5=fe80cbe0c98fc98badb4ba85abbc412c "PlantUML Graph")](http://cursohibernate.es/lib/plugins/plantuml/img.php?width=0&height=0&title=PlantUML%20Graph&align=&version=2011-07-16&md5=fe80cbe0c98fc98badb4ba85abbc412c "PlantUML Graph")

### **Query**

Pasemos ahora a ver las funcionalidades de la clase`Query`

#### ****List()****

* Lista de Objetos  
  El método [`list()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#list()) nos retorna una lista con todos los objetos que ha retornado la consulta. En caso de que no se encuentre ningún resultado se retornará una lista sin ningún elemento.

```
1: Query query = session.createQuery("SELECT p FROM Profesor p");
2: List<Profesor> profesores = query.list();
3: for (Profesor profesor : profesores) {
4:     System.out.println(profesor.toString());
5: }
```

* Lista de Array de Objetos:Las consultas pueden devolver datos escalares en vez de clases completas.  
  ej: SELECT p.id,p.nombre FROM Profesor p  
  En la consulta podemos ver cómo en vez de retornar un objeto `Profesor` se retorna únicamente el código del profesor y su nombre.  
  En estos casos el método [`list()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#list()) retorna una lista con una Array de objetos con tantos elementos como propiedades hayamos puesto en la `SELECT`.  
  Veamos ahora un ejemplo.

```
1: Query query = session.createQuery("SELECT p.id,p.nombre FROM Profesor p");
2: List<Object[]> listDatos = query.list();
3: for (Object[] datos : listDatos) {
4:     System.out.println(datos[0] + "--" + datos[1]);
5: }
```

En la línea 1 vemos cómo se crea el objeto [`Query`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html) con la consulta de datos escalares.

En la línea 2 se ve que el método [`list()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#list()) retorna una lista de array de Objetos.Es decir 'List<Object[]>'.

En la línea 4 se inicia el bucle para recorrer cada una de las filas de datos escalares.

En la línea 5 finalmente se accede a los 2 datos de cada fila mediante `datos[0]` y `datos[1]`.

#### 

* Lista de Objeto

Hay otro caso cuando hay una única columna en el `SELECT` de datos escalares. Es ese caso, como el array a retornar dentro de la lista solo tendría un elemento , no se retorna una lista de arrays `List<Object[]>` sino únicamente una lista de elementos `List<Object>`.

Si modificamos la anterior consulta de forma que sólo se retorne el nombre, el código quedará de la siguiente forma:

```
1: Query query = session.createQuery("SELECT p.nombre FROM Profesor p");
2: List<Object> listDatos = query.list();
3: for (Object datos : listDatos) {
4:     System.out.println(datos);
5: }
```

En la línea 1 ahora la consulta sólo tiene un único dato escalar.

En la línea 2 el método [`list()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#list()) ya no retorna un `List<Object[]` sino un `List<Object>`.

En la línea 4 se inicia el bucle para recorrer cada una de las filas de datos escalares pero ahora el tipo es `Object`en vez de `Object[]`.

En la línea 5 finalmente se accede al dato sin el índice del array ya que ha dejado de serlo.

### 

#### **uniqueResult()**

En muchas ocasiones una consulta únicamente retornará cero o un resultado. En ese caso es poco práctico que nos retorne una lista con un único elemento. Para facilitarnos dicha tarea Hibernate dispone del método [`uniqueResult()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#uniqueResult()).

Este método retornará directamente el único objeto que ha obtenido la consulta. En caso de que no encuentre ninguno se retornará `null`.

```
1: Profesor profesor = (Profesor) session.createQuery("SELECT p FROM Profesor p WHERE id=1001").uniqueResult();
2: System.out.println("Profesor con Id 1001=" + profesor.getNombre());
```

Vemos cómo, gracias al método [`uniqueResult()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#uniqueResult()) , se simplifica el código aunque siempre se debe comprobar si ha retornado o no `null`.

Al igual que ocurre con [`list()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#list()) el método [`uniqueResult()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#uniqueResult()) puede retornar tanto un objeto de una entidad , un array de objetos escalares `Object[]` o un único objeto escalar `Object`.

Si el método [`uniqueResult()`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#uniqueResult()) retorna más de un resultado se producirá la excepción:

```
org.hibernate.NonUniqueResultException: query did not return a unique result
```

#### **Paginación**

La paginación es parte fundamental de cualquier aplicación ya que una consulta puede tener miles de resultados y no queremos mostrarlos todos a la vez.

Para conseguir paginar el resultado de una consulta la clase [`Query`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html) dispone de los siguientes métodos:

* [`setMaxResults(int maxResults)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#setMaxResults(int)): Establece el nº máximo de objetos que van a retornarse.
* [`setFirstResult(int firstResult)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html#setFirstResult(int)): Establece el primer de los objetos que se van a retornar.

Al realizar la paginación son necesarios al menos 2 valores:

* El tamaño de la página
* El nº de la página a mostrar

Con esos 2 valores hemos creado el siguiente código Java que muestra una única página en función del `tamanyoPagina` y `paginaAMostrar`.

```
 1: int tamanyoPagina = 10;
 2: int paginaAMostrar = 7;
 3:
 4: Query query = session.createQuery("SELECT p FROM Profesor p Order By p.id");
 5: query.setMaxResults(tamanyoPagina);
 6: query.setFirstResult(paginaAMostrar * tamanyoPagina);
 7: List<Profesor> profesores = query.list();
 8:
 9: for (Profesor profesor : profesores) {
10:     System.out.println(profesor.toString());
11: }
```

Las líneas 1 y 2 establecen los valores necesarios para poder mostrar la página, que son el tamaño de la página y el nº de la página a mostrar.

En la línea 4 se crea la `Query`.

En la línea 5 se llama al método `setMaxResults(int maxResults)` para indicar que sólo se retornen como máximo tantos objetos como tamaño tiene la página.

En la línea 6 se llama al método `setFirstResult(int firstResult)` para indicarle cuál es el primer objeto a retornar. Este valor coincidirá con el primer objeto de la página que se quiere mostrar. Para calcular dicho valor se multiplica el nº de la página a mostrar por el tamaño de página. Para que esta formula funcione el número de página debe empezar por 0,es decir,que la primera página deberá ser la nº 0, la segunda la nº 1, y así sucesivamente.

Por fín, en la línea 7 se obtienen únicamente los resultados de la página solicitada.

Por último en las líneas 9,10 y 11 se muestran los datos.

El mayor problema que tiene la paginación es determinar el nº de páginas para poder mostrárselo al usuario, para saber el nº de páginas es necesario conocer el nº de objetos que retorna la consulta y la forma mas rápida y sencilla es mediante una consulta que las cuente.

El siguiente código Java calcula el nº de páginas de la consulta.

```
1: long numTotalObjetos = (Long) session.createQuery("SELECT count(*) FROM Profesor p").uniqueResult();
2: int numPaginas =(int) Math.ceil((double)numTotalObjetos / (double)tamanyoPagina);
```

En la línea 1 realizamos la consulta de `count(*^)` para obtener el nº de objetos que retorna la consulta

En la línea 2 de divide el nº total de objetos entre el tamaño de la página obteniéndose el nº total de páginas.

Al hacer la división para calcular el nº de páginas es necesario hacer el cast de los 2 valores a `double` ya que si no Java automáticamente redondea el resultado a un valor entero con lo que el valor que se le pasa a `ceil` ya no será el correcto.

#### **Consultas con nombre**

En cualquier libro sobre arquitectura del software siempre se indica que las consultas a la base de datos no deberían escribirse directamente en el código sino que deberían estar en un fichero externo para que puedan modificarse fácilmente.

Hibernate provee una funcionalidad para hacer ésto mismo de una forma sencilla. En cualquier fichero de mapeo de Hibernate se puede incluir el anotaciones @NamedQuery and @NamedQueries Annotations con las consultas HQL que deseamos lanzar.

En el siguiente ejemplo  se ha definido una query nombrada para la clase Profesor:

```
@NamedQuery(name="Profesores.findAll", query="SELECT p FROM Profesor p")
```

La anotación @NamedQuery contiene cuatro parametros, dos de los cuales son obligatorios y dos opcionales. Los dos parametros requeridos, *name*y *query*definen el nombre de la consulta y la propia cadena de consulta y se muestran arriba. Los dos elementos opcionales, *lockMode* y *hints*, proporcionan un reemplazo estático para los métodos **setLockMode** y **setHint**.

La entidad Profesor quedaría:

```
@Entity
@NamedQuery(name="Profesores.findAll", query="SELECT p FROM Profesor p") 
public class Profesor {
  ...
}
```

Para añadir varias consultas nombradas , tiene que haber una consulta nombrada por cada una de ellas y estas dentro de una anotación envoltorio [@NamedQueries](https://www.objectdb.com/api/java/jpa/NamedQueries)

```
@Entity
@NamedQueries({
```

```
@NamedQuery(name="Profesores.findAll", query="SELECT p FROM Profesor p") 
@NamedQuery(name="Profesores.ByName", query="SELECT p FROM Profesor p where p.nombre =:nombre and p.ape1=:ape1 and p.ape2=:ape2")
```

```
})
```

```
public class Profesor {
  ...
}
```

Estas anotaciones tienen los siguientes datos:

* `name`:Este atributo define el nombre de la consulta.Es el nombre que posteriormente usaremos desde el código Java para acceder a la consulta.
* `query` es la consulta en formato HQL que ejecutará Hibernate.
* :nombre, :ape1, :ape2 son parametros nombrados, tambien se podrian especificar con parametros posicionales ? como en JDBC:

  ```
  "SELECT p FROM Profesor p where p.nombre =? and p.ape1=? and p.ape2=?"
  ```

**Código Java**

Para hacer uso de una consulta con nombre usaremos el método [`getNamedQuery(String queryString)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/SharedSessionContract.html#getNamedQuery(java.lang.String)) en vez de [`createQuery(String queryString)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/SharedSessionContract.html#createQuery(java.lang.String)) para obtener el objeto [`Query`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Query.html). Por lo tanto sólo se ha modificado la línea 1 y el resto del código queda exactamente igual.

```
1: Query query = session.getNamedQuery("Profesores.findAll");
2: List<Profesor> profesores = query.list();
3: for (Profesor profesor : profesores) {
4:     System.out.println(profesor.toString());
5: }
```

Como podemos ver el uso de consultas con nombre es muy sencillo al usar Hibernate.

```
1: String nombre="ISIDRO";
 2: String ape1="CORTINA";
 3: String ape2="GARCIA";
 4:
 5: Query query = session.getNamedQuery(Profesores.ByName)
 6: query.setString("nombre",nombre);
 7: query.setString("ape1",ape1);
 8: query.setString("ape2",ape2);
 9:
10: List<Profesor> profesores = query.list();
11: for (Profesor profesor : profesores) {
12:     System.out.println(profesor.toString());
13: }
```