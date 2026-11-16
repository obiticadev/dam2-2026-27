Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36541

### 3. Hibernate

**Hibernate** es una herramienta de mapeo objeto-relacional (ORM) para la plataforma Java (y disponible también para .Net con el nombre de NHibernate) **que facilita el mapeo de atributos entre una base de datos relacional tradicional y el modelo de objetos de una aplicación, mediante archivos declarativos (XML) o anotaciones en los beans de las entidades que permiten establecer estas relaciones.**

Como todas las herramientas de su tipo, Hibernate busca solucionar el problema de la diferencia entre los dos modelos de datos coexistentes en una aplicación:

* el usado en la memoria de la computadora (orientación a objetos) y
* el usado en las bases de datos (modelo relacional).

Para lograr esto **permite al desarrollador detallar cómo es su modelo de datos, qué relaciones existen y qué forma tienen**. Con esta información Hibernate le permite a la aplicación manipular los datos en la base de datos operando sobre objetos, con todas las características de la [POO](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos "Programación orientada a objetos").

**Hibernate convertirá los datos entre los tipos utilizados por Java y los definidos por** **[SQL](https://es.wikipedia.org/wiki/SQL "SQL"). Hibernate genera las sentencias SQL y libera al desarrollador del manejo manual de los datos que resultan de la ejecución de dichas sentencias, manteniendo la portabilidad entre todos los motores de bases de datos con un ligero incremento en el tiempo de ejecución.**

**Hibernate** está diseñado para ser flexible en cuanto al esquema de tablas utilizado, **para poder adaptarse a su uso sobre una base de datos ya existente.** También **tiene la funcionalidad de crear la base de datos a partir de la información disponible.**

**Hibernate ofrece también un lenguaje de consulta de datos llamado HQL** (*Hibernate Query Language*), al mismo tiempo que una [API](https://es.wikipedia.org/wiki/Application_Programming_Interface "Application Programming Interface") para construir las consultas.

Hibernate para Java puede ser utilizado en aplicaciones Java independientes o en aplicaciones [Java EE](https://es.wikipedia.org/wiki/Java_EE "Java EE"), mediante el componente **Hibernate Annotations** que implementa el estándar [JPA](https://es.wikipedia.org/wiki/Java_Persistence_API "Java Persistence API"), que es parte de esta plataforma.

Hibernate es software libre, distribuido bajo los términos de la licencia GNU LGPL.

Fuente: es.wikipedia.org

##### Consideraciones Generales de Funcionamiento en Hibernate

Para almacenar y recuperar objetos de la base de datos, el desarrollador interactúa con el motor de Hibernate mediante un objeto esencial llamado **Session (clase Session)**. Este concepto es uno de los más importantes dentro de Hibernate y se puede comparar de forma general al concepto de conexión en JDBC, ya que cumple un papel similar.

La Session permite:

* **Delimitar operaciones relacionadas**: Agrupa acciones dentro de un proceso de negocio, lo que asegura que todas formen parte de un flujo coherente.
* **Manejar transacciones**: Proporciona métodos para iniciar, confirmar o revertir transacciones, garantizando integridad en las operaciones.
* **Servicios adicionales**: Ofrece funcionalidades como el manejo de caché, evitando interacciones innecesarias con la base de datos y mejorando el rendimiento.

Además, la clase Session incluye métodos clave como:

* persist(Object object): Guarda un objeto en la base de datos.
* createQuery(String queryString): Permite crear consultas dinámicas utilizando HQL (Hibernate Query Language).
* beginTransaction(): Inicia una nueva transacción.
* close(): Cierra la sesión y libera recursos asociados.

En resumen, el uso de la Session no solo facilita la interacción con la base de datos, sino que también permite un manejo eficiente de las operaciones relacionadas, asegurando consistencia, optimización y control en el acceso a los datos.

Hibernate **distingue entre objetos tipo transient y tipo persistent:**

* **transient**son **objetos que sólo existen en memoria y no en un almacén de datos**, en algunos casos no serán almacenados jamás en la base de datos y en otros es un estado en el que se encuentran hasta ser almacenados en ella.
* **Persistent se caracterizan por haber sido ya almacenados y ser por tanto objetos persistentes**.

Dicho de otra manera los objetos transient han sido instanciados por el desarrollador sin haberlos almacenado mediante una sesión, los objetos persistentes han sido creados y almacenados en una sesión o bien devueltos en una consulta realizada con la sesión.

**¿Por qué necesitamos Hibernate?**

Con Hibernate, **no es necesario preocuparse por cambios de base de datos,** como cambios manuales en los archivos de secuencia de comandos SQL que se evitan. Si alguna vez necesita cambiar la base de datos que utiliza su aplicación, puede ser fácilmente acomodado mediante la alteración de la propiedad dialect en el archivo de configuración. Hibernate te da el poder completo de SQL, algo que nunca fue ofrecido por los primeros frameworks ORM comerciales.

**Hibernate genera código JDBC basado en la base de datos subyacente elegida, por lo que le ahorra la molestia de escribir código JDBC.** También es compatible con la agrupación de conexiones. Las API que son usados por Hibernate son muy simples y fáciles de aprender. Los desarrolladores con muy poco conocimiento de SQL puede hacer uso de Hibernate, ya que disminuye la carga de la escritura de consultas SQL.