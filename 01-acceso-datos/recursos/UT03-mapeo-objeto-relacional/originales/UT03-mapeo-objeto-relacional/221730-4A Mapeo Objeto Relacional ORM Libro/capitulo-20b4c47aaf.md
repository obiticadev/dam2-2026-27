Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36551

### 8. Mapeo de relaciones

#### 8.6. Cascade

**Introducción.**

**Hibernate**traduce las modificaciones de los objetos a sentencias DML de base de datos.  

La anotación **cascade**se utiliza en JPA (Java Persistence API) para especificar operaciones en cascada que deben propagarse desde la entidad propietaria hacia las entidades asociadas. La anotación cascade se aplica generalmente a las relaciones entre entidades (como relaciones @OneToOne, @OneToMany, @ManyToOne, @ManyToMany). La anotación cascade se puede usar en combinación con otras anotaciones, y su propósito es controlar cómo se gestionan las operaciones de persistencia, actualización y eliminación en las entidades asociadas.

Aquí hay algunas de las anotaciones comunes que se utilizan con el parámetro cascade:

```
@OneToOne(cascade = CascadeType.ALL)
```

```
@OneToMany(cascade = CascadeType.ALL)
```

```
@OneToMany(cascade = CascadeType.ALL)
```

```
@ManyToMany(cascade = CascadeType.ALL)
```

```
@ManyToOne(cascade = CascadeType.ALL)
```

  

Veamos ahora cada uno de los posibles valores del atributo `cascade` para Hibernate

| Valor | Descripción |
| --- | --- |
| `none` | No se realiza ninguna acción en los objetos relacionados al hacerlo sobre el principal |
| `save-update` | Si se inserta o actualiza el objeto principal también se realizará la inserción o actualización en los objetos relacionados. |
| `delete` | Si se borra el objeto principal también se realizará el borrado en los objetos relacionados. |
| `evict` | Si se llama al método [`Session.evict(Object objeto)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#evict(java.lang.Object)) para el objeto principal también se llamará para los objetos relacionados. |
| `lock` | Si se llama al método [`LockRequest.lock(Object objeto)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.LockRequest.html#lock(java.lang.Object)) [10)](http://cursohibernate.es/doku.php?id=unidades:03_relaciones:06_cascade#fn__10) para el objeto principal también se llamará para los objetos relacionados. |
| `merge` | Si se llama al método [`Session.merge(Object objeto)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#merge(java.lang.Object)) con el objeto principal también se llamará para los objetos relacionados. |
| `refresh` | Si se llama al método [`Session.refresh(Object objeto)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#refresh(java.lang.Object)) para el objeto principal también se llamará para los objetos relacionados. |
| `replicate` | Si se llama al método [`Session.replicate(Object objeto,ReplicationMode replicationMode)`](http://docs.jboss.org/hibernate/core/4.1/javadocs/org/hibernate/Session.html#replicate(java.lang.Object,%20org.hibernate.ReplicationMode)) para el objeto principal también se llamará para los objetos relacionados. |
| `all` | Si se realiza cualquiera de las **anteriores** acciones sobre el objeto principal también se realizará sobre los objetos relacionados. |
| `delete-orphan` | Este atributo sólo se usa si el objeto relacionado es una colección. Indica que si en la colección del objeto principal eliminamos un elemento , al persistir el objeto principal deberemos borrar de la base de datos el elemento de la colección que habíamos eliminado. |
| `all-delete-orphan` | Es la unión de los atributos `all` y `delete-orphan` [11)](http://cursohibernate.es/doku.php?id=unidades:03_relaciones:06_cascade#fn__11) |

De todos los valores los realmente importantes, ya que incluyen la funcionalidad de trabajar con los objetos relacionados, son los 4 siguientes:

* `none`
* `save-update`
* `delete`
* `delete-orphan`

Los siguientes 5 valores generalmente querremos incluirlos ya que *no son peligrosos si los inclumos* aunque al hacerlo se podrían lanzar más SQL contra la base
de datos:

* `evict`
* `lock`
* `merge`
* `refresh`
* `replicate`

Los siguientes 2 valores son agrupaciones de los 9 anteriores:

* `all`
* `all-delete-orphan`

Así que lo *normal* es que el atributo `cascade` tome alguno de los siguientes valores:

* `none`
* `all`
* `all-delete-orphan`
* `save-update,evict,lock,merge,refresh,replicate`

Las opciones para esta propiedad en Hibernate amplian las de las especificaciones de JPA. Solo Hibernate admite para la propiedad *CascadeType*r las opciones *REPLICATE*y *SAVE\_UPDATE*. Si bien la replicación es útil para algunos escenarios muy específicos (cuando el estado exacto de la entidad se debe reflejar entre dos Fuentes de datos distintas), el combo de persistencia y combinación siempre es una mejor alternativa que la operación nativa saveOrUpdate.

```
Para saber mas de las comparación entre hibernate y JPA en este punto sigue el enlace.
```

**Ejemplos:**

**https://www.mkyong.com/hibernate/hibernate-cascade-example-save-update-delete-and-delete-orphan/**

**http://www.mkyong.com/hibernate/different-between-cascade-and-inverse/**