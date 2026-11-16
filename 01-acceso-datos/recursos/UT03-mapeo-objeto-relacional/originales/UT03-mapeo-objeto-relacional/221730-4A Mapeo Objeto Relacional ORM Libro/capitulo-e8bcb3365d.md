Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36640

### 7. Configurando

#### 7.2. Configuración completa

Vamos a ver los pasos para realizar una configuración completa de Hibernate en Eclipse con la una BBDD MySQL, con la configuración de Hibernate Nativo. (hibernate.cfg.xml)

##### Referencias:

[watch](https://www.youtube.com/watch?v=_F_-wNCahL0)

[watch](https://www.youtube.com/watch?v=BJY4966Z3KY&list=PLkVpKYNT_U9eTicIIaqR9YUoIZ5V4ZXpS)

* [4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. MavenLibro](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221731)

Documentación

<https://hibernate.org/orm/documentation/>

<https://jakarta.ee/specifications/platform/8/>

<https://jakarta.ee/specifications/platform/8/apidocs/>

Obsoleto: <https://docs.hibernate.org/stable/orm/javadocs/>

##### Ficheros a configurar

Para la confuguración vamos a necesitar 5 ficheros:

pom.xml → Incluir las dependencias de Hibernate y del conector SQL  
hibernate.cfg.xml → Conexión a la base de datos y definición de las entidades  
Usuario.java → Clase que va a ser mapeada con sus anotaciones  
HibertanteUtil.java → Clase para obtener la sesión  
Pruebas.java → Clase con el main para utilizar las herramientas de hibernate para hacer operaciones CRUD con las clases

##### Configuración Resumida

1. Agregar dependencias maven en el fichero pom.xml:
   * hibernate-core
   * Driver de base de datos: mysql, postgresql, etc, el que se quiera.
2. Crear fichero 'hibernate.cfg.xml' en la carpeta src/main/resources y configurarlo
   * Conexión a la BBDD
   * Dialecto de la BBDD
   * Mostrar y formatear el SQL generado (útil en desarrollo)
   * Gestión automática del esquema (depende del entorno)
   * Importante: Registro de clases entidad
3. Crear objeto SessionFactory desde java
   * Usuario.java → Clase que va a ser mapeada con sus anotaciones
   * HibertanteUtil.java → Clase para obtener la sesión
   * Pruebas.java → Clase con el main para utilizar las herramientas de hibernate para hacer operaciones CRUD con las clases