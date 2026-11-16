Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=215930&chapterid=36218

### 3. Conexión a bases de datos con API JDBC

#### 3.1. Arquitectura JDBC

En el **modelo de dos capas**, una aplicación se comunica directamente a la fuente de datos. Esto necesita un conector JDBC que pueda comunicar con la fuente de datos específica a la que acceder.

**Los comandos o instrucciones del usuario se envían a la base de datos y los resultados se devuelven al usuario.** La fuente de datos puede estar ubicada en otra máquina a la que el usuario se conecte por red. A esto se denomina configuración cliente/servidor, con la máquina del usuario como cliente y la máquina que aloja los datos como servidor.

#

En el **modelo de tres capas**, los comandos se envían a una capa intermedia de servicios, la cual envía los comandos a la fuente de datos. La fuente de datos procesa los comandos y envía los resultados de vuelta la capa intermedia, desde la que luego se le envían al usuario.

![](assets/565c89ec8088-image (1).png)

**Incorrecto.**  Son dos APIs distintas.

**Correcto.**  Son dos APIs distintas.

&lt;div class="feedback"&gt;&lt;strong&gt;Falso.&lt;/strong&gt; Son dos APIs distintas.
&lt;/div&gt;