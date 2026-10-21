# UT02-A — Prompts para podcast de NotebookLM

## Uso y parámetros

Selecciona únicamente la fuente **«UT02-A - Manejo de ficheros - Resumen completo»**. Copia **un bloque** por generación en la personalización del resumen de audio. Idioma: español. Si se ofrecen formato y extensión, elige explicación en profundidad y extensión larga para los episodios temáticos. Los nombres y opciones concretos de la interfaz pueden variar.

**NIO está excluido del examen.** No subir el temario 2A completo sin filtrar: podría introducir ese capítulo en los audios. Este archivo de prompts no es una fuente de teoría: no hace falta subirlo al cuaderno.

La serie recomendada son los cinco episodios P-A1 a P-A5; P-A0 sirve de orientación y P-A6/P-A7, de repaso. Es mejor repartir los detalles que pedir que quepan todos en una sola grabación. Las duraciones o pausas solicitadas no se garantizan; revisar siempre el audio generado.

## P-A0. Mapa global sin omitir las distinciones fundamentales

```text
Genera un resumen de audio en español para un estudiante de segundo de DAM que prepara el primer examen de Acceso a Datos, con preguntas tipo test difíciles de una sola respuesta correcta. Usa solo la fuente UT02-A - Manejo de ficheros - Resumen completo. NIO queda expresamente fuera: no expliques Path, Files, canales, selectores ni StandardOpenOption.

Presenta un mapa razonado de A01-A10 y A14-A15: persistencia, dirección de E/S, bytes frente a caracteres, composición de flujos, texto/binario frente a secuencial/aleatorio, File, FilenameFilter, copia por bloques, serialización, lectores/escritores, operaciones secuenciales y RandomAccessFile. Explica qué problema resuelve cada familia y qué no resuelve. Incluye un ejemplo mínimo por familia y señala sus enlaces conceptuales.

Destaca creación de objeto frente a archivo físico, -1 frente a null y cadena vacía, off frente a len, byte frente a int, cast frente a deserialización, truncado frente a anexado, seek absoluto frente a salto relativo. No recites listados de imports. Lee los nombres técnicos con precisión y traduce su significado sin inventar métodos.

Prioriza el desarrollo elaborado. El anexo es respaldo, no otro temario que repetir; sus errores no anulan las aclaraciones de A15. No atribuyas preguntas al profesor ni inventes ponderación. Termina enumerando los cinco bloques que requieren un episodio propio para cubrir los detalles.
```

## P-A1. Persistencia, jerarquía, `File` y filtros

```text
Genera un audio de estudio en español basado exclusivamente en A01-A05 y los matices relacionados de A15 de UT02-A - Manejo de ficheros - Resumen completo. Nivel: segundo de DAM; objetivo: discriminar respuestas muy parecidas de un test. NIO no entra: exclúyelo por completo.

Orden: persistencia y dirección de E/S; abstracciones InputStream/OutputStream/Reader/Writer; origen físico frente a envoltorio; ejes texto/binario y secuencial/aleatorio; File; FilenameFilter. Para File explica los tres constructores, ruta relativa respecto al directorio de trabajo, ruta absoluta/canónica, getters y sus tipos, existencia/tipo/permisos, length/lastModified y sus ceros ambiguos, createNewFile, mkdir/mkdirs, delete/deleteOnExit, renameTo, temporales y raíces. Distingue método estático de método de instancia y false de excepción.

En filtros explica accept(File dir, String name), significado y tipo de cada argumento, true/false, polimorfismo, array de String frente a File, filtro null, array vacío frente a null, extensión sensible a mayúsculas y directorios que terminan en .txt. Usa un caso concreto y compáralo con dos variantes.

Por cada distinción: regla correcta, distractor plausible y contraejemplo que lo invalida. No deduzcas existencia por construir File, tamaño cero ni permisos consultados. El anexo solo sirve de consulta; prioriza las correcciones del desarrollo. Cierra con cinco comprobaciones breves y explica la respuesta antes de seguir.
```

## P-A2. Bytes, parámetros, copia y primitivas

```text
Genera un audio detallado en español sobre A06 y las relaciones con A02 y A09 de UT02-A - Manejo de ficheros - Resumen completo. Preparo un test de segundo de DAM con distractores sutiles. No incluyas NIO ni Files/Path.

Explica FileInputStream y FileOutputStream: constructores con String/File, append true/false, creación, ausencia de padres, truncado al abrir, fallos de apertura y cierre. Desglosa read(), read(byte[]), read(byte[],off,len), write(int), write(byte[]), write(byte[],off,len), available y close. Para cada firma, separa datos que recibe, tipo y significado del retorno, efectos y condición de EOF. Explica por qué read() devuelve int y write(int) solo escribe un byte bajo.

Recorre la traza ABCDEF con búfer de cuatro bytes, aclarando que esa fragmentación es posible, no garantizada. Muestra los restos C y D en la última lectura y por qué se escribe solo leidos. Distingue índices del array y puntero del archivo. Explica rango válido, extremo exclusivo, lectura parcial y longitud cero.

Compara write(65), writeInt(65) y escribir la cadena de dígitos 65. Introduce DataOutputStream/DataInputStream, acuerdo de orden/tipos y diferencia de writeUTF con texto UTF-8 normal. No inventes que available es tamaño total o detector fiable de EOF. Termina con una mini batería oral de trazas y sus explicaciones. Prioriza los matices añadidos frente a simplificaciones del anexo.
```

## P-A3. Serialización binaria y compatibilidad

```text
Genera un audio en español dedicado a A07 y sus advertencias de UT02-A - Manejo de ficheros - Resumen completo. Nivel segundo de DAM; entrenamiento para test exigente. Excluye NIO, XML/JAXB salvo una frase para no confundir mecanismos, y ampliaciones no desarrolladas en la fuente.

Explica serialización y deserialización binaria, Serializable como interfaz marcadora, composición ObjectOutputStream/FileOutputStream y ObjectInputStream/FileInputStream, writeObject, readObject y cast. Identifica qué operación convierte bytes en objetos y cuál solo comprueba el tipo de referencia. Explica grafo de objetos, miembros no serializables, disponibilidad de clases, compatibilidad y papel de serialVersionUID.

Contrasta campos privados normales, static y transient; da los valores por defecto de int, boolean y String al recuperar, sin suponer que se reejecutan inicializadores. Distingue estado de objeto, identidad, código de métodos y toString. Usa los ejemplos Alumno y Persona; advierte del orden real de argumentos del constructor Alumno, no de su apariencia semántica.

Explica IOException, ClassNotFoundException, NotSerializableException, InvalidClassException y ClassCastException en su contexto. Desmonta la falsa solución de anexar varios ObjectOutputStream nuevos con append=true, por sus cabeceras intermedias. Explica try-with-resources y cierre ante fallos. Trata serialVersionUID y seguridad como aclaraciones, no como preguntas oficiales. Cierra comparando cinco afirmaciones casi correctas con su versión exacta.
```

## P-A4. Caracteres, codificación y operaciones secuenciales

```text
Genera un audio de profundización en español sobre A08 y A09 de UT02-A - Manejo de ficheros - Resumen completo, usando A02 y A15 para aclarar confusiones. NIO no forma parte del examen: no expliques Files, Path ni canales. La codificación de los Reader/Writer sí se estudia.

Explica Reader y Writer; InputStreamReader como bytes a caracteres y OutputStreamWriter como dirección inversa; FileReader/FileWriter y sus constructores con codificación y append; BufferedReader/BufferedWriter, tamaño del búfer, readLine, newLine, flush y close; papel citado de PrintWriter y StringWriter. Distingue byte, char UTF-16, símbolo Unicode y bytes externos UTF-8, sin convertirlo en un curso de Unicode.

Desglosa parámetros y retornos. Recorre A seguido de dos saltos y B sin salto final: A, cadena vacía, B, null. Contrasta EOF de read con readLine y la pérdida de -1 al convertir demasiado pronto a char. Corrige expresamente getEncoding: no devuelve null por usar la codificación predeterminada, sino si el lector está cerrado. Un búfer no implica leer físicamente en cada llamada ni cambia por sí solo la codificación.

Compara copia byte a byte con copia por líneas: terminadores, codificación y salto final. Explica anexado con y sin newLine y el riesgo de línea vacía. Desarrolla búsqueda y eliminación por reescritura a temporal usando 1;Ana, 2;Luis y 3;Eva; no truncar el original antes de leerlo. Cierra con trampas y contraejemplos claros.
```

## P-A5. Acceso aleatorio y cálculo de posiciones

```text
Genera un audio preciso en español sobre A10 y el laboratorio A14 de UT02-A - Manejo de ficheros - Resumen completo. Nivel segundo de DAM; test de una respuesta correcta. Excluye NIO por completo.

Explica que RandomAccessFile permite leer y escribir según modo pero no hereda de InputStream/OutputStream. Desglosa constructores, r y rw, creación sin truncado en rw, puntero inicial, getFilePointer, length, seek, skipBytes, read/readLine, readFully, readInt/readDouble, write/writeBytes/writeXxx y close. Para cada operación separa retorno y efecto sobre el puntero; distingue -1, null y EOFException. No presentes writeBytes como UTF-8 ni length como contador de bytes leídos.

Usa registros sin cabecera de int id y double nota: 4+8=12 bytes. Sitúa índices 0,1,2 y distingue número ordinal e índice. Desarrolla inicio=índice*tamaño y campo=inicio+desplazamiento. Explica por qué la nota del índice 2 empieza en 28 y writeDouble deja el puntero en 36; tras seek(12) y readInt, queda en 16. Propón variantes antes de resolverlas.

Explica anexado mediante seek(length()), vuelta a cero y seek más allá del final sin crecimiento hasta escribir. Matiza que tamaño fijo facilita cálculo pero la clase no lo impone. Distingue writeChar, writeBytes, UTF-8 y writeUTF al calcular tamaños. Cierra interpretando los resultados del laboratorio, sin atribuir ejecución a todos los ejemplos originales.
```

## P-A6. Repaso de trampas, no repetición de todo el tema

```text
Genera un audio de repaso activo en español usando A15 y A16, con apoyo en A01-A10 de UT02-A - Manejo de ficheros - Resumen completo. El examen excluye NIO: no incluyas ninguna pregunta sobre ello. No leas literalmente el anexo ni las seis opciones de todas las preguntas.

Organiza la conversación en pares mínimos: ruta/archivo; new File/createNewFile; mkdir/mkdirs; array vacío/null; list/listFiles; InputStream/Reader; read unidad/read bloque; off/len; write/writeInt; append/truncado; null/cadena vacía/-1; charset/búfer; flush/close; Serializable/transient/static; readObject/cast; r/rw; seek/skipBytes; length/getFilePointer.

Para cada par formula una afirmación engañosa, deja una breve oportunidad de pensar, corrígela y da el mínimo contraejemplo que la demuestra falsa. Evita absolutos injustificados y casos sin condiciones. No memorices solo respuestas: explica el mecanismo causal. Respeta las correcciones sobre getEncoding, append de objetos y registros variables. Termina con una lista de errores que conviene volver a consultar y sus identificadores Axx.
```

## P-A7. Examen oral con opciones

```text
Genera un audio de autoevaluación en español con preguntas nuevas basadas en A01-A10 y A14-A16 de UT02-A - Manejo de ficheros - Resumen completo. NIO queda fuera. Preparo un test de hasta seis alternativas y una sola correcta.

Formula ocho preguntas: File/filtros, dos de bytes/parámetros, dos de caracteres/codificación, una de serialización y dos de acceso aleatorio. Usa seis alternativas breves A-F si el formato lo permite; no anuncies la respuesta por entonación ni por una introducción reveladora. Da una pausa breve para responder y luego explica la correcta y el error conceptual de las restantes, sin limitarte a decir verdadero/falso.

Todos los casos deben especificar existencia del archivo, modo, contenido, formato y posición inicial cuando influyan. No dependas del orden no garantizado del listado, de la codificación predeterminada ni de cómo un sistema operativo represente una ruta. Distribuye las respuestas y evita repetir las preguntas de A16 palabra por palabra. Identifica esta actividad como práctica añadida, no como preguntas oficiales. Si no caben ocho preguntas razonadas, prioriza explicar bien y declara los bloques pendientes.
```
