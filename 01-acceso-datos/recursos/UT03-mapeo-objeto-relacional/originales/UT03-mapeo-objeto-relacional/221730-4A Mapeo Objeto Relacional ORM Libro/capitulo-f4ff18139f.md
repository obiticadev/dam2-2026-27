Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36549

### 8. Mapeo de relaciones

#### 8.4. Relaciones uno a muchos (ordenada)

La relación uno a muchos consiste simplemente en que un objeto *padre* tenga una lista ordenada de objetos *hijo* de forma que al persistirse el objeto principal también se persista la lista de objetos *hijo*. Esta relación también suele llamarse *maestro-detalle* o *padre-hijo*.

El diagrama UML y el esquema relacional no difieren del de las relaciones uno a muchas desordenada.

El código fuente de la clase `Profesor` queda de la siguiente forma:

```
 1: @Entity
 2: @Table(name="Profesor")
 3: public class Profesor implements Serializable  {
 4:
 5:     @Id
 6:     @Column(name="Id")
 7:     private int id;
 8:
 9:     @Column(name="nombre")
10:     private String nombre;
11:
12:     @Column(name="ape1")
13:     private String ape1;
14:
15:     @Column(name="ape2")
16:     private String ape2;
17:
18:     @OneToMany(cascade= CascadeType.ALL, mappedBy="profesor")
19:     
20:     @IndexColumn(name="idx")
21:     private List<CorreoElectronico> correosElectronicos;
22:
23:
24:     public Profesor(){
25:     }
26:
27:     public Profesor(int id, String nombre, String ape1, String ape2) {
28:         this.id = id;
29:         this.nombre = nombre;
30:         this.ape1 = ape1;
31:         this.ape2 = ape2;
32:     }
33: }
```

Clase profesor anotada

A la propiedad `correosElectronicos` se ha añadido una anotación para indicar la relación *uno a muchos*.

* **OneToMany**:Como su nombre indica le dice a Hibernate que esta propiedad contendrá la lista de *hijos*.

  + **cascade**: Este atributo tiene el mismo significado que el del fichero de mapeo de Hibernate. Mas información en [Cascade](https://docs.jboss.org/hibernate/orm/5.2/userguide/html_single/Hibernate_User_Guide.html#basic).
* **JoinColumn**: Indicaremos el nombre de la columna que en la tabla *hija* contiene la clave ajena a la tabla *padre*. En nuestro ejemplo es la columna de la base de datos `IdProfesor` que se encuentra en la tabla `CorreoElectronico` la cual enlaza con la tabla `Profesor`.
* **IndexColumn**: Indicaremos el nombre de la columna que en la tabla *hija* contiene el orden dentro de la lista de *hijos*. En nuestro ejemplo es la columna de la base de datos `idx` que se encuentra en la tabla `CorreoElectronico`.

El código de la clase CorreoElectronico es el siguiente:

```
 1: @Entity
 2: @Table(name="CorreoElectronico")
 3: public class CorreoElectronico implements Serializable {
 4:
 5:     @Id
 6:     @Column(name="IdCorreo")
 7:     private int idCorreo;
 8:
 9:     @Column(name="DireccionCorreo")
10:     private String direccionCorreo;
11:
12:     @ManyToOne
13:     @JoinColumn(name="IdProfesor")
14:     private Profesor profesor;
15:
16:     public CorreoElectronico() {
17:
18:     }
19:
20:     public CorreoElectronico(int idCorreo,String direccionCorreo,Profesor profesor) {
21:         this.idCorreo=idCorreo;
22:         this.direccionCorreo=direccionCorreo;
23:         this.profesor=profesor;
24:     }
25: }
```

Clase CorreoElectronico anotada

A la propiedad `profesor` se han añadido dos anotaciones para indicar la relación:

* **ManyToOne**:Al ser el otro lado de la relación indicamos que desde este lado es una relación *mucho a uno*.
* **JoinColumn**: Indicaremos el nombre de la columna que en la tabla *hija* contiene la clave ajena a la tabla *padre*. En nuestro ejemplo es la columna de la base de datos `IdProfesor` que se encuentra en la tabla `CorreoElectronico` la cual enlaza con la tabla `Profesor`.

Código Java

Ahora que ya tenemos preparadas las clase Java para que puedan persistirse veamos el código necesario para persistirlas.

```
 1: Profesor profesor=new Profesor(9, "Rosa", "Díaz", "Del Toro");
 2: List<CorreoElectronico> correosElectronicos=new ArrayList<>();
 3: correosElectronicos.add(new CorreoElectronico(3, "rosa@yahoo.com",profesor));
 4: correosElectronicos.add(new CorreoElectronico(2, "rosa@hotmail.com",profesor));
 5: correosElectronicos.add(new CorreoElectronico(1, "rosa@gmail.com",profesor));
 6:
 7: profesor.setCorreosElectronicos(correosElectronicos);
 8:
 9: Session session=sessionFactory.openSession();
10: session.beginTransaction();
11:
12: session.save(profesor);
13:
14: session.getTransaction().commit();
15: session.close();
```

Persistiendo la clase Profesor

La explicación del código es la siguiente:

* En la línea 1 se crea el objeto `Profesor`
* En la segunda línea se crea el objeto [`ArrayList`](http://docs.oracle.com/javase/7/docs/api/java/util/ArrayList.html) que implementa el interfaz [`List`](http://docs.oracle.com/javase/7/docs/api/java/util/List.html) el cual contendrá la lista de hijos.
* Desde las líneas 3 a la 5 se crean los objetos `CorreoElectronico` y se añaden al [`List`](http://docs.oracle.com/javase/7/docs/api/java/util/List.html).
* En la línea 7 se establece la relación entre la lista de hijos (`CorreoElectronico`) y el padre (`Profesor`).
* En la línea 12 se guarda el objeto `Profesor` y automáticamente se guardan también sus hijos.