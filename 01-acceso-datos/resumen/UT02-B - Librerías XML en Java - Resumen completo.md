# UT02-B — Librerías XML en Java — Resumen completo para NotebookLM

## B00. Alcance, procedencia y organización

**Asignatura:** Acceso a Datos, segundo de DAM. **Examen:** primero, con UT02-A sin NIO y UT02-B completo. El estudiante indica predominio de tipo test, hasta seis alternativas y una correcta. No se conoce una distribución oficial de preguntas ni su redacción.

**Fuente principal:** `../temario/UT02-B-librerias-xml-java.md`, leída completa. Se conservan sus ejemplos en el anexo documental. Las imágenes siguen enlazadas al temario; el desarrollo principal explica textualmente los modelos importantes y el esquema JAXB que aparece como imagen. No se ha procesado el PDF equivalente.

**Propósito:** material de referencia estructurado, no guion hablado. Los identificadores B01–B15 permiten pedir a NotebookLM episodios y cuestionarios por bloques. El anexo no se debe narrar de nuevo: conserva el contenido original para consulta. Los matices técnicos añadidos están identificados; no son requisitos nuevos atribuidos al profesor.

**Entorno de referencia:** JDK 17 para DOM, SAX y StAX. JAXB del temario: **JAXB 2, paquetes `javax.xml.bind`**, con API e implementación externas en Java 11 o posterior. No mezclarlo con `jakarta.xml.bind` de JAXB/Jakarta XML Binding 3 o posterior. El uso de `javax.xml.parsers` o `javax.xml.stream` no implica que esas API hayan sido retiradas del JDK.

### Recorrido recomendado

1. B01–B02: XML, parser y elección de tecnología.
2. B03–B06: DOM, construcción, árbol, consultas y escritura.
3. B07–B08: SAX, callbacks, parámetros y acumulación.
4. B09–B11: StAX, cursor e iteradores, estado y consumo de eventos.
5. B12–B13: binding, anotaciones y ciclo JAXB.
6. B14–B15: trazas comparadas, matices y práctica tipo test.

## B01. XML, portabilidad y función del parser

### B01.1. Modelo de información

XML almacena e intercambia información como **texto estructurado jerárquicamente** mediante etiquetas. Un elemento puede contener texto, otros elementos o ambos. Los atributos asocian valores a un elemento. No confundir la etiqueta con el contenido textual que contiene.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<clase>
    <alumno numero="393">
        <nombre>Luis</nombre>
        <marcas>85</marcas>
    </alumno>
</clase>
```

Aquí `clase`, `alumno`, `nombre` y `marcas` son nombres de elementos; `numero` es un atributo; `393`, `Luis` y `85` son valores textuales. El documento no convierte automáticamente `85` en un `int` por tener aspecto numérico; la aplicación o un sistema de tipos/esquema debe interpretarlo.

La portabilidad permite intercambiar datos entre aplicaciones en distintos lenguajes y plataformas, incluso a través de la red, con acoplamiento débil. Que XML sea portable no elimina la necesidad de acordar nombres, significado, estructura y codificación.

La declaración `encoding="UTF-8"` informa de cómo interpretar los bytes cuando el parser recibe bytes. Las referencias de caracteres, como `&#225;` o `&#xE1;`, representan símbolos. `&amp;` representa un ampersand. La representación textual evita depender del formato binario de un `int` de una máquina, pero no elimina todos los problemas semánticos de intercambio.

**Aclaraciones añadidas:** XML distingue mayúsculas de minúsculas; `<Libro>` y `<libro>` son nombres distintos. Un XML bien formado tiene un único elemento raíz, anidación correcta, cierres compatibles y atributos correctamente escritos. Esto no equivale a validar su contenido contra un XSD o DTD.

### B01.2. Parser, buen formado y validación

Un **parser o analizador XML** reconoce la sintaxis y estructura, relaciona las partes y las expone mediante una representación o eventos. No hace falta escribir un analizador particular para cada documento.

- **Bien formado:** cumple las reglas sintácticas XML.
- **Válido frente a un esquema:** además cumple las restricciones del XSD/DTD configurado: orden, tipos, cardinalidad, etc.
- Un parser puede comprobar buen formado sin validar contra un esquema. `parse()` no significa «validación XSD automática».
- DOM construye un árbol en memoria; SAX y StAX permiten procesar secuencialmente sin construirlo entero.

**Pregunta de contraste:** si `<marcas>ochenta</marcas>` es sintácticamente correcto, ¿un parser sin esquema tiene por qué rechazarlo? No. La conversión numérica de la aplicación puede fallar después; un esquema que exija un entero también podría rechazarlo si se valida.

## B02. Elegir entre DOM, SAX, StAX, transformación y binding

### B02.1. Tabla comparativa central

| Criterio | DOM | SAX | StAX | JAXB |
|---|---|---|---|---|
| Modelo que maneja la aplicación | Árbol de nodos | Callbacks de eventos | Cursor u objetos de evento | Objetos Java mapeados |
| Control del recorrido | La aplicación navega tras el parseo | El parser llama al handler: **push** | La aplicación pide el siguiente evento: **pull** | La aplicación solicita marshal/unmarshal |
| Memoria del modelo | Guarda el árbol completo | No crea árbol completo por sí mismo | No crea árbol completo por sí mismo | Depende del grafo de objetos materializado |
| Volver a datos anteriores | Navegar por el árbol retenido | Releer o conservar estado propio | Releer o conservar datos/eventos propios | Consultar objetos retenidos |
| Modificación | Modifica el árbol en memoria | No edita un árbol que no existe | Lectura y escritura secuenciales; no edición aleatoria del archivo | Modifica objetos y vuelve a serializar |
| Lectura | Sí | Sí | Sí | `unmarshal` |
| Escritura | Mediante serialización del árbol, por ejemplo `Transformer` | No es la API de escritura del curso | Sí, con escritores de StAX | `marshal` |
| Escenario característico | Consultas repetidas y modificación estructural | Gran documento, una pasada, procesamiento por callbacks | Gran documento, una pasada controlada por la aplicación | Modelo de dominio Java estable y mapeo XML |

El consumo final depende también del programa: un handler SAX que acumule todos los datos puede acabar usando mucha memoria. «Streaming» describe el procesamiento incremental del parser, no garantiza memoria constante para cualquier aplicación.

### B02.2. TrAX, XPath y lo que la comparación no promete

El temario compara también **TrAX**, API de transformación de JAXP asociada a XSLT. `Transformer` puede aplicar una transformación o, sin una hoja de estilos, serializar/cambiar la representación conservando la estructura lógica. Una transformación de identidad a `catalogo.txt` sigue produciendo XML: la extensión no obliga a obtener texto plano sin etiquetas.

La tabla docente atribuye XPath a DOM y TrAX. Matiz: DOM aporta un árbol sobre el que puede evaluarse XPath con la API correspondiente; no significa que `getElementsByTagName` ejecute expresiones XPath. XSLT puede utilizar XPath; SAX y StAX no ofrecen directamente esa navegación aleatoria sobre un árbol propio.

El temario menciona **XStream**, JiBX y XMLBinding como otras bibliotecas. Su implementación no se desarrolla. JAXB se centra aquí en **Java ↔ XML**; no deducir soporte JSON estándar por la formulación general del apartado de serialización.

### B02.3. Criterios de decisión sin absolutos

- Necesito consultar y modificar varias zonas muchas veces: DOM puede compensar su coste de memoria.
- Solo necesito sumar un campo de millones de registros: SAX o StAX permiten extraerlo sin retener todo el documento.
- Quiero que mi bucle decida cuándo avanzar: StAX, no SAX.
- Quiero recuperar una `Libreria` con su colección de `Libro`: binding JAXB, no una colección de `Node`.
- Escribir XML con StAX no significa modificar in situ arbitrariamente un documento existente. Se puede leer uno y generar otro transformado.
- SAX/StAX pueden procesar anidación; que el documento no esté muy anidado es una recomendación de simplicidad del temario, no una prohibición técnica.
- «DOM usa diez bytes de RAM por byte de XML» es una estimación orientativa citada en el temario, **no una constante garantizada** por Java o W3C.

## B03. DOM: factorías, parseo y documento vacío

### B03.1. Clases y paquetes

DOM es un estándar del **W3C**, no una invención exclusiva de Java. Java lo materializa principalmente mediante interfaces en `org.w3c.dom`. Las clases de creación de parsers están en `javax.xml.parsers`; transformaciones, en `javax.xml.transform`. Forman parte del módulo `java.xml`.

`DocumentBuilderFactory` y `DocumentBuilder` son clases abstractas; se obtiene una implementación mediante factoría, no con `new DocumentBuilder()`.

```java
DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document documento = builder.parse(new File("clase.xml"));
```

**Qué hace cada paso:** `newInstance()` obtiene la factoría; `newDocumentBuilder()` configura/crea el constructor de documentos; `parse(File)` lee el XML y devuelve un `Document` con el árbol en memoria. Crear la factoría no lee el archivo.

**Lectura de la jerarquía de la imagen docente:** `DocumentBuilder`, `DocumentBuilderFactory`, `SAXParser` y `SAXParserFactory` son clases separadas bajo `Object`: una factoría no es la superclase de su parser. `ParserConfigurationException` está en la rama de `Exception`; `FactoryConfigurationError`, en la de `Error`. La figura DOM sitúa `DOMException` bajo `RuntimeException`; no todas las incidencias XML son, por tanto, una misma excepción comprobada. En interfaces, `Text` y `Comment` derivan de `CharacterData`, que deriva de `Node`; `CDATASection` especializa `Text`. `NodeList` y `NamedNodeMap` son interfaces auxiliares, no subtipos de `Node`. Las capturas muestran además otras interfaces DOM no desarrolladas; no hay que inventar sus operaciones para estudiar las que sí usa el tema.

### B03.2. Parsear no es crear un documento vacío

| Método | Entrada | Salida | Efecto |
|---|---|---|---|
| `builder.parse(File)` | Archivo XML existente | `Document` | Lee y construye el árbol |
| `builder.newDocument()` | Sin XML de entrada | `Document` | Crea un árbol vacío en memoria |
| `doc.getDocumentElement()` | Documento | `Element` o `null` | Obtiene la raíz si ya existe |

Un documento vacío no contiene automáticamente una raíz elegida por Java. `newDocument()` no guarda nada en disco. Un `Document` representa el documento completo y no es lo mismo que su elemento raíz.

**Excepciones docentes:** `ParserConfigurationException` al crear/configurar el parser, `SAXException` durante análisis XML y `IOException` durante acceso al origen. DOM puede lanzar `SAXException` aunque no se esté usando el modelo de callbacks SAX en la aplicación.

### B03.3. Qué enseña el ejemplo `XmlCtrlDom`

El original tiene dos sobrecargas de `instanciarDocument`: sin argumentos crea vacío; con `File` parsea. Lee `cd_catalog.xml` y serializa en `catalogo.txt`. `OutputKeys.INDENT="yes"` solicita presentación indentada; no selecciona campos ni convierte el XML en CSV. `StreamResult(System.out)` es una salida alternativa a consola.

## B04. Árbol DOM: nodos, texto, atributos y espacios

### B04.1. Interfaces y relaciones

| Interfaz | Representa | Precaución |
|---|---|---|
| `Node` | Tipo general de nodo | No todo nodo es un elemento |
| `Document` | Documento completo | Contiene el elemento raíz; sirve para crear nodos |
| `Element` | Elemento/etiqueta con su estructura | Su texto suele estar en nodos descendientes, no en su `nodeValue` |
| `Text` | Datos de texto | Incluye posibles espacios y saltos de indentación |
| `Attr` | Atributo de un elemento | No es un hijo ordinario en la lista de hijos del elemento |
| `NodeList` | Colección ordenada de nodos | No es un `Node` ni un array; usa `getLength()` e `item(i)` |
| `NamedNodeMap` | Conjunto de atributos por nombre | No confundirlo con los hijos del elemento |

`Document`, `Element`, `Text` y `Attr` son especializaciones de `Node`; `NodeList` es una colección auxiliar. No instanciar interfaces con `new Element()`.

### B04.2. Árbol concreto

Para `<alumno numero="393"><nombre>Luis</nombre></alumno>`:

```text
Document
└── Element alumno
    ├── atributo numero = "393"  [asociado al elemento; no hijo ordinario]
    └── Element nombre
        └── Text "Luis"
```

Con saltos y espacios entre etiquetas aparecen también nodos `Text` de formato entre los elementos. Por ello `root.getFirstChild()` puede devolver texto en blanco, no el primer `alumno`. Antes de convertir un hijo genérico a `Element`, comprobar `getNodeType() == Node.ELEMENT_NODE` cuando no haya una garantía previa.

**Importante:** `getElementsByTagName("alumno")` ya devuelve elementos; la comprobación de tipo del ejemplo sigue siendo didáctica, pero resulta especialmente necesaria al recorrer `getChildNodes()`.

### B04.3. `getNodeName`, `getNodeValue` y `getTextContent`

| Nodo | `getNodeName()` | `getNodeValue()` | `getTextContent()` |
|---|---|---|---|
| `Document` | `#document` | `null` | `null` según contrato DOM |
| `Element nombre` | `nombre` | `null` | Texto de los descendientes, como `Luis` |
| `Text "Luis"` | `#text` | `Luis` | `Luis` |
| `Attr numero` | `numero` | `393` | `393` |

Para `<nombre>Lu<parte>is</parte></nombre>`, `getTextContent()` del elemento `nombre` concatena texto descendiente: `Luis`. No devuelve el marcado `<parte>`. Para un contenedor con indentación, también puede incluir espacios y saltos; no asumir que equivale a un solo campo limpio.

`getFirstChild().getNodeValue()` funciona en un elemento simple cuyo primer hijo es el texto deseado, pero no es una extracción universal: puede haber comentario, texto fragmentado, un subelemento o ningún hijo.

### B04.4. `normalize()`

`normalize()` fusiona nodos de texto adyacentes y elimina nodos de texto vacíos en el subárbol. **No elimina necesariamente texto que contiene espacios de indentación**, no valida el XML, no ordena elementos y no modifica automáticamente el archivo original.

`doc.getDocumentElement().normalize()` opera a partir de la raíz; no significa «guardar el documento normalizado en disco».

## B05. DOM: navegación y extracción parametrizada

### B05.1. Contratos principales

| Método | Parámetro / retorno | Detalle examinable |
|---|---|---|
| `getFirstChild()` / `getLastChild()` | `Node` o `null` | Hijos de cualquier tipo |
| `getNextSibling()` / `getPreviousSibling()` | `Node` o `null` | Hermanos; no saltan automáticamente el texto de indentación |
| `getParentNode()` | `Node` o `null` | Relación jerárquica del árbol |
| `getChildNodes()` | `NodeList` | Hijos **directos**, incluyendo texto/comentarios |
| `Element.getElementsByTagName(String name)` | `NodeList` | Todos los elementos **descendientes** coincidentes; no solo hijos directos ni el propio elemento receptor |
| `Document.getElementsByTagName(String name)` | `NodeList` | Elementos coincidentes del documento, incluida la raíz si coincide |
| `NodeList.getLength()` | `int` | Número de nodos de la lista |
| `NodeList.item(int index)` | `Node` o `null` | Índice base 0; fuera de rango devuelve `null`, no necesariamente una excepción |
| `Element.getAttribute(String name)` | `String` | Valor del atributo; si falta, cadena vacía en el caso habitual, no `null` |
| `Element.hasAttribute(String name)` | `boolean` | Distingue ausente de presente con valor vacío |
| `getAttributes()` | `NamedNodeMap` en elementos | Todos los atributos; no una lista de elementos hijos |

**Aclaración:** las listas DOM devueltas por estas consultas son *vivas*: pueden reflejar cambios del árbol. Al eliminar nodos de una lista mientras se itera hacia delante pueden saltarse entradas; usar un patrón que considere la actualización de índices.

### B05.2. Métodos auxiliares del temario y sus precondiciones

```java
public static String getValorEtiqueta(String etiqueta, Element elemento) {
    Node nValue = elemento.getElementsByTagName(etiqueta).item(0);
    return nValue.getTextContent();
}
public static Element getElementEtiqueta(String etiqueta, Element elemento) {
    return (Element) elemento.getElementsByTagName(etiqueta).item(0);
}
```

Son fragmentos de métodos que deben ir dentro de una clase, con imports DOM. El primero devuelve el texto del primer descendiente coincidente; el segundo, el propio elemento para continuar navegando. No devuelven todos los resultados ni restringen por sí solos la búsqueda al primer nivel.

**Precondiciones:** `elemento` no debe ser `null`; para el primer método debe existir una coincidencia. Si `item(0)` devuelve `null`, llamar después a `getTextContent()` produce `NullPointerException`. En el segundo, convertir `null` a `Element` sigue dando `null`; el fallo llegaría al intentar usarlo después.

### B05.3. Extracción del ejemplo `clase.xml`

El original contiene tres alumnos:

| `numero` | `nombre` | `apellido` | `apodo` | `marcas` |
|---|---|---|---|---:|
| 393 | Luis | Luna | Na | 85 |
| 493 | Antonio | Alvarez | Avez | 95 |
| 593 | Juan | Juz | jazz | 90 |

Pasos: importar API; factoría y builder; parsear; obtener raíz con `getDocumentElement`; obtener alumnos con `getElementsByTagName`; iterar `temp < getLength`; recuperar el atributo `numero`; extraer cada subelemento y su texto.

El resultado de `getAttribute("numero")` es una cadena, aunque contenga dígitos. Si se necesita aritmética, convertir y gestionar el posible formato inválido. El mismo nombre `nombre` en un subárbol no representa automáticamente el de todo el documento: importa **desde qué elemento se busca**.

## B06. DOM: crear, modificar y serializar XML

### B06.1. Crear nodos no es insertarlos

```text
builder.newDocument()
  → doc.createElement("compania")
  → doc.appendChild(raiz)
  → doc.createElement("empleado")
  → raiz.appendChild(empleado)
  → empleado.setAttribute("id", "1")
  → crear elemento nombre y su texto
  → insertar nombre en empleado
  → serializar Document con Transformer
```

`doc.createElement(String tagName)` devuelve un `Element` perteneciente al documento, **todavía no insertado**. `appendChild(Node child)` lo ubica como último hijo del receptor. Crear un atributo con `createAttribute` tampoco lo asigna automáticamente: usar `setAttributeNode` o, más sencillamente, `setAttribute(name, value)`.

| Método | Parámetros / efecto | Trampa |
|---|---|---|
| `createTextNode(String data)` | Crea nodo de texto | No lo inserta automáticamente |
| `createComment(String data)` | Crea comentario | No es un elemento ni texto de un campo |
| `setAttribute(String name, String value)` | Crea/actualiza atributo del elemento | No crea un hijo `<name>` |
| `setTextContent(String text)` | Sustituye el contenido del nodo pertinente | En un elemento puede eliminar su estructura de hijos previa |
| `appendChild(Node child)` | Añade/mueve un nodo al final | Si ya estaba insertado, no crea una copia independiente |
| `removeChild(Node child)` | Elimina un hijo directo y devuelve el eliminado | No elimina automáticamente un descendiente indirecto pasado al padre equivocado |

Las dos últimas precisiones sobre movimiento/eliminación son aclaraciones añadidas para comprender edición. Un nodo de otro documento necesita el mecanismo adecuado, como `importNode`, antes de insertarse; no atribuir al `appendChild` cualquier conversión entre documentos.

### B06.2. Árbol docente que debe producirse

```xml
<compania>
    <empleado id="1">
        <nombre>Manuel</nombre>
        <apellidos>González</apellidos>
        <seccion>almacén</seccion>
        <salario>1000</salario>
    </empleado>
</compania>
```

`compania` es el único elemento raíz; `empleado` contiene cuatro subelementos y un atributo. `salario` se escribe como texto `"1000"`. La declaración XML, indentación y detalles de presentación de salida no deben confundirse con la jerarquía de datos.

### B06.3. `Transformer`, origen y destino

```java
Transformer transformer = TransformerFactory.newInstance().newTransformer();
transformer.setOutputProperty(OutputKeys.INDENT, "yes");
DOMSource source = new DOMSource(doc);
StreamResult result = new StreamResult(new File("archivo.xml"));
transformer.transform(source, result);
```

Fragmento: requiere `doc` ya construido y los imports de `javax.xml.transform`, `.dom`, `.stream` y `java.io.File`; debe manejarse `TransformerException`.

- `TransformerFactory`: factoría; `Transformer`: motor abstracto obtenido de ella.
- `Source`: origen adaptado. Ejemplos: `DOMSource`, `SAXSource`, `StreamSource`.
- `Result`: destino adaptado. Ejemplos: `DOMResult`, `SAXResult`, `StreamResult`.
- `DOMSource(doc)` no escribe; `StreamResult(file)` no crea el árbol; `transform(source, result)` realiza el procesamiento.
- `OutputKeys.INDENT` mejora presentación; `OutputKeys.ENCODING`, si se configura, expresa la codificación de salida en el contexto aplicable.
- Modificar un árbol después de parsearlo **no cambia el archivo de entrada** hasta serializar explícitamente hacia un destino.

## B07. SAX: modelo push y flujo de eventos

### B07.1. Creación y responsabilidades

SAX, **Simple API for XML**, procesa el documento secuencialmente y notifica eventos. No construye el árbol DOM interno que maneja la aplicación. Es apropiado para documentos grandes, una pasada y extracción selectiva sin modificación estructural de un árbol.

```java
SAXParserFactory factory = SAXParserFactory.newInstance();
SAXParser parser = factory.newSAXParser();
parser.parse(new File("input.xml"), new UserHandler());
```

`SAXParserFactory` y `SAXParser` están en `javax.xml.parsers`; las interfaces de eventos, `Attributes` y `SAXException`, en `org.xml.sax`; el manejador genérico, en `org.xml.sax.helpers.DefaultHandler`.

Una clase `UserHandler extends DefaultHandler` sobrescribe los callbacks que necesita. `new DefaultHandler()` permite analizar sin una lógica propia para extraer/imprimir datos. Que el parser lea un documento no implica que la aplicación guarde automáticamente sus datos.

### B07.2. Firmas y significado de los callbacks

| Callback | Cuándo | Uso |
|---|---|---|
| `startDocument()` | Inicio de documento | Inicializar contadores y estado global |
| `endDocument()` | Final de documento | Emitir resultados finales o cerrar el procesamiento lógico |
| `startElement(String uri, String localName, String qName, Attributes attributes)` | Inicio de elemento | Identificar etiqueta, leer atributos e iniciar acumulación |
| `characters(char[] ch, int start, int length)` | Un fragmento textual | Acumular únicamente el tramo válido |
| `endElement(String uri, String localName, String qName)` | Cierre de elemento | Terminar de interpretar el texto acumulado |

`uri` identifica el espacio de nombres cuando procede; `localName` es el nombre local; `qName`, el nombre cualificado que puede incluir prefijo. Su disponibilidad depende de la configuración de namespaces. No afirmar que los tres contienen siempre el mismo texto.

`attributes.getValue("rollno")` devuelve el valor textual si existe; puede devolver `null` si no. Los atributos se reciben asociados al inicio del elemento, no como llamadas a `characters` que haya que interpretar como texto del alumno.

### B07.3. Secuencia concreta

Para `<student rollno="393"><firstname>dinkar</firstname></student>`:

```text
startDocument
startElement student, atributo rollno="393"
startElement firstname
characters "din"       [una fragmentación posible]
characters "kar"       [otra parte del mismo contenido]
endElement firstname   → acumulado "dinkar"
endElement student
endDocument
```

No está garantizada esa partición ni que haya dos llamadas. Puede ser una o varias. La indentación añade posibles llamadas con espacios/saltos. Una etiqueta vacía también tiene inicio y fin, sin obligación de un evento de texto no vacío.

**Trampa de estado:** el parser no conserva por la aplicación un árbol padre/hijo navegable. Si se necesita saber que un `nombre` corresponde a cierto registro, mantener estado, una pila o un objeto actual.

## B08. SAX: acumulación correcta, ejemplo y codificación

### B08.1. Parámetros de `characters`

El tramo válido de `ch` empieza en `start` y contiene `length` caracteres: índices `start` hasta `start + length - 1`. **`length` es una cantidad, no el índice final.** El array puede contener caracteres fuera de ese rango que no corresponden al callback actual.

```java
texto.append(ch, start, length);
```

No usar `new String(ch)` sin delimitar el tramo ni sustituir el acumulador por el último fragmento recibido. No conservar la referencia al array para interpretarlo más tarde sin copiar lo necesario: el parser puede reutilizarlo.

### B08.2. Patrón añadido para un campo simple

**Fragmento dentro de una clase que extiende `DefaultHandler`:**

```java
private boolean enNombre;
private final StringBuilder texto = new StringBuilder();

@Override
public void startElement(String uri, String local, String qName, Attributes atts) {
    if ("firstname".equals(qName)) {
        enNombre = true;
        texto.setLength(0);
    }
}
@Override
public void characters(char[] ch, int start, int length) {
    if (enNombre) texto.append(ch, start, length);
}
@Override
public void endElement(String uri, String local, String qName) {
    if ("firstname".equals(qName)) {
        System.out.println(texto.toString().trim());
        enNombre = false;
    }
}
```

Entrada simple `<firstname>dinkar</firstname>`; resultado `dinkar` aunque llegue fragmentado. Variante: conservar espacios significativos requiere no aplicar `trim()` indiscriminadamente. Este patrón no se presenta como un manejador universal para cualquier contenido mixto/anidado.

### B08.3. Qué hace el ejemplo docente completo

El handler original mantiene `currentElement` y `StringBuilder text`, reinicia en `startElement`, acumula en `characters` y procesa en `endElement`. Imprime `rollno`, `firstname`, `lastname`, `nickname`, `marks` y el fin de `student`.

Datos del original: alumno 393, `dinkar kad`, apodo `dinkar`, nota 85; 493, `Vaneet Gupta`, `vinni`, 95; 593, `jasvir singn`, `jazz`, 90. No confundir estos datos de `input.xml` con los nombres del XML en español de DOM.

El reinicio en cada inicio y fin se adapta a esas hojas simples. **Si hay texto mixto o subelementos dentro del campo, ese estado simple puede perder texto del padre**. Para generalizar hace falta una pila o acumuladores por contexto.

El ejemplo usa `equalsIgnoreCase`, pero XML sí distingue mayúsculas: que la aplicación decida comparar sin distinguirlas no cambia las reglas del formato.

### B08.4. Codificación y `InputSource`

El original muestra `FileInputStream` → `InputStreamReader(..., "UTF-8")` → `InputSource(reader)` → `setEncoding("UTF-8")` → `parse`.

**Matiz técnico importante:** si se proporciona un `Reader`, los bytes **ya están decodificados**. `InputSource.setEncoding` no reinterpreta esos caracteres ni corrige una decodificación previa incorrecta. Si se entrega un flujo de bytes, el parser puede interpretar la declaración XML y las señales de codificación. No es siempre obligatorio envolver un archivo UTF-8 en un `Reader` para que SAX lo lea correctamente.

Cerrar explícitamente los recursos abiertos por la aplicación, preferentemente con `try-with-resources`. El handler maneja eventos, no sustituye la responsabilidad de liberar recursos externos.

## B09. StAX: pull, estados y dos API

StAX, **Streaming API for XML**, permite procesar XML incrementalmente y también dispone de escritura. La diferencia central con SAX es **quién pide/produce las notificaciones**: la aplicación llama para avanzar en StAX; el parser llama a la aplicación en SAX.

### B09.1. Cursor frente a objetos de evento

| Estilo | Lectura | Escritura | Qué se obtiene al avanzar |
|---|---|---|---|
| Cursor | `XMLStreamReader` | `XMLStreamWriter` | `next()` devuelve un código `int`; consultar datos en el lector |
| Iterador/eventos | `XMLEventReader` | `XMLEventWriter` | `nextEvent()` devuelve un objeto `XMLEvent` |

`XMLInputFactory` crea lectores; `XMLOutputFactory` crea escritores. Los escritores se identifican para comprender la capacidad de la API; el desarrollo original se centra en lectura. No confundir `XMLEvent` con un nodo DOM persistente dentro de un árbol.

El cursor suele reducir la necesidad de materializar objetos de evento. El iterador permite conservar eventos como objetos, pero **no puede retroceder por sí solo** en el flujo. Guardar eventos en una lista propia no equivale a que el parser admita marcha atrás.

### B09.2. Eventos y datos asociados

Eventos importantes: `START_DOCUMENT`, `START_ELEMENT`, `CHARACTERS`, `COMMENT`, `END_ELEMENT`, `END_DOCUMENT`. También pueden existir eventos de CDATA, espacio y otros según configuración/API.

- Se respeta el orden documental y la anidación de elementos.
- `<vacio/>` produce inicio y fin de elemento.
- Los atributos se consultan desde el inicio del elemento en la lectura habitual; no se espera un evento independiente por cada atributo dentro del bucle normal.
- Las declaraciones de namespaces se tratan como información asociada; `NamespaceContext` permite resolver prefijos y URI en el contexto actual.
- Un texto puede dividirse en varios eventos. No asumir «una etiqueta, un `CHARACTERS`».
- El orden de los **atributos** no tiene significado semántico en XML y no debe suponerse estable por una frase general del temario sobre orden de eventos.

### B09.3. Factoría y origen

```java
XMLInputFactory factory = XMLInputFactory.newInstance();
XMLStreamReader reader = factory.createXMLStreamReader(
        new FileInputStream("books.xml"));
```

Fragmento con imports `javax.xml.stream` y `java.io`; manejar `FileNotFoundException`/`IOException` y `XMLStreamException` según la operación. Un `FileReader` también puede servir como origen, pero entonces la aplicación ya ha elegido una decodificación. Con bytes el parser puede interpretar la codificación del XML.

## B10. StAX de cursor: contratos y efectos de avanzar

### B10.1. Métodos y estado válido

| Método | Retorno / parámetros | Precondición y efecto |
|---|---|---|
| `getEventType()` | `int` | Tipo del evento actual; no avanza |
| `hasNext()` | `boolean` | Comprueba si hay otro evento; no avanza |
| `next()` | `int`; `XMLStreamException` | Avanza y deja el cursor en el nuevo evento |
| `getName()` | `QName` | Nombre en inicio/fin de elemento |
| `getLocalName()` | `String` | Nombre local del evento apropiado |
| `getName().getLocalPart()` | `String` | Obtiene parte local, no el prefijo ni la URI |
| `getAttributeValue(String namespaceURI, String localName)` | `String` o `null` | Usar en inicio de elemento; `null` como URI significa no comprobarla por igualdad en este contrato |
| `getText()` | `String` | Texto del evento textual actual; no obtiene por sí solo todo el elemento |
| `getElementText()` | `String`; `XMLStreamException` | Requiere inicio de elemento de contenido solo textual; consume hasta su cierre |
| `close()` | `void` | Libera el lector, pero no cierra el origen subyacente según contrato |

Un `XMLStreamReader` recién creado parte de `START_DOCUMENT`. El patrón `while (reader.hasNext()) { int tipo = reader.next(); ... }` **no procesa ese evento inicial en el cuerpo**, porque avanza antes. No significa que no exista el evento.

No todos los getters son válidos en todos los estados. Consultar atributos en un evento textual o de cierre puede lanzar `IllegalStateException`. `next()` cuando no hay más eventos puede lanzar `NoSuchElementException`; los problemas de análisis se expresan con `XMLStreamException`.

### B10.2. `getElementText` no es un getter pasivo

```text
antes: START_ELEMENT title, atributo lang="en"
leer atributo → "en", sin avanzar
getElementText() → "Everyday Italian"
después: END_ELEMENT title
siguiente next() → primer evento posterior al cierre de title
```

El método acumula los fragmentos de texto y deja el lector en el `END_ELEMENT` correspondiente. Si aparece un subelemento, no es un elemento de solo texto y puede lanzar `XMLStreamException`. `<title/>` puede devolver cadena vacía. No confundirlo con `getTextContent()` de DOM, que consulta el árbol y puede incluir texto de descendientes anidados.

Guardar el `int eventType` obtenido antes no lo actualiza automáticamente cuando otro método consume eventos. Tras `getElementText()`, la variable puede seguir valiendo `START_ELEMENT` aunque `reader.getEventType()` sea ya `END_ELEMENT`.

### B10.3. Lectura del ejemplo `books.xml`

El original recorre inicios, imprime el nombre de cada elemento que visita y, al encontrar `title`, imprime `lang` y `getElementText()`.

| Categoría del libro | Título | Año | Precio textual |
|---|---|---:|---|
| cooking | Everyday Italian | 2005 | 30.00 |
| children | Harry Potter | 2005 | 29.99 |
| web | XQuery Kick Start | 2003 | 49.99 |
| web, `cover="paperback"` | Learning XML | 2003 | 39.95 |

Autores: Giada De Laurentiis; J K. Rowling; cinco autores en `XQuery Kick Start` (James McGovern, Per Bothner, Kurt Cagle, James Linn, Vaidyanathan Nagarajan); Erik T. Ray. Cada `title` tiene `lang="en"`.

Que el XML contenga autor, año y precio no significa que el código convierta todos a objetos o los imprima como valores. El programa del temario **selecciona el texto de los títulos**, además de los nombres de los elementos que recorre.

## B11. StAX de iteradores: `XMLEventReader`

### B11.1. Objetos de evento y atributos

```java
XMLEventReader reader = XMLInputFactory.newInstance().createXMLEventReader(in);
while (reader.hasNext()) {
    XMLEvent event = reader.nextEvent();
    if (event.isStartElement()) {
        StartElement start = event.asStartElement();
        String local = start.getName().getLocalPart();
    }
}
```

Fragmento: `in` es un `InputStream` abierto; imports de `javax.xml.stream`, `.events`; manejar excepciones y cierre.

- `XMLEventReader` extiende `Iterator<Object>` en JDK 17; `nextEvent()` devuelve directamente el tipo `XMLEvent` y permite tratar `XMLStreamException` de forma explícita.
- `event.getEventType()` devuelve un código; `event.isStartElement()` comprueba el tipo; `event.asStartElement()` obtiene la vista tipada, **sin consumir el siguiente evento**.
- Convertir a un tipo incorrecto puede fallar; comprobar antes el tipo.
- `StartElement.getAttributes()` devuelve `Iterator<Attribute>`. No es un `NodeList`.
- `Attribute.getName()` devuelve `QName`; `getValue()`, `String`.
- `QName` integra URI de namespace, parte local y prefijo. El nombre local solo puede no distinguir elementos de diferentes espacios de nombres.

### B11.2. Consumo y consulta del siguiente evento

`nextEvent()` consume el siguiente evento. `peek()` permite examinar el próximo sin consumirlo; es aclaración añadida útil para distinguir operaciones. `hasNext()` no sustituye a avanzar.

En el ejemplo, después de consumir un `StartElement` de `title`, `reader.getElementText()` consume los eventos necesarios para devolver el texto hasta el cierre. El objeto local `event` sigue representando el inicio que se había obtenido: **el lector avanza, el objeto anterior no se transforma en un evento de cierre**.

No confundir las dos firmas: cursor `next()` → `int`; eventos `nextEvent()` → `XMLEvent`. Tampoco confundir el cursor sobre el evento actual con la iteración de los atributos de un `StartElement`.

### B11.3. Cierre de recursos

El ejemplo original usa `try (InputStream in = ...)`, por lo que cierra el flujo de bytes aunque haya error. Conviene cerrar también el lector de eventos para liberar sus recursos. `XMLStreamReader` y `XMLEventReader` de JDK 17 tienen `close()` pero **no implementan `AutoCloseable`**, por lo que no se colocan directamente en un `try-with-resources` como si fueran un `BufferedReader`. Usar `finally` para el lector y `try-with-resources` para el origen.

## B12. Binding XML y anotaciones JAXB

### B12.1. Qué añade el enlace de datos

El **XML data binding** establece correspondencia entre estructuras XML y clases Java. La aplicación trabaja con `Libreria`, `Libro` y sus getters/setters, en lugar de recuperar cada valor mediante `Node` o callbacks.

Puede escribirse el modelo manualmente o generarse a partir de un esquema con herramientas como `xjc`. Un XSD no es obligatorio para escribir a mano las clases anotadas; sí es entrada necesaria en la generación basada en ese esquema.

**Historia del entorno docente:** JAXB incluido en Java SE 6–8; módulo deprecado para eliminación desde Java 9 y fuera del JDK desde Java 11. En JDK 17 se necesita API e implementación de JAXB 2 compatibles. Tener solo imports o solo la API no asegura disponer del motor en ejecución. Las herramientas de generación también pueden necesitar instalación/dependencias externas.

JAXB no exige `implements Serializable` para realizar el mapeo XML. Ese requisito pertenece a la serialización binaria nativa de Java, no al hecho de que una operación se llame «serialización» en sentido amplio.

### B12.2. Tabla de anotaciones y parámetros

| Anotación | Se aplica al modelo para | Parámetro importante / ejemplo | No confundir con |
|---|---|---|---|
| `@XmlRootElement` | Asociar una clase con un elemento raíz | `name="libreria"` | Definir el orden de todos los campos |
| `@XmlType` | Mapear el tipo y controlar propiedades del tipo XML | `propOrder={"autor","nombre","editorial","isbn"}` | Ser exclusivamente una marca para clases no raíz |
| `@XmlElement` | Mapear propiedad como elemento | `name="Libro"` | Un atributo XML |
| `@XmlAttribute` | Mapear propiedad como atributo | `name="id"` | Crear `<id>` como hijo |
| `@XmlElementWrapper` | Envolver una colección con un elemento contenedor | `name="ListaLibro"` | Definir el nombre de cada ítem |

Una anotación Java aporta metadatos; no es una llamada que ya escriba el archivo. Se escribe con `@`, puede tener parámetros y ser procesada según las reglas de la anotación. No todas las anotaciones son válidas sobre todos los tipos de elemento Java.

`name` cambia el nombre XML, no el nombre de la variable Java. `propOrder` usa los **nombres de las propiedades Java** mapeadas como elementos, no necesariamente los nombres XML personalizados. El orden de declaración de los campos no sustituye a `propOrder` cuando se necesita orden explícito.

`@XmlType` puede aparecer también en una clase raíz. `@XmlRootElement()` sin `name` usa las reglas de nombre predeterminado; para `Libreria`, en el ejemplo se obtiene `libreria`.

### B12.3. Wrapper e ítem son dos niveles

```java
@XmlElementWrapper(name = "ListaLibro")
@XmlElement(name = "Libro")
public void setListaLibro(ArrayList<Libro> listaLibro) {
    this.listaLibro = listaLibro;
}
```

En el modelo completo de la fuente existen también el campo y el getter. La salida deseada es:

```xml
<ListaLibro>
    <Libro>
        <autor>...</autor>
        <nombre>...</nombre>
        <editorial>...</editorial>
        <isbn>...</isbn>
    </Libro>
    <Libro>...</Libro>
</ListaLibro>
```

`Wrapper` produce el único contenedor de la colección; `Element` nombra cada entrada. Intercambiarlos cambia la estructura; el wrapper no sustituye a la anotación del ítem. `ArrayList<Libro>` es la propiedad Java; no debe generarse automáticamente un `<ArrayList>` por el nombre de su clase contenedora.

### B12.4. JavaBeans y acceso a propiedades

El ejemplo tiene campos privados, getters/setters públicos y anotaciones sobre setters. JAXB admite anotaciones de propiedad en los accesores apropiados; no duplicarlas por rutina sobre campo y propiedad, porque puede producir conflictos según la estrategia de acceso.

Las clases docentes no declaran constructores, por lo que reciben el constructor implícito sin argumentos. Si se añade únicamente un constructor con parámetros, deja de existir ese constructor implícito; el binding ordinario necesita un constructor sin argumentos accesible según sus requisitos o una estrategia especial. No atribuirle la capacidad de construir cualquier clase sin cumplir condiciones.

## B13. JAXB: esquema, ciclo completo y contratos

### B13.1. Modelo `Libreria`/`Libro` y el XSD de la imagen

`Libreria` contiene `ArrayList<Libro> listaLibro`, `String nombre` y `String lugar`. Cada `Libro` contiene `String autor`, `nombre`, `editorial`, `isbn`. La relación es una librería con una colección de libros.

**Lectura textual de la imagen XSD docente:**

- Elemento raíz `libreria` con un tipo complejo y una secuencia.
- Primero aparece `ListaLibro`, que contiene una secuencia de `Libro`.
- `Libro` tiene `minOccurs="0"` y `maxOccurs="unbounded"`: admite cero o muchos libros dentro de la lista.
- Dentro de cada `Libro`, secuencia `autor`, `nombre`, `editorial`, `isbn`, todos `xs:string`.
- Después de `ListaLibro`, la raíz exige `lugar` y luego `nombre`, ambos `xs:string`.
- El esquema declara `elementFormDefault="qualified"` y `attributeFormDefault="unqualified"`; no declara un `targetNamespace` en la imagen.

**Matiz imprescindible:** el código docente fija `propOrder` en `Libro`, pero **no lo fija en `Libreria`**. Por tanto, no se debe garantizar que la salida de la raíz respete `ListaLibro`, `lugar`, `nombre` solo por el orden mostrado en el XML de ejemplo. Si se necesita exigir esa secuencia, puede añadirse a `Libreria` `@XmlType(propOrder={"listaLibro","lugar","nombre"})` como corrección explícita; los nombres son propiedades Java. La validación contra el XSD debe configurarse aparte.

### B13.2. Etapas del binding

1. Definir/generar las clases de mapeo y sus anotaciones.
2. Compilar clases y aplicación con las dependencias necesarias.
3. Crear el contexto `JAXBContext` con el modelo conocido.
4. Obtener un `Unmarshaller` para XML → objetos.
5. Si se solicita/configura, validar con un esquema.
6. Consultar/modificar objetos mediante getters/setters.
7. Obtener un `Marshaller` para objetos → XML.

El orden operativo puede empezar por objetos ya creados y hacer primero `marshal`, como en el ejemplo final. No confundir el diagrama de posibilidades con una obligación de ejecutar siempre primero la generación o el `unmarshal`.

### B13.3. Parámetros, retornos y dirección

| Operación | Firma de uso docente | Papel |
|---|---|---|
| Contexto | `JAXBContext.newInstance(Libreria.class)` | Informa del modelo; no genera el archivo |
| Crear serializador | `context.createMarshaller()` | Devuelve `Marshaller` |
| Formato | `m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE)` | Presentación legible; no validación |
| Serializar | `m.marshal(libreria, new File("libreria-jaxb.xml"))` | Java → XML; objeto origen y destino |
| Consola | `m.marshal(libreria, System.out)` | Mismo origen, otra salida; no escribe el archivo por sí sola |
| Crear deserializador | `context.createUnmarshaller()` | Devuelve `Unmarshaller` |
| Deserializar | `(Libreria) u.unmarshal(new File("libreria-jaxb.xml"))` | XML → objeto en la sobrecarga usada |

`JAXBContext` puede reutilizarse para crear ambos componentes. En la sobrecarga `unmarshal(File)` el tipo declarado del retorno es `Object`, de ahí el cast del ejemplo. Otras sobrecargas/modelos pueden producir `JAXBElement`; no generalizar el cast sin conocer la operación y la raíz mapeada.

Los problemas del proceso se expresan mediante `JAXBException` y subclases. `JAXB_FORMATTED_OUTPUT=true` no comprueba un XSD, no cambia el modelo ni selecciona una codificación arbitraria. La validación no es automática por tener anotaciones o un XSD en la carpeta.

### B13.4. Datos y resultado del ejemplo final

Objetos originales:

| Libro | Autor | Editorial | ISBN |
|---|---|---|---|
| The Game | Neil Strauss | Harpercollins | 978-0060554736 |
| Feuchtgebiete | Charlotte Roche | Dumont Buchverlag | 978-3832180577 |

La librería tiene nombre `Librería sin límite` y lugar `Barrio Obrero`. El programa crea la lista, añade los dos objetos, asigna lista/nombre/lugar, hace `marshal` a consola y al archivo, hace `unmarshal` de ese archivo y recorre los libros recuperados.

Salida final del recorrido, sin incluir antes el XML mostrado por consola:

```text
Salida deserializada del XML:
Libro: The Game de Neil Strauss
Libro: Feuchtgebiete de Charlotte Roche
```

**Variante añadida:** cambiar `libro1.setNombre(...)` después del primer guardado no modifica el archivo ya escrito. Hace falta otro `marshal`. Esto es análogo a modificar un DOM y volver a ejecutar su transformación para persistirlo, aunque las representaciones en memoria sean distintas.

## B14. Laboratorio añadido: comparar DOM, SAX y StAX

### B14.1. Contrato y programa completo

**Objetivo:** extraer un mismo texto con tres mecanismos y observar el estado de StAX. **Entrada:** XML interno sin archivos externos. **Requisitos:** JDK 17 o posterior, módulo estándar `java.xml`. **No utiliza JAXB ni necesita NIO.** El handler se limita al campo simple `nombre` de esta entrada.

**Programa completo `PruebaXml.java`:**

```java
import java.io.StringReader;
import javax.xml.parsers.*;
import javax.xml.stream.*;
import org.w3c.dom.*;
import org.xml.sax.Attributes;
import org.xml.sax.InputSource;
import org.xml.sax.helpers.DefaultHandler;

public class PruebaXml {
    private static final String XML =
        "<clase><alumno numero=\"393\"><nombre>Luis</nombre></alumno></clase>";

    public static void main(String[] args) throws Exception {
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder()
            .parse(new InputSource(new StringReader(XML)));
        Element nombre = (Element) doc.getElementsByTagName("nombre").item(0);
        System.out.println("DOM nodeValue: " + nombre.getNodeValue());
        System.out.println("DOM texto: " + nombre.getTextContent());
        System.out.println("DOM ausente: [" + nombre.getAttribute("ausente") + "]");

        SAXParserFactory.newInstance().newSAXParser().parse(
            new InputSource(new StringReader(XML)), new DefaultHandler() {
                private boolean activo;
                private final StringBuilder texto = new StringBuilder();
                @Override
                public void startElement(String uri, String local, String q, Attributes a) {
                    if ("nombre".equals(q)) {
                        activo = true;
                        texto.setLength(0);
                    }
                }
                @Override
                public void characters(char[] ch, int start, int length) {
                    if (activo) texto.append(ch, start, length);
                }
                @Override
                public void endElement(String uri, String local, String q) {
                    if ("nombre".equals(q)) {
                        System.out.println("SAX texto: " + texto);
                        activo = false;
                    }
                }
            });

        XMLStreamReader r = XMLInputFactory.newInstance()
            .createXMLStreamReader(new StringReader(XML));
        try {
            while (r.hasNext()) {
                if (r.next() == XMLStreamConstants.START_ELEMENT
                        && "nombre".equals(r.getLocalName())) {
                    System.out.println("StAX texto: " + r.getElementText());
                    System.out.println("StAX en cierre: " + r.isEndElement());
                }
            }
        } finally {
            r.close();
        }
    }
}
```

Salida esperada:

```text
DOM nodeValue: null
DOM texto: Luis
DOM ausente: []
SAX texto: Luis
StAX texto: Luis
StAX en cierre: true
```

### B14.2. Explicación y variante

DOM consulta un árbol; SAX acumula fragmentos; StAX controla el avance. Los tres pueden producir el mismo valor, pero no comparten modelo de datos ni efectos de cursor.

**Variante razonada:** sustituir `<nombre>Luis</nombre>` por `<nombre>Lu<parte>is</parte></nombre>`. DOM `getTextContent()` sigue pudiendo obtener `Luis`; StAX `getElementText()` deja de ser apropiado porque hay un subelemento. El handler SAX debe evaluarse según su estado y reglas: el patrón de B14 conserva la activación hasta el cierre de `nombre`, mientras que el handler original que reinicia cada inicio/fin no es equivalente para este caso. No afirmar resultados idénticos sin revisar cada algoritmo.

### B14.3. Qué no demuestra este laboratorio

No demuestra validación XSD, protección de todos los parsers ante entradas hostiles, rendimiento para archivos grandes ni ejecución de JAXB. Los ejemplos originales se conservan como material docente; ejecutar este laboratorio no certifica que todos ellos compilen sin adaptar paquetes, ficheros y dependencias.

## B15. Trampas, comprobaciones y práctica tipo test

### B15.1. Tabla de alta discriminación

| Distractor frecuente | Corrección |
|---|---|
| «Un parser valida siempre contra XSD» | Buen formado y validación son operaciones distintas |
| «`Document` y elemento raíz son lo mismo» | Documento completo frente al `Element` raíz |
| «`newDocument()` parsea un archivo vacío» | Crea un documento en memoria, no lee un archivo |
| «Todo hijo DOM es `Element`» | Puede ser texto de indentación, comentario, etc. |
| «`Element.getNodeValue()` devuelve el texto interior» | Devuelve `null`; usar la operación textual adecuada |
| «`getElementsByTagName` busca solo hijos directos» | Busca descendientes |
| «`item(0)` siempre existe» | Puede devolver `null` |
| «Un atributo ausente devuelve `null` en `Element.getAttribute`» | Habitualmente devuelve `""`; distinguir de SAX/StAX |
| «`normalize()` elimina toda la indentación» | No elimina necesariamente texto con espacios |
| «`createElement` coloca el nodo en el árbol» | Hay que insertarlo |
| «`appendChild` clona siempre» | Puede mover el nodo existente |
| «Cambiar el DOM cambia inmediatamente el XML del disco» | Es necesario serializar explícitamente |
| «SAX llama una sola vez a `characters` por etiqueta» | Puede fragmentar el texto |
| «`length` en `characters` es un índice final» | Es cantidad de caracteres |
| «SAX y StAX son ambos push» | SAX push; StAX pull |
| «StAX retrocede porque tiene iteradores» | No; guardar eventos no permite retroceder el parser |
| «`next()` de cursor devuelve `XMLEvent`» | Devuelve `int`; `nextEvent()` devuelve `XMLEvent` |
| «`getElementText()` no avanza» | Consume hasta el cierre correspondiente |
| «Leer el nombre local distingue todos los namespaces» | Dos URI distintas pueden compartir nombre local |
| «Los atributos XML tienen orden semántico fijo» | No; no depender de su orden de iteración |
| «JAXB forma parte de cualquier JDK moderno» | No desde Java 11; se añaden dependencias |
| «Todos los paquetes `javax.xml` se sustituyen por `jakarta`» | Falso: DOM/SAX/StAX estándar siguen en `java.xml`; no mezclar versiones de binding |
| «`Serializable` es obligatorio para JAXB» | No para este binding XML |
| «Wrapper e ítem de colección son la misma etiqueta» | Contenedor frente a elemento repetido |
| «`@XmlType` solo sirve para clases no raíz» | También puede aplicarse a la raíz |
| «`propOrder` usa los nombres XML personalizados» | Usa nombres de propiedades Java |
| «Formato bonito equivale a validación» | `JAXB_FORMATTED_OUTPUT` y `OutputKeys.INDENT` son presentación |
| «Marshal es XML → Java» | Dirección inversa: Java → XML |

### B15.2. Preguntas añadidas — seis opciones, una correcta

#### B15.2.1. Texto DOM

`e` es el elemento `<nombre>Luis</nombre>`. ¿Qué expresión obtiene `Luis` directamente?

A. `e.getNodeValue()`. B. `e.getNodeName()`. C. `e.getTextContent()`. D. `e.getAttribute("nombre")`. E. `e.toString()` necesariamente. F. `e.getParentNode().getNodeValue()`.

**Correcta: C.** A devuelve `null`; B devuelve `nombre`; D busca un atributo que no es el contenido; E no es el contrato de extracción; F consulta el valor del padre, no ese texto.

#### B15.2.2. Lista de descendientes

`e` representa `<grupo><alumno/><subgrupo><alumno/></subgrupo></grupo>`. ¿Cuántos elementos devuelve `e.getElementsByTagName("alumno")`?

A. 0. B. 1. C. 3. D. Depende exclusivamente de la indentación. E. 2. F. Lanza excepción por anidación.

**Correcta: E.** A/B omiten coincidencias descendientes; C añade un elemento que no coincide; D confunde texto con elementos; F inventa una restricción que no existe.

#### B15.2.3. Fragmentación SAX

Dos llamadas a `characters` contienen `"Lu"` y `"is"` durante un campo simple. ¿Estrategia correcta?

A. Conservar solo la segunda llamada. B. Suponer que la segunda inicia otro alumno. C. Lanzar excepción porque SAX incumple el estándar. D. Acumular ambos tramos válidos y procesar al cierre del campo. E. Leer todos los caracteres de `ch` ignorando `start`. F. Añadir `start + length` caracteres empezando en cero.

**Correcta: D.** A pierde contenido; B atribuye estructura a una partición textual; C rechaza un comportamiento permitido; E/F interpretan mal el rango válido.

#### B15.2.4. Cursor StAX

El cursor está en el inicio de `<title lang="en">Learning XML</title>`. Tras `getElementText()` correcto, ¿estado?

A. Sigue en el inicio de `title`. B. Está en el cierre de `title`. C. Está siempre en el final del documento. D. Está en el atributo `lang`. E. Vuelve al inicio del documento. F. Queda en el primer carácter del texto.

**Correcta: B.** A/F tratan la operación como pasiva o parcial; C consume de más; D confunde atributo y evento actual; E inventa retroceso.

#### B15.2.5. Mapeo de lista JAXB

Para obtener `<ListaLibro><Libro>...</Libro><Libro>...</Libro></ListaLibro>`, ¿asignación correcta?

A. `XmlElementWrapper(name="ListaLibro")` para el contenedor y `XmlElement(name="Libro")` para los ítems. B. Ambas con nombre `Libro`. C. `XmlAttribute(name="ListaLibro")` para toda la lista. D. Solo `XmlRootElement` en cada cadena del libro. E. Intercambiar wrapper e ítem. F. Usar `Serializable` en lugar de anotaciones.

**Correcta: A.** B pierde el nombre del contenedor; C cambia a atributo y no expresa la estructura; D no mapea la colección; E invierte los niveles; F confunde dos mecanismos de serialización.

#### B15.2.6. Java y XML

Se dispone de una `Libreria` correctamente mapeada y un contexto JAXB 2 operativo. ¿Qué operación persiste ese objeto como XML en un archivo?

A. `context.createUnmarshaller()` sin más. B. `builder.newDocument()` sin nodos. C. `libreria.toString()`. D. `unmarshaller.unmarshal(archivo)`. E. `new DOMSource(libreria)`. F. `marshaller.marshal(libreria, archivo)`.

**Correcta: F.** A solo crea un componente; B crea una representación distinta y vacía; C no garantiza XML; D es la dirección inversa; E requiere un nodo DOM, no un objeto de dominio arbitrario.

### B15.3. Revisión final por mecanismos

Poder explicar qué queda en memoria con cada API; quién controla el avance; cómo se obtiene raíz/atributo/texto; cómo se cuentan descendientes; qué pasa con espacios y nodos no elemento; qué métodos consumen eventos; cómo acumular caracteres; cómo se crea y guarda un árbol; qué significa mapear una clase; qué produce cada anotación; cómo se relacionan wrapper, ítem, propiedad y orden; qué dependencias exige JAXB del curso.

### B15.4. Referencias de contraste

- Contrato de cursor y `getElementText`: https://docs.oracle.com/en/java/javase/17/docs/api/java.xml/javax/xml/stream/XMLStreamReader.html
- DOM y tipos de nodos: https://docs.oracle.com/en/java/javase/17/docs/api/java.xml/org/w3c/dom/package-summary.html
- SAX y eventos: https://docs.oracle.com/en/java/javase/17/docs/api/java.xml/org/xml/sax/package-summary.html
- Referencias de JAXB y otras API: conservadas en el anexo docente. Las correcciones y límites están separados del contenido original para evitar atribuir al profesor ampliaciones no confirmadas.

<!-- INICIO ANEXO DOCENTE -->

## Anexo documental — texto original para consulta

El texto siguiente conserva el material docente del alcance indicado, incluidas sus repeticiones, ejemplos y formulaciones. **No usarlo para repetir el podcast completo ni para anular las aclaraciones técnicas del desarrollo principal.** Los ejemplos originales no se declaran ejecutados. Las imágenes son recursos locales de consulta; el contenido conceptual necesario para el audio está desarrollado en texto antes de este anexo.

Transformaciones editoriales declaradas:

- Codificación de salida UTF-8 y finales de línea LF.
- Encabezados docentes desplazados un nivel y prefijados para distinguirlos del desarrollo elaborado; contenido de código sin modificar.
- Rutas ./img/ adaptadas a ../temario/img/ para conservar recursos originales.

## Docente — UT02-B: Librerías de tratamiento de XML en Java

> **Módulo:** Acceso a Datos (DAM 2)
> **Unidad:** UT02 - Persistencia en ficheros y XML
> **Tema:** 2B - Librerías de tratamiento de XML en Java (DOM, SAX, StAX, JAXB)
> **Documento oficial PDF:** [`2B Librerías de tratamiento de XML en Java. _ AulaVirtual.pdf`](../recursos/2B%20Librer%C3%ADas%20de%20tratamiento%20de%20XML%20en%20Java.%20_%20AulaVirtual/2B%20Librer%C3%ADas%20de%20tratamiento%20de%20XML%20en%20Java.%20_%20AulaVirtual.pdf)
---

### Docente — 1. Introducción

Cuando se quieren almacenar **datos que deban ser leídos por aplicaciones ejecutadas en múltiples plataformas**, es necesario recurrir a formatos estandarizados, como los lenguajes de marcas.

Los **documentos XML** consiguen **estructurar la información** intercalando una serie de **marcas denominadas etiquetas**. En XML, las marcas o etiquetas tienen cierta similitud con un contenedor de información. Así, **una etiqueta puede contener otras etiquetas o información textual**. De este modo, conseguiremos subdividir la información estructurándola de forma que pueda ser fácilmente interpretada.

XML es un formato de almacenamiento e intercambio de datos basado en texto estructurado mediante etiquetas. Los usos de XML son múltiples.

**Gran parte de la potencia de XML radica en el equilibrio entre ser un formato de texto sencillo y portable a cualquier plataforma, pero con la suficiente flexibilidad para representar información estructurada.** Esto nos permite utilizar XML para compartir información entre diferentes aplicaciones. Podemos acceder a información producida por una aplicación ajena e integrarla en nuestra propia aplicación de forma débilmente acoplada. De esta forma, utilizamos dentro de nuestra aplicación un servicio que nos proporciona otra aplicación que puede estar ubicada en cualquier lugar de Internet.

Además, no solo sirve para integrar aplicaciones ubicadas en distintos lugares de la red, sino que también permite comunicar aplicaciones implementadas en diferentes lenguajes y plataformas. Por ejemplo, podemos intercambiar datos.

Como **toda la información es textual**, no existe el problema de representar los datos de maneras diferentes. Cualquier dato, ya sea numérico o booleano, debe transcribirse como texto; así, cualquiera que sea el sistema de representación de datos, será posible leer e interpretar correctamente la información contenida en un archivo XML.

Es cierto que los caracteres **se pueden escribir usando también diferentes sistemas de codificación**, pero XML ofrece diversas técnicas para evitar que esto sea un problema. Por ejemplo, **es posible incluir en la cabecera del archivo qué codificación se ha utilizado durante el almacenamiento**; también se pueden representar caracteres mediante **entidades de caracteres**, una forma universal de codificar símbolos, incluidos aquellos que no pertenecen a ASCII.
XML permite organizar cualquier tipo de información de forma jerárquica. Es similar a cómo la información se guarda en los objetos de una aplicación y cómo se guardaría en un documento XML. La información, en las aplicaciones orientadas a objetos, se estructura, agrupa y jerarquiza en clases, y en los documentos XML se estructura, organiza y jerarquiza en etiquetas contenidas unas dentro de otras y atributos de las etiquetas. ([Consulta aquí librerías que permiten trabajar con XML desde Java](https://www.baeldung.com/java-xml-libraries)).

#### Docente — 1.1. _Parser_ o analizador XML

Dado que XML es un lenguaje utilizado ampliamente en el desarrollo de la World Wide Web, existen ya herramientas y estándares de programación para leer documentos XML.

**Un _parser_ XML es un módulo, biblioteca o programa que se ocupa de analizar, clasificar y convertir un archivo XML en una representación interna, extrayendo la información contenida en cada una de las etiquetas y relacionándola de acuerdo con su posición en la jerarquía.**

En el caso de XML, como el formato siempre es el mismo, no necesitamos crear un _parser_ cada vez que hacemos un programa, sino que existe un gran número de _parsers_ o analizadores sintácticos disponibles que pueden averiguar si un documento XML cumple una determinada gramática. Estos analizadores pueden ser secuenciales, como SAX o StAX, o jerárquicos, como DOM.

**Analizadores secuenciales**

Los analizadores secuenciales **permiten extraer el contenido del XML a medida que encuentran las etiquetas de apertura y cierre**. Esto significa que **van leyendo el flujo de entrada y procesan los datos de forma inmediata**, sin tener que cargar todo el archivo en memoria. Este enfoque es eficiente para manejar grandes volúmenes de datos, ya que no requiere almacenar todo el documento, sino procesarlo a medida que se lee. Son analizadores muy rápidos, pero presentan la limitación de que, si se necesita acceder de nuevo a una parte del contenido, es necesario releer todo el documento de arriba abajo.

En Java hay dos analizadores secuenciales: **SAX**, que es el acrónimo de **Simple API for XML** (muy usado en diversas bibliotecas de tratamiento de datos XML, pero poco habitual en aplicaciones finales) y **StAX** (**Streaming API for XML**), posterior a SAX y que ofrece mayor control al programador.

**Analizadores jerárquicos**

Generalmente, las aplicaciones finales que necesitan trabajar con datos XML suelen usar **analizadores jerárquicos porque, además de realizar un análisis secuencial que permite clasificar el contenido, los [datos contenidos](<>) se almacenan en la memoria RAM siguiendo la estructura jerárquica detectada en el documento**. Esto facilita mucho las consultas que haya que repetir varias veces, dado que las estructuras jerárquicas en memoria RAM ofrecen un acceso muy eficiente a los datos.

**Los analizadores jerárquicos guardan todos los datos del XML en memoria dentro de una estructura jerárquica.** Son ideales para aplicaciones que requieran una consulta continua de los datos.

El formato de la estructura donde se almacena la información en la memoria RAM ha sido especificado por el organismo internacional W3C (World Wide Web Consortium) y se conoce como DOM (_Document Object Model_, modelo de objetos del documento).

HTML y JavaScript han popularizado mucho el estándar DOM. Se trata de una especificación que Java materializa en forma de interfaces. La principal se denomina **`Document`** y representa un documento XML completo. Al tratarse de una interfaz, puede ser implementada por varias clases.

**Comparativa de analizadores**

| CARACTERÍSTICA                 | StAX            | SAX             | DOM        | TrAX       |
| ------------------------------ | --------------- | --------------- | ---------- | ---------- |
| Tipo de API                    | Pull, streaming | Push, streaming | En memoria | Regla XSLT |
| Facilidad de uso               | Alta            | Media           | Alta       | Media      |
| Capacidad XPath                | No              | No              | Sí         | Sí         |
| Eficiencia de CPU y memoria    | Buena           | Buena           | Varía      | Varía      |
| Solo hacia adelante            | Sí              | Sí              | No         | No         |
| Lee XML                        | Sí              | Sí              | Sí         | Sí         |
| Escribe XML                    | Sí              | No              | Sí         | Sí         |
| Crear, leer, modificar, borrar | No              | No              | Sí         | No         |

[Para saber más](https://programacion.net/articulo/comparacion_de_las_tecnologias_java_para_xml_157)

#### Docente — 1.2. DOM vs SAX

El analizador DOM es una API basada en la representación de la información mediante un árbol jerárquico. Proporciona interfaces para trabajar con el árbol completo (documento) o con una parte de este.
**Un analizador DOM crea una estructura de árbol en memoria del documento XML de entrada** y luego atiende las solicitudes del cliente. Un analizador DOM carga en memoria todo el documento XML, independientemente de si el cliente necesita solo una parte o el documento entero. Con el analizador DOM, las llamadas a métodos en la aplicación cliente permiten recorrer y consultar el árbol jerárquico.

**El analizador SAX es una API basada en eventos.** Por lo general, proporciona interfaces que deben ser implementadas por clases controladoras (_handlers_) para gestionar los eventos generados durante el análisis (como el hallazgo de etiquetas de apertura/cierre, texto o comentarios).
**El analizador SAX no crea un árbol interno del documento.** En cambio, notifica los componentes del documento de entrada como eventos en tiempo real mientras lee el flujo secuencialmente y procesa solo una parte del documento en cada momento.

**Resumiendo, las diferencias entre las API DOM y SAX:**

- DOM analiza documentos enteros.
- Representa el resultado como un árbol.
- Permite búsquedas en el árbol.
- Permite la modificación del árbol.
- Es adecuado para leer ficheros de datos/configuración.
- SAX analiza secuencialmente el documento XML de principio a fin, hasta que se le indica que pare.
- Dispara eventos por cada componente del documento que encuentra.

#### Docente — 1.3. Serialización del XML

**La serialización es un mecanismo ampliamente usado para transportar objetos a través de una red, para hacer persistente un objeto en un archivo o base de datos, o para distribuir objetos idénticos a varias aplicaciones o localizaciones.**

XML es un formato estándar de documentos basados en texto que permite almacenar datos legibles por aplicaciones y procesarlos fácilmente. Para llevar a cabo este proceso, se deben definir mediante reglas tanto la transformación de objetos Java a XML como la transformación inversa.

Las librerías **`JAXB`** (Java Architecture for XML Binding) y **`XStream`** permiten serializar objetos Java en un medio de almacenamiento (archivo o búfer de memoria) con el fin de transmitirlos o almacenarlos en formatos legibles como XML o JSON. La serie de bytes o el formato empleado permiten reconstruir un nuevo objeto idéntico en su estado interno al original (un clon persistido).

### Docente — 2. DOM

![XML Document vs Document Object Tree (DOM)](../temario/img/2B/1.png)

María Jesús Lamarca Lapuente. _Hipertexto: El nuevo concepto de documento en la cultura de la imagen._

**DOM (Document Object Model)** es una recomendación oficial del World Wide Web Consortium (W3C). Define una interfaz estándar que permite a los programas acceder y actualizar el estilo, la estructura y el contenido de los documentos XML. Los analizadores XML compatibles con DOM implementan esta interfaz.

El módulo **`java.xml`** incluye las APIs necesarias para procesar y manipular documentos XML en Java. Esto incluye el soporte para DOM (Document Object Model), SAX (Simple API for XML) y XSLT (Extensible Stylesheet Language Transformations).

Incluye la clase abstracta **`DocumentBuilder`** con el propósito de poder instanciar estructuras DOM a partir de un XML. Recuerda que las clases abstractas no se pueden instanciar de forma directa; por este motivo se especifica la clase factoría **`DocumentBuilderFactory`**:

```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
DocumentBuilder db = dbf.newDocumentBuilder();
```

##### Docente — Operaciones con DOM

A partir de aquí podemos leer el fichero XML y obtener un documento DOM que represente en memoria la información contenida en el XML (parseo). También podemos añadir nodos a este documento y después escribirlo en un fichero XML (transformación).

**Operación de parseo: XML → `Document`**

![Operación de parseo: XML a Document DOM](../temario/img/2B/2.png)

```java
Document doc = db.parse(new File("fitxer.xml"));
```

El método `parse()` lee el fichero XML y lo convierte en un documento de la interfaz `org.w3c.dom.Document` en memoria RAM. Para utilizar la información contenida en el árbol, emplearemos las interfaces de DOM: `Node`, `NodeList`, `Element`, etc. Lo veremos más adelante.

**Operación de transformación: `Document` → XML**

![Operación de transformación: Document DOM a XML](../temario/img/2B/3.png)

Se crea un documento (árbol DOM) vacío con el método `newDocument()` de la clase `DocumentBuilder`:

```java
Document doc = db.newDocument();
```

Para añadir nodos y subnodos con la información que queramos guardar en el fichero XML, utilizaremos las interfaces de DOM: `Node`, `NodeList`, `Element`, etc. Lo veremos más adelante.

La escritura de la información contenida en un documento DOM se puede secuenciar en forma de texto utilizando **`Transformer`**. Permite realizar conversiones jerárquicas, por ejemplo volcando un objeto `Document` a un archivo XML.

`Transformer` es también una clase abstracta y requiere de `TransformerFactory` para ser instanciada. Trabaja mediante un par de adaptadores: **`Source`** (origen: `DOMSource`, `SAXSource`, `StreamSource`) y **`Result`** (destino: `DOMResult`, `SAXResult`, `StreamResult`).

El código básico para transformar un DOM en un archivo de texto XML sería el siguiente:

```java
// Creación de una instancia de Transformer
Transformer trans = TransformerFactory.newInstance().newTransformer();
// Creación de los adaptadores Source y Result a partir de un Document y un File
StreamResult result = new StreamResult(file);
DOMSource source = new DOMSource(doc);
trans.transform(source, result);
```

#### Docente — 2.1. Ejemplo de DOM

El siguiente ejemplo parsea un archivo XML (`cd_catalog.xml`) y lo transforma para volcarlo a un fichero de texto (`catalogo.txt`) o mostrarlo por pantalla:

```java
package ejemplo1;

import java.io.File;
import java.io.IOException;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

public class XmlCtrlDom {
    final static File ficheroIN = new File("cd_catalog.xml");
    final static File ficheroOUT = new File("catalogo.txt");

    public static void main(String[] args) throws SAXException, IOException, ParserConfigurationException, TransformerException {
        Document documento = null;
        // Parsear: ficheroIN -> documento DOM
        documento = instanciarDocument(ficheroIN);

        // Transformar: documento DOM -> ficheroOUT
        escribeDocumentATextXml(documento, ficheroOUT);
    }

    // Crea un documento DOM vacío
    public static Document instanciarDocument() throws ParserConfigurationException {
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
        return doc;
    }

    // Lee un fichero XML y crea un documento DOM en memoria
    public static Document instanciarDocument(File fXmlFile) throws SAXException, IOException, ParserConfigurationException {
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(fXmlFile);
        return doc;
    }

    // Transforma un documento DOM en un fichero XML (o a consola)
    public static void escribeDocumentATextXml(Document doc, File file) throws TransformerException {
        Transformer trans = TransformerFactory.newInstance().newTransformer();
        trans.setOutputProperty(OutputKeys.INDENT, "yes");

        // StreamResult puede tener distintas salidas: a un fichero o por pantalla (System.out)
        StreamResult result = new StreamResult(file);
        DOMSource source = new DOMSource(doc);
        trans.transform(source, result);
    }
}
```

#### Docente — 2.2. Jerarquía de clases del paquete `javax.xml.parsers`

![Jerarquía de clases del paquete javax.xml.parsers](../temario/img/2B/4.png)

[Jerarquía de clases e interfaces](https://docs.oracle.com/en/java/javase/11/docs/api/java.xml/javax/xml/parsers/package-tree.html) (Java SE 11)

![Jerarquía de clases e interfaces del paquete org.w3c.dom](../temario/img/2B/5.png)

Jerarquía de clases e interfaces del [paquete `org.w3c.dom`](https://docs.oracle.com/en/java/javase/11/docs/api/java.xml/org/w3c/dom/package-tree.html) (Java SE 11).

#### Docente — 2.3. La estructura DOM

La estructura DOM toma la forma de un árbol, donde cada parte del XML se encontrará representada en forma de nodo.

En función de la posición en el documento XML, hablaremos de diferentes tipos de nodos:

- El nodo principal que representa todo el XML entero se denomina **`Document`**.
- Las diversas etiquetas, incluida la etiqueta raíz, se conocen como **nodos de tipo `Element`**.
- El contenido textual de una etiqueta se instancia como **nodo de tipo `Text`**.
- Los atributos se instancian como **nodos de tipo `Attr`**.

Cada nodo específico dispone de métodos para acceder a sus datos concretos (nombre, valor, nodos hijos, nodo padre, etc.).

El DOM resultante obtenido de un XML termina siendo una copia del archivo, pero con una disposición en árbol. Tanto el DOM como el XML tendrán información no visible, como los retornos de carro y los espacios en blanco, que debe tenerse en cuenta para procesar correctamente el contenido. Al mapear XML, los retornos de carro y la indentación suelen representarse en el DOM como nodos hijos de texto que contienen espacios en blanco, y **el contenido textual de las etiquetas se plasma en el DOM como un nodo hijo de la etiqueta contenedora**. Por tanto, para obtener el texto de una etiqueta simple se puede acceder a su primer nodo hijo.

La interfaz `Document` contempla un conjunto de métodos para seleccionar diferentes partes del árbol a partir del nombre de la etiqueta o de sus atributos. Las partes del árbol se devuelven como objetos `Element`, los cuales representan un nodo y todos sus hijos.

##### Docente — Interfaces DOM principales

- **`Node`**: Representa a cualquier nodo del documento. Es el tipo primario del que heredan el resto de interfaces.
- **`Element`**: Es un tipo de nodo específico asociado a una etiqueta XML.
- **`Attr`**: Representa un atributo de un elemento.
- **`Text`**: Contenido textual de un elemento.
- **`Document`**: Representa el documento XML completo (árbol DOM) y permite crear nuevos nodos.
- **`NodeList`**: Colección ordenada de nodos a los que se accede mediante un índice (`item(int index)`).

##### Docente — Métodos DOM más usuales

- **`Element Document.getDocumentElement()`**: Retorna el elemento raíz del documento.
- **`Node Node.getFirstChild()`**: Retorna el primer nodo hijo.
- **`Node Node.getLastChild()`**: Retorna el último nodo hijo.
- **`Node Node.getNextSibling()`**: Retorna el siguiente nodo hermano.
- **`Node Node.getPreviousSibling()`**: Retorna el nodo hermano anterior.
- **`String Element.getAttribute(String name)`**: Retorna el valor del atributo cuyo nombre se pasa como argumento.
- **`String Node.getNodeValue()`**: Retorna el valor del nodo (para nodos de texto o atributos).
- **`NodeList Element.getElementsByTagName(String name)`**: Devuelve un `NodeList` con todos los descendientes con ese nombre de etiqueta.
- **`NodeList Document.getElementsByTagName(String name)`**: Devuelve un `NodeList` con todos los elementos del documento con ese nombre.
- **`Node NodeList.item(int i)`**: Recupera el nodo en la posición `i` de la lista.

Para facilitar la obtención del contenido de un `Element`, podemos implementar métodos auxiliares:

```java
public static String getValorEtiqueta(String etiqueta, Element elemento) {
    Node nValue = elemento.getElementsByTagName(etiqueta).item(0);
    return nValue.getTextContent();
}

public static Element getElementEtiqueta(String etiqueta, Element elemento) {
    return (Element) elemento.getElementsByTagName(etiqueta).item(0);
}
```

- **`getValorEtiqueta`**: Recibe el nombre de la etiqueta y el elemento a partir del cual se desea realizar la búsqueda. Devuelve el contenido textual del elemento. Mediante `getElementsByTagName` obtenemos la lista de nodos coincidentes y con `.item(0)` tomamos el primero.
- **`getElementEtiqueta`**: Similar al anterior, pero en vez de recuperar el texto, devuelve el objeto `Element` con todos sus posibles hijos. Es útil para nodos compuestos intermedios.

Los objetos `Element` disponen de métodos para añadir nuevos hijos (`appendChild`) o asignar el valor a un atributo (`setAttribute`). La creación de nuevos elementos se realiza mediante el objeto `Document` (`createElement`, `createTextNode`, `createComment`). La creación de nodos no implica su ubicación en el árbol: tras crearlos deben agregarse a un nodo padre mediante `appendChild`.

#### Docente — 2.4. Ejemplo completo

![Ejemplo completo: Fichero XML a DOM](../temario/img/2B/6.png)

El ejemplo siguiente muestra cómo utilizar DOM para analizar y extraer información de un fichero XML.

Listamos la información contenida en el documento `clase.xml`:

**`clase.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<clase>
    <alumno numero="393">
        <nombre>Luis</nombre>
        <apellido>Luna</apellido>
        <apodo>Na</apodo>
        <marcas>85</marcas>
    </alumno>
    <alumno numero="493">
        <nombre>Antonio</nombre>
        <apellido>Alvarez</apellido>
        <apodo>Avez</apodo>
        <marcas>95</marcas>
    </alumno>
    <alumno numero="593">
        <nombre>Juan</nombre>
        <apellido>Juz</apellido>
        <apodo>jazz</apodo>
        <marcas>90</marcas>
    </alumno>
</clase>
```

Los pasos a seguir son los siguientes:

1. **Importar los paquetes necesarios.**
2. **Construir un documento DOM en memoria a partir del fichero XML.**
3. **Extraer el elemento raíz.**
4. **Examinar los atributos.**
5. **Examinar los subelementos.**

El código correspondiente a estos pasos es el siguiente:

```java
import java.io.*;
import javax.xml.parsers.*;
import org.w3c.dom.*;

public class PasosDOM {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document document = builder.parse(new File("clase.xml")); // Construye el árbol en memoria

        Element root = document.getDocumentElement();
        Element element = (Element) document.getElementsByTagName("alumno").item(0);

        // Devuelve el valor de un atributo específico
        String attr = element.getAttribute("numero");
        // Devuelve el NamedNodeMap con todos los atributos
        NamedNodeMap attrs = element.getAttributes();

        // Devuelve una lista con todos los subelementos coincidentes
        NodeList lista = element.getElementsByTagName("nombre");
        // Devuelve una lista con todos los nodos hijos
        NodeList hijos = element.getChildNodes();
    }
}
```

**Programa completo (`Ejemplo2.java`):**

```java
import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class Ejemplo2 {
    public static void main(String[] args) {
        try {
            File inputFile = new File("clase.xml");
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(inputFile);
            doc.getDocumentElement().normalize();

            System.out.println("Root element: " + doc.getDocumentElement().getNodeName());
            NodeList nList = doc.getElementsByTagName("alumno");
            System.out.println("----------------------------");

            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                System.out.println("\nCurrent Element: " + nNode.getNodeName());

                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    System.out.println("Número de alumno: " + eElement.getAttribute("numero"));
                    System.out.println("Nombre: " + eElement.getElementsByTagName("nombre").item(0).getTextContent());
                    System.out.println("Apellido: " + eElement.getElementsByTagName("apellido").item(0).getTextContent());
                    System.out.println("Apodo: " + eElement.getElementsByTagName("apodo").item(0).getTextContent());
                    System.out.println("Marcas: " + eElement.getElementsByTagName("marcas").item(0).getTextContent());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

El método `normalize()` unifica nodos de texto adyacentes y elimina nodos de texto vacíos en el árbol DOM.

#### Docente — 2.5. Creación de un fichero XML a partir de un documento

![Creación de un fichero XML a partir de un documento DOM (Transformer)](../temario/img/2B/7.png)

La escritura de la información contenida en el DOM se puede secuenciar en forma de texto utilizando **`Transformer`**. Es capaz de pasar la información contenida en un objeto `Document` a un archivo de texto en formato XML.

`Transformer` es una clase abstracta y requiere de `TransformerFactory` para ser instanciada. Trabaja con adaptadores de origen (`Source`) y destino (`Result`):

- **Orígenes:** `DOMSource`, `SAXSource`, `StreamSource`.
- **Destinos:** `DOMResult`, `SAXResult`, `StreamResult`.

Los pasos para construir un documento DOM desde cero y guardarlo en XML son:

1. **Instanciar el documento DOM en memoria.**
2. **Crear el nodo raíz y añadirlo al documento.**
3. **Crear elementos hijos, textos y atributos.**
4. **Crear una instancia de `Transformer`.**
5. **Configurar los adaptadores `DOMSource` y `StreamResult`.**
6. **Convertir el árbol DOM en el fichero XML.**

El código correspondiente a estos pasos es el siguiente:

```java
import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class PasosCrearXML {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
        Document doc = docBuilder.newDocument();

        Element rootElement = doc.createElement("compania");
        doc.appendChild(rootElement);

        Element empleado = doc.createElement("empleado");
        rootElement.appendChild(empleado);

        Attr attr = doc.createAttribute("id");
        attr.setValue("1");
        empleado.setAttributeNode(attr);

        Element nombre = doc.createElement("nombre");
        nombre.appendChild(doc.createTextNode("Manuel"));
        empleado.appendChild(nombre);

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transformer = transformerFactory.newTransformer();

        DOMSource source = new DOMSource(doc);
        StreamResult result = new StreamResult(new File("archivo.xml"));
        transformer.transform(source, result);
    }
}
```

**Ejemplo completo: Creación de `archivo.xml`**

Se desea generar un archivo XML con el siguiente contenido:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<compania>
    <empleado id="1">
        <nombre>Manuel</nombre>
        <apellidos>González</apellidos>
        <seccion>almacén</seccion>
        <salario>1000</salario>
    </empleado>
</compania>
```

**Código Java (`WriteXMLFile.java`):**

```java
import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class WriteXMLFile {
    public static void main(String[] args) {
        try {
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();

            // Elemento raíz
            Document doc = docBuilder.newDocument();
            Element rootElement = doc.createElement("compania");
            doc.appendChild(rootElement);

            // Elemento empleado
            Element empleado = doc.createElement("empleado");
            rootElement.appendChild(empleado);

            // Atributo del elemento empleado
            Attr attr = doc.createAttribute("id");
            attr.setValue("1");
            empleado.setAttributeNode(attr);

            // Subnodo nombre
            Element nombre = doc.createElement("nombre");
            nombre.appendChild(doc.createTextNode("Manuel"));
            empleado.appendChild(nombre);

            // Subnodo apellidos
            Element apellidos = doc.createElement("apellidos");
            apellidos.appendChild(doc.createTextNode("González"));
            empleado.appendChild(apellidos);

            // Subnodo sección
            Element seccion = doc.createElement("seccion");
            seccion.appendChild(doc.createTextNode("almacén"));
            empleado.appendChild(seccion);

            // Subnodo salario
            Element salario = doc.createElement("salario");
            salario.appendChild(doc.createTextNode("1000"));
            empleado.appendChild(salario);

            // Escribimos el contenido en un archivo .xml
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(new File("archivo.xml"));

            // Para mostrar por consola en lugar de archivo:
            // StreamResult result = new StreamResult(System.out);

            transformer.transform(source, result);
            System.out.println("Fichero guardado exitosamente.");
        } catch (ParserConfigurationException pce) {
            pce.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        }
    }
}
```

### Docente — 3. SAX

**SAX** es un estándar de parseo de XML. El estándar SAX (_Simple API for XML_) procesa el documento o información en XML de una manera muy diferente a DOM: **SAX procesa la información por eventos**.

A diferencia de DOM, que genera un árbol jerárquico en memoria, **SAX procesa la información en XML conforme va siendo leída (evento por evento)**, manipulando cada elemento secuencialmente sin incurrir en un uso excesivo de memoria.

**SAX** es un analizador (_parser_) ideal para **manipular archivos de gran tamaño**, ya que consume poca memoria al no generar el árbol que requiere DOM. Es más rápido y consume menos memoria, pero **realiza una lectura estrictamente secuencial**, por lo que una vez leído un fragmento **no se puede volver atrás** (a diferencia de DOM). Además, DOM permite leer (_parse_) y escribir (_transform_), mientras que SAX es únicamente de lectura. En SAX no hay forma automática de navegar por las relaciones padre/hijo: es responsabilidad del programador gestionar el estado y la jerarquía.

**Se recomienda utilizar SAX cuando:**

- Queremos parsear el documento XML una sola vez.
- Queremos parsear partes del documento XML (capturamos los eventos importantes).
- No se requiere una modificación estructural.
- Se procesan archivos XML grandes.

**Características**

- Detecta cuándo empiezan y terminan un elemento, el documento o un conjunto de caracteres, entre otros componentes (genera eventos).
- Gestiona los espacios de nombres.
- Comprueba que el documento está bien formado.
- Las aplicaciones necesitan implementar manejadores de los eventos notificados.
- SAX lee secuencialmente de principio a fin, sin cargar todo el documento en memoria.

**El paquete necesario para analizar ficheros XML con SAX es `javax.xml.parsers`**. Puedes consultarlo en la [documentación](https://docs.oracle.com/en/java/javase/11/docs/api/java.xml/javax/xml/parsers/package-summary.html).

Las clases principales que necesitaremos son **`SAXParser`** y **`SAXParserFactory`**. Para trabajar con eventos se utilizan las interfaces del paquete **`org.xml.sax`** (consultar [documentación](https://docs.oracle.com/en/java/javase/11/docs/api/java.xml/org/xml/sax/package-summary.html)).

**La clase `org.xml.sax.helpers.DefaultHandler` es el manejador genérico** de ficheros XML. Esta clase permite implementar las acciones que debe realizar el analizador.

Responde a eventos, por lo que se llamará a los métodos especificados cuando suceda algo en concreto. Los métodos principales de esta clase son:

- **`startDocument`**: Se invoca cuando se detecta que el documento empieza. Aquí deben indicarse las acciones que se realizarán al inicio del documento.
- **`endDocument`**: Se invoca cuando se detecta que el documento ha acabado. Por lo tanto, aquí deben indicarse las acciones que se realizarán al finalizar el documento.
- **`startElement`**: Se invoca cuando se encuentra un nuevo elemento, nodo o etiqueta. Aquí debe indicarse el tratamiento que se realizará sobre cada nuevo elemento, como la recogida de información de sus atributos.
- **`endElement`**: Se invoca cuando se ha leído el elemento. Aquí puede tratarse la información del nodo y de su contenido.
- **`characters`**: Se invoca cuando se encuentra texto dentro de las etiquetas.

#### Docente — 3.1. ¿Cómo funciona SAX?

Los analizadores SAX se basan en un modelo de **eventos**: a medida que el _parser_ recorre el documento, informa de los eventos que se producen (como el comienzo de un elemento XML o el final del documento) a un objeto manejador de eventos (_event handler_).

##### Docente — ¿Cómo funcionan los manejadores de eventos?

El _parser_ SAX procesa un documento XML analizándolo secuencialmente de arriba abajo. SAX detecta eventos (inicio y fin de etiqueta, inicio y fin del documento, contenido textual de un nodo, etc.):

![Modelo de eventos SAX: procesamiento secuencial](../temario/img/2B/8.png)

El siguiente programa utiliza SAX para analizar un fichero XML utilizando el manejador por defecto (`DefaultHandler`):

```java
import java.io.File;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.helpers.DefaultHandler;

public class Ejemplo1 {
    public static void main(String[] args) throws Exception {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        SAXParser saxParser = factory.newSAXParser();

        saxParser.parse(new File("menu.xml"), new DefaultHandler());
    }
}
```

1. Se crea el objeto de la clase `SAXParser` a partir de `SAXParserFactory`:

```java
SAXParserFactory factory = SAXParserFactory.newInstance();
SAXParser saxParser = factory.newSAXParser();
```

2. A partir del analizador, se invoca `parse(File, Handler)` pasando el manejador que procesará los eventos.

Para que nuestro programa procese la información, extenderemos `DefaultHandler` y sobrescribiremos los métodos necesarios:

1. **`startDocument()`**: Se invoca al principio del documento XML.
2. **`endDocument()`**: Se invoca al final del documento XML.
3. **`startElement(String uri, String localName, String qName, Attributes atts)`**: Se invoca al comienzo de un elemento.
4. **`endElement(String uri, String localName, String qName)`**: Se invoca al final de un elemento.
5. **`characters(char[] ch, int start, int length)`**: Se invoca cuando se encuentran datos de texto entre las etiquetas inicial y final.

[Tutorial SAX en w3schools](https://www.w3schools.blog/sax-xml-parser-in-java-tutorial-example)

#### Docente — 3.2. Cómo leer un archivo XML con SAX

El proceso de análisis con SAX se estructura en los siguientes pasos:

1. **Instanciar el procesador SAX y el manejador personalizado:**

```java
File inputFile = new File("input.xml");
SAXParserFactory factory = SAXParserFactory.newInstance();
SAXParser saxParser = factory.newSAXParser();

// UserHandler extiende DefaultHandler con los métodos para detectar eventos
UserHandler userHandler = new UserHandler();
saxParser.parse(inputFile, userHandler);
```

2. **Sobrescribir los métodos según la lógica deseada:**

```java
@Override
public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
    // Procesar etiqueta de inicio
}

@Override
public void endElement(String uri, String localName, String qName) throws SAXException {
    // Procesar etiqueta de fin
}

@Override
public void characters(char[] ch, int start, int length) throws SAXException {
    // Procesar texto
}
```

**Documento XML de entrada (`input.xml`):**

```xml
<?xml version="1.0"?>
<class>
    <student rollno="393">
        <firstname>dinkar</firstname>
        <lastname>kad</lastname>
        <nickname>dinkar</nickname>
        <marks>85</marks>
    </student>

    <student rollno="493">
        <firstname>Vaneet</firstname>
        <lastname>Gupta</lastname>
        <nickname>vinni</nickname>
        <marks>95</marks>
    </student>

    <student rollno="593">
        <firstname>jasvir</firstname>
        <lastname>singn</lastname>
        <nickname>jazz</nickname>
        <marks>90</marks>
    </student>
</class>
```

**Programa Java completo (`SAXParserDemo.java`):**

```java
import java.io.File;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

public class SAXParserDemo {
    public static void main(String[] args) {
        try {
            File inputFile = new File("input.xml");
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser saxParser = factory.newSAXParser();
            UserHandler userHandler = new UserHandler();
            saxParser.parse(inputFile, userHandler);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class UserHandler extends DefaultHandler {
    private String currentElement;
    private final StringBuilder text = new StringBuilder();

    @Override
    public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
        currentElement = qName;
        text.setLength(0);

        if (qName.equalsIgnoreCase("student")) {
            String rollNo = attributes.getValue("rollno");
            System.out.println("Roll No: " + rollNo);
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName) throws SAXException {
        String value = text.toString().trim();
        if (qName.equalsIgnoreCase("firstname")) {
            System.out.println("First Name: " + value);
        } else if (qName.equalsIgnoreCase("lastname")) {
            System.out.println("Last Name: " + value);
        } else if (qName.equalsIgnoreCase("nickname")) {
            System.out.println("Nick Name: " + value);
        } else if (qName.equalsIgnoreCase("marks")) {
            System.out.println("Marks: " + value);
        } else if (qName.equalsIgnoreCase("student")) {
            System.out.println("End Element: " + qName);
        }
        currentElement = null;
        text.setLength(0);
    }

    @Override
    public void characters(char[] ch, int start, int length) throws SAXException {
        if (currentElement != null) {
            text.append(ch, start, length);
        }
    }
}
```

_(Fuente del ejemplo: tutorialspoint)_

Al ejecutarlo obtenemos como salida:

```text
Roll No: 393
First Name: dinkar
Last Name: kad
Nick Name: dinkar
Marks: 85
End Element: student

Roll No: 493
First Name: Vaneet
Last Name: Gupta
Nick Name: vinni
Marks: 95
End Element: student

Roll No: 593
First Name: jasvir
Last Name: singn
Nick Name: jazz
Marks: 90
End Element: student
```

Para analizar un archivo XML que contiene caracteres especiales UTF-8, es necesario especificar la codificación en el origen de datos que se va a parsear:

```java
File file = new File("c:\\file-utf.xml");
InputStream inputStream = new FileInputStream(file);
Reader reader = new InputStreamReader(inputStream, "UTF-8");
InputSource is = new InputSource(reader);
is.setEncoding("UTF-8");

saxParser.parse(is, handler);
```

### Docente — 4. StAX

**StAX** es una API basada en Java para analizar documentos XML de forma similar a como lo hace el analizador SAX, pero con dos diferencias fundamentales:

- **StAX es una API _pull_, mientras que SAX es una API _push_:** en StAX, la aplicación cliente solicita activamente (_tira de_) los eventos cuando los necesita. En SAX, el analizador notifica activamente (_empuja_) los eventos a la aplicación mediante funciones de retrollamada (_callbacks_).
- **StAX permite leer y escribir documentos XML**, mientras que SAX es exclusivamente de lectura.

**StAX consta realmente de dos API distintas:**

- **API de cursor:** representa un cursor con el que se puede avanzar por un documento XML desde el principio hasta el final. Este cursor puede **apuntar a un elemento cada vez** y siempre se mueve hacia delante, nunca hacia atrás.
- **API de iteradores:** representa el flujo de un documento XML como un conjunto **de objetos de eventos discretos**. La aplicación obtiene estos eventos en el mismo orden en que los proporciona el _parser_ al leer el documento XML. En cada paso de la iteración se obtiene un objeto `XMLEvent`, que contiene información sobre el evento generado durante la lectura. Mediante la referencia a este objeto, podemos extraer dicha información con los métodos que proporciona esta interfaz.

Una de las principales diferencias entre ambos estilos es que la API de iteradores materializa cada evento como un objeto `XMLEvent`, mientras que la API de cursor expone directamente la información del evento actual. Ambas avanzan hacia delante; ninguna permite retroceder por sí sola una vez consumido un evento, aunque con la API de iteradores la aplicación puede guardar los objetos recibidos para consultarlos después. La API de cursor es más eficiente en cuanto a memoria, por lo que la elección del estilo dependerá de las necesidades.

#### Docente — 4.1. Características

Las siguientes son las características de la API StAX:

- Lee un documento XML de arriba a abajo, reconociendo los tokens que componen un documento XML bien formado.
- Los tokens se procesan en el mismo orden en que aparecen en el documento.
- Informa al programa de aplicación la naturaleza de los tokens que el analizador ha encontrado a medida que ocurren.
- El procesamiento se realiza utilizando iteradores o cursores.
- En el caso del procesamiento mediante iteradores, el programa de aplicación proporciona un lector de "eventos" que actúa como un iterador e itera sobre el evento para obtener la información requerida.
- En el caso del procesamiento con cursores, se crea un "cursor" que actúa como un puntero a los nodos XML.
- A medida que se identifican los eventos, los elementos XML pueden recuperarse del objeto de evento y pueden procesarse más.

**Debemos usar un analizador StAX cuando:**

- Se puede procesar el documento XML linealmente, de arriba abajo.
- El documento no está profundamente anidado.
- Se está procesando un documento XML muy grande cuyo árbol DOM consumiría demasiada memoria. Las implementaciones DOM típicas usan diez bytes de memoria para representar un byte de XML.
- El problema a resolver involucra solo una parte del documento XML.
- Los datos están disponibles tan pronto como el analizador los ve, por lo que StAX funciona bien con un documento XML que llega a través de un flujo.

Para poder utilizar las clases e interfaces de ambas API necesitamos un origen de datos XML válido. Esto lo conseguimos con la factoría **`XMLInputFactory`**:

```java
XMLInputFactory xmlif = XMLInputFactory.newInstance();
XMLStreamReader xmlsr = xmlif.createXMLStreamReader(new FileReader("books.xml"));
```

O bien utilizando un flujo de entrada `FileInputStream`:

```java
XMLInputFactory inputFactory = XMLInputFactory.newInstance();
InputStream in = new FileInputStream("books.xml");
```

Como indicábamos anteriormente, StAX consta de dos API: lectores de cursor y lectores de eventos mediante iteradores.

---

##### Docente — Funcionamiento de StAX

El analizador crea diferentes tipos de eventos a medida que avanza leyendo el documento XML de origen.

Algunos de los tipos de eventos importantes son:

- Inicio del documento.
- Inicio de un elemento.
- Comentarios.
- Caracteres.
- Fin de un elemento.
- Fin del documento.

Aspectos importantes:

- Los eventos se crean en el orden en que se encuentran los componentes XML correspondientes en el documento, incluida la anidación de elementos, la apertura y el cierre de elementos, el orden de los atributos, el inicio del documento y su final.
- De acuerdo con la sintaxis XML, todos los elementos contenedores tienen los correspondientes eventos de inicio y fin; por ejemplo, cada `StartElement` tiene un `EndElement` correspondiente, incluso en los elementos vacíos.
- Los atributos se tratan como información asociada y se accede a ellos desde su evento `StartElement` correspondiente.
- De forma similar a los atributos, los espacios de nombres se tratan como información asociada y son accesibles desde los eventos `StartElement` y `EndElement` correspondientes.
- Los eventos de caracteres representan el contenido textual de los elementos. Un fragmento de texto puede dividirse en varios eventos de caracteres.
- El analizador StAX mantiene una pila de espacios de nombres que contiene información sobre todos los espacios de nombres XML definidos para el elemento actual y sus antecesores. Se puede acceder a la pila, expuesta mediante la interfaz `javax.xml.namespace.NamespaceContext`, a través del prefijo del espacio de nombres o del URI.

Para obtener más información, consulta este [enlace](https://biblus.us.es/bibing/proyectos/abreproy/11416/fichero/MEMORIA_EDITOR_FORMATO_QTI%252FCap%C3%ADtulo+2+Introducci%C3%B3n+a+XML.pdf+).

#### Docente — 4.2. API de cursor

Como indica su nombre, la API de cursor representa un cursor con el que se puede recorrer un documento XML desde el principio hasta el final. Este cursor apunta a un elemento en cada momento y siempre avanza hacia delante, nunca hacia atrás.

Las dos interfaces principales son `XMLStreamReader` y `XMLStreamWriter`. El primero incluye métodos para extraer toda la información del modelo XML: codificación, nombres de elementos, atributos, espacios de nombres, nodos de texto, etiquetas de apertura, comentarios, instrucciones de procesado, etc.

El siguiente programa muestra cómo utilizar un cursor para recorrer un documento XML. Partiendo del documento XML `books.xml`, listamos los títulos de los libros.

**`books.xml`**

```xml
<bookstore>
    <book category="cooking">
        <title lang="en">Everyday Italian</title>
        <author>Giada De Laurentiis</author>
        <year>2005</year>
        <price>30.00</price>
    </book>
    <book category="children">
        <title lang="en">Harry Potter</title>
        <author>J K. Rowling</author>
        <year>2005</year>
        <price>29.99</price>
    </book>
    <book category="web">
        <title lang="en">XQuery Kick Start</title>
        <author>James McGovern</author>
        <author>Per Bothner</author>
        <author>Kurt Cagle</author>
        <author>James Linn</author>
        <author>Vaidyanathan Nagarajan</author>
        <year>2003</year>
        <price>49.99</price>
    </book>
    <book category="web" cover="paperback">
        <title lang="en">Learning XML</title>
        <author>Erik T. Ray</author>
        <year>2003</year>
        <price>39.95</price>
    </book>
</bookstore>
```

**Programa Java (`ListaLibrosStAX.java`):**

```java
package ejemplos;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamReader;

public class ListaLibrosStAX {
    public static void main(String[] args) throws FileNotFoundException, XMLStreamException {
        // Creamos el flujo
        XMLInputFactory xmlif = XMLInputFactory.newInstance();
        XMLStreamReader xmlsr = xmlif.createXMLStreamReader(new FileInputStream("books.xml"));
        String tag = null;
        int eventType;

        System.out.println("Lista de libros");
        // Iteramos con el cursor a lo largo del documento
        while (xmlsr.hasNext()) {
            eventType = xmlsr.next();
            switch (eventType) {
                case XMLStreamConstants.START_ELEMENT:
                    tag = xmlsr.getName().getLocalPart();
                    System.out.println(tag);
                    if (tag.equals("title")) {
                        System.out.println("Idioma: " + xmlsr.getAttributeValue(null, "lang"));
                        System.out.println("Título: " + xmlsr.getElementText());
                    }
                    break;
                case XMLStreamConstants.END_DOCUMENT:
                    System.out.println("Fin del documento");
                    break;
            }
        }
    }
}
```

#### Docente — 4.3. API de iteradores

La API de iteradores de StAX representa el flujo de un documento XML como un conjunto de objetos de eventos discretos. La aplicación consume estos eventos y el analizador los proporciona en el orden en que los lee en el documento XML de origen.

La interfaz base se llama `XMLEvent` y existen subinterfaces para cada tipo de evento definido (comienzo o fin de elemento, atributo, caracteres, etc.). La interfaz principal para leer eventos mediante un iterador es `XMLEventReader`, que contiene métodos como `nextEvent()` para devolver el siguiente evento. `XMLEventReader` extiende `java.util.Iterator`, lo que permite utilizar las operaciones habituales de un iterador de Java.

Utilizamos el mismo documento `books.xml` para iterar sobre los eventos:

```java
package ejemplos;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Iterator;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLEventReader;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamConstants;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.events.Attribute;
import javax.xml.stream.events.StartElement;
import javax.xml.stream.events.XMLEvent;

public class EventReader {
    public static void main(String[] args) {
        try (InputStream in = new FileInputStream("books.xml")) {
            XMLEventReader eventReader = XMLInputFactory.newInstance().createXMLEventReader(in);
            // Bucle que recorre todos los eventos del flujo
            while (eventReader.hasNext()) {
                XMLEvent event = eventReader.nextEvent();

                // Si el evento es el inicio del elemento "title"
                if (event.getEventType() == XMLStreamConstants.START_ELEMENT) {
                    StartElement startElement = event.asStartElement();
                    if ("title".equals(startElement.getName().getLocalPart())) {
                        // Iterar atributos del elemento title
                        Iterator<Attribute> iterator = startElement.getAttributes();
                        while (iterator.hasNext()) {
                            Attribute attribute = iterator.next();
                            QName name = attribute.getName();
                            String value = attribute.getValue();
                            System.out.println("Atributo name/valor: " + name + "/" + value);
                        }
                        System.out.println("Título: " + eventReader.getElementText());
                    }
                } else if (event.getEventType() == XMLStreamConstants.END_DOCUMENT) {
                    System.out.println("Fin del documento");
                }
            }
        } catch (FileNotFoundException | XMLStreamException e) {
            e.printStackTrace();
        } catch (java.io.IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Docente — 5. Enlace de datos XML

El enlace de datos XML (_XML data binding_) se refiere al proceso de enlazar la información contenida en un documento XML con objetos Java en la memoria del ordenador.

Esto permite a las aplicaciones acceder a los datos en el XML desde el objeto en lugar de usar DOM o SAX para recuperar los datos desde una representación directa del XML en sí.

Un enlazador de datos XML logra esto mediante la creación automática de una correspondencia entre los elementos del esquema XML del documento que queremos enlazar y las clases de enlace (de mapeo).

En Java existen varias bibliotecas para gestionar el _binding_, como JAXB, JiBX o XMLBinding, entre otras. Desde Java SE 6 hasta Java SE 8, el JDK estándar incorporó JAXB, una potente biblioteca. A partir de Java 9 se marcó como módulo obsoleto y, desde Java 11, debe añadirse al proyecto como dependencia externa. Los ejemplos siguientes utilizan los paquetes `javax.xml.bind` de JAXB 2; Jakarta XML Binding 3 y versiones posteriores emplean `jakarta.xml.bind`.

JAXB proporciona dos características principales: la capacidad de **serializar objetos Java a XML (_marshal_)** y la inversa, **deserializar XML en objetos Java (_unmarshal_)**. En otras palabras, JAXB permite almacenar y recuperar datos en estructuras XML mapeadas sin implementar manualmente rutinas de parseo para cada estructura de clases.

La siguiente figura muestra lo que ocurre durante el **proceso de enlace de JAXB**.

![Arquitectura JAXB: Ciclo de vida y binding](../temario/img/2B/9.png)

Arquitectura de JAXB (_The Java Tutorials_, Oracle).

1. **Generar clases:** la generación de las clases de mapeo se puede realizar mediante el compilador de _binding_ de JAXB. Para ello, es necesario disponer del esquema XML.
2. **Compilar clases:** deben compilarse todas las clases generadas, los archivos fuente y el código de la aplicación.
3. **_Unmarshal_ (deserializar):** el _framework_ de enlace (_binding_) recupera los datos del documento XML y los convierte en objetos de las clases correspondientes.
4. **Validación:** durante el proceso de _unmarshal_ es posible, a petición del usuario, validar los objetos instanciados con el esquema del documento XML.
5. **Modificación:** la aplicación cliente puede modificar los datos mediante los métodos `set` correspondientes de las clases de mapeo.
6. **_Marshal_ (serializar):** convierte los objetos de las clases de mapeo en uno o más documentos XML de salida.

#### Docente — 5.1. Clases de mapeo. Anotaciones

Para crear las clases de mapeo o enlace se usan anotaciones propias de JAXB.

En programación, una anotación Java es una forma de añadir al código fuente Java metadatos que están disponibles para la aplicación en tiempo de compilación o de ejecución.

**JAXB** utiliza **anotaciones** para conseguir la información extra necesaria para mapear el enlace XML. Sirven para asociar metadatos a los objetos sin alterar la estructura del modelo de datos.

Las anotaciones pueden asociarse a un paquete, a una clase, a un atributo o incluso a un parámetro. Se declaran en el código anteponiendo el símbolo `@` al nombre de la anotación.

Cuando el compilador de Java procesa una anotación, asocia la metainformación correspondiente al elemento afectado para que el motor de JAXB pueda utilizarla en tiempo de ejecución para serializar o deserializar.

Las anotaciones pueden declararse con o sin parámetros. En caso de tener parámetros, estos pueden ser cadenas literales, constantes u otras anotaciones.

##### Docente — Anotaciones principales

- **`@XmlRootElement`**: Define la raíz del XML. Enlaza la clase Java con la etiqueta raíz del documento.
- **`@XmlType`**: Enlaza la clase con una definición del esquema XML. Permite además definir el orden en que deben serializarse las etiquetas mediante el parámetro `propOrder`:

```java
@XmlType(propOrder = { "autor", "nombre", "editorial", "isbn" })
```

Esta anotación puede utilizarse en las clases auxiliares que no representen la raíz del documento y también en la clase raíz cuando sea necesario configurar su tipo XML.
- **`@XmlElement`**: Enlaza una etiqueta XML con una propiedad de la clase.
- **`@XmlAttribute`**: Mapea una propiedad Java como atributo de una etiqueta XML.
- **`@XmlElementWrapper`**: Crea una etiqueta contenedora alrededor de una colección de elementos XML (por ejemplo, una lista de libros).

##### Docente — Parámetros de las anotaciones

El parámetro `name = "nombre"` permite especificar explícitamente el nombre de la etiqueta XML:

- `@XmlRootElement(name = "nombre")`: El nodo raíz tendrá el nombre especificado en lugar del nombre de la clase.
- `@XmlElement(name = "nombre")`: El elemento XML tendrá el nombre especificado en lugar del nombre de la variable.

#### Docente — 5.2. Ejemplo de anotaciones

El objetivo es crear objetos que representen la información contenida en un XML mediante clases JavaBeans anotadas. JAXB permite:

- **Serializar (_marshal_):** crear un documento XML a partir de objetos Java anotados.
- **Deserializar (_unmarshal_):** obtener objetos Java a partir del documento XML.

**1. Partimos de un fichero XML:**

```xml
<libreria>
    <ListaLibro>
        <Libro>
            <autor>XXXXXXX</autor>
            <nombre>XXXXXXX</nombre>
            <editorial>XXXXXXX</editorial>
            <isbn>XXXXXXX</isbn>
        </Libro>
    </ListaLibro>
    <lugar>XXXXXXX</lugar>
    <nombre>XXXXXX</nombre>
</libreria>
```

El esquema XSD asociado con este XML es el siguiente:

![Esquema XSD para clases con anotaciones JAXB](../temario/img/2B/10.png)

**2. Analizamos qué clases necesitamos:**

![Diagrama de clases Librería y Libro para JAXB](../temario/img/2B/11.png)

**3. Escribimos las clases con las anotaciones necesarias:**

Para mapear la raíz es necesaria una clase `Libreria` con la anotación `@XmlRootElement`.

Esta clase tiene una propiedad por cada etiqueta del XML, incluida `ListaLibro`, que es una lista de elementos de tipo `Libro` envuelta con `@XmlElementWrapper`.

**Clase `Libreria.java` (mapea el elemento raíz `<libreria>`):**

```java
import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

// Indica que Libreria es el elemento raíz del XML
@XmlRootElement()
public class Libreria {

    private ArrayList<Libro> listaLibro;
    private String nombre;
    private String lugar;

    public ArrayList<Libro> getListaLibro() {
        return listaLibro;
    }

    @XmlElementWrapper(name = "ListaLibro")
    @XmlElement(name = "Libro")
    public void setListaLibro(ArrayList<Libro> listaLibro) {
        this.listaLibro = listaLibro;
    }

    public String getNombre() {
        return nombre;
    }

    @XmlElement()
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLugar() {
        return lugar;
    }

    @XmlElement()
    public void setLugar(String lugar) {
        this.lugar = lugar;
    }
}
```

**Clase `Libro.java` (mapea cada nodo `<Libro>` del XML):**

```java
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

@XmlType(propOrder = { "autor", "nombre", "editorial", "isbn" })
public class Libro {

    private String nombre;
    private String autor;
    private String editorial;
    private String isbn;

    public String getNombre() {
        return nombre;
    }

    @XmlElement()
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getAutor() {
        return autor;
    }

    @XmlElement()
    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getEditorial() {
        return editorial;
    }

    @XmlElement()
    public void setEditorial(String editorial) {
        this.editorial = editorial;
    }

    public String getIsbn() {
        return isbn;
    }

    @XmlElement()
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
```

#### Docente — 5.3. El proceso de enlace de JAXB

En este apartado vamos a ver cómo convertir objetos Java de clases con anotaciones JAXB en archivos XML y viceversa.

Los pasos en el proceso de enlace de JAXB están representados en la figura:

![Proceso de enlace de datos JAXB (marshal y unmarshal)](../temario/img/2B/12.png)

- **Generar clases:** podemos escribirlas manualmente o generarlas con la herramienta `xjc` a partir del esquema `.xsd`.
- **Compilar clases:** se compilan todas las clases generadas junto al código de la aplicación.
- **_Marshal_:** serializar los objetos de las clases mapeadas a XML.
- **_Unmarshal_:** deserializar el XML para reconstruir los objetos Java.

##### Docente — _Marshal_ (serialización)

Para realizar la traducción, lo primero que necesitamos es un contexto `JAXBContext`, que se instancia indicando la clase raíz:

```java
JAXBContext jaxbContext = JAXBContext.newInstance(Libreria.class);
```

A continuación generamos el objeto `Marshaller` y configuramos el formato de salida:

```java
Marshaller marshaller = jaxbContext.createMarshaller();
marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
```

Para obtener el resultado, pasamos el destino al método `marshal`:

```java
// Volcar a consola
marshaller.marshal(libreria, System.out);
```

También podemos guardarlo en un fichero:

```java
File libreriaXml = new File("libreria-jaxb.xml");
marshaller.marshal(libreria, libreriaXml);
```

##### Docente — _Unmarshal_ (deserialización)

Para deserializar a partir de un fichero XML, reutilizamos el contexto `JAXBContext` creado previamente:

```java
Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
Libreria libreria = (Libreria) unmarshaller.unmarshal(new File("libreria-jaxb.xml"));
```

Recuperamos de este modo el árbol de objetos Java directamente desde el archivo XML.

[Tutorial JAXB en Mkyong](https://www.mkyong.com/java/jaxb-hello-world-example/)

#### Docente — 5.4. Ejemplo de _marshal_ y _unmarshal_

Una vez que tenemos el proyecto con las clases del apartado anterior, ejecutamos el siguiente programa demostrativo:

```java
import java.io.File;
import java.util.ArrayList;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class JavaJAXB {
    private static final String LIBRERIA_XML = "./libreria-jaxb.xml";

    public static void main(String[] args) throws JAXBException {
        // Lista de libros
        ArrayList<Libro> libroLista = new ArrayList<>();

        // Creamos varios libros
        Libro libro1 = new Libro();
        libro1.setIsbn("978-0060554736");
        libro1.setNombre("The Game");
        libro1.setAutor("Neil Strauss");
        libro1.setEditorial("Harpercollins");
        libroLista.add(libro1);

        Libro libro2 = new Libro();
        libro2.setIsbn("978-3832180577");
        libro2.setNombre("Feuchtgebiete");
        libro2.setAutor("Charlotte Roche");
        libro2.setEditorial("Dumont Buchverlag");
        libroLista.add(libro2);

        // Se crea la librería y se le asigna la lista de libros
        Libreria libreria = new Libreria();
        libreria.setNombre("Librería sin límite");
        libreria.setLugar("Barrio Obrero");
        libreria.setListaLibro(libroLista);

        // 1. Marshal: objetos Java -> XML
        JAXBContext context = JAXBContext.newInstance(Libreria.class);
        Marshaller m = context.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

        // Volcar a consola
        m.marshal(libreria, System.out);

        // Escribir en el archivo
        m.marshal(libreria, new File(LIBRERIA_XML));

        // 2. Unmarshal: XML -> objetos Java
        System.out.println("\nSalida deserializada del XML:");
        Unmarshaller um = context.createUnmarshaller();
        Libreria libreria2 = (Libreria) um.unmarshal(new File(LIBRERIA_XML));

        ArrayList<Libro> lista = libreria2.getListaLibro();
        for (Libro libro : lista) {
            System.out.println("Libro: " + libro.getNombre() + " de " + libro.getAutor());
        }
    }
}
```

Para saber más sobre JAXB:

- [HowToDoInJava - JAXB Annotations](https://howtodoinjava.com/jaxb/jaxb-annotations/)
- [Java Code Geeks - JAXB Tutorial](https://www.javacodegeeks.com/2014/12/jaxb-tutorial-xml-binding.html#marshal)

<!-- FIN ANEXO DOCENTE -->
