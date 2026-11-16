Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36216

### 5. Drivers MySQL

**Cómo MySQL permite a los desarrolladores conectar sus aplicaciones a la base de datos**, y en particular **la conexión desde Java**

##### 1. Controladores estándar para múltiples lenguajes

MySQL ofrece **drivers (controladores)** basados en estándares para que puedas conectarte desde distintos entornos:

| Estándar | Uso |
| --- | --- |
| **JDBC** | Aplicaciones Java |
| **ODBC** | Aplicaciones en C, C++, Python, Excel, etc. |
| **.NET** | Aplicaciones en C#, [VB.NET](https://vb.net/), etc. |

La idea es que **el desarrollador elija el lenguaje que prefiera** y MySQL le da el conector adecuado. Estos se descargan desde la página oficial de MySQL.

##### 2. Enfoque en JDBC: MySQL Connector/J

Aquí se centra en Java. MySQL ofrece **Connector/J**, que es el driver que permite a una aplicación Java hablar con MySQL --><https://dev.mysql.com/downloads/connector/j/>

* **Implementa la API JDBC**: es decir, cumple el estándar de Java para conectarse a bases de datos.
* **Añade extensiones propias**: además del estándar, agrega funcionalidades extra de MySQL.
* **Soporta X DevAPI**: una API moderna de MySQL para trabajar con documentos JSON y SQL (parte de MySQL 8+).

###### Características clave de Connector/J:

* **Es un driver JDBC Tipo 4**: esto significa que es **100% Java puro**, se comunica directamente con MySQL por red, **sin necesidad de instalar bibliotecas cliente de MySQL** en la máquina.
* **Compatible con JDBC 3.0 y JDBC 4.2**: hay versiones distintas según la especificación JDBC que necesites

##### 3. Frameworks de persistencia (para proyectos grandes)

Cuando el proyecto crece, escribir código JDBC "a mano" se vuelve tedioso y propenso a errores. Por eso se usan **frameworks de persistencia**, que **reducen la cantidad de código JDBC** que tienes que escribir, depurar, asegurar y mantener.