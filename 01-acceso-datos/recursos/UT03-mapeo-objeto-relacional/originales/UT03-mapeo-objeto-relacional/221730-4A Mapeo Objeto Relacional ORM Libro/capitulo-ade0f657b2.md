Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36538

### 9. Trabajando con objetos

#### 9.2. Excepciones

LazyInitializationException

Veamos ahora un típico error que se puede dar en Hibernate, la excepción [org.hibernate.LazyInitializationException](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/LazyInitializationException.html). Esta excepción se produce cuando se intenta cargar un objeto en memoria pero la sesión ya se ha cerrado.

En la anterior sesión hablamos del [Lazy Loading](http://cursohibernate.es/doku.php?id=unidades:05_hibernate_query_language:05_optimizacion#solucion_con_lazy_loading) ( o carga perezosa). Vimos que puede ser muy útil para no cargar excesivos objetos en memoria.

Supongamos el siguiente código:

1: Session session = sessionFactory.openSession();  
2:  
3: Profesor profesor = (Profesor) session.get(Profesor.class, 1065);  
4: System.out.println("Leido el profesor");  
5: System.out.println("Calle="+profesor.getDireccion().getMunicipio().getNombre());  
6:  
7: session.close();

* En la línea 3 se lee el objeto profesor desde la base de datos
* La línea 4 muestra el mensaje el objeto profesor ha sido leído
* En la línea 5 se muestra el nombre del municipio donde vive el profesor.

Aparentemente tras la línea 3 ya no se deberían hacer accesos a la base de datos ya que ya hemos hecho el [Session.get(Class clazz,Serializable id)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#get(java.lang.Class,%20java.io.Serializable)) para cargar el  profesor.Sin embargo la salida por consola es la siguiente:

```
Hibernate: select profesor0_.Id as Id3_1_, profesor0_.nombre as nombre3_1_, profesor0_.ape1 as ape3_3_1_, profesor0_.ape2 as ape4_3_1_, direccion1_.Id as Id1_0_, direccion1_.calle as calle1_0_, direccion1_.numero as numero1_0_, direccion1_.idMunicipio as idMunici4_1_0_, direccion1_.provincia as provincia1_0_ from 
Profesor profesor0_ left outer join Direccion direccion1_ on profesor0_.Id=direccion1_.Id where profesor0_.Id=?
Leido el profesor
Hibernate: select municipio0_.idMunicipio as idMunici1_2_0_, municipio0_.codProvincia as codProvi2_2_0_, municipio0_.codMunicipio as codMunic3_2_0_, municipio0_.NombreMunicipio as NombreMu4_2_0_ from Municipios municipio0_ where municipio0_.idMunicipio=?
Municipio=Llaurí
```

Tras leer el profesor para acceder a los datos de Municipio se realiza otra SELECT contra la base de datos.Si cambiamos el código de la siguiente manera:

```
1: Session session = sessionFactory.openSession();
2:
3: Profesor profesor = (Profesor) session.get(Profesor.class, 1065);
4: System.out.println("Leido el profesor");
5:
6: session.close();
7:
8: System.out.println("Municipio="+profesor.getDireccion().getMunicipio().getNombre());
```

hemos modificado que el objeto profesor pase del estado Persistido al estado Despegado ya que hemos cerrado la sesión en la línea 6. Si ejecutamos el código se producirá la siguiente excepción en la línea 8:

```
Exception in thread "main" org.hibernate.LazyInitializationException: could not initialize proxy - no Session
```

NonUniqueObjectException

Veamos ahora otro típico error que se puede dar en Hibernate, la excepción 

[org.hibernate.NonUniqueObjectException](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/NonUniqueObjectException.html). Esta excepción se produce cuando se intenta que haya más de un objeto en estado Persistido para la misma fila de la base de datos.

Veamos el siguiente código:

```
 1: Session session = sessionFactory.openSession();
 2: session.beginTransaction();
 3:
 4: Profesor profesor = new Profesor(1001, "LLUIS", "GOMIS", "MARTINEZ");
 5: Profesor profesor2 = (Profesor) session.get(Profesor.class, 1001);
 6:
 7: profesor.setNombre("JUAN");
 8: session.update(profesor);
 9:
10: session.getTransaction().commit();
11: session.close();
```

En la línea 4 se crea el objeto  profesor con el Id=1001, pero en la línea 5 se crea otro objeto a partir de la base de datos con el mismo  Id=1001. Cuando en la línea 8 intentamos actualizar el objeto se produce la excepción:

```
Exception in thread "main" org.hibernate.NonUniqueObjectException: a different object with the same identifier value was already associated with the session: [ejemplo01.Profesor#1001]
```

¿Cuál ha sido el problema? Volvamos a explicar lo que ha ocurrido usando los estados.

* En la línea 4 se crea el objeto profesor con el estado Transitorio, es decir que Hibernate no sabe nada de él.
* En la línea 5 se crea mediante el método  [get(Class clazz,Serializable id)](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#get(java.lang.Class,%20java.io.Serializable)) el objeto 

  profesor2 con el estado Persistido e Hibernate sí que sabe de este objeto.

¿Qué ocurre en la línea 8? Que mediante el método update queremos persistir el objeto profesor pero Hibernate sabe que el autentico objeto de la clase Profesor con Id=1001 es el objeto profesor2, así que se lanza la excepción  [NonUniqueObjectException](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/NonUniqueObjectException.html) porque hay más de un objeto con  Id=1001 e Hibernate no sabe cómo tratar 2 objetos referidos a la misma fila ya que podrían tener distintos valores y quedar el estado de la fila  Id=1001 en un estado erróneo.