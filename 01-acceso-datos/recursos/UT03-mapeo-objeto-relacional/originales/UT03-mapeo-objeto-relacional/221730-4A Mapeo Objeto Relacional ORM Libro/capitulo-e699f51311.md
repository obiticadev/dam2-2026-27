Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36555

### 5. Clases anotadas

Las anotaciones que mas frecuentes en Hibernate  son las siguientes. Puedes consultar todas las anotaciones en la documentación de la [API jakarta.persistence](https://docs.oracle.com/javaee/7/api/javax/persistence/package-summary.html)

| **Anotación** | **Paquete / Import statement** | **Descripción** | **Enlace a Documentación (Jakarta EE 8)** |
| --- | --- | --- | --- |
| **@Entity** | jakarta.persistence.Entity | Especifica que la clase es una entidad. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Entity.html) |
| **@Table** | jakarta.persistence.Table | Especifica la tabla principal para la entidad anotada. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Table.html) |
| **@Column** | jakarta.persistence.Column | Especifica la columna mapeada para una propiedad o campo persistente. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Column.html) |
| **@Id** | jakarta.persistence.Id | Especifica la clave primaria de una entidad. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Id.html) |
| **@GeneratedValue** | jakarta.persistence.GeneratedValue | Proporciona la especificación de estrategias de generación para los valores de las claves primarias. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/GeneratedValue.html) |
| **@Version** | jakarta.persistence.Version | Especifica el campo o propiedad de versión de una clase de entidad que sirve como su valor de bloqueo optimista. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Version.html) |
| **@OrderBy** | jakarta.persistence.OrderBy | Especifica el orden de los elementos de una asociación valorada en colección en el punto en que se recupera. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/OrderBy.html) |
| **@Transient** | jakarta.persistence.Transient | Especifica que la propiedad o el campo no es persistente. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Transient.html) |
| **@Lob** | jakarta.persistence.Lob | Especifica que una propiedad o campo persistente debe persistirse como un objeto grande (Large Object). | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Lob.html) |
| **Hibernate Association Mapping Annotations** | | | |
| **@OneToOne** | jakarta.persistence.OneToOne | Especifica una asociación univaluada a otra entidad que tiene multiplicidad de uno a uno. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/OneToOne.html) |
| **@ManyToOne** | jakarta.persistence.ManyToOne | Especifica una asociación univaluada a otra clase de entidad que tiene multiplicidad de muchos a uno. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/ManyToOne.html) |
| **@OneToMany** | jakarta.persistence.OneToMany | Especifica una asociación multivaluada con multiplicidad de uno a muchos. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/OneToMany.html) |
| **@ManyToMany** | jakarta.persistence.ManyToMany | Especifica una asociación multivaluada con multiplicidad de muchos a muchos. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/ManyToMany.html) |
| **@PrimaryKeyJoinColumn** | jakarta.persistence.PrimaryKeyJoinColumn | Especifica una columna de clave primaria que se utiliza como clave externa para unirse a otra tabla. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/PrimaryKeyJoinColumn.html) |
| **@JoinColumn** | jakarta.persistence.JoinColumn | Especifica una columna para unirse a una asociación de entidad o colección de elementos. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/JoinColumn.html) |
| **@JoinTable** | jakarta.persistence.JoinTable | Especifica el mapeo de asociaciones. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/JoinTable.html) |
| **@MapsId** | jakarta.persistence.MapsId | Designa un atributo de relación que proporciona el mapeo para una clave primaria EmbeddedId o una clave primaria simple. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/MapsId.html) |
| **Hibernate Inheritance Mapping Annotations** | | | |
| **@Inheritance** | jakarta.persistence.Inheritance | Especifica la estrategia de herencia que se utilizará para una jerarquía de clases de entidad. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/Inheritance.html) |
| **@DiscriminatorColumn** | jakarta.persistence.DiscriminatorColumn | Especifica la columna discriminadora para las estrategias de mapeo de herencia. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/DiscriminatorColumn.html) |
| **@DiscriminatorValue** | jakarta.persistence.DiscriminatorValue | Especifica el valor de la columna discriminadora para entidades del tipo dado. | [Ver doc](https://jakarta.ee/specifications/platform/8/apidocs/javax/persistence/DiscriminatorValue.html) |

En los siguientes subcapítulos nos centraremos en utilizar anotaciones para mapear tablas de una base de datos relacional utilizando clases con anotaciones.

**Nota sobre la documentación:** Los enlaces apuntan a la documentación de **Jakarta EE 8**. Jakarta EE es el proyecto de código abierto que continúa el desarrollo de Java EE bajo la Eclipse Foundation.