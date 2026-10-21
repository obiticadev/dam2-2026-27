# UT02-A — Prompts para cuestionarios de NotebookLM

## Cómo usarlos

Selecciona solo **«UT02-A - Manejo de ficheros - Resumen completo»**. En la creación/personalización de cuestionarios de Studio, elige dificultad alta y la cantidad disponible que prefieras; pega un prompt de abajo. Las cantidades son objetivos de práctica, **no ponderaciones del examen**.

La interfaz puede fijar su propio número de opciones o preguntas. Si no respeta las seis alternativas A–F, usa el prompt Q-A6 en el **chat**, donde se solicita el simulacro como texto. Una instrucción no garantiza que el cuestionario nativo admita seis opciones. No hace falta subir este archivo como fuente.

**Regla de alcance:** no entra NIO; ni cuestionarios de `Path`, `Files`, canales o selectores. Los buffers de `java.io`, `RandomAccessFile` y la codificación de lectores/escritores sí entran. Usa los matices del desarrollo, no errores conservados en el anexo.

## Q-A0. Cuestionario completo de la unidad

```text
Crea un cuestionario difícil en español basado solo en UT02-A - Manejo de ficheros - Resumen completo. Objetivo orientativo: 30 preguntas; si la herramienta fija otra cantidad, respeta su límite y conserva diversidad. Nivel segundo de DAM. NIO está excluido: no preguntes por Path, Files, canales, selectores ni StandardOpenOption.

Distribución pedagógica aproximada, no oficial: 15% persistencia/jerarquía/acceso, 20% File y filtros, 20% bytes/parámetros/primitivas, 15% serialización, 15% caracteres/codificación y 15% RandomAccessFile. Incluye todos los grupos aunque cambie la cantidad. Alterna conceptos, contratos de métodos, lectura de código, resultados y detección de errores.

Solicito seis opciones A-F y una sola inequívocamente correcta por pregunta, cuando el formato lo permita. Distractores plausibles basados en confusiones de la fuente; no opciones absurdas ni varias correctas parcialmente. Define contenido, modo, charset, existencia y posición inicial si influyen. No dependas de orden de listado o datos del sistema sin fijarlos. Evita preguntas de memoria sobre nombres de personas y rutas anecdóticas.

Prioriza A01-A10 y A14-A16; el anexo es respaldo, no fuente para contradecir sus correcciones. Usa matices como false/excepción, null/vacío/-1, off/len, write/writeInt, transient/static, append/cabeceras y seek absoluto. Al revisar cada respuesta, justifica la correcta y por qué falla cada distractor, indicando el apartado Axx. No presentes las preguntas como oficiales.
```

## Q-A1. `File`, rutas, creación y filtros

```text
Crea un cuestionario difícil en español de unas 15 preguntas sobre A01-A05 y los matices relacionados de A15 de UT02-A - Manejo de ficheros - Resumen completo. No incluyas NIO. Solicito seis alternativas por pregunta y una sola correcta si lo permite el formato.

Cubre abstracciones y direcciones de E/S; dos ejes texto/binario y secuencial/aleatorio; constructores File; ruta relativa al directorio de trabajo; absoluta/canónica; getters y retornos; length/lastModified y cero ambiguo; exists/isFile/isDirectory; createNewFile false frente a IOException; mkdir/mkdirs; delete/deleteOnExit; renameTo sin cambiar el objeto; temporales y raíces; FilenameFilter.accept(dir,name), polimorfismo y retorno booleano; list/listFiles, filtro null, array vacío/null, mayúsculas y directorios con extensión.

Incluye código corto con condiciones explícitas y preguntas de qué puede o no deducirse. No inventes que crear File toca disco, que un filtro solo acepta archivos regulares ni que list devuelve rutas completas. Cada distractor debe corresponder a una confusión real distinta. Explica todas las alternativas en la revisión y cita el apartado Axx. No repitas una pregunta solo cambiando nombres. No afirmes procedencia oficial.
```

## Q-A2. Bytes, copia y parámetros

```text
Crea unas 15 preguntas difíciles en español basadas en A06, con apoyo en A02 y A09, de UT02-A - Manejo de ficheros - Resumen completo. Excluye NIO. Solicito seis opciones y una correcta por pregunta, si el cuestionario lo permite.

Evalúa constructores FileInputStream/FileOutputStream, append, truncado al abrir, creación sin padres, read() int 0-255/-1, read(array) cantidad, off/len, límites y lectura parcial; write(int) byte bajo, write(array) y write(tramo); available no equivalente a EOF; cierre ante fallos; DataInputStream/DataOutputStream, orden de tipos, writeInt frente a write y writeUTF frente a texto normal.

Incluye al menos tres trazas con arrays pequeños. Si una fragmentación concreta es necesaria, establece en el enunciado qué devuelve cada lectura: no supongas que se llena siempre el búfer. Diferencia posición del array de posición del fichero. Compara copia binaria y copia por líneas sin introducir otras API fuera del alcance. Fija ASCII o bytes concretos cuando importe la codificación.

Distractores basados en errores típicos, no ambigüedades. No uses salida de código que no compila salvo que la pregunta trate expresamente de compilación. Al revisar, explica la correcta y descarta individualmente las cinco restantes; cita Axx. Estas son preguntas añadidas, no oficiales.
```

## Q-A3. Serialización binaria

```text
Crea un cuestionario difícil en español de unas 12 preguntas basado en A07 y sus aclaraciones de UT02-A - Manejo de ficheros - Resumen completo. No incluyas NIO ni desarrolles JAXB. Solicito seis opciones y una sola correcta si el formato lo admite.

Evalúa Serializable como marcadora sin métodos; clases envoltorio y destino; writeObject/readObject/cast; disponibilidad de clases; grafo serializable; campos private normales, static y transient; valores por defecto al recuperar; identidad frente a estado; serialVersionUID como compatibilidad; IOException/ClassNotFoundException/NotSerializableException/InvalidClassException/ClassCastException; try-with-resources; problema de abrir nuevos ObjectOutputStream en append por cabeceras repetidas.

Incluye fragmentos con estado antes/después y argumentos de constructor en orden explícito. No presupongas métodos de serialización personalizados salvo que aparezcan. No confundas cast con conversión de bytes, ni toString con formato persistente. Distingue enseñanza principal y aclaración añadida sin inventar preguntas del profesor.

Diseña distractores que difieran en una condición significativa. En la revisión, explica el mecanismo, cada alternativa y el apartado de referencia A07/A15. No reutilices literalmente las preguntas de muestra.
```

## Q-A4. Caracteres y operaciones secuenciales

```text
Crea unas 15 preguntas difíciles en español sobre A08-A09 y los matices relacionados de A15 de UT02-A - Manejo de ficheros - Resumen completo. NIO está fuera; no uses Files/Path. Solicito seis alternativas con una sola correcta cuando sea posible.

Evalúa Reader/Writer, InputStreamReader y OutputStreamWriter y su dirección, FileReader/FileWriter, charset y append, BufferedReader/BufferedWriter y composición, readLine sin terminador, null frente a cadena vacía, EOF con -1 en read, conversión temprana a char, newLine, flush/close, anexado con salto inicial, tamaño del búfer y acceso físico. Incluye Unicode/char/UTF-8 solo en los términos que desarrolla la fuente y corrige el error docente de getEncoding.

Añade trazas de archivos vacíos, línea vacía y última línea sin terminador; da literalmente sus caracteres. Pregunta por copia por líneas frente a conservación de bytes y por búsqueda/eliminación mediante temporal sin destruir la entrada. No atribuyas al búfer la selección de codificación ni supongas que cada readLine accede a disco.

Evita depender del separador de línea de un sistema sin fijarlo. En la revisión explica cada distractor y la condición que lo haría correcto, si procede, citando A08/A09/A15. No declares preguntas oficiales.
```

## Q-A5. Acceso aleatorio y problemas de posición

```text
Crea unas 15 preguntas difíciles en español centradas en A10 y A14 de UT02-A - Manejo de ficheros - Resumen completo. Sin NIO. Solicito seis opciones y una correcta por pregunta si la herramienta lo admite.

La mitad deben exigir trazar o calcular punteros: registros int+double de 12 bytes sin cabecera; índice base cero frente a número ordinal; inicio y desplazamiento de campo; seek/readInt/readDouble/writeDouble; anexar con seek(length()); diferencia length/getFilePointer. Fija siempre estado inicial, tamaño del archivo y secuencia de llamadas. No mezcles tamaños de formatos distintos.

El resto debe evaluar r/rw, ausencia de truncado al abrir rw, creación sin padres, seek absoluto frente a skipBytes relativo y retorno efectivo; -1 frente a null frente a EOFException; readFully llena o falla; writeBytes no UTF-8; writeChar y tamaño de caracteres; seek más allá del final no aumenta solo el tamaño; tamaño fijo útil pero no impuesto por la clase; no hereda de InputStream/OutputStream.

Cada alternativa numérica debe representar un error identificable: olvidar offset, contar desde uno, usar bytes de otro tipo o confundir posición inicial/final. En la revisión incluye el cálculo paso a paso y explica por qué fallan todas las restantes. No inventes que estos ejercicios son oficiales.
```

## Q-A6. Chat: simulacro con seis opciones en el formato textual solicitado

```text
Actúa como examinador de práctica de Acceso a Datos, nivel segundo de DAM. Usa solo UT02-A - Manejo de ficheros - Resumen completo. Alcance A01-A10 y A14-A16; NIO excluido. Genera ahora un simulacro en texto de 24 preguntas difíciles, exactamente seis alternativas etiquetadas A-F y una sola correcta por pregunta.

Reparte cuatro preguntas a cada área: fundamentos/jerarquía, File/filtros, bytes/primitivas, serialización, caracteres/secuencial y RandomAccessFile. No copies las muestras. Al menos ocho deben usar fragmentos o trazas. Define precondiciones y evita depender de plataforma, orden del listado, codificación predeterminada o particiones de lectura no garantizadas. Distractores plausibles y misma precisión/granularidad que la respuesta correcta; no uses todas/ninguna de las anteriores ni dobles negaciones innecesarias.

Primero entrega solo preguntas y una plantilla de respuesta 1-24, sin soluciones, pistas reveladoras ni respuesta correcta destacada. Espera a que envíe mis letras. Después corrige en una tabla pregunta/mi respuesta/correcta/bloque, y desarrolla para cada error la regla, el razonamiento y por qué falla cada opción, con referencia Axx. Puntúa solo aciertos sobre 24, sin inventar penalización oficial. Distingue omisión de error. Después propone cinco preguntas nuevas sobre mis confusiones sin repetir enunciados.

Antes de mostrar preguntas, revisa internamente que cada una tenga seis opciones y exactamente una correcta según las condiciones, priorizando los matices del resumen sobre errores conservados en el anexo.
```

## Q-A7. Chat: auditoría de un cuestionario generado

```text
Revisa el cuestionario que pegaré a continuación contrastándolo solo con UT02-A - Manejo de ficheros - Resumen completo. NIO está excluido del examen. No lo resuelvas por intuición: examina contratos, precondiciones y aclaraciones A15.

Por pregunta comprueba: seis alternativas cuando ese era el objetivo; una sola respuesta defendible; enunciado autosuficiente; retorno/efecto/excepción exactos; ausencia de dependencia no declarada del sistema, charset, estado del archivo o fragmentación de lectura. Detecta filtraciones de NIO, errores heredados del anexo, preguntas repetidas y pistas de redacción. Marca correcta/ambigua/incorrecta/fuera de alcance, explica la incidencia y ofrece una versión corregida con solución razonada. No inventes hechos para salvar una pregunta ambigua. Espera a que pegue el cuestionario.
```
