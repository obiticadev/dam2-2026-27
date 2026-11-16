# hibernate.cfg.xml

> **Módulo:** Acceso a Datos — DAM 2
> **Procedencia:** [Archivo extraído](hibernate.cfg.xml) · [ZIP original](../../../../originales/UT03-mapeo-objeto-relacional/222163-Ficheros%20de%20configuraci%C3%B3n%20Carpeta/a1b5d640e5-ficheros%20de%20configuraci%C3%83%C2%B3n%20para%20proyecto.zip)
> **Criterio:** transcripción del material docente, sin resumir ni actualizar sus versiones.

## Índice

- [Contenido íntegro](#contenido-integro)

---

<a id="contenido-integro"></a>
## Contenido íntegro

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
		"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
		"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.password">system</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost/ejemplo</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.dialect">org.hibernate.dialect.MySQL8Dialect</property>
        <property name="show_sql">true</property>
        <property name="hibernate.hbm2ddl.auto">create</property>
        <mapping class="modelo.Usuario"/>
    </session-factory>
</hibernate-configuration>
```
