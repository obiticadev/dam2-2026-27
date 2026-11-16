# pom.xml

> **Módulo:** Acceso a Datos — DAM 2
> **Procedencia:** [Archivo extraído](pom.xml) · [ZIP original](../../../../originales/UT03-mapeo-objeto-relacional/222163-Ficheros%20de%20configuraci%C3%B3n%20Carpeta/a1b5d640e5-ficheros%20de%20configuraci%C3%83%C2%B3n%20para%20proyecto.zip)
> **Criterio:** transcripción del material docente, sin resumir ni actualizar sus versiones.

## Índice

- [Contenido íntegro](#contenido-integro)

---

<a id="contenido-integro"></a>
## Contenido íntegro

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
