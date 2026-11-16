Fuente: https://aulavirtual3.educa.madrid.org/ies.alonsodeavellan.alcala/mod/book/view.php?id=221730&chapterid=36548

### 8. Mapeo de relaciones

#### 8.9. Identificadores

**Todas las clases de entidad persistentes necesitarán un identificador que puede ser un una atributo identificador o un objeto de una clase de identificación.** De hecho, la mayoría de las aplicaciones (en especial las aplicaciones web) necesitan distinguir los objetos por identificador.

 

El atributo de identificador no necesariamente debe asignarse a columnas que definen físicamente la clave principal. Sin embargo, debe asignarse columnas que puedan identificar forma única cada fila.

Como norma general utilizaremos como identificador  la  clave primaria de la base de datos. El atributo  puede llamarse como sea, y su tipo puede ser cualquiera de los tipos de dato primitivos, cualquier clase  "envoltorio" (wrapper), java.lang.String, o java.util.Date.

(1) wapper classes proporcionan una manera de utilizar los tipos de datos primitivos ( int, boolean , etc ..) como objetos. Consulta este [enlace](https://www.w3schools.com/java/java_wrapper_classes.asp)