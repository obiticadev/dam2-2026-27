Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36564

### 6. Mapeo de Entidades

#### 6.1. Configuración Hibernate

Hibernate se puede configurar de dos maneras principales, y la elección entre ellas determina no solo el archivo de configuración, sino también las clases y métodos que usarás en tu código Java. La diferencia esencial es: **¿trabajas directamente con la API propietaria de Hibernate, o a través del estándar JPA?**

---

##### 1. Los dos modos de configuración

##### Modo A: Hibernate nativo (`hibernate.cfg.xml`)

Aquí usas la API original de Hibernate. El archivo `hibernate.cfg.xml` se coloca normalmente en la raíz del classpath (por ejemplo, `src/main/resources`) y contiene toda la configuración de conexión y las referencias a las entidades .

**A grandes rasgos, la configuración incluye:**

* Propiedades de conexión JDBC (driver, URL, usuario, contraseña).
* Dialecto de la base de datos.
* Listado de clases entidad mediante `<mapping class="..."/>`.
* Opciones específicas de Hibernate como `hbm2ddl.auto` o configuración de caché de segundo nivel .

En el código Java, arrancas Hibernate así:

java

```
SessionFactory sf = new Configuration().configure().buildSessionFactory();
```

Y luego trabajas con `Session` y métodos como `session.save(entidad)`.

##### Modo B: JPA estándar (`persistence.xml`)

Aquí usas la especificación JPA, y Hibernate actúa simplemente como el proveedor que la implementa. El archivo **debe** llamarse `persistence.xml` y ubicarse en `META-INF/` dentro del classpath (por ejemplo, `src/main/resources/META-INF/persistence.xml`).

**A grandes rasgos, la configuración incluye:**

* Un `<persistence-unit>` con un nombre.
* El `<provider>` que indica qué implementación de JPA se usa (Hibernate, EclipseLink, etc.).
* Las clases entidad (o el modo de descubrimiento automático).
* Las propiedades de conexión, que en JPA suelen usar prefijos estándar como `javax.persistence.jdbc.*` o `jakarta.persistence.jdbc.*`, aunque también puedes pasar propiedades específicas de Hibernate .

En el código Java, arrancas JPA así:

java

```
EntityManagerFactory emf = Persistence.createEntityManagerFactory("nombreDeLaUnidad");
```

Y luego trabajas con `EntityManager` y métodos como `em.persist(entidad)`.

> **Nota importante sobre el `pom.xml`:** El `pom.xml` de Maven no configura la persistencia. Solo declara las dependencias (Hibernate, el driver JDBC, etc.). La configuración real de la conexión va siempre en `hibernate.cfg.xml` o en `persistence.xml`, según el modo elegido.

---

##### 2. Lo que ganas y lo que pierdes con cada modo

###### Con Hibernate nativo

**Lo que ganas:**

* **Acceso a características avanzadas de Hibernate** que no están cubiertas por el estándar JPA, como ciertos detalles de la gestión de caché de segundo nivel o configuraciones muy específicas del proveedor .
* **Control más directo** sobre el comportamiento del ORM en escenarios que requieren ajustes finos.

**Lo que pierdes:**

* **Portabilidad.** Tu código queda atado a Hibernate. Si algún día quisieras cambiar a otro ORM (EclipseLink, por ejemplo), tendrías que reescribir toda la capa de persistencia: cambiar `Session` por `EntityManager`, `save` por `persist`, etc. .
* **Estandarización.** El código no sigue un estándar de Java, lo que puede dificultar la incorporación de nuevos desarrolladores familiarizados con JPA.

###### Con JPA estándar

**Lo que ganas:**

* **Portabilidad.** Tu código Java solo depende de `javax.persistence.*` (o `jakarta.persistence.*`). Cambiar de proveedor es, en teoría, tan simple como cambiar el `<provider>` en `persistence.xml` y ajustar dependencias, sin tocar el código de negocio .
* **Estandarización y familiaridad.** JPA es el estándar de facto en el ecosistema Java (especialmente con Spring Boot), por lo que hay más documentación, más desarrolladores que lo conocen y mejor integración con frameworks modernos .

**Lo que pierdes:**

* **Acceso inmediato a lo específico de Hibernate.** Si necesitas una característica que Hibernate ofrece pero JPA no expone, tendrías que salirte del estándar (usar la API nativa subyacente o configuración específica), lo que rompe parcialmente la portabilidad .
* **Una capa adicional de abstracción** que, en casos muy concretos de rendimiento extremo, puede limitar el control directo sobre la implementación.

---

##### 3. ¿Cuál es el mejor método?

Para la mayoría de proyectos modernos, **JPA es la opción recomendada**. La razón principal es el desacoplamiento: escribes tu lógica de persistencia contra un estándar y no contra un proveedor concreto. Esto facilita el mantenimiento, las pruebas y una eventual migración .

Hibernate nativo tiene sentido si:

* Necesitas alguna funcionalidad muy específica de Hibernate que JPA no cubre.
* Estás manteniendo un proyecto legacy que ya está construido sobre la API nativa y migrarlo no es rentable.

Si empiezas un proyecto nuevo, **usa JPA con `persistence.xml`** (o, mejor aún, con Spring Boot, que abstrae casi toda esa configuración XML).

No obstante en los ejemplos de este tema **utilizaremos Hibernate Nativo**