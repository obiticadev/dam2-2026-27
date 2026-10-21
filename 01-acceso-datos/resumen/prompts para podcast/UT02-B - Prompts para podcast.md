# UT02-B — Prompts para podcast de NotebookLM

## Uso

Selecciona solo **«UT02-B - Librerías XML en Java - Resumen completo»** y pega un bloque en la personalización del audio. Idioma español; formato de explicación en profundidad y extensión larga cuando se ofrezcan. No hay que cargar este archivo como fuente.

Serie recomendada: P-B1 a P-B6. P-B0 ofrece una orientación; P-B7 es repaso activo. La generación no garantiza duración exacta, pausas ni cobertura total: contrasta cada episodio con los identificadores citados. El anexo conserva el original, pero no debe volver a narrarse por duplicado ni prevalecer sobre una aclaración técnica.

## P-B0. Mapa de XML y elección de API

```text
Genera un audio en español para segundo de DAM, primer examen de Acceso a Datos, centrado en B01-B02 de UT02-B - Librerías XML en Java - Resumen completo. No incluyas NIO: no entra en el examen. Objetivo: escoger una API y distinguir alternativas casi correctas de un test.

Explica XML como texto jerárquico portable, elementos/atributos/texto, codificación, parser, buen formado frente a validación XSD. Compara DOM, SAX, StAX y JAXB por representación en memoria, control del recorrido, acceso previo, modificación, lectura/escritura y caso de uso. Identifica TrAX como transformación y aclara el papel de XPath sin confundirlo con getElementsByTagName.

Usa cuatro situaciones: consultar/modificar varias partes repetidamente; extraer un dato de un archivo enorme en una pasada; controlar desde un bucle cuándo avanzar; cargar objetos Libreria/Libro. Razona las elecciones y los costes sin afirmar que una tecnología siempre gana en velocidad. Señala que retener datos propios puede consumir memoria aunque se use streaming.

Introduce parse/transform de DOM y marshal/unmarshal de JAXB sin intercambiarlos. No atribuyas soporte JSON estándar a JAXB del curso ni presentes la estimación de diez bytes de memoria como constante. Termina con un recorrido de episodios: DOM árbol, DOM edición, SAX, StAX y JAXB.
```

## P-B1. DOM: factorías, árbol y extracción

```text
Genera un audio detallado en español sobre B03-B05 de UT02-B - Librerías XML en Java - Resumen completo. Preparo un test difícil de segundo de DAM con una sola respuesta correcta. No expliques NIO ni amplíes el temario a otras tecnologías.

Explica W3C, java.xml, javax.xml.parsers y org.w3c.dom; factoría, DocumentBuilder y por qué se usan implementaciones de clases abstractas e interfaces. Compara parse(File), newDocument y getDocumentElement, con entradas, retornos y efectos. Distingue ParserConfigurationException, SAXException e IOException en su contexto.

Construye mentalmente el árbol de clase/alumno/nombre de la fuente. Diferencia Document, Element, Text, Attr, Node, NodeList y NamedNodeMap. Señala que atributos no son hijos ordinarios y que la indentación puede generar Text. Contrasta getNodeName, getNodeValue y getTextContent para cada tipo. normalize no valida ni limpia necesariamente espacios de indentación.

Detalla getChildNodes frente a getElementsByTagName, búsqueda descendiente frente a hijo directo, ámbito Document/Element, hermanos, getLength/item y null fuera de rango. Explica getAttribute ausente y hasAttribute. Recorre los auxiliares getValorEtiqueta/getElementEtiqueta y sus precondiciones; no supongas que item(0) siempre existe. Usa los tres alumnos de clase.xml sin confundirlos con input.xml de SAX. Cierra con contraejemplos a las confusiones más plausibles.
```

## P-B2. DOM: crear, editar y guardar

```text
Genera un audio en español sobre B06, apoyado en B03-B05, de UT02-B - Librerías XML en Java - Resumen completo. Nivel segundo de DAM; objetivo: entender el orden de operaciones y sus efectos para un test. NIO está excluido.

Recorre desde cero el documento compania/empleado con atributo id y nombre, apellidos, seccion y salario. Explica newDocument, createElement, createTextNode, createAttribute, setValue, setAttributeNode, setAttribute y appendChild. Distingue crear un nodo, insertarlo en el árbol y persistir el documento. Aclara que salario se representa como texto.

Explica las advertencias añadidas sobre setTextContent al sustituir hijos, appendChild al mover un nodo y removeChild respecto a hijos directos; no presentes esos matices como ejercicios oficiales. Después desarrolla TransformerFactory, Transformer, Source/Result, DOMSource y StreamResult. Identifica qué objetos adaptan y qué llamada escribe: transform(source,result). Contrasta salida a archivo y System.out; indentación frente a transformación semántica.

Desmonta tres errores: modificar el árbol cambia automáticamente el archivo; catalogo.txt ya no contiene XML por su extensión; createElement añade la raíz sin appendChild. Formula variantes pequeñas con sus consecuencias y termina con la secuencia completa memoria a disco. Consulta el anexo solo para conservar detalles, no para repetir código entero en voz alta.
```

## P-B3. SAX: callbacks, atributos y texto fragmentado

```text
Genera un audio de profundización en español sobre B07-B08 de UT02-B - Librerías XML en Java - Resumen completo. Nivel segundo de DAM, preparación para tipo test con distractores sutiles. Excluye NIO.

Explica SAX como push: factoría, SAXParser, parse y handler; paquetes javax.xml.parsers, org.xml.sax y DefaultHandler. Diferencia leer el archivo de conservar datos de la aplicación. Desglosa las firmas de startDocument/endDocument, startElement/endElement y characters. Explica uri, localName, qName, Attributes y getValue sin suponer idéntica disponibilidad con cualquier configuración de namespaces.

Simula los eventos de student rollno 393 y firstname dinkar. Haz que el texto llegue en dos fragmentos para demostrar por qué characters puede llamarse varias veces. Explica ch/start/length con rango y cantidad exactos; acumular StringBuilder, reiniciar al principio del campo y procesar al cierre. No leer todo el array ni reemplazar el texto por el último fragmento. Incluye espacios de indentación, elementos vacíos y límites del estado simple cuando hay anidación/contenido mixto.

Describe el ejemplo original sin confundir sus nombres ingleses con el XML DOM español. Aclara que equalsIgnoreCase no cambia la sensibilidad de XML. Explica InputSource con bytes frente a Reader: setEncoding no corrige caracteres ya mal decodificados. Termina con preguntas de orden de eventos y corrección razonada.
```

## P-B4. StAX: cursor, iteradores y consumo de eventos

```text
Genera un audio preciso en español sobre B09-B11 de UT02-B - Librerías XML en Java - Resumen completo. Preparo un test de segundo de DAM; no incluyas NIO.

Compara push SAX y pull StAX; cursor XMLStreamReader/XMLStreamWriter frente a iteradores XMLEventReader/XMLEventWriter; factorías de entrada/salida. Explica evento actual, hasNext sin avance, next que devuelve int y nextEvent que devuelve XMLEvent. No confundas la materialización de eventos con un árbol DOM ni con retroceso del parser.

Detalla START_DOCUMENT inicial, START_ELEMENT, CHARACTERS, COMMENT, END_ELEMENT y END_DOCUMENT. Atributos asociados, namespaces, QName y parte local; ningún orden semántico obligatorio de atributos. Aclara qué getters requieren cada estado. Recorre title lang=en de books.xml: leer atributo antes de getElementText, consumir texto y quedar en END_ELEMENT. Contrasta getText, getElementText y getTextContent DOM. Incluye elemento vacío y fallo por subelemento.

Para iteradores explica asStartElement sin avanzar, getAttributes como Iterator de Attribute, getName/getValue y peek frente a nextEvent. Distingue el objeto event retenido del estado actual del lector después de getElementText. Menciona cierre del lector y del origen por separado y que los lectores StAX de JDK17 no son AutoCloseable. Termina con dos trazas casi iguales que produzcan estados distintos y explica por qué.
```

## P-B5. JAXB: modelo, anotaciones y esquema

```text
Genera un audio detallado en español sobre B12 y B13.1 de UT02-B - Librerías XML en Java - Resumen completo. Nivel segundo de DAM; enfócate en distinciones útiles para tipo test. No incluyas NIO.

Explica binding como correspondencia entre XML y objetos de dominio, distinto de DOM o eventos. Conserva el entorno del curso: JAXB2 con javax.xml.bind; Java11+ necesita API e implementación externas. No migres a jakarta ni deduzcas que javax.xml.parsers ha desaparecido del JDK. Serializable no es requisito de JAXB.

Desglosa XmlRootElement, XmlType/propOrder, XmlElement, XmlAttribute y XmlElementWrapper, sus parámetros y diferencias. Usa Libreria con listaLibro, nombre y lugar, y Libro con autor/nombre/editorial/isbn. Explica wrapper ListaLibro frente a cada ítem Libro, mayúsculas exactas, nombre de propiedad Java frente a nombre XML. XmlType también puede aplicarse a una clase raíz. Explica JavaBeans, getters/setters y constructor sin argumentos implícito, evitando duplicar anotaciones sin pensar en la estrategia de acceso.

Interpreta el XSD descrito en B13.1: cero o muchos Libro, campos string y secuencia de raíz ListaLibro/lugar/nombre. Aclara que el código original solo fija propOrder en Libro; no garantiza el orden de la raíz ni validación XSD automática. Termina con pequeños XML alternativos para demostrar qué cambia al modificar cada anotación.
```

## P-B6. JAXB: marshal, unmarshal y ciclo completo

```text
Genera un audio en español sobre B13 de UT02-B - Librerías XML en Java - Resumen completo, usando B12 para las precondiciones. Preparo un examen tipo test de segundo de DAM. NIO no entra.

Explica definición manual o generación xjc desde XSD, compilación y dependencias JAXB2, JAXBContext.newInstance(Libreria.class), createMarshaller/createUnmarshaller, marshal y unmarshal. Para cada llamada distingue tipo devuelto, datos de entrada, salida y efecto. Un contexto no genera por sí solo el archivo y crear un Marshaller no serializa todavía.

Recorre los dos libros del ejemplo, su lista y la Libreria, salida a consola, salida a archivo, lectura del archivo y recorrido de los libros reconstruidos. Di expresamente Java a XML para marshal y XML a Java para unmarshal. Explica el cast en la sobrecarga unmarshal(File) y no generalices a cualquier sobrecarga o JAXBElement. Diferencia presentación JAXB_FORMATTED_OUTPUT de validación y de mapeo.

Relaciona modificar objetos y volver a marshal con modificar DOM y volver a transform: ambos exigen persistencia explícita, pero usan representaciones diferentes. Señala límites: no es serialización binaria ObjectOutputStream, no requiere Serializable, no garantiza JSON ni valida automáticamente por tener XSD. La fuente revisa JAXB documentalmente, no lo declara ejecutado. Cierra con preguntas sobre dirección, dependencias y orden de llamadas.
```

## P-B7. Repaso de trampas y diagnóstico

```text
Genera un audio de autoevaluación y repaso en español basado en B15 y B14 de UT02-B - Librerías XML en Java - Resumen completo, con apoyo en B01-B13. No incluyas NIO ni inventes preguntas oficiales.

Agrupa trampas por mecanismo: buen formado/validación; Document/raíz; Element/Text/Attr; valor/nombre/texto; hijo/descendiente; item null y atributo ausente; normalizar/validar; crear/insertar/guardar; SAX fragmentación y ch/start/length; push/pull; cursor/objeto de evento; next/nextEvent; getText/getElementText; estado previo/posterior; wrapper/ítem; XmlType/XmlRootElement; propiedad Java/nombre XML; marshal/unmarshal; API externa de JAXB y paquetes javax/jakarta.

En cada grupo ofrece una afirmación plausible pero falsa, deja pensar, corrígela con el contrato exacto y un caso mínimo. Usa el laboratorio B14 para demostrar nodeValue null, texto Luis, atributo ausente como cadena vacía y StAX en cierre. No afirmes que el laboratorio verifica JAXB, validación o seguridad. Finaliza con seis preguntas cortas nuevas y explica las respuestas; remite por identificador Bxx a los bloques que conviene repasar.
```
