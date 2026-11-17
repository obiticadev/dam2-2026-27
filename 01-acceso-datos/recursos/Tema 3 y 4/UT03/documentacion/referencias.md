# UT03 · Referencias de Hibernate y JPA

[Inicio de la entrega](../../INDICE.md) · [Documentación de UT03](INDICE.md) · [Fundamentos ORM](../contenidos/4A-mapeo-objeto-relacional.md) · [Proyecto](../contenidos/4B-proyecto-hibernate.md) · [Consultas](../contenidos/4C-consultas.md)

<a id="indice"></a>
## Índice de apartados

- [Documentación correspondiente al entorno docente](#nav-documentacion-correspondiente-al-entorno-docente)
- [Java y buenas prácticas](#nav-java-y-buenas-practicas)
- [Vídeos del material](#nav-videos-del-material)
- [Referencias históricas y recursos ausentes](#nav-referencias-historicas-y-recursos-ausentes)

<a id="nav-documentacion-correspondiente-al-entorno-docente"></a>
## Documentación correspondiente al entorno docente

| Referencia | Uso |
|---|---|
| [Hibernate ORM 5.4 · Guía de usuario](https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html) | Mapeos, relaciones, cascadas, contexto, HQL y consultas. |
| [Hibernate ORM 5.4 · API](https://docs.jboss.org/hibernate/orm/5.4/javadocs/) | Índice de clases y métodos para la versión de los ejemplos. |
| [Hibernate 5.4: Session](https://docs.jboss.org/hibernate/orm/5.4/javadocs/org/hibernate/Session.html) | Carga, persistencia, merge y ciclo de vida. |
| [Hibernate 5.4: Query](https://docs.jboss.org/hibernate/orm/5.4/javadocs/org/hibernate/query/Query.html) | Parámetros, resultados y paginación. |
| [JPA 2.2 · API javax.persistence](https://jakarta.ee/specifications/persistence/2.2/apidocs/javax/persistence/package-summary.html) | Anotaciones y API del namespace utilizado. |
| [Hibernate · Portal de documentación](https://hibernate.org/orm/documentation/) | Comparar versiones; las versiones actuales no son intercambiables con 5.4. |
| [Maven · Introducción al POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html) | Dependencias, estructura del proyecto y plugins. |

La entrega mantiene **javax.persistence**, aunque la especificación posterior se llame Jakarta Persistence. No se titula «API jakarta.persistence» un enlace que en realidad documenta el paquete javax.

[↑ Volver al índice](#indice)

<a id="nav-java-y-buenas-practicas"></a>
## Java y buenas prácticas

- [Contrato de equals y hashCode · Object, Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/lang/Object.html): identidad lógica, igualdad y uso en colecciones.
- [List · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/List.html): colecciones ordenadas.
- [Set · Java 11](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/Set.html): unicidad según equals/hashCode.
- [Cascadas JPA e Hibernate · Vlad Mihalcea](https://vladmihalcea.com/a-beginners-guide-to-jpa-and-hibernate-cascade-types/): explicación complementaria del alcance de las cascadas.

[↑ Volver al índice](#indice)

<a id="nav-videos-del-material"></a>
## Vídeos del material

- **[Hibernate ORM - Java](https://www.youtube.com/watch?v=_F_-wNCahL0)** — Yirsis Hertz.
- **[1 Introducción - Curso Hibernate - OpenBootcamp](https://www.youtube.com/watch?v=BJY4966Z3KY)** — OpenBootcamp.

Títulos y autores identificados mediante oEmbed; no se dejan las etiquetas «watch». No se certifica que sus versiones coincidan con las del proyecto ni se afirma haber revisado íntegramente sus contenidos.

[↑ Volver al índice](#indice)

<a id="nav-referencias-historicas-y-recursos-ausentes"></a>
## Referencias históricas y recursos ausentes

El material utilizaba páginas de cursohibernate.es, documentación de Hibernate 4.1 y notas numeradas como «1)», «10)» o «11)». Las notas se agrupan con su tema en vez de presentarse como recursos separados. Se sustituyen las búsquedas de Google con redirección «I'm Feeling Lucky» por documentación identificable.

Las dos imágenes externas PlantUML de HQL no estaban disponibles y no se han inventado. Tampoco existe un adjunto recuperado para el capítulo «proyecto completo» de 4B. Los modelos y programas completos de esta edición son **soluciones editoriales identificadas**, no esas fuentes ausentes.

Las fuentes completas de extracción permanecen fuera de `entrega-final/`. Para estudiar se utilizan los documentos terminados y las referencias seleccionadas, no una lista automática de todo enlace que apareciera en el HTML.

[Resultados de comprobación de enlaces](../../documentacion/VALIDACION.md).

[↑ Volver al índice](#indice)
