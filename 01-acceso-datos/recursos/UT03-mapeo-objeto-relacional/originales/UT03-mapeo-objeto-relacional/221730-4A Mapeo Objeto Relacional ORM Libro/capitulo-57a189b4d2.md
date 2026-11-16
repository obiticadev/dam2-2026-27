Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36556

### 7. Configurando

Como con cualquier otro framework es necesario configurarlo para su correcto funcionamiento.

La instalación del plugin para Hibernate la puedes encontrar en esta unidad en un fichero aparte

 Sin embargo, aún quedan aspectos que debemos configurar como:

* Datos de conexión a la base de datos
* Ubicación de las clases a persistir.
* Nivel de Log

La forma de configurar hibernate es usando el fichero XML de configuración llamado **hibernate.cfg.xml.** Este fichero deberemos guardarlo en el paquete raíz de nuestras clases Java, es decir fuera de cualquier paquete.Si estamos usando NetBeans deberá ser en la carpeta src de nuestro proyecto.

La información que contiene es la siguiente:

* Propiedades de configuración.
* Las clases que se quieren mapear.

El fichero tiene la siguiente estructura:

```
 1: <?xml version="1.0" encoding="UTF-8"?>
 2: <!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD 3.0//EN" "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
 3: <hibernate-configuration>
 4:   <session-factory>
 5:     <property name="connection.driver_class">nombre_driver</property>
 6:     <property name="connection.url">url_base_datos</property>
 7:     <property name="connection.username">usuario</property>
 8:     <property name="connection.password">contraseña</property>
 9:     <property name="dialect">dialecto</property>
10:     
11:
12:     <mapping resource="fichero_mapeo.hbm.xml"/>
13:     <mapping class="clase_anotada"/>
14:
15:   </session-factory>
16: </hibernate-configuration>
```

El tag  <session-factory>  contiene la configuración de hibernate, no debe tener ninguna propiedad.  
El resto de las etiquetas son: </property>, para especificar las propiedades JDBC de Hibernate y <mapping>, con el atributo class si utilizamos clases anotadas o  resource si el mapeo se realiza con ficheros de mapeo hbm.xml

Propiedades JDBC de Hibernate

| Nombre de propiedad | Propósito |
| --- | --- |
| hibernate.connection.driver\_class | *clase del driver jdbc* |
| hibernate.connection.url | *URL de jdbc* |
| hibernate.connection.username | *usuario de base de datos* |
| hibernate.connection.password | *contraseña del usuario de base de datos* |
| hibernate.connection.pool\_size | *número máximo de conexiones manejadas por pooling* |