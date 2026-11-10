# UT3 · Sistemas basados en la nube y sistemas conectados

**Módulo:** Digitalización aplicada a los sectores productivos · **Fuente:** presentación McGraw Hill del aula, 15 páginas.

**Documento original:** [PDF de la unidad](<../recursos/General/209571-Sistemas basados en la nube (Cloud) y sistemas conectados Archivo/c9ff516e07-PresentaciÃ³n_u.03.pdf>).

> **Numeración:** este es el tercer tema descargado del aula, cuyo archivo termina en `u.03.pdf`. La portada del documento dice **«4. Sistemas basados en la nube»**. Se utiliza UT3 para ordenar los tres materiales del aula, sin alterar la numeración de los apartados internos del PDF.

**Criterio de edición:** reconstrucción de todos los apartados de la presentación, incluidos cuadros, esquemas, síntesis y retos. Se reorganizan los saltos de diapositiva para facilitar el estudio. Las referencias a casos del libro se conservan como referencias, no como ejercicios recuperados. Las aclaraciones añadidas están identificadas.

[← UT2: tecnologías habilitadoras digitales](UT2-tecnologias-habilitadoras-digitales.md) · [Índice general del temario](README.md)

<a id="indice"></a>
## Índice

- [Introducción y situación de partida](#introduccion)
  - [Reto inicial: Víctor y los videojuegos en la nube](#reto-inicial)
- [1. ¿Qué es la nube?](#nube)
  - [1.1. La seguridad de los datos](#seguridad)
- [2. Aclarando conceptos](#conceptos)
  - [2.1. ¿Qué había antes de la nube?](#modelo-previo)
  - [2.2. Diferencias entre los dos modelos](#comparacion)
- [3. ¿Merece la pena trabajar en la nube?](#valoracion)
  - [3.1. ¿Cuánto cuesta implantar el cloud computing?](#coste)
  - [3.2. Ventajas del cloud computing](#ventajas)
- [4. ¿Puede mejorarse la nube?](#mejoras)
  - [4.1. Fog computing, edge computing y mist computing](#procesamiento)
  - [4.2. Niveles en la nube: pública, privada e híbrida](#despliegue)
- [5. Contenedores en la nube](#contenedores)
  - [5.1. IaaS, PaaS y SaaS: clasificación del material](#servicios)
  - [Reparto de responsabilidades](#responsabilidades)
  - [Aclaraciones técnicas para no confundir conceptos](#aclaraciones)
- [6. Síntesis de la unidad](#sintesis)
- [7. Reto profesional: una pequeña gestoría](#reto-final)
- [8. Vocabulario y referencias del material](#referencias)
- [9. Correspondencia con las páginas del PDF](#paginas)

---

<a id="introduccion"></a>
## Introducción y situación de partida

*Fuente: página 2.*

Las empresas generan y manejan cantidades crecientes de datos. Guardarlos únicamente en un ordenador supone un riesgo: una avería o pérdida puede tener consecuencias importantes. Las copias de seguridad ayudan, pero necesitan actualización y mantenimiento.

La utilización de servidores en línea permite almacenar información y ejecutar parte del procesamiento de manera remota. Esta forma de trabajo también es habitual entre particulares, que guardan y editan fotos, documentos y otros archivos en servicios de Internet.

<a id="reto-inicial"></a>
### Reto inicial: Víctor y los videojuegos en la nube

Víctor pasa de jugar en consola a utilizar, con sus amigos, una plataforma de videojuegos por suscripción. El juego se ejecuta en grandes servidores y puede utilizarse desde un ordenador con una buena conexión. Lo relaciona con el almacenamiento en la nube, que le permite consultar fotos y vídeos desde distintos dispositivos.

**Preguntas de partida del material:**

- ¿Qué es la nube o *cloud*?
- ¿Qué aplicaciones tiene en la vida cotidiana?
- ¿Qué ventajas aporta trabajar en ella?

[Volver al índice](#indice)

<a id="nube"></a>
## 1. ¿Qué es la nube?

*Fuente: página 3, incluido el recuadro gráfico.*

Los **sistemas basados en la nube** utilizan recursos y servicios de computación disponibles a través de Internet. Permiten **almacenar datos, ejecutar aplicaciones y acceder a recursos informáticos de forma remota**, en lugar de depender exclusivamente de equipos locales.

La presentación empieza con el ejemplo de una «carpeta gigante» en línea, como Drive o Dropbox, para guardar, consultar y compartir archivos desde distintos lugares. Amplía esa idea a un «ordenador virtual» cuyos recursos pueden contratarse cuando se necesitan.

**La nube no es solo almacenamiento:** también puede aportar capacidad de procesamiento, programas, bases de datos y servicios de comunicación.

<a id="seguridad"></a>
### 1.1. La seguridad de los datos

**Causas de pérdida citadas en el material:**

| Causa | Ejemplo |
|---|---|
| **Errores humanos** | Borrado accidental. |
| **Fallos físicos o mecánicos** | Deterioro del ordenador o daños por líquidos. |
| **Virus** | Software malicioso que altera, destruye o impide acceder a la información. |

La disponibilidad de copias y almacenamiento remoto puede ayudar a recuperar información.

> **Aclaración de estudio:** sincronizar archivos con la nube no equivale necesariamente a tener una copia de seguridad independiente. Un borrado puede sincronizarse. Hay que conocer las opciones de recuperación, versionado y retención y comprobar que se pueden restaurar los datos.

[Volver al índice](#indice)

<a id="conceptos"></a>
## 2. Aclarando conceptos

*Fuente: página 4.*

El término **nube** procede de los diagramas tecnológicos que representaban Internet y su infraestructura con ese símbolo. «Trasladar a la nube» pasó a significar llevar almacenamiento o procesamiento a servicios remotos accesibles por red.

El esquema de la presentación muestra distintos dispositivos —portátiles, ordenadores de sobremesa, teléfonos y tabletas— conectados a servidores y a tres capas:

| Capa del esquema | Elementos representados |
|---|---|
| **Aplicación** | Telemedia, contenidos, colaboración, comunicación y finanzas. |
| **Plataforma** | Almacenamiento, identificación, ejecución, colas y bases de datos. |
| **Infraestructura** | Computación, almacenamiento de bloques y redes. |

<a id="modelo-previo"></a>
### 2.1. ¿Qué había antes de la nube?

El material contrapone dos modelos:

- **Modelo tradicional:** un servidor almacena información y la entrega cuando un equipo cliente la solicita.
- **Modelo en la nube:** el cliente solicita información y servicios a servidores remotos, que también pueden ejecutar aplicaciones y procesar datos.

La idea importante es que una parte del almacenamiento y del trabajo informático deja de depender del equipo del usuario.

> **Aclaración técnica:** un servidor local también puede procesar información y ejecutar programas. La diferencia no es «servidor que solo guarda» frente a «servidor que calcula», sino la ubicación, provisión y gestión de los recursos y servicios.

<a id="comparacion"></a>
### 2.2. Diferencias entre los dos modelos

*Fuente: página 5, tabla gráfica reconstruida.*

| Aspecto | Alojamiento tradicional o local, según el material | Alojamiento en la nube, según el material |
|---|---|---|
| **Respuesta** | Entrega los datos archivados cuando se solicitan. | Entrega datos y puede ejecutar programas y guardar sus cambios. |
| **Almacenamiento** | Exige capacidad local para programas y archivos; ampliarla puede requerir comprar otro dispositivo. | Los datos y programas pueden alojarse en Internet; se puede contratar más capacidad sin ampliar el disco local. |
| **Acceso** | Se presenta como acceso desde el dispositivo donde se guardaron los archivos. | Permite acceder desde distintos dispositivos con conexión y autorización. |
| **Actualización** | La organización mantiene hardware, sistema operativo y aplicaciones. | El proveedor mantiene las partes del servicio que le corresponden y el cliente conserva sus dispositivos compatibles. |

> **Límite de la comparación:** también es posible acceder remotamente a servidores locales; las responsabilidades de actualización en la nube dependen del servicio contratado. La tabla simplifica los dos modelos para introducirlos.

**Ejemplo adicional del PDF:** algunas comunidades autónomas ofrecen servicios educativos en la nube para que el profesorado trabaje a distancia y de forma colaborativa.

[Volver al índice](#indice)

<a id="valoracion"></a>
## 3. ¿Merece la pena trabajar en la nube?

La decisión debe relacionar los recursos necesarios, el coste, la disponibilidad, la seguridad y la forma de trabajo de la organización.

<a id="coste"></a>
### 3.1. ¿Cuánto cuesta implantar el cloud computing?

*Fuente: página 6.*

En el modelo descrito, la empresa paga por acceder a recursos compartidos alojados en servidores remotos, ajustando la contratación al uso que necesita.

- Parte de la comunicación y de los servicios se centraliza en la infraestructura remota.
- El proveedor invierte en medidas de seguridad y privacidad.
- La localización de los datos y del procesamiento puede influir en el precio, por las distintas exigencias legales y de seguridad de cada país.

**Dato citado por la presentación:** un estudio de Deloitte Insights sitúa el gasto informático medio en el **3,28 % de los ingresos**; en banca y sociedades de valores, en el **7,16 %**; y en construcción, en el **1,51 %**.

> **Alcance de los datos:** el PDF no identifica fecha ni referencia completa de ese estudio. Son cifras del material docente, no un presupuesto actual ni una estimación aplicable a cualquier empresa. Tampoco todos los servicios se facturan exclusivamente por consumo: puede haber suscripciones y compromisos mínimos.

<a id="ventajas"></a>
### 3.2. Ventajas del cloud computing

*Fuente: página 7; síntesis en la página 12.*

| Ventaja | Desarrollo |
|---|---|
| **1. Escalado de infraestructuras** | Contratar más recursos o servidores cuando aumenta la necesidad de procesamiento. |
| **2. Recuperación tras fallos** | Alojar copias de recursos digitales para facilitar su recuperación. |
| **3. Almacenamiento y acceso** | Consultar información desde distintos dispositivos y ubicaciones, con las medidas de acceso correspondientes. |
| **4. Desarrollo de aplicaciones** | Utilizar herramientas y plataformas para crear y probar aplicaciones y reducir su tiempo de lanzamiento. |
| **5. Análisis de big data** | Acceder a capacidad de procesamiento para grandes volúmenes de información, investigación y extracción de conocimiento. |
| **6. Seguridad en las comunicaciones** | Disponer de medidas de protección frente a ataques y pérdida o borrado de datos sensibles. |

La diapositiva cita AWS como proveedor de amplia adopción y con más de 200 servicios. Se trata de una descripción del material, no de una comparativa comercial actual.

> **Aclaración de estudio:** escalable no significa ilimitado ni gratuito; la seguridad tampoco es automática. Deben revisarse permisos, configuración, copias, límites de gasto, dependencia de Internet y disponibilidad del proveedor.

[Volver al índice](#indice)

<a id="mejoras"></a>
## 4. ¿Puede mejorarse la nube?

*Fuente: página 8; mapa de síntesis en la página 13.*

Enviar todos los datos a servidores remotos puede introducir **latencia**, elevar las necesidades de **ancho de banda** y concentrar carga en los servidores. Acercar parte del procesamiento al origen permite reducir esas dificultades.

La presentación habla de «reducción de la latencia» e «incremento del ancho de banda» como áreas de mejora: se trata de objetivos, no de efectos negativos en sí mismos.

<a id="procesamiento"></a>
### 4.1. Fog computing, edge computing y mist computing

Estas soluciones **descentralizan el procesamiento** y pueden trabajar conjuntamente con la nube.

| Enfoque | Dónde se procesa | Explicación del material |
|---|---|---|
| **Cloud computing** | Servidores remotos. | Centraliza almacenamiento y procesamiento en servicios de nube. |
| **Fog computing** | Nodos intermedios cercanos a la organización. | Introduce una capa de procesamiento entre dispositivos y nube para coordinar recursos de forma más próxima. |
| **Edge computing** | Cerca de la fuente de datos. | Lleva parte del cálculo al borde de la red para responder con mayor rapidez. |
| **Mist computing** | En el propio dispositivo o en dispositivos muy próximos. | Acerca aún más el procesamiento al lugar donde nacen los datos. |

**Esquema de proximidad para estudiar:** dispositivo y *mist* → borde o *edge* → capa intermedia o *fog* → nube remota. Es una ayuda conceptual; no obliga a que todos los sistemas incluyan las cuatro capas.

<a id="despliegue"></a>
### 4.2. Niveles en la nube: pública, privada e híbrida

El PDF utiliza «niveles» para presentar tres **modelos de despliegue**:

| Modelo | Descripción |
|---|---|
| **Nube pública** | Servicios de un proveedor externo a los que la empresa accede bajo demanda. |
| **Nube privada** | Recursos reservados a una organización. La presentación los asocia a centros de datos propios y mayor control de los datos. |
| **Nube híbrida** | Combinación de nube pública y privada para aprovechar recursos externos y mantener determinados sistemas en el entorno privado. |

> **Aclaración técnica:** una nube privada puede estar alojada o gestionada por terceros. «Privada» no garantiza por sí sola mayor seguridad: importan la arquitectura, la operación y los controles efectivos.

[Volver al índice](#indice)

<a id="contenedores"></a>
## 5. Contenedores en la nube

*Fuente: páginas 9 y 10; síntesis en la página 14.*

La presentación define los **contenedores** como recursos que reúnen lo necesario para ejecutar una aplicación y facilitan su traslado entre desarrollo, pruebas y producción.

En este mismo apartado introduce **IaaS, PaaS y SaaS**, y representa cómo se distribuye la gestión de las capas tecnológicas entre usuario y proveedor.

> **Distinción importante:** se conserva el título y el orden del PDF, pero IaaS, PaaS y SaaS son **modelos de servicio**, no tres tipos de contenedor. Un contenedor es una forma de empaquetar y ejecutar aplicaciones; puede utilizarse sobre diferentes servicios de nube.

<a id="servicios"></a>
### 5.1. IaaS, PaaS y SaaS: clasificación del material

| Modelo | Qué ofrece | Ejemplos que aparecen en el PDF |
|---|---|---|
| **IaaS · Infraestructura como servicio** | Recursos de infraestructura bajo demanda: computación, almacenamiento, redes y virtualización. | Google Compute Engine, Azure Virtual Machines y Amazon EC2. |
| **PaaS · Plataforma como servicio** | Recursos de hardware y software para desarrollar aplicaciones sin gestionar toda la infraestructura subyacente. | Google App Engine, «Azure App Engine» y Salesforce. |
| **SaaS · Software como servicio** | Aplicaciones completas cuyo servicio incluye la infraestructura y el mantenimiento del software. | Amazon Web Services, Google Workspace y Microsoft 365. |

<a id="responsabilidades"></a>
### Reparto de responsabilidades

*Fuente: esquema de la página 9, reconstruido como tabla editable.*

| Capa | Local / on premises | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Aplicaciones | Usuario | Usuario | Usuario | Proveedor |
| Datos | Usuario | Usuario | Usuario | Proveedor, en el esquema |
| Entorno de ejecución | Usuario | Usuario | Proveedor | Proveedor |
| Middleware | Usuario | Usuario | Proveedor | Proveedor |
| Sistema operativo | Usuario | Usuario | Proveedor | Proveedor |
| Virtualización | Usuario | Proveedor | Proveedor | Proveedor |
| Servidor | Usuario | Proveedor | Proveedor | Proveedor |
| Memoria | Usuario | Proveedor | Proveedor | Proveedor |
| Red | Usuario | Proveedor | Proveedor | Proveedor |

El esquema muestra una **delegación progresiva de la gestión técnica**: local → IaaS → PaaS → SaaS.

> **Aclaración de responsabilidad:** que el proveedor opere el almacenamiento de un SaaS no elimina las obligaciones del cliente sobre sus datos, permisos, usuarios, uso correcto y cumplimiento normativo. La tabla reproduce una simplificación de las capas técnicas, no un reparto jurídico completo.

La imagen lateral de la página 10 enumera servicios de una plataforma de nube: redes, computación, almacenamiento, herramientas administrativas, IA, IoT, big data y gestión de seguridad e identidad.

<a id="aclaraciones"></a>
### Aclaraciones técnicas para no confundir conceptos

Estas notas son editoriales y **no se presentan como texto original del PDF**:

- **Contenedor y modelo de servicio no son equivalentes.** El primero empaqueta una aplicación y sus dependencias; IaaS/PaaS/SaaS describen qué servicio se contrata y qué gestiona cada parte.
- El nombre **«Azure App Engine»** que aparece en la diapositiva mezcla denominaciones: para un ejemplo de plataforma de aplicaciones de Azure, la referencia habitual es **Azure App Service**. Se conserva el nombre original en la tabla para que la discrepancia sea visible.
- **AWS** es un conjunto de servicios, no una aplicación SaaS concreta. Google Workspace y Microsoft 365 sí sirven como ejemplos de aplicaciones ofrecidas como servicio.
- Una nube pública no significa datos públicamente accesibles; el acceso depende de la configuración y de las autorizaciones.
- Utilizar nube no elimina la necesidad de copias de seguridad, control de accesos, mantenimiento de los dispositivos ni planificación de recuperación.

[Volver al índice](#indice)

<a id="sintesis"></a>
## 6. Síntesis de la unidad

*Fuente: páginas 11 a 14. Se reconstruyen los cuatro mapas finales.*

```text
SISTEMAS BASADOS EN LA NUBE
├── Concepto: almacenamiento, aplicaciones y recursos remotos por Internet
├── Frente al modelo local
│   ├── Menor dependencia del almacenamiento del dispositivo
│   ├── Acceso desde distintos equipos
│   └── Parte de la gestión técnica pasa al proveedor
├── Ventajas
│   ├── Escalado y recuperación tras fallos
│   ├── Acceso a datos y desarrollo de aplicaciones
│   └── Análisis de grandes volúmenes y protección de comunicaciones
├── Mejoras: latencia, ancho de banda y carga de servidores
│   └── Fog, edge y mist acercan el procesamiento al origen
├── Despliegue: pública / privada / híbrida
└── Servicios: IaaS / PaaS / SaaS
    └── Delegación creciente de capas técnicas al proveedor
```

**Tres preguntas para no mezclar clasificaciones:**

| Pregunta | Concepto que responde |
|---|---|
| ¿Dónde se procesa respecto al origen de los datos? | Cloud, fog, edge y mist. |
| ¿Cómo se despliega y quién utiliza la infraestructura? | Nube pública, privada o híbrida. |
| ¿Qué se contrata y qué capas gestiona el proveedor? | IaaS, PaaS o SaaS. |

Esta tabla es una ayuda editorial de estudio. Las clasificaciones son complementarias, no alternativas excluyentes.

[Volver al índice](#indice)

<a id="reto-final"></a>
## 7. Reto profesional: una pequeña gestoría

*Fuente: página 15. Se conserva el encargo, sin resolverlo.*

Muchas pequeñas empresas desconocen las mejoras que podría aportarles la nube. El reto propone estudiar una implantación para una gestoría y justificarla frente a sus necesidades.

| Elemento | Encargo |
|---|---|
| **Objetivo** | Estudiar las posibilidades de trabajo en la nube de una pequeña gestoría. |
| **Tarea 1** | Determinar qué tipo de servicio será necesario. |
| **Tarea 2** | Analizar ventajas e inconvenientes. |
| **Tarea 3** | Estudiar propuestas. |
| **Defensa final** | Presentar y defender la propuesta frente al resto de grupos. |
| **Papel de los demás grupos** | Asumir el papel de Miguel y plantear preguntas, incluso sobre aspectos no contemplados entre los inconvenientes de la fase 2. |

El PDF menciona a Miguel y la fase 2, pero no incorpora el desarrollo completo del caso del libro. No se inventan esos datos.

[Volver al índice](#indice)

<a id="referencias"></a>
## 8. Vocabulario y referencias del material

| Término | Definición de apoyo al estudio |
|---|---|
| **Cloud** | Nube: servicios y recursos informáticos accesibles remotamente por red. |
| **Servidor** | Sistema que proporciona datos, aplicaciones o servicios a otros equipos. |
| **Latencia** | Tiempo de demora entre una petición o evento y su respuesta. |
| **Ancho de banda** | Capacidad de transmisión de datos de una conexión. |
| **Fog** | Capa intermedia de procesamiento entre dispositivos y nube. |
| **Edge** | Procesamiento en el borde, cerca del origen de los datos. |
| **Mist** | Procesamiento en dispositivos o recursos muy próximos a la fuente. |
| **Coworking o cotrabajo** | Uso compartido de un espacio de trabajo por profesionales; aparece como vocabulario en la página 8, aunque no es un modelo de computación. |
| **Middleware** | Software intermediario que presta servicios y facilita la comunicación entre componentes o aplicaciones. |
| **Entorno de ejecución** | Componentes necesarios para que se ejecute una aplicación. |
| **On premises** | Infraestructura alojada en las instalaciones de la organización. |

Las definiciones de apoyo desarrollan el vocabulario; no son citas literales adicionales del libro.

**Casos del libro citados, pero no desarrollados en la presentación:**

1. «Pérdida del prototipo de un iPhone», página 69 del libro.
2. «Acens, la nube española», página 72 del libro.
3. «Cuando la nube falla», página 73 del libro.
4. «Google y Kubernetes Engine», página 76 del libro. La diapositiva escribe «Kubermetes».

Estas páginas corresponden al libro, **no** a las 15 páginas del PDF descargado. No se dispone aquí de sus enunciados completos.

[Volver al índice](#indice)

<a id="paginas"></a>
## 9. Correspondencia con las páginas del PDF

Las láminas locales conservan el aspecto original, incluidos los mapas visuales y los elementos gráficos. El desarrollo editable está en los apartados anteriores.

| Página | Contenido y acceso al original |
|---|---|
| 1 | [Portada: capítulo 4 del libro](../recursos/laminas/ut3/pagina-01.png) |
| 2 | [Introducción, caso de Víctor y preguntas](../recursos/laminas/ut3/pagina-02.png) |
| 3 | [Concepto de nube y pérdida de datos](../recursos/laminas/ut3/pagina-03.png) |
| 4 | [Origen del término, cliente-servidor y capas](../recursos/laminas/ut3/pagina-04.png) |
| 5 | [Comparación local/nube y ejemplo educativo](../recursos/laminas/ut3/pagina-05.png) |
| 6 | [Costes, localización y cifras citadas](../recursos/laminas/ut3/pagina-06.png) |
| 7 | [Ventajas y referencia a AWS](../recursos/laminas/ut3/pagina-07.png) |
| 8 | [Fog/edge/mist y modelos de despliegue](../recursos/laminas/ut3/pagina-08.png) |
| 9 | [Capas de responsabilidad local/IaaS/PaaS/SaaS](../recursos/laminas/ut3/pagina-09.png) |
| 10 | [Servicios y plataforma de nube](../recursos/laminas/ut3/pagina-10.png) |
| 11 | [Síntesis: concepto y comparación](../recursos/laminas/ut3/pagina-11.png) |
| 12 | [Síntesis: ventajas](../recursos/laminas/ut3/pagina-12.png) |
| 13 | [Síntesis: mejoras y procesamiento distribuido](../recursos/laminas/ut3/pagina-13.png) |
| 14 | [Síntesis: modelos de servicio](../recursos/laminas/ut3/pagina-14.png) |
| 15 | [Reto: propuesta para una gestoría](../recursos/laminas/ut3/pagina-15.png) |

---

[Volver al índice](#indice) · [← UT2: tecnologías habilitadoras digitales](UT2-tecnologias-habilitadoras-digitales.md) · [Índice general](README.md)
