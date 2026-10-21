# UT02-B — Prompts para cuestionarios de NotebookLM

## Uso

Selecciona solo **«UT02-B - Librerías XML en Java - Resumen completo»**. Pega un prompt en la personalización del cuestionario de Studio y elige dificultad alta cuando se ofrezca. Las cantidades propuestas organizan la práctica; no son datos oficiales del examen.

Se solicitan seis alternativas, pero **el cuestionario nativo puede imponer otro formato**. Para un simulacro textual de seis opciones A–F, usa Q-B6 en el chat. No subas este archivo como teoría. Excluye NIO siempre; no afecta a que DOM, SAX, StAX y JAXB entren completos.

## Q-B0. Cuestionario de toda la unidad

```text
Crea un cuestionario difícil en español basado solo en UT02-B - Librerías XML en Java - Resumen completo. Segundo de DAM, primer examen de Acceso a Datos. Objetivo: 30 preguntas si la herramienta lo permite, con seis opciones y una sola correcta. Si la interfaz limita cantidad u opciones, respeta el límite pero mantén variedad. NIO queda fuera.

Distribución pedagógica orientativa, no oficial: 10% XML/elección de API, 30% DOM, 20% SAX, 20% StAX y 20% JAXB. Combina conceptos, firmas, parámetros, retornos, estado de eventos, resultados, orden de operaciones y detección de errores. No preguntes fechas, nombres de autores de libros o rutas anecdóticas como sustituto de comprender mecanismos.

Distractores plausibles: bien formado/validación; Document/Element; nodeValue/textContent; hijos/descendientes; null/cadena vacía; crear/insertar/guardar; caracteres fragmentados; push/pull; next/nextEvent; getters pasivos/getElementText consumidor; wrapper/ítem; propiedad Java/nombre XML; marshal/unmarshal; dependencia JAXB2 javax frente a jakarta.

Usa B01-B15 y sus correcciones; el anexo es respaldo. Fija XML, configuración y posición de cursor cuando influyan. No presupongas una partición concreta del texto ni un orden de atributos no garantizado. No haya dos respuestas correctas por matices omitidos. En la revisión explica cada alternativa, con referencia Bxx. Identifica todo como práctica añadida, no preguntas oficiales.
```

## Q-B1. DOM: árbol, navegación y extracción

```text
Crea unas 15 preguntas difíciles en español sobre B03-B05, con apoyo en B01 y B15, de UT02-B - Librerías XML en Java - Resumen completo. Solicito seis alternativas y una correcta si el formato lo admite. No incluyas NIO.

Evalúa factoría/builder, clases abstractas e interfaces, parse frente a newDocument y getDocumentElement; Document, Element, Text, Attr, NodeList y NamedNodeMap; getNodeName/getNodeValue/getTextContent según tipo; indentación y nodos no elemento; normalize; hijos frente a descendientes; alcance de Document/Element.getElementsByTagName; getLength/item y null; atributo ausente como cadena vacía y hasAttribute; precondiciones de los auxiliares docentes.

Incluye pequeños XML con anidación y nombres repetidos, uno sin coincidencia y otro con atributo vacío/ausente. Fija los espacios explícitamente cuando afecten a los hijos. No preguntes número exacto de Text si no se han fijado parser y representación necesarios; sí pregunta qué puede deducirse o no. No confundas normalización con validación o eliminación universal de espacios.

En la revisión explica el árbol o recorrido que lleva a la correcta y el error de cada distractor, citando Bxx. No uses dos opciones equivalentes formuladas de forma distinta ni inventes documentación del profesor.
```

## Q-B2. DOM: creación y transformación

```text
Crea unas 12 preguntas difíciles en español sobre B06 y las precondiciones de B03-B05 de UT02-B - Librerías XML en Java - Resumen completo. NIO está excluido. Solicito seis opciones por pregunta y una sola correcta si el formato lo permite.

Evalúa crear Document vacío, raíz y elementos; createElement/createTextNode/createAttribute; setAttribute/setAttributeNode; appendChild; crear frente a insertar; efectos de setTextContent; mover frente a clonar; removeChild sobre hijo directo; TransformerFactory/Transformer; DOMSource/StreamResult; Source/Result; transform; archivo frente a consola; indentación frente a transformación; memoria frente a persistencia.

Plantea secuencias de operaciones y pregunta qué estructura XML resulta o qué paso falta. Si un fragmento falla, especifica si se pregunta por compilación o ejecución. No exijas que catalogo.txt deje de ser XML por la extensión ni que cambiar el árbol escriba automáticamente en origen. No pidas una serialización byte a byte cuyo formato no esté fijado: evalúa estructura y valores.

Cada distractor debe fallar por una razón concreta: origen/destino invertido, nodo no insertado, atributo convertido en hijo, raíz duplicada, operación que no guarda o precondición incumplida. Explica todas las opciones al revisar y cita B06 u otro bloque pertinente. No son preguntas oficiales.
```

## Q-B3. SAX y reconstrucción del texto

```text
Crea unas 15 preguntas difíciles en español sobre B07-B08 de UT02-B - Librerías XML en Java - Resumen completo. Excluye NIO. Solicito seis alternativas y una sola correcta cuando sea posible.

Evalúa modelo push y una pasada; factoría/parser/handler; DefaultHandler y sobrescritura; start/endDocument, start/endElement y characters; uri/localName/qName según configuración; Attributes y getValue; ch/start/length; acumulación StringBuilder; reinicio y procesamiento al cierre; espacios; etiquetas vacías; estado de anidación y límites del handler original; InputSource con bytes frente a Reader y setEncoding.

Incluye trazas que especifiquen una partición posible del texto en varias llamadas. No des por garantizada esa partición para todos los parsers. Pregunta qué algoritmo sigue siendo correcto aunque cambie la partición. Evalúa el tramo válido del array con índices y cantidad diferentes. No confíes en equalsIgnoreCase como una regla del lenguaje XML.

Evita exigir retrollamada de comentarios en DefaultHandler básico sin el manejador/configuración que corresponda. Prioriza la fuente y sus aclaraciones. En la revisión muestra acumulador antes/después y explica individualmente cada distractor, citando B07/B08. No presentes estos ejercicios como oficiales.
```

## Q-B4. StAX: estado y avance

```text
Crea unas 15 preguntas difíciles en español sobre B09-B11 de UT02-B - Librerías XML en Java - Resumen completo. Segundo de DAM; NIO está excluido. Solicito seis opciones y una sola correcta si el formato lo permite.

Evalúa pull frente a push; cursor y eventos; XMLInputFactory y lectores; next int frente a nextEvent XMLEvent; hasNext sin consumo; START_DOCUMENT inicial; getters válidos por estado; getName/QName/getLocalPart; atributos asociados y su orden no semántico; fragmentación de texto; getText frente a getElementText; precondición START_ELEMENT y postcondición END_ELEMENT; elemento vacío y subelemento; asStartElement sin avance; Iterator de Attribute; peek; evento local retenido frente a estado del lector; cierre de lector/origen y ausencia de AutoCloseable en lectores StAX JDK17.

Incluye al menos cinco trazas con XML y posición inicial exactos. Distingue getElementText del cursor y del lector de eventos en su contexto, sin confundir eventos consumidos con objetos ya guardados. No asumas un número exacto de eventos CHARACTERS sin fijarlo. En la revisión muestra estado antes y después de cada llamada relevante y descarta todos los distractores con referencia Bxx. No inventes preguntas oficiales.
```

## Q-B5. JAXB: anotaciones, dependencias y ciclo

```text
Crea unas 15 preguntas difíciles en español sobre B12-B13 y sus matices en B15 de UT02-B - Librerías XML en Java - Resumen completo. No incluyas NIO. Solicito seis opciones con una correcta cuando lo admita el formato.

Evalúa binding frente a DOM/serialización binaria; JAXB2 javax.xml.bind y dependencias en JDK17 sin migrarlo a jakarta; contexto, marshaller/unmarshaller; dirección Java/XML; parámetros de marshal y retorno/cast de unmarshal(File); formato frente a validación; generación desde XSD frente a clases manuales; getters/setters y constructor sin argumentos; XmlRootElement, XmlType/propOrder, XmlElement, XmlAttribute, XmlElementWrapper y name; wrapper ListaLibro e ítems Libro; propiedad Java frente a nombre XML; posibilidad de XmlType en raíz.

Incluye reconstrucción de XML a partir de anotaciones y elección de anotaciones para un XML dado. Añade el matiz del XSD: secuencia raíz ListaLibro/lugar/nombre no garantizada solo por propOrder en Libro; cero o muchos Libro. No inventes que formatted output valida, que Serializable es obligatorio o que tener solo API garantiza implementación.

Usa exactamente la versión del curso. Evita respuestas dependientes de un orden de salida no declarado. En revisión explica todas las alternativas y cita B12/B13/B15. No atribuyas ejecución real de JAXB ni origen oficial a las preguntas.
```

## Q-B6. Chat: simulacro textual de seis alternativas

```text
Genera un simulacro difícil en español de 30 preguntas de Acceso a Datos a partir únicamente de UT02-B - Librerías XML en Java - Resumen completo. Nivel segundo de DAM; no hay preguntas oficiales disponibles. NIO está fuera. Cada pregunta debe tener exactamente seis opciones A-F y una sola correcta.

Reparto de práctica: 3 preguntas XML/elección de API, 9 DOM, 6 SAX, 6 StAX y 6 JAXB. Incluye al menos diez con XML, código o traza. Fija precondiciones, tipos de nodo, posición de cursor y versión JAXB cuando sean necesarios. No dependas de orden de atributos, fragmentación no garantizada ni serialización textual idéntica si solo interesa estructura. No hagas preguntas anecdóticas sobre nombres de libros o alumnos.

Primero muestra solo preguntas y una plantilla numerada de respuestas, sin soluciones ni pistas. Espera mis letras. Luego entrega tabla de corrección y, para cada error, respuesta correcta, razonamiento, por qué falla cada distractor y apartado Bxx. Puntúa aciertos sobre 30, sin inventar penalización oficial. A partir de mis fallos, genera seis variantes nuevas centradas en las confusiones detectadas.

Revisa internamente antes de mostrar: seis opciones, una correcta inequívoca, código válido o pregunta explícita sobre su error, y coherencia con los matices del resumen frente a formulaciones imprecisas del anexo. No afirmes haber ejecutado código o JAXB si solo razonas su comportamiento.
```

## Q-B7. Chat: localizar ambigüedades del cuestionario

```text
Voy a pegar un cuestionario generado. Audítalo frente a UT02-B - Librerías XML en Java - Resumen completo. Excluye NIO. No lo des por correcto por tener una solución marcada.

Por pregunta comprueba: exactamente una respuesta defendible, condiciones suficientes, nombres/firmas/retornos correctos, estados StAX válidos, fragmentación SAX no inventada, buen formado separado de validación, wrapper y nombres JAXB correctos, versión/dependencias consistentes. Detecta respuestas equivalentes, distracciones absurdas, pistas de longitud, código incompleto no advertido o dependencia de atributos/indentación no fijada.

Clasifica cada pregunta como correcta, ambigua, incorrecta o fuera de alcance; explica y cita Bxx. Si falla, reescribe enunciado y seis opciones, con solución única razonada. No inventes un comportamiento para resolver una ambigüedad. Espera a que pegue las preguntas.
```
