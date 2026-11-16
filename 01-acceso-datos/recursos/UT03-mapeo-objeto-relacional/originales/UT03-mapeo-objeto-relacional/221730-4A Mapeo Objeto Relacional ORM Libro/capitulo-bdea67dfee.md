Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36553

### 8. Mapeo de relaciones

#### 8.2. Relaciones uno a uno bidireccionales

Esta lección es muy similar a la anterior , pero en éste caso la relación entre las clases `Profesor`y `Direccion` va a ser bidireccional.

El código fuente de la clase `Profesor` queda de la siguiente forma:

```
 1: import java.io.Serializable;
 2: import javax.persistence.*;
 3:
 4:
 5: @Entity
 6: @Table(name="Profesor")
 7: public class Profesor implements Serializable  {
 8:
 9:     @Id
10:     @Column(name="Id")
11:     private int id;
12:
13:     @Column(name="nombre")
14:     private String nombre;
15:
16:     @Column(name="ape1")
17:     private String ape1;
18:
19:     @Column(name="ape2")
20:     private String ape2;
21:
22:     @OneToOne(cascade=CascadeType.ALL)
23:     @PrimaryKeyJoinColumn
24:     private Direccion direccion;
25: }
```

Clase Profesor anotada

la "columna que hace la relación entre tablas" es la **columna `Id` de la tabla `Profesor`**, que hace doble función: clave primaria de `Profesor` y clave foránea hacia `Direccion`.

A la propiedad `direccion` (línea 24) se han añadido dos anotaciones para indicar la relación *uno a uno* y que esta relación se implementa mediante la clave primaria.

* **@OneToOne(cascade=CascadeType.ALL)**: Esta anotación indica la relación *uno a uno* de las 2 tablas. También indicamos el valor de `cascade` al igual que en el fichero de hibernate.
* **@PrimaryKeyJoinColumn**: Indicamos que la relación entre las dos tablas se realiza mediante la clave primaria.

En caso de no incluir la anotación `@PrimaryKeyJoinColumn` se producirá un error indicando que falta la columna `direccion_Id` en la tabla `Profesor`.

Notar que si utilizamos anotaciones es necesario usar `@PrimaryKeyJoinColumn` mientras que usando el fichero `.hbm.xml` no es necesario indicarlo.

Más información sobre el atributo `cascade` en [Cascade](http://cursohibernate.es/doku.php?id=unidades:03_relaciones:06_cascade "unidades:03_relaciones:06_cascade")

El código de `Direccion` es similar al anterior.

```
 1: import java.io.Serializable;
 2: import javax.persistence.Column;
 3: import javax.persistence.Entity;
 4: import javax.persistence.Id;
 5: import javax.persistence.Table;
 6:
 7:
 8: @Entity
 9: @Table(name="Direccion")
10: public class Direccion implements Serializable  {
11:
12:     @Id
13:     @Column(name="Id")
14:     private int id;
15:
16:     @Column(name="calle")
17:     private String calle;
18:
19:     @Column(name="numero")
20:     private int numero;
21:
22:     @Column(name="poblacion")
23:     private String poblacion;
24:
25:     @Column(name="provincia")
26:     private String provincia;
27:
28:     @OneToOne(cascade=CascadeType.ALL)
29:     @PrimaryKeyJoinColumn
30:     private Profesor profesor;
31: }
```

Clase Direccion anotada

Como en el caso anterior vemos cómo debemos incluir los tags `@OneToOne` y `@PrimaryKeyJoinColumn` (Líneas 22 y 23) para establecer la relación entre `Direccion` y `Profesor`.

# Código Java

Ahora que ya tenemos preparadas las clase Java para que puedan persistirse veamos el código necesario para persistirlas.

```
 1: Direccion direccion1=new Direccion(3, "Calle de la sarten", 23, "Manises", "Valencia");
 2: Profesor profesor1=new Profesor(3, "Sergio", "Mateo", "Ramis");
 3: profesor1.setDireccion(direccion1);
 4: direccion1.setProfesor(profesor1);
 5:
 6: Direccion direccion2=new Direccion(4, "Calle Luis lamarca", 45, "Torrente", "Valencia");
 7: Profesor profesor2=new Profesor(4, "Paco", "Moreno", "Díaz");
 8: profesor2.setDireccion(direccion2);
 9: direccion2.setProfesor(profesor2);
10:
11:
12: Session session=sessionFactory.openSession();
13: session.beginTransaction();
14:
15: session.save(profesor1);
16: session.save(direccion2);
17:
18: session.getTransaction().commit();
19: session.close();
```

Persistiendo la clase Profesor

El ejemplo incluye dos casos:

* Crear un objeto `direccion1` y otro `profesor1` (líneas 1 y 2), crear las relaciones (líneas 3 y 4) y finalmente en la línea 16 guardar el objeto `profesor1`.
* Crear un objeto `direccion2` y otro `profesor2` (líneas 6 y 7), crear las relaciones (líneas 8 y 9) y finalmente en la línea 17 guardar el objeto `direccion2`.

En ambos casos el resultado aparente es el mismo , se guarda tanto el objeto `Direccion`como el objeto `Profesor` al ser la relación bidireccional aunque realmente los 2 casos **no** son iguales; veamos ahora el porqué.

En el primer caso, si persistimos un objeto `Profesor` se inserta directamente dicho objeto en la base de datos por lo que **no** puede existir ya la fila pero sí que se permite que la `Direccion` ya exista, actualizándose en dicho caso. Pero en el segundo caso si persistimos el objeto `Direccion` lo que ocurre es lo contrario, no podrá existir la fila de la dirección pero sí podrá existir la fila del `Profesor`.