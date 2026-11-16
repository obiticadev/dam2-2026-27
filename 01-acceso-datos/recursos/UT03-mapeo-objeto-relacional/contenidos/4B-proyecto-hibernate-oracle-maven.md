# 4B creación de un proyecto de mapeo con hibernate. Base de datos Oracle. Maven

> **Módulo:** Acceso a Datos — DAM 2
> **Procedencia:** [Aula virtual](https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221731)
> **Criterio:** transcripción del material docente, sin resumir ni actualizar sus versiones.

> **Revisión técnica:** la transcripción conserva errores del aula. Para copiar código utiliza el [proyecto de referencia revisado](#proyecto-revisado) y la [configuración adjunta integrada](#configuracion-del-aula). La solución editorial no es el «proyecto completo» ausente del aula. Los bloques son documentación estática, no ejecutables desde esta página.

## Índice

- [Proyecto revisado: archivos completos](#proyecto-revisado)
- [Configuración original del aula integrada](#configuracion-del-aula)
- [1. nuevo proyecto Maven](#1-nuevo-proyecto-maven)
  - [**Paso 1: Crear un Proyecto Maven en Eclipse**](#paso-1-crear-un-proyecto-maven-en-eclipse)
  - [**Paso 2: Agregar Dependencias de Hibernate en el archivo pom.xml**](#paso-2-agregar-dependencias-de-hibernate-en-el-archivo-pom-xml)
  - [**Paso 3: Configurar Archivo de Configuración de Hibernate**](#paso-3-configurar-archivo-de-configuracion-de-hibernate)
  - [**Paso 4: Crear Entidades**](#paso-4-crear-entidades)
  - [**Paso 5: Crea paquetes para organizar proyecto**](#paso-5-crea-paquetes-para-organizar-proyecto)
  - [**Paso 6: Crear la session**](#paso-6-crear-la-session)
  - [**Paso 7: En el paquete "programas" creamos la clase que tiene un método main:**](#paso-7-en-el-paquete-programas-creamos-la-clase-que-tiene-un-metodo-main)
  - [**Paso 8: Completamos el fichero hibernate.cfg.xml:**](#paso-8-completamos-el-fichero-hibernate-cfg-xml)
- [2. proyecto completo](#2-proyecto-completo)
- [Fuentes locales y adjuntos](#fuentes-locales-y-adjuntos)

---

<a id="1-nuevo-proyecto-maven"></a>
## 1. nuevo proyecto Maven

<a id="paso-1-crear-un-proyecto-maven-en-eclipse"></a>
### **Paso 1: Crear un Proyecto Maven en Eclipse**

Abre Eclipse y ve a File (Archivo) -&gt; New (Nuevo) -&gt; Project (Proyecto).

Selecciona Maven -&gt; Maven Project y haz clic en Next.

Marca la opción Create a simple project (Crear un proyecto simple) y haz clic en Next.

Ingresa el Group Id (ID del Grupo) y el Artifact Id (ID del Artefacto) para tu proyecto Maven. Luego, haz clic en Finish.

<a id="paso-2-agregar-dependencias-de-hibernate-en-el-archivo-pom-xml"></a>
### **Paso 2: Agregar Dependencias de Hibernate en el archivo pom.xml**

En el archivo pom.xml del proyecto Maven, agrega las dependencias de Hibernate. Asegúrate de incluir las dependencias necesarias para Hibernate Core, así como cualquier las del driver de la base de datos que se vaya a utilizar En el ejemplo que se os proporciona:

```xml
<dependency>

 <groupId>com.oracle.database.jdbc</groupId>

 <artifactId>ojdbc10</artifactId>

 <version>19.12.0.0</version>

</dependency>

<dependency>

 <groupId>org.hibernate</groupId>

 <artifactId>hibernate-testing</artifactId>

 <version>5.4.33.Final</version>

</dependency>
```

<a id="paso-3-configurar-archivo-de-configuracion-de-hibernate"></a>
### **Paso 3: Configurar Archivo de Configuración de Hibernate**

Crea el archivo hibernate.cfg.xml donde configurarás la conexión a la base de datos. Puedes colocarlo en la carpeta src/main/resources del proyecto Maven.

Define las propiedades de conexión a la base de datos en este archivo. En el ejemplo que se os proporciona:

```xml
 <?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE hibernate-configuration PUBLIC

"-//Hibernate/Hibernate Configuration DTD 3.0//EN"

"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

 <session-factory>

 <property name="hibernate.connection.driver_class">oracle.jdbc.driver.OracleDriver</property>

 <property name="hibernate.connection.password">tiger</property>

 <property name="hibernate.connection.url">jdbc:oracle:thin:@localhost:1521/xe</property>

 <property name="hibernate.connection.username">scott</property>

 <property name="hibernate.dialect">org.hibernate.dialect.Oracle10gDialect</property>

 </session-factory>

</hibernate-configuration>
```

<a id="paso-4-crear-entidades"></a>
### **Paso 4: Crear Entidades**

Crea las clases de entidad utilizando anotaciones de Hibernate En el ejemplo que se os proporciona:

```java
@Entity

@Table

public class Usuario implements Serializable {

@Id

@Column

private int seq;

@Column

private String userNombre;

@Column

private String password;

@Column

private Date creacionFecha;

@Column

private String creacionUsuario;

@Column

private Date modificaFecha;

@Column

private String modificaUsuario;
```

<a id="paso-5-crea-paquetes-para-organizar-proyecto"></a>
### **Paso 5: Crea paquetes para organizar proyecto**

![Estructura Maven con paquetes modelo, programas, utils y recursos](../img/0183f686643185d2.png)

La estructura de ficheros la determina Maven.

En modelo situamos las clases entidad

En programas tendremos los programas.

En utils la clase que genera objetos de la clase SessionFactory

<a id="paso-6-crear-la-session"></a>
### **Paso 6: Crear la session**

En el paquete utils creamos la utilidad para gestionar la sesión de Hibernate mediante un patrón Singleton, lo que asegura que se utiliza una única instancia de SessionFactory en toda la aplicación.

La clase de utilidad llamada HibernateUtils se diseña para gestionar la conexión con Hibernate mediante el patrón Singleton. Este patrón garantiza que se utilice una única instancia de SessionFactory en toda la aplicación, optimizando el uso de recursos, ya que SessionFactory es un objeto pesado cuya creación puede ser costosa. La instancia de SessionFactory se inicializa de forma segura en un bloque estático, leyendo la configuración desde el archivo hibernate.cfg.xml. El método estático getSessionFactory permite acceder a esta instancia de manera centralizada, facilitando su reutilización en cualquier parte de la aplicación, asegurando además que se maneje de forma eficiente

Nota de formato: la tabla original se presenta por celdas, en orden de lectura, para conservar los bloques de código. La disposición original puede consultarse en el HTML local.

**Clase HibernateUtils (utiliza un patron Singleton)**  
Esta clase sirve como una herramienta para inicializar y proporcionar acceso a una instancia única de SessionFactory, que es un componente central de Hibernate para manejar las conexiones con la base de datos.

```java
public class HibernateUtils {

private static SessionFactory sessionFactory;

static {

sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();

}

 public static SessionFactory getSessionFactory() {

return sessionFactory;

}

}
```

**private static SessionFactory sessionFactory;**  
Declara una variable estática y privada sessionFactory de tipo SessionFactory. Pertenece a la clase y no a una instancia, lo que permite que todas las partes de la aplicación accedan al mismo objeto SessionFactory.(static). Y restringe el acceso directo para garantizar el control sobre cómo se crea y utiliza la instancia.(private)

 Este bloque estático se ejecuta una vez cuando la clase HibernateUtils se carga en memoria:  
static {  
    sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();  
}

**new Configuration():** Crea una nueva instancia de Configuration, que es responsable de cargar la configuración de Hibernate.  
.configure("hibernate.cfg.xml"): Busca y carga el archivo de configuración hibernate.cfg.xml desde el directorio raíz del proyecto o src/main/resources (en caso de usar Maven). Este archivo contiene información como la URL de la base de datos, el dialecto de Hibernate, el usuario y la contraseña, etc.  
**.buildSessionFactory():** Construye el objeto SessionFactory basado en la configuración cargada.  
   
**Método getSessionFactory:**Proporciona acceso público a la instancia de SessionFactory.  
  
public static SessionFactory getSessionFactory() {  
    return sessionFactory;  
}

Es un método static, lo que significa que puedes llamarlo directamente usando la clase, sin necesidad de crear una instancia de HibernateUtils. Retorna la instancia única de SessionFactory.  
   
**¿Qué es un SessionFactory?**  
Es un objeto que se crea una vez y se reutiliza durante toda la aplicación.  
Encargado de proveer conexiones con la base de datos (a través de Session) y gestionar la configuración de Hibernate.  
  
 Funcionamiento Completo  
Cuando la clase HibernateUtils se carga en memoria, el bloque estático inicializa la variable sessionFactory leyendo la configuración desde el archivo hibernate.cfg.xml.  
Cada vez que necesitas interactuar con la base de datos, llamas al método HibernateUtils.getSessionFactory() para obtener la instancia de SessionFactory.  
Usas esa instancia para abrir una nueva Session, que se utiliza para ejecutar operaciones de CRUD (crear, leer, actualizar, eliminar) en la base de datos.  
   
La ventaja de usar el patrón Singleton es que solo hay una instancia de SessionFactory en toda la aplicación.  
Se evita crear múltiples instancias costosas de SessionFactory.

Centraliza la configuración de Hibernate en un único lugar (hibernate.cfg.xml y esta clase).  
Cualquier parte de la aplicación puede acceder al SessionFactory mediante el método estático getSessionFactory.

<a id="paso-7-en-el-paquete-programas-creamos-la-clase-que-tiene-un-metodo-main"></a>
### **Paso 7: En el paquete "programas" creamos la clase que tiene un método main:**

En conveniente al finalizar este punto, ejecutar el programa para ver que la parte de la conexión se ha realizado correctamente

```java
public class Main {

public static void main(String[] args) {

SessionFactory sesion = HibernateUtils.getSessionFactory();

Session session = sesion.openSession(); // TODO Auto-generated constructor stub

try {

//aquí pondremos el programa, transacciones, instanciar objetos, guardar, recuperar, etc..

} catch (Exception e) { 

 e.printStackTrace();

// acciones para restaurar el estado bd( rollback)
```

}finally {

```java
session.close();

}

}

}
```

<a id="paso-8-completamos-el-fichero-hibernate-cfg-xml"></a>
### **Paso 8: Completamos el fichero hibernate.cfg.xml:**

**incluimos las clases entidad.** En el ejemplo que se os proporciona:

&lt;mapping class="modelo.Usuario"&gt;&lt;/mapping&gt;

**Especificamos la forma en que deseamos interactuar con la base de datos:**

&lt;property name="hibernate.hbm2ddl.auto"&gt;create&lt;/property&gt;

**Especificamos otras propiedades:**

&lt;property name="show\_sql"&gt;true&lt;/property&gt;

**Paso 9: Completamos el el programa.** En el ejemplo que se os proporciona:

Instanciamos un objeto de la clase Entidad y lo hacemos persistente:

```java
import java.util.Date;

import org.hibernate.Session;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;

import maven.MySQL.Usuario;
import utils.HibernateUtils;

public class Main {
 public static void main(String[] args) {


 SessionFactory sesion = HibernateUtils.getSessionFactory();
 Session session = sesion.openSession(); // TODO Auto-generated constructor stub
 Usuario p = new Usuario();
 p.setSeq(1);
 p.setCreacionUsuario("Manolo");
 p.setCreacionFecha(new Date());
 p.setPassword("Manolo");
 try {

 session.beginTransaction();

 session.save(p);
 session.getTransaction().commit();
 

}catch (HibernateException e) {

 if(session.getTransaction()!=null) { session.getTransaction().rollback();  }
 
 }finally { 

session.close();

 }
 

}


}
```

Ejecuta tu aplicación desde Eclipse y prueba el código de Hibernate que has escrito para asegurarte de que interactúe correctamente con la base de datos.

**Paso 10: Comprobamos que se ha creado una tabla con las mismas columnas que atributos anotados tiene la clase entidad y que se haya insertado la línea correspondiente al objeto que se ha hecho persistente**:

<a id="2-proyecto-completo"></a>
## 2. proyecto completo

descarga el fichero e importa el proyecto

> **Incidencia del aula:** el capítulo «proyecto completo» indica que se descargue un fichero, pero no contiene ningún enlace ni adjunto. No se ha inventado ni sustituido ese proyecto.


<a id="fuentes-locales-y-adjuntos"></a>
## Fuentes locales y adjuntos

- [contenido.html](../originales/UT03-mapeo-objeto-relacional/221731-4B%20creaci%C3%B3n%20de%20un%20proyecto%20de%20mapeo%20con%20hibernate.%20Base%20de%20datos%20Oracle.%20Maven%20Libro/contenido.html)
- [capitulo-f4d963fcf7.html](../originales/UT03-mapeo-objeto-relacional/221731-4B%20creaci%C3%B3n%20de%20un%20proyecto%20de%20mapeo%20con%20hibernate.%20Base%20de%20datos%20Oracle.%20Maven%20Libro/capitulo-f4d963fcf7.html)

<a id="proyecto-revisado"></a>
## Proyecto revisado: archivos completos

**Solución editorial**, independiente de las transcripciones anteriores. Java 11 o superior, Hibernate **5.4.33.Final**, JPA **`javax.persistence`**. No mezclar con `jakarta.persistence` de Hibernate 6/7 ni con sus dialectos. Se mantiene la versión docente para evitar una migración silenciosa; no es una recomendación de dependencias para producción.

Los bloques siguientes son archivos completos. Copiarlos respetando la ruta del encabezado. La comprobación utiliza H2 **en memoria**, sin conectarse a Oracle/MySQL ni modificar bases existentes. `create-drop` solo está habilitado para esta base desechable. El ejemplo persiste, consulta, modifica y elimina un usuario; una excepción revierte la transacción y se propaga.

### `pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>dam2.acceso</groupId>
  <artifactId>ut03-referencia</artifactId>
  <version>1.0-SNAPSHOT</version>
  <properties>
    <maven.compiler.release>11</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>5.4.33.Final</version>
    </dependency>
    <dependency>
      <groupId>com.h2database</groupId>
      <artifactId>h2</artifactId>
      <version>1.4.200</version>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.2</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.xerial</groupId>
      <artifactId>sqlite-jdbc</artifactId>
      <version>3.42.0.0</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>com.github.gwenn</groupId>
      <artifactId>sqlite-dialect</artifactId>
      <version>0.1.2</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.13.0</version>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.2.5</version>
      </plugin>
    </plugins>
  </build>
</project>
```

### `src/main/resources/hibernate.cfg.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
  "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
  "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
  <session-factory>
    <property name="hibernate.connection.driver_class">org.h2.Driver</property>
    <property name="hibernate.connection.url">jdbc:h2:mem:ut03;DB_CLOSE_DELAY=-1</property>
    <property name="hibernate.connection.username">sa</property>
    <property name="hibernate.connection.password"></property>
    <property name="hibernate.dialect">org.hibernate.dialect.H2Dialect</property>
    <property name="hibernate.hbm2ddl.auto">create-drop</property>
    <property name="hibernate.show_sql">false</property>
    <mapping class="modelo.Usuario"/>
  </session-factory>
</hibernate-configuration>
```

### `src/main/java/modelo/Usuario.java`

```java
package modelo;

import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    private int seq;
    @Column(nullable = false, unique = true)
    private String userNombre;
    private LocalDate creacionFecha;
    private String creacionUsuario;
    private LocalDate modificaFecha;
    private String modificaUsuario;

    public Usuario() { }

    public Usuario(int seq, String userNombre) {
        this.seq = seq;
        this.userNombre = userNombre;
        this.creacionFecha = LocalDate.of(2026, 1, 1);
        this.creacionUsuario = "ejemplo";
    }

    public int getSeq() { return seq; }
    public String getUserNombre() { return userNombre; }
    public void setUserNombre(String userNombre) { this.userNombre = userNombre; }
}
```

Con acceso JPA por campos no son necesarios setters para cada propiedad. Los identificadores se asignan explícitamente en este ejemplo. Se omite a propósito la contraseña del original: no se debe enseñar a persistir contraseñas en claro. Un sistema de autenticación real requiere hashing de contraseñas y queda fuera de este ejemplo ORM. `LocalDate` está soportado por esta versión sin `@Temporal`; si se utiliza `java.util.Date`, declarar la semántica con `@Temporal`.

### `src/main/java/utils/HibernateUtils.java`

```java
package utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public final class HibernateUtils {
    private static final SessionFactory FACTORY =
        new Configuration().configure().buildSessionFactory();

    private HibernateUtils() { }

    public static SessionFactory getSessionFactory() { return FACTORY; }

    // Llamar una sola vez al terminar toda la aplicación, no tras cada operación.
    public static void shutdown() { FACTORY.close(); }
}
```

### `src/main/java/programas/Main.java`

```java
package programas;

import modelo.Usuario;
import org.hibernate.Session;
import org.hibernate.Transaction;
import utils.HibernateUtils;

public final class Main {
    public static void main(String[] args) {
        try {
            ejecutarCrud();
        } finally {
            HibernateUtils.shutdown();
        }
    }

    public static void ejecutarCrud() {
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            Transaction tx = session.beginTransaction();
            try {
                session.persist(new Usuario(1, "Manolo"));
                session.flush();
                session.clear();
                Usuario usuario = session.get(Usuario.class, 1);
                if (usuario == null) {
                    throw new IllegalStateException("No se recuperó el usuario");
                }
                usuario.setUserNombre("Manuel");
                session.flush();
                session.clear();
                usuario = session.get(Usuario.class, 1);
                if (!"Manuel".equals(usuario.getUserNombre())) {
                    throw new IllegalStateException("No se guardó el cambio");
                }
                session.remove(usuario);
                session.flush();
                session.clear();
                if (session.get(Usuario.class, 1) != null) {
                    throw new IllegalStateException("No se eliminó el usuario");
                }
                tx.commit();
            } catch (RuntimeException ex) {
                try {
                    if (tx.isActive()) { tx.rollback(); }
                } catch (RuntimeException rollbackError) {
                    ex.addSuppressed(rollbackError);
                }
                throw ex;
            }
        }
    }
}
```

`SessionFactory` es compartible; `Session` **no** lo es entre hilos. `configure()` busca el recurso en el classpath (`src/main/resources` en Maven), no un archivo arbitrario en la raíz del proyecto. Una sesión que falla se descarta; no continuar trabajando con ella después del rollback.

### Adaptar a los motores del aula

En una base propia existente usar **`hibernate.hbm2ddl.auto=validate`** y crear previamente el esquema. `create` elimina/recrea tablas; `update` tampoco sustituye una migración revisada. Las credenciales siguientes describen los ejemplos del aula, no son credenciales del usuario. No se ha intentado conectarse a sus servidores.

| Motor | Dependencia adicional al `hibernate-core` | Driver / dialecto en Hibernate 5.4 | URL orientativa |
|---|---|---|---|
| MySQL 8 | `mysql:mysql-connector-java:8.0.28` | `com.mysql.cj.jdbc.Driver` / `org.hibernate.dialect.MySQL8Dialect` | `jdbc:mysql://localhost:3306/ejemplo` |
| Oracle | `com.oracle.database.jdbc:ojdbc10:19.12.0.0` | `oracle.jdbc.OracleDriver` / `org.hibernate.dialect.Oracle10gDialect` | Por servicio: `jdbc:oracle:thin:@//localhost:1521/xe`; por SID: `jdbc:oracle:thin:@localhost:1521:xe` |
| SQLite | `org.xerial:sqlite-jdbc:3.42.0.0` y `com.github.gwenn:sqlite-dialect:0.1.2` | `org.sqlite.JDBC` / `org.sqlite.hibernate.dialect.SQLiteDialect` | `jdbc:sqlite:/ruta/absoluta/ejemplo.db` |

Elegir SID o servicio según la instalación Oracle; `xe` no se puede adivinar. El dialecto SQLite es un complemento de terceros, no basta con incluir el driver. La ruta Windows del ZIP no es portable a Linux. Estos perfiles conservan versiones históricas docentes y **no tienen validación de integración contra servidores Oracle/MySQL**. La prueba H2 no certifica diferencias de DDL, tipos, colaciones o SQL de esos motores.

La suite incluye además un CRUD SQLite real en memoria con esquema creado explícitamente, sin generación automática de DDL. Comprueba esas dependencias y el mapeo `Usuario`, **no todos los mapeos de 4A ni SEQUENCE en SQLite**. Las dependencias SQLite tienen alcance `test` en este POM para esa comprobación; para una aplicación SQLite deben pasar al alcance normal. Si se crea el esquema manualmente se puede usar `hibernate.hbm2ddl.auto=none`; `validate` solo donde el dialecto permita validar correctamente los metadatos.

<a id="configuracion-del-aula"></a>
## Configuración original del aula integrada

La carpeta del aula dice: «Ficheros para la configuración de un proyecto ORM». Se integran aquí sus ocho archivos de texto y las referencias de sus tres ZIP anidados; no constituyen un proyecto completo. Falta `modelo.Usuario` en el paquete y el `Main` no compila. **No utilizar estos originales como solución corregida.**

- [Carpeta original en HTML](../originales/UT03-mapeo-objeto-relacional/222163-Ficheros%20de%20configuraci%C3%B3n%20Carpeta/contenido.html).
- [ZIP docente íntegro](../originales/UT03-mapeo-objeto-relacional/222163-Ficheros%20de%20configuraci%C3%B3n%20Carpeta/a1b5d640e5-ficheros%20de%20configuraci%C3%83%C2%B3n%20para%20proyecto.zip).
- Paquetes anidados originales: [MySQL](../adjuntos/configuracion/mysql.zip), [Oracle](../adjuntos/configuracion/oracle.zip), [SQLite](../adjuntos/configuracion/sqlite.zip). Su contenido se transcribe a continuación; las copias extraídas se conservan sin alterar.

### Original: `HibernateUtils.java`

```java
package hibernateUtils;

import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {
	private static SessionFactory sessionFactory;
	static {
		sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
}
```

### Original: `Main.java`

```java
package programas;

import java.time.LocalDate;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import modelo.Usuario;
import hibernateUtils.HibernateUtils;

public class Main {
	public static void main(String[] args) {

		SessionFactory sesionFactory = HibernateUtils.getSessionFactory();
		Session session = sesionFactory.openSession(); 
		
		// aqui pondremos el codigo necesario 
		
		}catch (HibernateException e) {
			if(session.getTransaction()!=null) {
				session.getTransaction().rollback();
			}
			
		}finally {
		session.close();
		sesionFactory.close();
		}
	}

}

```

### Original: `mysql/mysql/hibernate.cfg.xml`

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

### Original: `mysql/mysql/pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>distancia.acceso</groupId>
	<artifactId>hibernate.maven.oracle2</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>HibernateMavenOracle2</name>
	<properties>
		<maven.compiler.target>11</maven.compiler.target>
		<maven.compiler.source>11</maven.compiler.source>
	</properties>
	<dependencies>
	<dependency>
  <groupId>org.hibernate</groupId>
  <artifactId>hibernate-core</artifactId>
  <version>5.4.33.Final</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.28</version>
</dependency>

</dependencies>

</project>
```

### Original: `oracle/oracle/hibernate.cfg.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
		"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
		"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">oracle.jdbc.driver.OracleDriver</property>
        <property name="hibernate.connection.password">tiger</property>
        <property name="hibernate.connection.url">jdbc:oracle:thin:@localhost:1521:xe</property>
        <property name="hibernate.connection.username">scott</property>
        <property name="hibernate.dialect">org.hibernate.dialect.Oracle10gDialect</property>
        <property name="show_sql">true</property>
        <property name="hibernate.hbm2ddl.auto">create</property>
        <mapping class="modelo.Usuario"/>
    </session-factory>
</hibernate-configuration>

```

### Original: `oracle/oracle/pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>distancia.acceso</groupId>
	<artifactId>hibernate.maven.oracle2</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>HibernateMavenOracle2</name>
	<properties>
		<maven.compiler.target>11</maven.compiler.target>
		<maven.compiler.source>11</maven.compiler.source>
	</properties>
	<dependencies>
	<dependency>
  <groupId>org.hibernate</groupId>
  <artifactId>hibernate-core</artifactId>
  <version>5.4.33.Final</version>
</dependency>
<!-- https://mvnrepository.com/artifact/com.oracle.database.jdbc/ojdbc10 -->
<dependency>
    <groupId>com.oracle.database.jdbc</groupId>
    <artifactId>ojdbc10</artifactId>
    <version>19.12.0.0</version>
</dependency>
</dependencies>

</project>
```

### Original: `sqlite/sqlite/hibernate.cfg.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE hibernate-configuration PUBLIC
		"-//Hibernate/Hibernate Configuration DTD 3.0//EN"
		"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">
<hibernate-configuration>
    <session-factory>
        <property name="hibernate.connection.driver_class">org.sqlite.JDBC</property>
    
        <property name="hibernate.connection.url">jdbc:sqlite:C:\\sqlite\\ejemplo.db</property>
     
        <property name="hibernate.dialect">org.sqlite.hibernate.dialect.SQLiteDialect</property>
        <property name="show_sql">true</property>
        <property name="hibernate.hbm2ddl.auto">create</property>
        <mapping class="modelo.Usuario"/>
    </session-factory>
</hibernate-configuration>

```

### Original: `sqlite/sqlite/pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>distancia.acceso</groupId>
	<artifactId>hibernate.maven.oracle2</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>HibernateMavenOracle2</name>
	<properties>
		<maven.compiler.target>11</maven.compiler.target>
		<maven.compiler.source>11</maven.compiler.source>
	</properties>
	<dependencies>
	<dependency>
  <groupId>org.hibernate</groupId>
  <artifactId>hibernate-core</artifactId>
  <version>5.4.33.Final</version>
</dependency>

<!-- https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc -->
<dependency>
    <groupId>org.xerial</groupId>
    <artifactId>sqlite-jdbc</artifactId>
    <version>3.42.0.0</version>
</dependency>
<dependency>
    <groupId>com.github.gwenn</groupId>
    <artifactId>sqlite-dialect</artifactId>
    <version>0.1.2</version>
</dependency>
    


</dependencies>

</project>
```
