Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36209

### 4. Drivers de Oracle

**Tipos de drivers JDBC que Oracle**

**Oracle ofrece 3 formas distintas** para conectar aplicaciones Java con una base de datos Oracle. Cada una con características propias

* **JDBC Thin Driver (Tipo 4),**
  + **Qué es:** Un driver escrito 100% en Java que se conecta **directamente** a Oracle usando sockets TCP/IP, sin necesidad de instalar software cliente de Oracle en la máquina.
  + **Ventaja:** Es independiente de la plataforma (funciona en Windows, Linux, Mac, etc.) y hasta puede ejecutarse desde un navegador web (applets, en su época).
  + **Cómo se usa (formatos de URL):**
  + Los  formatos de URL:

    - * SID: (ya no se recomienda para uso de Oracle)  

        ```
         jdbc: oracle: thin: [<user> / <password>] @ <host> [: <port>]: <SID>
        ```
      * Servicios (recomendado):  

        ```
         jdbc: oracle: thin: [<user> / <password>] @ // <host> [: <port>] / <service>
        ```
      * TNSNames (usando un alias definido en el archivo `tnsnames.ora)`:  

        ```
         jdbc: oracle: thin: [<user> / <password>] @ <TNSName>
        ```
* **JDBC [OCI](http://www.orafaq.com/wiki/OCI "OCI") (Oracle Call Interfaces)** (Tipo 2)
  + **Qué es:** Un driver que usa las **interfaces nativas** de Oracle (OCI) a través de SQL\*Net. Es decir, **necesita tener instalado el cliente de Oracle** en la máquina.
  + **Ventaja:** Ofrece mayor compatibilidad con una versión específica de Oracle y mejor rendimiento en ciertos casos.
  + **Desventaja:** Es **específico de la plataforma** (no es portable como el Thin), porque usa bibliotecas nativas.
  + Ejemplo de formato de URL:

    ```
    jdbc: oracle: oci: @myhost: 1521: orcl
    ```
* JDBC KPRB driver (default connection)
  + **Qué es:** Un driver especial que se usa **dentro de la propia base de datos Oracle**, por ejemplo, para escribir **procedimientos almacenados en Java** o **JSP** que corren en el servidor.
  + **Característica clave:** Usa la **sesión actual de la base de datos**, por lo que **no necesitas usuario, contraseña ni URL**.
  + Se puede obtener un identificador de la conexión predeterminada o actual (controlador KPRB) llamando al método OracleDriver.defaultConnection ().

Encontraras la documentación de estos tres tipos de drivers es la pagina : [JDBC Oracle](http://www.orafaq.com/wiki/JDBC)