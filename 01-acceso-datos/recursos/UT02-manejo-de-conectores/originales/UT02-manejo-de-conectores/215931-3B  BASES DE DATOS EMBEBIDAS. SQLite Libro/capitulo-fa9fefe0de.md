Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215931&chapterid=36226

### 1. Introducción

#### 1.1. Características SQLite

SQLite es un sistema de gestión de bases de datos que se diferencia de bases de datos convencionales como MySQL u Oracle en que esta lee y escribe archivos binarios independientes, un estilo similar al de las bases de datos hechas en Microsoft Acces s.

Fue escrita en lenguaje C y es de dominio público, por lo que puede ser utilizada en cualquier tipo de proyectos, sean libres o comerciales. Además tiene **características** muy interesantes:

* **Es pequeña.** Dependiendo de la plataforma, toda la biblioteca se maneja desde un único archivo (shell de comandos) de apenas 500KB.
* **SQL**. Se utiliza el mismo lenguaje de consulta SQL, por lo que de entrada es fácil usarlo.
* **Es multiplataforma,** incluso hay una gran cantidad de documentación para conectarlo con lenguajes como Java, PHP, Python, .NET, entre otros.
* Las bases de datos **se guardan en un fichero** con extensión «.db».
* Dada su presentación, **puede funcionar en dispositivos** y máquinas con características de **hardware limitadas** tales como tabletas o dispositivos móviles (es muy popular en Android).
* **SQLite  no se requiere configurar**, crear usuarios, etc después de  su instalación, a diferencia de otros gestores, bastará con bajarse «la shell de comandos» de SQLite para empezar a trabajar.
* Al no haber gestión de usuarios, como por ejemplo, en MySQL en donde teníamos que definir varios parámetros para conectarnos, en SQLite la **seguridad se basa en los permisos de ficheros establecidos en  el Sistema Operativo.**
* Si el usuario lo requiere, puede **descargarse aplicaciones para tener interfaz grafica** a la base de datos.

**Ventajas:**

* No requiere un proceso o sistema de servidor separado para funcionar (sin servidor).
* Viene con configuración cero, lo que significa que no se necesita configuración ni administración.
* Una base de datos SQLite completa se almacena en un solo archivo de disco multiplataforma.
* Es  muy pequeño.
* Es autónomo, lo que significa que no hay dependencias externas.
* Tiene transacciones.
* Admite la mayoría de las características del lenguaje de consulta que se encuentran en el estándar SQL92 (SQL2).
* Está escrito en ANSI-C y proporciona una API simple y fácil de usar.
* SQLite esta disponible para varios sistemas operativos.

**Desventajas:**

No tiene implementado el estándar SQL92 (SQL2):

* Solo esta implementado LEFT OUTER JOIN
* Las opciones de ALTER TABLE siguientes no estan disponibles:  DROP COLUMN, ALTER COLUMN, ADD CONSTRAINT.
* Solo es posible crear disparadores a nivel de fila.
* Las vistas en SQLite son de solo lectura.