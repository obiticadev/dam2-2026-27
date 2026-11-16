Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36540

### 8. Mapeo de relaciones

#### 8.7. recomendaciones de uso cascadeType

El uso de CascadeType.ALL en Hibernate 5.4 y JPA puede ser útil, pero debes aplicarlo con cuidado, dependiendo de los requisitos de tu modelo de datos y las operaciones que planeas realizar. A continuación, te explico los detalles y las mejores prácticas relacionadas con el uso de CascadeType.ALL.

#### ¿Qué significa CascadeType.ALL?

CascadeType.ALL significa que todas las operaciones de cascada posibles (PERSIST, MERGE, REMOVE, REFRESH, DETACH) se aplicarán automáticamente desde la entidad propietaria hacia sus entidades relacionadas. Es decir, cualquier operación que realices en una entidad principal (la entidad propietaria) también se aplicará automáticamente a las entidades relacionadas.

#### Es adecuado usar CascadeType.ALL cuando:

Relación de dependencia fuerte: Las entidades relacionadas no tienen sentido fuera del contexto de la entidad propietaria. Por ejemplo, una relación entre una Factura y sus LineasDeFactura. Si eliminas la factura, también deseas eliminar automáticamente todas sus líneas.  
Consistencia de operaciones: Quieres asegurarte de que cualquier cambio en la entidad principal también se refleje automáticamente en sus dependientes.  
Ejemplo:

`@Entity`  
`public class Factura {`  
`@OneToMany(mappedBy = "factura", cascade = CascadeType.ALL, orphanRemoval = true)`  
`private List<LineaFactura> lineas;`  
`}`

En este ejemplo, si eliminas una Factura, todas las LineaFactura asociadas también se eliminarán automáticamente.

#### No es recomendable usar CascadeType.ALL en las siguientes situaciones:

Entidades independientes: Si las entidades relacionadas pueden existir independientemente de la entidad propietaria. Por ejemplo, si tienes una relación entre Usuario y Rol, es probable que no quieras eliminar los roles al eliminar un usuario.  
Gran cantidad de relaciones: Cuando tienes muchas relaciones en cascada, el uso de CascadeType.ALL puede generar operaciones innecesarias y costosas.  
Control explícito: Si prefieres tener un control más fino sobre qué operaciones deben aplicarse en cascada.  
Alternativas y Mejores Prácticas  
Usar cascadas específicas: En lugar de usar CascadeType.ALL, selecciona los tipos de cascada que necesitas. Por ejemplo:

PERSIST para guardar entidades relacionadas automáticamente.  
MERGE para sincronizar entidades relacionadas con los cambios en la entidad principal.  
REMOVE para eliminar entidades relacionadas automáticamente.

#### Ejemplo:

`@OneToMany(mappedBy = "factura", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)`  
`private List<LineaFactura> lineas;`

Orphan Removal: Considera usar orphanRemoval = true junto con cascadas para garantizar que las entidades huérfanas se eliminen automáticamente.

#### Resumen

Usa CascadeType.ALL únicamente cuando las entidades relacionadas dependan completamente de la entidad propietaria y no deban existir por separado.  
Para mayor control y eficiencia, selecciona los tipos de cascada específicos según las necesidades de tu aplicación.  
Siempre revisa el impacto en el rendimiento y la coherencia de los datos antes de aplicar cascadas a relaciones complejas o de gran tamaño.