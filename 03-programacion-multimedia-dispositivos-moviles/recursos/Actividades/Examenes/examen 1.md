# RA2-Tarea: Persistencia con Room

> **Módulo:** Programación Multimedia y Dispositivos Móviles (`PMM_V`)  
> **Unidad:** UT03 - Desarrollo de aplicaciones básicas para Android  
> **Actividad evaluable:** RA2 - Tarea persistencia con Room  
> **Apertura:** miércoles, 29 de octubre de 2025, 00:00  
> **Cierre:** viernes, 14 de noviembre de 2025, 23:00

---

## Contenidos

1. [Enunciado](#enunciado)
2. [Definición de entidades](#definición-de-entidades)
3. [Formato de la entrega](#formato-de-la-entrega)
4. [Criterios de evaluación](#evaluación)
5. [Estado de la entrega](#estado-de-la-entrega)

---

## ENUNCIADO

Crea una aplicación que permita al usuario gestionar un catálogo de libros y
autores, donde un autor puede tener múltiples libros pero cada libro pertenece a
un único autor.

- Debe permitir visualizar, agregar, editar y eliminar tanto autores como
  libros.
- La entidad Autor estará compuesta por los campos: id, name, birthYear,
  nationality y biography.
- La entidad Libro estará compuesta por los campos: id, title, authorId, isbn, y
  publishYear.

---

## Definición de entidades

### Entidad Autor

| Campo         | Tipo     | Restricción   | Descripción     |
| :------------ | :------- | :------------ | :-------------- |
| `id`          | `Long`   | `@PrimaryKey` | ID del autor    |
| `name`        | `String` | Obligatorio   | Nombre completo |
| `birthYear`   | `Int`    | Opcional      | Año nacimiento  |
| `nationality` | `String` | Opcional      | Nacionalidad    |
| `biography`   | `String` | Opcional      | Biografía       |

### Entidad Libro

| Campo         | Tipo     | Restricción   | Descripción     |
| :------------ | :------- | :------------ | :-------------- |
| `id`          | `Long`   | `@PrimaryKey` | ID del libro    |
| `title`       | `String` | Obligatorio   | Título de obra  |
| `authorId`    | `Long`   | `@ForeignKey` | Vínculo a Autor |
| `isbn`        | `String` | Único         | Código ISBN     |
| `publishYear` | `Int`    | Opcional      | Año publicación |

---

## FORMATO DE LA ENTREGA

- Deberás entregar el **APK** y el **código** utilizando la opción exportar de
  Android Studio.
- El nombre de los ficheros deberá seguir el formato
  **nombre_apellido1_apellido2**

---

## EVALUACIÓN

- Se comprobará el funcionamiento correcto de la aplicación instalando el APK en
  un móvil Android, de modo que si no se ejecuta o da errores, se evaluará
  automáticamente con un 0.
- Posteriormente, se realizará una inspección del código para evaluar la
  implementación de la solución.
- Deberás realizar el desarrollo en base a los contenidos trabajados en clase.
- Cuando el profesor tenga dudas de la autoría del trabajo o de la comprensión
  de la solución aportada por parte de alumno, podrá requerir una defensa oral
  del trabajo.

---

## Estado de la entrega

| Campo               | Estado                                |
| :------------------ | :------------------------------------ |
| **Entrega**         | Todavía no se han realizado envíos    |
| **Calificación**    | Sin calificar                         |
| **Tiempo restante** | Tarea retrasada por 311 días 15 horas |
