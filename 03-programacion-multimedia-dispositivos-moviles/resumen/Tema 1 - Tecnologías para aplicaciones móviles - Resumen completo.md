# Tema 1 — Análisis de tecnologías para aplicaciones móviles — Resumen completo para NotebookLM

## M00. Alcance, procedencia y modo de lectura

**Asignatura:** Programación Multimedia y Dispositivos Móviles (PMDM), segundo de DAM. **Primer examen:** Tema 1 y Tema 2 completos, según indicó el estudiante; fecha prevista el **viernes 30 de octubre de 2026**, sin hora comunicada. **Alcance de este documento:** Tema 1 completo, apartados 1.A–1.E, incluidas las doce diapositivas de 1.D. **Formato de examen:** no comunicado. Como formato de entrenamiento se usa el test de **cuatro opciones y una sola respuesta correcta**, elegido por el estudiante para practicar; no es información del profesor. No se conocen preguntas oficiales ni ponderación.

Los PDF de Sensores y Multimedia enlazados desde el tema son **referencias citadas**: se resumen en M14 para no depender de abrirlos, pero no se convierten en unidades adicionales del examen por estar enlazados.

**Fuente docente principal:** `../temario/Tema 1.md`. Este documento desarrolla su contenido, lo ordena para estudiar y añade aclaraciones y práctica. Al final se conserva el texto docente como **anexo documental**. No es una segunda versión que deba explicarse otra vez en el podcast. Las figuras siguen enlazadas al temario; el desarrollo principal describe en texto las que contienen información necesaria.

**Convenciones:** «Temario» identifica lo enseñado; «Aclaración técnica» precisa simplificaciones, datos caducados o errores; «Práctica añadida» no es una pregunta oficial. Fecha de referencia de las aclaraciones: **octubre de 2026**. El temario contiene datos de distintas épocas (2008, 2013, 2016, 2017, 2025); en el examen debe reconocerse la formulación docente, pero sin presentar como actual un dato superado.

**Prioridad para NotebookLM:** estudiar M01–M14; usar M15 para las trampas, M16 como comprobación y el anexo solo para consultar formulaciones originales. Cuando haya una discrepancia, explicar la formulación docente y el matiz documentado en M15; no repetir como verdadera una afirmación caducada o incorrecta del anexo.

### Resultado de aprendizaje y criterios del tema

| Elemento | Texto docente | Bloques que lo trabajan |
|---|---|---|
| RA1 | Aplica tecnologías de desarrollo para dispositivos móviles evaluando sus características y capacidades | Todo el tema |
| Criterio a | Se han analizado las limitaciones que plantea la ejecución de aplicaciones en los dispositivos móviles | M02, M03, M13.6 |
| Criterio b | Se han identificado las tecnologías de desarrollo de aplicaciones para dispositivos móviles | M04–M13 |

### Recorrido de aprendizaje

1. M01–M03: qué es un dispositivo móvil, tipos, limitaciones y ventajas.
2. M04–M05: preguntas iniciales de un desarrollo y hardware de un smartphone.
3. M06–M08: sistemas operativos móviles.
4. M09–M10: plataformas, lenguajes, portabilidad y elección del curso.
5. M11–M12: arquitectura de Android, ART/Dalvik y máquinas virtuales.
6. M13–M14: tipos de aplicación, interfaz, rendimiento, tendencias y material complementario.
7. M15–M16: trampas, contraste y preguntas.

## M01. Por qué existe este módulo

**Temario:** el uso generalizado de smartphones y tablets ha creado una gran demanda de software para un hardware nuevo. Muchos usuarios entran en la era digital directamente con el móvil, sin haber usado apenas un ordenador. **Inmediatez, hiperconectividad y movilidad** explican que la tecnología móvil tenga ya más usuarios en el mundo que la del PC.

Consecuencia para el desarrollador: el usuario típico no es experto, usa el dispositivo en movimiento y espera respuesta inmediata. Esto condiciona el diseño tanto como las limitaciones técnicas de M03.

## M02. Dispositivo móvil: definición de trabajo y clasificación

### M02.1. El problema de definir «móvil»

El temario plantea que «móvil» no tiene una definición única: puede referirse a una parte del dispositivo, al dispositivo completo, a la aplicación, al cliente o servidor, o al usuario. Tampoco es automáticamente sinónimo de «portátil», «limitado» o «autónomo», y puede haber grados de movilidad. Por eso fija una **definición de trabajo** para todo el módulo.

### M02.2. Definición del curso, desglosada

> Aparato de pequeño tamaño (normalmente cabe en un bolsillo) y poco peso, con pantalla y teclado, pequeñas capacidades de procesamiento, memoria limitada y conexión (permanente o no) a una red. Diseñado para alguna función específica, aunque normalmente puede realizar también funciones más generales.

| Rasgo de la definición | Matiz que conviene retener |
|---|---|
| Pequeño y ligero | Normalmente cabe en un bolsillo |
| Pantalla y teclado | El teclado puede ser físico o en pantalla táctil |
| Pequeña capacidad de proceso | **«Verdad a medias»** según el propio temario: los móviles avanzados superan a equipos de sobremesa de gama media-baja de pocos años antes |
| Memoria limitada | También relativa: el temario cita móviles con 3–4 GB de RAM o más |
| Conexión a una red | **Permanente o no**: la conexión intermitente forma parte de la definición |
| Función específica | Llamar, agenda, juegos, GPS, música, correo, navegación web, chat…, sin excluir funciones generales |

Son útiles donde llevar un ordenador convencional, incluso un portátil, no es práctico.

**Trampa:** la definición no exige conexión permanente, ni que el dispositivo sea un teléfono, ni que solo pueda hacer una función.

### M02.3. Clasificación

| Lista | Dispositivos que cita el temario |
|---|---|
| Más habituales | Smartphones; PDA (*Personal Digital Assistant*) o PocketPC; *Handheld* o PC de mano; *Internet tablets*, situadas entre las PDA y los PC ultramóviles (pequeños tablet PC) |
| Según otras fuentes | Pagers o buscapersonas (en desuso); navegadores GPS; lectores de libros digitales; videoconsolas de mano; cámaras digitales; calculadoras programables |
| **Foco del curso** | **Smartphones y tablets** |

Las clasificaciones dependen de la fuente y del criterio. Las PDA están hoy completamente en desuso, según el propio temario en el apartado 3.

## M03. Limitaciones y ventajas de las tecnologías móviles

### M03.1. Las siete restricciones del temario y su consecuencia de diseño

| Restricción | Consecuencia práctica (desarrollo añadido) |
|---|---|
| Suministro de energía limitado, normalmente por batería | Evitar trabajo innecesario en segundo plano, uso continuo de GPS, red o pantalla |
| Procesadores con capacidad reducida; baja frecuencia de reloj para ahorrar energía; en algunos casos, sin cálculo en coma flotante | No trasladar algoritmos pesados de escritorio sin adaptarlos |
| Poca memoria principal (RAM) | El sistema puede cerrar aplicaciones o procesos para recuperar memoria (relación con el Tema 2) |
| Almacenamiento persistente reducido: flash interna, tarjetas SD | Controlar el tamaño de datos, cachés y recursos |
| Conexión de red **intermitente** y con ancho de banda limitado | Contemplar el funcionamiento sin conexión, reintentos y consumo de datos |
| Pantallas de dimensiones reducidas | Interfaces sencillas y adaptables a distintos tamaños |
| Teclados muy pequeños y con funcionalidad básica | Minimizar la escritura; facilitar la interacción táctil |

Idea central: **una aplicación móvil no puede pretender la misma funcionalidad** que un programa de escritorio o de portátil; las restricciones se consideran desde el análisis y el diseño, no al final.

**Aclaración técnica:** varias limitaciones son relativas y cambian con el tiempo (CPU, RAM, pantalla, teclado). Las que siguen siendo decisivas son **batería, conectividad variable y diversidad de dispositivos**. La falta de coma flotante es un ejemplo histórico; no es una característica de los smartphones actuales.

### M03.2. Ventajas que se pueden explotar

Movilidad, poco peso, pequeño tamaño, facilidad de transporte y **conectividad a diversas redes**: SMS y MMS, voz, Internet, Bluetooth, infrarrojos, radiofrecuencia, etc.

**Trampa:** la conectividad aparece a la vez como ventaja (muchas redes disponibles) y como limitación (intermitente y con ancho de banda limitado). No son afirmaciones contradictorias.

## M04. Tecnologías disponibles: las preguntas antes de desarrollar

Programar para un móvil no es exactamente igual que para un ordenador convencional. Antes de empezar hay que responder:

1. **Hardware:** ¿sobre qué dispositivos se puede programar?
2. **Sistema operativo:** ¿qué SO lleva ese hardware?
3. **Plataforma de desarrollo:** ¿qué plataformas existen para ese hardware y SO, con qué **lenguajes** y con qué **herramientas** (compiladores, bibliotecas, entornos)?

| Nivel | Lo que cita el temario |
|---|---|
| Hardware | Smartphones y tablets; PDA en desuso. Fabricantes: Samsung, Apple, Huawei, HTC, LG, Motorola, Sony Ericsson, Nokia, Alcatel-Lucent, Xiaomi; recientemente Oppo y Vivo han ganado mucho mercado |
| Sistemas operativos | Basados en Microsoft Windows, en Linux, en Mac OS X, u originales. Populares: Android, iOS, Symbian OS, BlackBerry OS, Windows Phone |
| Plataformas e IDE | Java ME, Windows Mobile SDK, Maemo SDK; IDE Microsoft Visual Studio, CodeWarrior, Eclipse, NetBeans y, con mucha presencia profesional, Android Studio |
| Lenguajes | Lenguajes ya conocidos en escritorio o web: Java, C#, C, Kotlin, etc. |

Conclusión del temario: el mundo móvil reproduce la problemática de los ordenadores convencionales: hardware diverso, SO según el hardware, lenguajes, plataformas, API, bibliotecas y entornos distintos.

**Aclaración técnica:** Symbian, BlackBerry OS, Windows Phone/Windows 10 Mobile, Maemo y Windows Mobile están **descontinuados**; hoy solo tienen interés histórico. CodeWarrior y NetBeans no son herramientas actuales de desarrollo móvil.

## M05. Hardware: el smartphone

### M05.1. Qué es un smartphone

**Temario:** terminal de telefonía móvil con más prestaciones y funcionalidad que un móvil normal. Su rasgo distintivo es tener **un sistema operativo instalado** y, por tanto, poder ejecutar aplicaciones del fabricante, del operador o de **terceros** (empresas de desarrollo).

Características habituales:

- Multitarea: ejecución concurrente de varios procesos.
- Acceso a Internet; Wi-Fi, Bluetooth, etc.
- Conexión con un ordenador, por USB o inalámbrica, para cargar y descargar información.
- Ampliación de memoria con tarjetas externas (SD).
- Pantallas pequeñas de alta resolución o millones de colores; táctiles o multitáctiles.
- Sensores: orientación, temperatura, presión, acelerómetros, magnetómetros (ver M14.1).
- Cámaras, fotografía y grabación de audio y vídeo.
- Receptor GPS; receptor y emisor de radio FM.
- Aplicaciones sofisticadas: asistente personal, correo, gestión de archivos, ofimática, multimedia (ver M14.2), cartografía y navegación, diccionarios, aplicaciones científicas, juegos, mensajería instantánea.

Su uso principal ya no es necesariamente llamar. El temario prevé que el término «smartphone» deje de usarse porque todos los terminales lo serán; en la práctica, ya ocurre en los catálogos.

**Aclaración técnica:** la ranura SD, la radio FM y su emisión no son hoy características generales; muchos modelos actuales carecen de ellas.

### M05.2. El interior: chipset y arquitectura ARM

- Dentro hay una placa de circuito impreso con componentes integrados: procesador principal, **procesadores digitales de señal (DSP)**, procesadores de imagen y audio, módem, memorias caché, códecs de audio y vídeo. Al conjunto se le llama **chipset**, por analogía con la placa base de un PC (módulo de Sistemas Informáticos).
- **ARM** (*Advanced RISC Machines*, hoy ARM Holdings) diseña la arquitectura dominante: **más del 90 %** de cuota en móviles y, en general, en pequeños dispositivos con microprocesador. Familias citadas: ARM7, ARM9, ARM11 y Cortex.
- ARM **licencia** sus diseños y patentes: muchas empresas fabrican procesadores basados en ellos (Texas Instruments, Samsung, Qualcomm, Apple, Intel, IBM, LG, Nintendo, Philips…). Ejemplo citado: **Intel XScale**.
- Productos con ARM: la mayoría de móviles, el iPod, Game Boy y Nintendo DS, routers, navegadores GPS, cámaras.

| Arquitectura de chipset | Empresa | Ejemplo del temario |
|---|---|---|
| **MSM** | Qualcomm | BlackBerry Storm (MSM7600) |
| **OMAP** (*Open Multimedia Application Platform*) | Texas Instruments | Nokia N810 WiMax Edition: OMAP 2420 con ARM1136 |
| Marvell | Marvell | BlackBerry Bold (Tavor PXA930); Samsung Omnia (624 MHz) |

**Aclaración técnica:** el término actual más preciso es **SoC** (*System on a Chip*): CPU, GPU, DSP, módem y otros bloques integrados en un único chip. El temario escribe «Travor»; el nombre de la familia de Marvell es **Tavor**. Los modelos citados son de 2008–2009 y solo ilustran el concepto. RISC significa conjunto de instrucciones reducido; es la «R» de ARM.

**Trampa:** ARM no es un fabricante de móviles ni un sistema operativo; es una arquitectura de procesador que otras empresas licencian.

## M06. Sistemas operativos móviles y Android

### M06.1. Panorama

El **sistema operativo** gestiona los recursos del dispositivo y ofrece la plataforma sobre la que se ejecutan las aplicaciones. En los años 2000 había gran diversidad (Symbian, Windows Mobile, BlackBerry OS, Palm OS); hoy el mercado está dominado por **Android e iOS**, casi la totalidad de los smartphones en uso. Se han consolidado por sus **ecosistemas de aplicaciones**, actualizaciones constantes y compatibilidad con IA, 5G e IoT. Existen nichos: HarmonyOS, KaiOS, Ubuntu Touch (M08).

### M06.2. Android: datos que hay que distinguir

| Aspecto | Temario |
|---|---|
| Origen | Desarrollado inicialmente por **Android Inc.**, hoy parte de **Google** |
| Núcleo | Versión modificada del **kernel de Linux** |
| Primer dispositivo | **HTC Dream** (T-Mobile G1, «Google Phone»/«GPhone»), **2008** |
| Cuota | Más de dos tercios del mercado |
| Fabricantes | Sony Ericsson (Xperia), HTC, Acer, Motorola (Droid X), Samsung (Galaxy, Nexus), Huawei, LG, Vivo, Oppo, Garmin, Dell, Alcatel… |
| Versión | A septiembre de 2025, la última es **Android 16** |
| SDK | **Android SDK**, gratuito, de Google: depurador, bibliotecas, emulador, documentación |
| Lenguaje | Java y, en la actualidad, **Kotlin**; hace falta el JDK para compilar Java |
| IDE | Primero **Eclipse + plugin ADT** (*Android Development Tools*); después **Android Studio**, basado en **IntelliJ IDEA** de JetBrains |

### M06.3. Nombres de postres

Las versiones recibían nombres de postres **en orden alfabético**. La figura del temario muestra esta tabla:

| Letra | Nombre | Versión |
|---|---|---|
| A | Apple Pie | 1.0 |
| B | Banana Bread | 1.1 |
| C | Cupcake | 1.5 |
| D | Donut | 1.6 |
| E | Éclair | 2.0 / 2.1 |
| F | Froyo | 2.2 |
| G | Gingerbread | 2.3 |
| H | Honeycomb | 3.0 / 3.1 / 3.2 |
| I | Ice Cream Sandwich | 4.0 |
| J | Jelly Bean | 4.1 / 4.2 / 4.3 |
| K | KitKat | 4.4 |
| L | Lollipop | 5.0 / 5.1 |
| M | Marshmallow | 6.0 / 6.0.1 |
| N | Nougat | 7.0 / 7.1 / 7.1.2 |
| O | Oreo | 8.0 |

**Aclaración técnica:** después llegaron Oreo 8.1 y **Pie (9)**. Desde **Android 10 (2019)** los nombres de postre dejaron de usarse públicamente y las versiones se identifican por número. Apple Pie y Banana Bread aparecen en la tabla, pero no fueron nombres públicos de 1.0 y 1.1. Para trabajar, lo relevante es el **nivel de API** (Tema 2): por ejemplo, Android 5.0 es la API 21.

### M06.4. Del Eclipse ADT a Android Studio

El temario atribuye el cambio de IDE a las desavenencias entre Oracle (propietaria de Java) y Google, y afirma que Android Studio es el IDE oficial desde finales de 2013.

**Aclaración técnica:** Android Studio se **anunció en mayo de 2013** como vista previa y su versión estable 1.0 llegó en **diciembre de 2014**; el soporte de Eclipse ADT terminó en 2015. El litigio Oracle–Google existió, pero el temario mezcla dos cosas: no hay una «versión ME de Eclipse» (Java ME es una plataforma de Oracle; Eclipse es un IDE). Retener: Android Studio, basado en IntelliJ IDEA y con compilación Gradle, sustituyó a Eclipse + ADT como IDE oficial.

## M07. iOS

| Aspecto | Temario |
|---|---|
| Desarrollador | **Apple**, originalmente para el iPhone |
| Hardware | **Solo hardware Apple**: iPhone, iPod Touch, iPad, Apple TV |
| Origen | Derivado de **Mac OS X** |
| Datos de mercado | App Store con más de 2 000 000 de apps (mayo de 2016); cuota cercana al 20 % de las ventas mundiales (septiembre de 2017) |
| Versión | El temario cita 18.6.2 como la más reciente de iOS y iPadOS |
| Lenguajes | **Swift** (moderno, rápido, seguro; estándar actual) y **Objective-C** (antiguo; proyectos *legacy*) |
| SDK | **iOS SDK**, integrado en **Xcode** |
| Distribución | El SDK es gratuito, pero publicar en la tienda exige registrarse en el programa de desarrolladores, **que no es gratuito** |

Funciones de Xcode: editor con autocompletado para Swift y Objective-C; **Interface Builder** (editor visual para UIKit) o vista previa en tiempo real (**SwiftUI**); simuladores de iPhone, iPad, Apple Watch y Apple TV; depuración y *profiling* con **Instruments** (CPU, memoria, energía, red); gestor de proyectos con pruebas unitarias y de interfaz; envío de *builds* a **TestFlight** (beta) o a la App Store.

**Aclaración técnica:**

- En 1.C el temario dice que el lenguaje de iOS «es Objective-C»: es un texto antiguo. Desde 2014 existe **Swift**, que el propio 1.B presenta como el estándar actual.
- Desde 2019 el iPad usa **iPadOS** y el Apple TV usa **tvOS**, ambos derivados de iOS. Decir que todos usan «iOS» es una simplificación histórica.
- En septiembre de 2025 Apple pasó a numerar sus sistemas por año: tras iOS 18 llegó **iOS 26**. Las cifras de versiones y cuota caducan pronto; no memorizarlas como permanentes.
- Simulador (Xcode) y emulador (Android) no son lo mismo: el simulador de Apple ejecuta código compilado para el Mac, no emula el hardware del iPhone.

## M08. Otros sistemas operativos

| Sistema | Desarrollador y enfoque | Ventajas | Desventajas y situación |
|---|---|---|---|
| **HarmonyOS** | Huawei. Conectividad entre dispositivos: IoT, televisores, relojes, coches; diseñado para múltiples tipos de dispositivo | Alternativa tras las restricciones de Google a Huawei; muy usado en China | Limitado fuera de Asia; ecosistema de apps más reducido. Desde 2024–2025, **HarmonyOS NEXT** abandona incluso la base de Android. Según el temario, es la única alternativa a Android e iOS con presencia real y sostenida |
| **KaiOS** | KaiOS Technologies. Teléfonos básicos con funciones inteligentes (*feature phones*) | Bajo consumo de recursos; WhatsApp, YouTube, Facebook; mercados emergentes (África, India, Latinoamérica) | Muy limitado como smartphone; pocas apps; nicho muy reducido. Ejemplos: Nokia 8110 4G, Elikia Moké 2 |
| **Ubuntu Touch, LineageOS…** | Comunidades | Libres, basados en Linux; más privacidad y personalización | Escasa cuota; poca compatibilidad con apps populares; sin dispositivos comerciales: solo instalación alternativa por comunidades o marcas pequeñas |
| **Tizen** | Samsung (en la diapositiva 3 de 1.D) | — | Aparece en la lista de SO móviles de la presentación, no en el texto de 1.B |

**Aclaración técnica:** Tizen, de Samsung y la Linux Foundation, se usó sobre todo en relojes y televisores; Samsung trasladó sus relojes a Wear OS en 2021. LineageOS es un derivado comunitario de Android (AOSP), no un sistema independiente de Android.

## M09. Plataformas de desarrollo y lenguajes

### M09.1. Qué es una plataforma de desarrollo y por qué afecta a la portabilidad

Para desarrollar para un SO hace falta una **plataforma de desarrollo** que genere código ejecutable sobre ese SO, o sobre una **máquina virtual** o un **intérprete** instalado en el dispositivo y soportado por el SO. Cuanto más versátil sea la plataforma, más **portable** será la aplicación.

| Ejemplo del temario | Resultado de portabilidad |
|---|---|
| Objective-C con el SDK de Apple | Probablemente solo se ejecutará en dispositivos Apple con iOS |
| Java con **Java ME** de Oracle, generando un **midlet** | Se ejecutará en cualquier dispositivo con una pequeña máquina virtual de Java (**KVM**) |

### M09.2. Código nativo frente a código gestionado

- **Código nativo** (*native code*): se compila a instrucciones de la CPU del dispositivo. En Android se usa el **NDK** (*Native Development Kit*) para programar en **C o C++**.
- **Código gestionado** (*managed code*): se ejecuta sobre una máquina virtual o entorno de ejecución, como Java o C#.

**Trampa:** el SDK es el kit principal para crear apps Android; el NDK es complementario para partes en C/C++. No son alternativas para el mismo propósito.

### M09.3. Plataformas citadas

| Plataforma | Temario | Situación actual (aclaración) |
|---|---|---|
| **Android** | Android SDK gratuito; Java; IDE Eclipse + ADT y Android Studio; NDK para C/C++; impulso deliberado de Google hacia **Kotlin** | Kotlin es lenguaje oficial desde 2017 y preferente (*Kotlin-first*) desde 2019 |
| **iOS** | SDK gratuito; publicar requiere el programa de desarrolladores, de pago; Objective-C | Swift es el lenguaje principal (M07) |
| **Java ME** | Excepción: no es un conjunto de herramientas de un SO, sino un **subconjunto de la plataforma Java** para móviles. Requiere una máquina virtual instalada en el SO del dispositivo; por ejemplo, Symbian se podía programar en modo nativo o con Java ME | Obsoleto para smartphones; queda en sistemas embebidos |
| **Windows Phone** | Silverlight, XNA y .NET Compact Framework; Visual Studio 2010 Express y Expression Blend gratuitos; C# y otros lenguajes .NET como Visual Basic .NET | Descontinuado; Windows 10 Mobile terminó su soporte en 2020 |

## M10. La elección del curso

Razonamiento del temario:

1. En el ciclo ya se ha programado en **Java** (módulo de Programación), así que no hace falta aprender un lenguaje nuevo y el esfuerzo se centra en lo específico de móviles.
2. Java es multiplataforma, adecuado para un ciclo llamado «Desarrollo de Aplicaciones **Multiplataforma**».
3. Entre las opciones relacionadas con Java (Java ME y Android Studio) se elige **Android Studio**, por ser la de mayor progresión en los últimos años.
4. Es solo una alternativa: en la empresa puede tocar C#, C++, Python, Objective-C, Kotlin… y en la práctica se elige **según las necesidades del cliente**, no por preferencias personales. De ahí la necesidad de mantenerse al día.

Lo importante es adquirir conocimientos generales del entorno, de bibliotecas concretas (por ejemplo, los paquetes `javax` en Java ME) y una nueva filosofía de trabajo.

**Configuración de trabajo del curso:**

| Elemento | Elección |
|---|---|
| Lenguajes | **Java y XML** |
| Plataforma | **Android** |
| IDE | **Android Studio** |
| Sistema operativo de desarrollo | Uno que permita una máquina virtual Java para la emulación; normalmente se usará el emulador del propio IDE |
| Hardware | Smartphones, tablets, etc., compatibles con ese SO |

**Trampa:** el curso usa **Java**, no Kotlin, aunque el temario reconozca el impulso de Google hacia Kotlin. XML se usa para las interfaces (Tema 2).

## M11. Arquitectura de la plataforma Android

El temario la describe dos veces: una lista de cinco componentes (1.C.3) y la pila oficial de seis capas de developer.android.com (1.C.4). La **Actividad UT01-1** consiste precisamente en leer la página oficial de arquitectura de la plataforma.

### M11.1. Pila oficial, de abajo arriba

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ F) System Apps: Dialer, Email, Calendar, Camera…                         │
├──────────────────────────────────────────────────────────────────────────┤
│ E) Java API Framework: Content Providers, View System,                   │
│    Managers: Activity, Location, Package, Notification, Resource,        │
│    Telephony, Window                                                     │
├───────────────────────────────────────────┬──────────────────────────────┤
│ D) Native C/C++ Libraries: Webkit,        │ C) Android Runtime:          │
│    OpenMAX AL, Libc, Media Framework,     │    Android Runtime (ART),    │
│    OpenGL ES…                             │    Core Libraries            │
├───────────────────────────────────────────┴──────────────────────────────┤
│ B) Hardware Abstraction Layer (HAL): Audio, Bluetooth, Camera, Sensors…  │
├──────────────────────────────────────────────────────────────────────────┤
│ A) Linux Kernel: drivers de Audio, Binder (IPC), Display, Keypad,        │
│    Bluetooth, Camera, Shared Memory, USB, WIFI; Power Management         │
└──────────────────────────────────────────────────────────────────────────┘
```

Las bibliotecas nativas (D) y Android Runtime (C) están **al mismo nivel**, una junto a otra.

| Capa | Función | Detalle de examen |
|---|---|---|
| **A) Kernel de Linux** | Base de la plataforma: seguridad, gestión de memoria y de procesos, pila de red, modelo de controladores; capa de abstracción entre hardware y resto del software | ART se apoya en el kernel para subprocesos y gestión de memoria de bajo nivel. Usar un kernel conocido facilita a los fabricantes escribir controladores y aprovechar funciones de seguridad |
| **B) HAL** | Interfaces estándar que exponen las capacidades del hardware al framework de la Java API | Varios **módulos de biblioteca**, uno por tipo de componente (cámara, Bluetooth…). Cuando el framework necesita el hardware, Android **carga el módulo** correspondiente |
| **C) Android Runtime (ART)** | Desde Android 5.0 (API 21), **cada app ejecuta su propio proceso con su propia instancia de ART** | Ejecuta archivos **DEX**, código de bytes propio de Android optimizado para memoria mínima. Funciones: compilación **AOT y JIT**, recolección de elementos no usados (**GC**) optimizada y mejor depuración. Incluye bibliotecas centrales con la mayor parte de la funcionalidad de Java, con algunas funciones de Java 8 |
| **D) Bibliotecas C/C++ nativas** | ART, HAL y otros servicios se basan en código nativo | Algunas se exponen a las apps mediante la API de Java. Ejemplo: OpenGL ES mediante la Java OpenGL API para gráficos 2D/3D. Con el **NDK** se accede a ellas desde código nativo |
| **E) Framework de la API de Java** | Todo el conjunto de funciones del SO, disponible mediante API Java | Sistema de **vistas** (listas, cuadrículas, cuadros de texto, botones, navegador web integrable); administrador de **recursos** (strings localizadas, gráficos, diseños); de **notificaciones** (alertas en la barra de estado); de **actividad** (ciclo de vida y pila de retroceso); **proveedores de contenido** (compartir y acceder a datos de otras apps, como Contactos). Los desarrolladores acceden a las **mismas API que las apps del sistema** |
| **F) Apps del sistema** | Correo, SMS, calendario, navegador, contactos… | **No tienen un estado especial**: una app externa puede ser el navegador, el sistema de SMS o el teclado predeterminado (excepciones: Settings). Ofrecen capacidades reutilizables: para enviar un SMS se puede invocar la app de SMS instalada |

### M11.2. La lista de cinco componentes (1.C.3) y su correspondencia

| Lista 1.C.3 | Capa equivalente de la pila oficial | Aportación propia de 1.C.3 |
|---|---|---|
| Aplicaciones | F | Las apps base están escritas en Java |
| Marco de trabajo de aplicaciones | E | Arquitectura pensada para **reutilizar componentes**: cualquier app publica capacidades que otra puede usar, sujeto a las reglas de seguridad; así el usuario puede **reemplazar** componentes |
| Bibliotecas | D | Ejemplos: System C library, medios, gráficos, 3D, **SQLite** |
| Runtime de Android | C | Dalvik y su sustitución por ART (M12) |
| Núcleo Linux | A | Igual que A |

La lista de cinco componentes no menciona la **HAL**: la pila oficial añade esa capa.

## M12. Máquinas virtuales: JVM, Java ME, Dalvik y ART

### M12.1. Concepto

Una **máquina virtual** es software que emula el comportamiento de otra máquina, por ejemplo un ordenador virtual dentro de uno real.

La **JVM** interpreta el código intermedio (**bytecode**) de los programas Java precompilados y lo convierte en instrucciones máquina, realiza las llamadas al SO y vela por la seguridad e integridad del código. Así proporciona **independencia de la plataforma** hardware y del SO.

### M12.2. Java ME: máquinas ligeras, configuraciones y perfiles

- Las JVM clásicas de **Java SE** son demasiado pesadas para dispositivos pequeños (memoria, cómputo, pantalla). Ejemplo del temario: una pantalla pequeña no soportaría toda la funcionalidad de **AWT**.
- Una única plataforma Java no encaja con todos los dispositivos: por eso Java ME introdujo los conceptos de **configuración** y **perfil**.
- Máquinas virtuales de Java ME: **KVM** (*K Virtual Machine*, porque ocupa unos pocos **kilobytes**) y **CVM** (*Compact Virtual Machine*), algo más pesada.

**Aclaración técnica (completa lo que el temario solo nombra):**

| Concepto | Qué define | Ejemplos |
|---|---|---|
| **Configuración** | Requisitos mínimos de una familia de dispositivos según su capacidad: máquina virtual y bibliotecas básicas | **CLDC** (*Connected Limited Device Configuration*), con **KVM**, para dispositivos muy limitados; **CDC** (*Connected Device Configuration*), con **CVM**, para dispositivos más capaces |
| **Perfil** | API añadidas sobre una configuración para un tipo concreto de dispositivo: interfaz, ciclo de vida, almacenamiento… | **MIDP** (*Mobile Information Device Profile*), sobre CLDC. Una aplicación MIDP es un **midlet** |

Esta distinción se relaciona con los criterios d) y e) del Tema 2: configuraciones que clasifican los dispositivos por sus características y perfiles que relacionan dispositivo y aplicación.

### M12.3. Dalvik y ART

| Aspecto | Dalvik | ART |
|---|---|---|
| Periodo | Máquina virtual original de Android, **hasta Android 5.0** | Desde Android 5.0 (API 21); es una evolución de Dalvik |
| Formato que ejecuta | Archivos **`.dex`** (*Dalvik Executable*), optimizados para memoria mínima | También **DEX** |
| Origen del código | Clases compiladas por el compilador de Java y transformadas a `.dex` por la herramienta **`dx`** | El temario cita la cadena de herramientas **Jack** |
| Modelo | Máquina virtual **basada en registros**, diseñada para ejecutar **varias instancias de forma eficiente** | Cada app con su propio proceso e instancia de ART |
| Compilación | — | El temario dice que en 5.0 compila totalmente en el momento de la **instalación** y, en 1.C.4, cita **AOT y JIT** |
| Compatibilidad | — | Si una app funciona bien en ART, también debe funcionar en Dalvik, **pero no necesariamente al revés** |

Ventaja de ART según el temario: mejor velocidad de ejecución y menor tiempo de apertura de las aplicaciones.

**Aclaración técnica:**

- Las dos afirmaciones del temario sobre la compilación de ART corresponden a épocas distintas. En Android 5.0–6.0, ART compilaba **AOT** en la instalación. Desde **Android 7.0**, combina **JIT**, perfiles de uso y compilación AOT posterior para acelerar instalaciones y actualizaciones.
- ART apareció como opción experimental en Android 4.4 y fue el runtime por defecto desde la 5.0.
- **Jack** se abandonó en 2017 y **`dx`** fue sustituido por **D8** (con el optimizador R8). No se usan en proyectos actuales.
- La **JVM** clásica es una máquina **basada en pila**; Dalvik, **basada en registros**. Android no ejecuta bytecode `.class` de Java directamente: lo convierte a DEX.

**Trampa:** «cada app ejecuta su propio proceso con su propia instancia de ART» no significa que el usuario tenga que instalar una máquina virtual por app; es aislamiento entre aplicaciones, gestionado por el sistema.

## M13. Tecnologías para aplicaciones en dispositivos móviles (diapositivas de 1.D)

### M13.1. Introducción (diapositivas 1–2)

Las aplicaciones móviles han transformado la comunicación y el entretenimiento y son herramientas esenciales. Tres rasgos: **diversidad de plataformas** (dominio de Android e iOS, cada uno con su ecosistema), **variedad de tamaños y formatos** (de teléfonos compactos a tabletas grandes) y **hardware potente** (procesadores rápidos, cámaras de calidad, conectividad inalámbrica de última generación).

### M13.2. SO móviles de la presentación (diapositiva 3)

Android (Google), iOS (Apple), HarmonyOS (Huawei), Tizen (Samsung), KaiOS (KaiOS Technologies; el original escribe «KaIOS Techologies»).

### M13.3. Nativas, web, híbridas y multiplataforma (diapositivas 4–9)

Agrupación de la diapositiva 4:

| Grupo | Ejemplos en la imagen |
|---|---|
| Apps nativas | Android y Apple |
| Apps híbridas | React Native y Flutter |
| Apps web | HTML5, JS y PHP |

Comparativa rápida (diapositiva 5), literal:

| Tipo | Lenguajes comunes | Rendimiento | Acceso a hardware | Coste de desarrollo | Mantenimiento |
|---|---|---|---|---|---|
| Nativa | Kotlin, Swift, Java, Objective-C | Alto | Completo | Alto | Alto |
| Web | HTML5, CSS, JavaScript | Medio | Limitado | Bajo | Bajo |
| Híbrida | HTML, CSS, JavaScript (con frameworks) | Medio | Moderado | Medio | Medio |

Patrón de la tabla: la nativa es **«alto» en todo**, incluidos coste y mantenimiento; la web es la opción de **menor coste y menor acceso a hardware**; la híbrida queda en el medio.

| Tipo | Ventajas | Desventajas |
|---|---|---|
| **Nativa** (diapositivas 6 y 9) | Mejor rendimiento y acceso a funciones del dispositivo (cámara, GPS, calendario, micrófono); experiencia de usuario optimizada; mayor seguridad y control; optimizada para cada SO | Coste más alto; desarrollo más largo; dificultad para mantener versiones distintas para cada plataforma |
| **PWA** (diapositiva 7) | Experiencia similar a la nativa (notificaciones *push*, acceso a características del dispositivo); funcionan en cualquier navegador compatible: distribución y audiencia amplias; **actualización automática**, siempre la última versión | — (la diapositiva no las enumera) |
| **Híbrida** (diapositiva 8) | Marcos como React Native o Ionic; acceso a cámara y GPS mediante *plugins* o API; mayor flexibilidad de desarrollo y mantenimiento | — |
| **Multiplataforma** (diapositiva 9) | **Una sola base de código** para varias plataformas: más simple de construir y probar; cambios y actualizaciones simultáneos en todas | Según la infografía, algunas funciones no estarán disponibles sin conexión a Internet |

**Aclaración técnica:**

- La diapositiva 8 dice que los marcos híbridos crean «una interfaz nativa dentro de un contenedor web». Eso describe mezclas distintas: **Ionic/Cordova/Capacitor** ejecutan una interfaz web dentro de un **WebView**; **React Native** usa JavaScript pero dibuja **componentes nativos**, sin contenedor web; **Flutter** usa **Dart** y dibuja su propia interfaz con su motor gráfico. React Native y Flutter se clasifican hoy mejor como **multiplataforma**, no como híbridos web.
- La falta de funciones sin conexión **no es una limitación universal** de las apps multiplataforma: el temario ya lo advierte; depende de cómo se diseñe cada app. Es más propio de las apps web que no implementan caché.
- Una PWA usa tecnologías web (manifiesto y *service worker*) y puede instalarse desde el navegador; su acceso al hardware depende de lo que exponga cada navegador.

### M13.4. Tecnologías de interfaz de usuario (diapositiva 10)

| Tecnología | Lenguaje |
|---|---|
| React Native | JavaScript |
| Flutter | Dart |
| Xamarin | C# |
| Android clásico | Java + XML (enfoque de este curso) |
| Android moderno | Jetpack Compose (declarativo, en Kotlin) |
| iOS moderno | SwiftUI |

**Aclaración técnica:** Microsoft terminó el soporte de **Xamarin en mayo de 2024**; su sucesor es **.NET MAUI**, también con C#.

### M13.5. Optimización de rendimiento y consumo de batería (diapositiva 11)

1. **Minimización de recursos:** imágenes optimizadas, pocas animaciones, código más pequeño.
2. **Gestión de memoria:** liberar memoria eficientemente para evitar ralentizaciones.
3. **Optimización de la red:** caché y compresión para reducir consumo de datos y mejorar la velocidad de carga.

Relación con M03: son las respuestas de diseño a la batería, la memoria y la red limitadas.

### M13.6. Tendencias (diapositiva 12)

Realidad virtual y aumentada (nuevas formas de interacción y entretenimiento); inteligencia artificial (asistentes, análisis predictivo, personalización); computación en la nube (acceso a recursos desde cualquier lugar, escalabilidad y rendimiento); **IoT** (red de dispositivos conectados).

## M14. Material complementario enlazado desde el tema

El apartado de smartphones enlaza dos PDF breves. Son **referencias citadas**, de introducción a unidades posteriores, y **no amplían el alcance del primer examen**. Aquí se resumen para entender las palabras enlazadas sin depender de abrirlos. Prioridad baja frente a M01–M13.

### M14.1. Sensores (`../temario/Recursos/PDF/sensores-ff01c9a9e907.pdf`)

La mayoría de los dispositivos Android tienen sensores de **movimiento**, **orientación** y **condiciones ambientales**. Proporcionan datos sin procesar con precisión, útiles para seguir el movimiento o la posición tridimensional y los cambios del entorno.

| Tipo | Qué mide | Ejemplos |
|---|---|---|
| Movimiento | Fuerzas de aceleración y rotación en tres ejes | Acelerómetros, sensores de gravedad, giroscopios, vector de rotación |
| Ambientales | Temperatura, presión del aire, iluminación, humedad | Barómetros, fotómetros, termómetros |
| Posición | Posición física del dispositivo | Sensores de orientación, magnetómetros |

| Clase o interfaz | Función |
|---|---|
| `SensorManager` | Administración y gestión de los sensores en general |
| `Sensor` | Instancia de un sensor específico y sus capacidades |
| `SensorEvent` | Acceso a los datos en crudo que genera el sensor |
| `SensorEventListener` | Interfaz con los *callbacks* `onSensorChanged` (cambian los valores) y `onAccuracyChanged` (cambia la exactitud) |

**Trampa:** el magnetómetro aparece como sensor de **posición**, no ambiental; el acelerómetro es de **movimiento**.

### M14.2. Multimedia: audio y vídeo (`../temario/Recursos/PDF/multimedia-dad452485447.pdf`)

| Clase | Función según el material |
|---|---|
| `MediaPlayer` y `MediaController` | Reproducir audio y vídeo |
| `MediaRecorder` | Grabar audio |
| `AudioManager` | Administrar fuentes de audio y salida en el dispositivo |
| `VideoView` | Administrar fuentes de vídeo y salida en el dispositivo |
| `VolumeShaper` | Transiciones de volumen y atenuaciones |

**Aclaración técnica:** `MediaPlayer` es el reproductor; `MediaController` es el control visual (reproducir, pausa, barra de progreso) que se asocia a él. `VideoView` es una vista que muestra vídeo usando internamente un reproductor. `MediaRecorder` también puede grabar vídeo.

## M15. Matices técnicos y trampas de alta discriminación

| Afirmación susceptible de aparecer como distractor | Evaluación y corrección |
|---|---|
| «Un dispositivo móvil necesita conexión permanente» | Falso: la definición dice conexión **permanente o no** |
| «Los móviles siempre tienen poca capacidad de proceso» | El temario lo llama **verdad a medias**: superan a equipos de sobremesa de gama media-baja de pocos años antes |
| «Una app móvil debe ofrecer la misma funcionalidad que la de escritorio» | Falso: las restricciones se consideran desde el análisis y el diseño |
| «ARM es un fabricante de teléfonos» | Falso: arquitectura de procesador que se licencia; más del 90 % de cuota |
| «Chipset y procesador principal son lo mismo» | Falso: el chipset es el conjunto (CPU, DSP, módem, códecs…) |
| «Android está basado en el kernel de Mac OS X» | Falso: kernel de **Linux** modificado. iOS deriva de Mac OS X |
| «El primer móvil Android fue un Samsung» | Falso: **HTC Dream** (T-Mobile G1), 2008 |
| «iOS puede instalarse en terminales de otros fabricantes» | Falso: solo hardware Apple |
| «El SDK de iOS es de pago» | Matizar: el SDK es gratuito; publicar en la tienda exige el programa de desarrolladores, de pago |
| «Java ME es el SDK de un sistema operativo» | Falso: subconjunto de la plataforma Java; necesita máquina virtual en el dispositivo |
| «El NDK sustituye al SDK» | Falso: complementa con C/C++ nativo |
| «KVM se llama así por Kernel» | Falso: por los pocos **kilobytes** que ocupa |
| «CVM es más ligera que KVM» | Falso: la CVM es algo más pesada |
| «Dalvik es una máquina basada en pila, como la JVM» | Falso: Dalvik está **basada en registros** |
| «Si funciona en Dalvik, funciona en ART» | El temario afirma la dirección inversa: lo que funciona en ART debe funcionar en Dalvik, no necesariamente al revés |
| «Las apps del sistema tienen privilegios especiales frente a las del usuario» | Falso según el temario: pueden sustituirse (navegador, SMS, teclado), salvo excepciones como Settings |
| «La HAL está entre el framework y las aplicaciones» | Falso: entre el kernel y las capas superiores; expone el hardware al framework |
| «ART está por encima del framework de la API» | Falso: ART y bibliotecas nativas están al mismo nivel, bajo el framework |
| «Los proveedores de contenido dibujan la interfaz» | Falso: comparten datos entre apps; la interfaz es el sistema de vistas |
| «El curso programará en Kotlin con Jetpack Compose» | Falso: Java y XML con Android Studio |
| «En la comparativa, la app nativa tiene bajo coste de mantenimiento» | Falso: alto rendimiento, acceso completo, pero **coste y mantenimiento altos** |
| «Las PWA hay que actualizarlas manualmente desde una tienda» | Falso: se actualizan automáticamente |
| «React Native se ejecuta dentro de un contenedor web» | Formulación de la diapositiva 8, técnicamente imprecisa (M13.3) |
| «Los nombres de postre siguen usándose» | Públicos hasta Pie (9); desde Android 10, numeración |
| «Android Studio fue el IDE oficial desde el principio» | Falso: primero Eclipse + ADT |

## M16. Cuestionario de contraste añadido — cuatro opciones y una respuesta

Estas preguntas entrenan distinciones; no predicen la distribución del examen. Resolver antes de consultar la explicación.

### M16.1. Definición de dispositivo móvil

Según la definición de trabajo del curso, ¿qué rasgo forma parte de un dispositivo móvil?

A. Conexión permanente a Internet. B. Sistema operativo Android o iOS. C. Conexión, permanente o no, a una red. D. Una función única, sin posibilidad de funciones generales.

**Correcta: C.** A contradice «permanente o no»; B convierte un ejemplo en requisito; D contradice que pueda realizar también funciones más generales.

### M16.2. Capas de Android

¿Qué capa de la arquitectura de Android ofrece interfaces estándar y carga un módulo de biblioteca por tipo de hardware, como la cámara o el Bluetooth?

A. Kernel de Linux. B. Capa de abstracción de hardware (HAL). C. Android Runtime. D. Framework de la API de Java.

**Correcta: B.** A aporta controladores y servicios base, no esas interfaces modulares hacia el framework; C ejecuta el código DEX; D es la API que usan las apps y la que llama a la HAL.

### M16.3. Máquinas virtuales

¿Qué afirmación es correcta?

A. Dalvik ejecuta archivos `.class` de Java directamente. B. ART sustituyó a Dalvik como runtime por defecto a partir de Android 5.0. C. La KVM es la máquina virtual pesada de Java ME y la CVM, la ligera. D. Todas las apps de Android comparten una única instancia de ART.

**Correcta: B.** A olvida la conversión a `.dex`; C invierte los tamaños (la K es de kilobytes); D contradice «cada app con su propio proceso e instancia».

### M16.4. Comparativa de tipos de aplicación

Según la comparativa de la diapositiva 5, ¿qué tipo de aplicación tiene acceso **limitado** al hardware y coste de desarrollo **bajo**?

A. Nativa. B. Híbrida. C. Web. D. Nativa con NDK.

**Correcta: C.** A tiene acceso completo y coste alto; B, acceso moderado y coste medio; D es una variante nativa, no una fila de esa tabla.

### M16.5. Plataformas de desarrollo

¿Qué combinación corresponde a Android según el temario?

A. Kernel derivado de Mac OS X, Objective-C y Xcode. B. Kernel de Linux modificado, Android SDK gratuito, Java/Kotlin y Android Studio basado en IntelliJ IDEA. C. Java ME con KVM como única forma de programar. D. .NET Compact Framework, Silverlight y C#.

**Correcta: B.** A describe iOS; C describe los midlets de Java ME; D, Windows Phone.

### M16.6. Compatibilidad entre runtimes

Según el temario, una app que funciona correctamente en ART…

A. …también debe funcionar en Dalvik, aunque no necesariamente al revés. B. …no puede funcionar en Dalvik. C. …funciona en Dalvik solo si se compila con el NDK. D. …y una que funciona en Dalvik tienen garantizada siempre la compatibilidad en ambos sentidos.

**Correcta: A.** B contradice la afirmación del temario; C mezcla el NDK, que sirve para C/C++; D convierte una compatibilidad en una sola dirección en una garantía en ambos sentidos.

### M16.7. Lista final de dominio

Poder explicar sin consultar: definición de trabajo y sus matices; siete limitaciones y su consecuencia; ventajas; preguntas iniciales (hardware, SO, plataforma); smartphone y chipset; ARM; Android, iOS, HarmonyOS, KaiOS y alternativas libres; nativo frente a gestionado; SDK frente a NDK; Java ME, midlet, KVM/CVM, configuración y perfil; elección del curso; seis capas de Android y su correspondencia con la lista de cinco; Dalvik, DEX, ART, AOT/JIT; nativas, web/PWA, híbridas y multiplataforma; tecnologías de interfaz; optimización; tendencias. Sensores y multimedia (M14) son referencias. No considerar dominado un bloque solo por haber escuchado el podcast.

<!-- INICIO ANEXO DOCENTE -->

## Anexo documental — texto original para consulta

El texto siguiente conserva íntegro el material docente del tema, incluidas sus repeticiones, ejemplos, figuras y formulaciones. **No usarlo para repetir el podcast completo ni para anular las aclaraciones técnicas del desarrollo principal.** Los ejemplos originales no se declaran ejecutados. Las imágenes, PDF y vídeo son recursos locales de consulta; el contenido conceptual necesario para el audio está desarrollado en texto antes de este anexo.

Transformaciones editoriales declaradas:

- Codificación de salida UTF-8 y finales de línea LF; texto y código docentes sin modificar, incluidos los espacios no separables (U+00A0) de sus bloques de código.
- Encabezados docentes desplazados un nivel y prefijados con «Docente —» para distinguirlos del desarrollo elaborado; los bloques de código no se tocan.
- Rutas `Recursos/` adaptadas a `../temario/Recursos/` y enlace al otro tema adaptado a `../temario/`, para conservar figuras, PDF y vídeo.
- Omitida la línea de navegación inicial hacia el otro tema; las anclas internas `<a id>` y el índice original se conservan.

## Docente — Tema 1 — Análisis de tecnologías para aplicaciones móviles


> **Edición de estudio, no resumen.** Conserva el contenido docente cotejado con el aula, el código y las figuras. Se han mejorado la estructura, el orden y los enlaces, sin actualizar silenciosamente afirmaciones o ejemplos antiguos. Los avisos editoriales se identifican como tales.

> **Rótulos de organización del aula original:** Contenidos · Evaluación. Son separadores del aula; no incluyen por sí mismos instrucciones adicionales de examen.

### Docente — Índice

- [Información, resultados de aprendizaje y criterios](#t1-informacion)
- [1.A. Primeros conceptos](#t1-a)
  - [1. Introducción.](#t1-a-1)
    - [1.1. Introducción. ¿Qué es un dispositivo móvil?](#t1-a-1-1)
  - [2. Limitaciones de las tecnologías móviles.](#t1-a-2)
  - [3. Tecnologías disponibles.](#t1-a-3)
    - [3.1. Hardware.](#t1-a-3-1)
- [1.B. Sistemas operativos](#t1-b)
  - [1. Sistemas operativos.](#t1-b-1)
    - [1.1. Android.](#t1-b-1-1)
    - [1.2. iOS.](#t1-b-1-2)
    - [1.3. Otros sistemas Operativos](#t1-b-1-3)
- [1.C. Plataformas de desarrollo y lenguajes de programación](#t1-c)
  - [1. Plataformas de desarrollo y lenguajes de programación.](#t1-c-1)
  - [2. Elección de una alternativa.](#t1-c-2)
  - [3. La plataforma Android.](#t1-c-3)
  - [4. El entorno de ejecución.](#t1-c-4)
  - [5. Máquinas Virtuales.](#t1-c-5)
- [1.D. Tecnologías para aplicaciones en dispositivos móviles](#t1-d)
- [1.E. Actividades propuestas](#t1-e)
  - [1. ActividadUT01-1](#t1-e-1)

---

<a id="t1-informacion"></a>

### Docente — Información, resultados de aprendizaje y criterios

<a id="t1-informacion-contenido"></a>

#### Docente — **Resultados de aprendizaje y criterios de evaluación.**

1\. Aplica tecnologías de desarrollo para dispositivos móviles evaluando sus características y capacidades.

Criterios de evaluación:  
a) Se han analizado las limitaciones que plantea la ejecución de aplicaciones en los dispositivos móviles.  
b) Se han identificado las tecnologías de desarrollo de aplicaciones para dispositivos móviles.



<a id="t1-a"></a>

### Docente — 1.A. Primeros conceptos

<a id="t1-a-1"></a>

<a id="t1-a-1-mod-book-chapter"></a>

#### Docente — 1. Introducción.

El uso generalizado en los últimos tiempos de dispositivos móviles como smartphones, tablets, etc... ha dado lugar a una gran demanda de software para este nuevo tipo de hardware.

![1. Introducción. — figura 1](<../temario/Recursos/Imagenes/t1-a-1-figura-01-54830b746c95.png>)

En los próximos apartados, cubriremos de forma general los aspectos más importantes de estas nuevas tecnologías que cada vez están más presentes en el día a día de millones de usuarios, que muchas veces se incorporan a la era digital apoyándose en estos dispositivos sin tan siquiera tener conocimientos previos de informática a nivel de usuario, o prácticamente sin haber utilizado apenas un ordenador. La inmediatez, hiperconectividad y movilidad son aspectos claves para que ya, en la actualidad, la tecnología smartphone y de dispositivo móvil tenga más usuarios en el mundo que las propias tecnologías de PC.


<a id="t1-a-1-1"></a>

<a id="t1-a-1-1-mod-book-chapter"></a>

##### Docente — 1.1. Introducción. ¿Qué es un dispositivo móvil?

La primera pregunta que podemos hacernos es ¿qué entendemos por "**móvil**"? Si se nos ocurre investigar sobre ese término, a través de algún buscador de Internet, podremos observar que no hay una respuesta única y que en algunas ocasiones las diferencias pueden ser sustanciales en función de qué es lo que consideremos "móvil". Obviamente esto da lugar a su vez a muchas otras preguntas como por ejemplo: Es móvil… ¿alguna parte del dispositivo? ¿El dispositivo completo? ¿La aplicación que usamos en el dispositivo? ¿Una aplicación cliente? ¿Una aplicación servidor? ¿El usuario del dispositivo? ¿Es "móvil" sinónimo de "portátil"? ¿Es "móvil" sinónimo de "limitado"? ¿Hasta qué punto "móvil" es sinónimo de "autónomo"? ¿Existen diversos grados de "movilidad"? ¿Se pueden clasificar los dispositivos móviles en distintos tipos? ¿Bajo qué criterios? Y así sucesivamente podríamos plantearnos más y más preguntas…

Para evitar este tipo de controversias, en nuestro caso vamos a intentar dar una definición con la que trabajaremos a lo largo del desarrollo del módulo:

¿**Qué es un dispositivo móvil**? Se trata de un aparato de pequeño tamaño (normalmente que quepa en un bolsillo) y de poco peso, con pantalla y teclado, con pequeñas capacidades de procesamiento, memoria limitada y conexión (permanente o no) a una red. Este tipo de dispositivos están diseñados para cumplir algún tipo de función específica (realizar llamadas telefónicas, servir como agendas, jugar, navegación GPS, escuchar música, acceso al correo electrónico, navegar por Internet, proporcionar servicio de chat con otros dispositivos móviles, etc.) aunque normalmente pueden llevar a cabo también funciones más generales.

Estos aparatos son cada vez más populares especialmente para aquellos entornos en los que llevar consigo un ordenador convencional (incluso un portátil) no es práctico.

Por otro lado en la definición anterior, en relación a la capacidad de proceso hemos apuntado que tienen "pequeñas capacidades de proceso", lo cual es una verdad a medias, puesto que hoy en día, los dispositivos más avanzados pueden superar a equipos no móviles de gama media-baja de hace apenas 5 ó 6 años. Algo similar ocurre con la memoria, siendo ya frecuente encontrar en el mercado teléfonos móviles con 3 y 4 GB de RAM, e incluso valores más elevados.

**Para saber más**

Para obtener más información acerca de cuáles pueden ser las características de un dispositivo móvil puedes consultar el siguiente artículo en la Wikipedia sobre dispositivos móviles:

[Dispositivo Móvil en la Wikipedia.](<http://es.wikipedia.org/wiki/Dispositivo_m%C3%B3vil>)

###### Docente — **1.1.- Clasificación de los dispositivos móviles.**

¿Qué tipos de dispositivos móviles existen?

Entre los dispositivos móviles más habituales se encuentran:

- SmartPhones o "teléfonos inteligentes".
- PDA (Personal Digital Assistant - asistentes digitales personales) o PocketPC (PC de bolsillo).
- Handheld, o PCs de mano.
- Internet tables, que se encontrarían entre las PDA y los PC Ultramóviles (pequeños tablet PC).

![1.1. Introducción. ¿Qué es un dispositivo móvil? — figura 1](<../temario/Recursos/Imagenes/t1-a-1-1-figura-01-afd0cc9ddc4e.png>)![1.1. Introducción. ¿Qué es un dispositivo móvil? — figura 2](<../temario/Recursos/Imagenes/t1-a-1-1-figura-02-5a2d841b34fb.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.



Según las fuentes que consultes puedes encontrar diversas clasificaciones donde se incluyan unos u otros tipos de dispositivos, como por ejemplo:

- Pagers (o buscapersonas), hoy día ya en desuso.
- Navegadores GPS.
- E-Readers (lectores de libros digitales).
- Pequeñas videoconsolas de mano.
- Cámaras digitales.
- Calculadoras programables.

En nuestro caso, los principales aparatos a los que nos referiremos al hablar de dispositivos móviles serán los **smartPhones** y las **tablets**. Por otro lado, según la tecnología vaya avanzando te podrás ir encontrando con nuevos tipos de productos y servicios que irán ampliando las posibilidades de elección. Como siempre sucede en el mundo de la tecnología habrá que estar continuamente al día de los nuevos avances que van apareciendo para no quedarse atrás.


<a id="t1-a-2"></a>

<a id="t1-a-2-mod-book-chapter"></a>

#### Docente — 2. Limitaciones de las tecnologías móviles.

Antes de comenzar a desarrollar software para alguno de estos dispositivos, es necesario ser conscientes de las limitaciones con las que nos podemos encontrar en estos aparatos. ¿Cuáles son las restricciones a las que nos vamos a tener que enfrentar?

Algunas de estas restricciones son:

- Suministro de energía limitado (normalmente dependiente de baterías).
- Procesadores con capacidad de cómputo reducida. Suelen tener una baja frecuencia de reloj por la necesidad de ahorrar energía. En algunos casos, por ejemplo, podrían no disponer de la capacidad de cálculos en punto flotante.
- Poca memoria principal (RAM).
- Almacenamiento de datos persistente reducido (pequeña memoria flash interna, tarjetas SD, etc.).
- Conexión a algún tipo de red intermitente y con ancho de banda limitado.
- Pantallas de reducidas dimensiones.
- Teclados con funcionalidad muy básica y muy pequeños.

![2. Limitaciones de las tecnologías móviles. — figura 1](<../temario/Recursos/Imagenes/t1-a-2-figura-01-ec7687906362.png>)

Este tipo de restricciones, y algunas otras que dependerán de cada dispositivo en concreto, habrán de ser tenidas muy en cuenta a la hora del análisis y diseño de una aplicación "**móvil**", pues no podemos pretender, que esa aplicación pueda contener la misma funcionalidad, que la que podemos encontrar habitualmente en un programa que es ejecutado en un ordenador de sobremesa o un portátil.

Por otro lado, no todo va a ser restricciones. También habrá que tener en consideración que esta tecnología va a aportar una serie de **ventajas** muy importantes: movilidad, poco peso, pequeño tamaño, facilidad para el transporte, conectividad a diversos tipos de redes de comunicaciones (mensajería SMS y MMS; voz; Internet; Bluetooth; infrarrojos; radiofrecuencia, etc.). Ésas serán las ventajas que podrás explotar en tus aplicaciones.


<a id="t1-a-3"></a>

<a id="t1-a-3-mod-book-chapter"></a>

#### Docente — 3. Tecnologías disponibles.

Programar para un dispositivo móvil no va a ser exactamente lo mismo que programar para un ordenador convencional, debido a las limitaciones y características especiales que aquellos aparatos pueden presentar. Hay que conocer qué tipos de tecnologías se pueden encontrar en este ámbito, tanto a nivel de hardware (dispositivos sobre los que se realizarán las aplicaciones) como a nivel de software (sistemas operativos que funcionan sobre esos dispositivos, plataformas de desarrollo disponibles, entornos, APIs, lenguajes de programación, etc.).

Cuando vas a desarrollar una aplicación para un dispositivo móvil, algunas de las primeras preguntas que te puedes hacer son:

- ¿Sobre qué tipos de dispositivos móviles se pueden hacer programas? ¿Sobre qué tipo de hardware se puede programar?
- ¿Qué sistema operativo puede llevar ese hardware?
- ¿Qué plataformas de desarrollo existen para desarrollar sobre ese hardware y ese sistema operativo? ¿con qué lenguajes puedo programar? ¿qué herramientas (compiladores, bibliotecas, entornos, etc.) hay disponibles?

Las respuestas a este tipo de preguntas pueden ser múltiples y muy variadas:

- Respecto al hardware, te puedes encontrar, como has visto ya, principalment con teléfonos móviles (smartPhones) y tablets (las PDA están actualmente completamente en desuso). Entre los principales fabricantes de teléfonos móviles se encuentran **Samsung**, **Apple, Huawei, HTC**, **LG**, **Motorola**, **Sony Ericsson**, **Nokia**, **Alcatel-Lucent**, **Xiaomi**, etc. Además en los últimos años fabricantes chinos como **Oppo** y **Vivo** han conseguido hacerse un hueco importante en el mercado, desbancando a muchos de los fabricantes anteriormente mencionados.

![3. Tecnologías disponibles. — figura 1](<../temario/Recursos/Imagenes/t1-a-3-figura-01-bf1ed46d8013.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.

  

- En cuanto a los sistemas operativos, dependiendo del hardware habrá sistemas diseñados para unos u otros dispositivos. Los hay basados en **Microsoft Windows**, en **Linux**, y en **MAC OS X**, así como otros totalmente originales y desarrollados específicamente para estos nuevos tipos de dispositivos. Entre los más populares se encuentran , **Android**, **iOS**, **Symbian OS**, **Blackberry OS** y **Windows Phone**.
- Si lo que deseas es conocer algo acerca de las plataformas de desarrollo disponibles para cada entorno (hardware y/o sistema operativo), podemos hablar de **Java ME**, **Windows Mobile SDK**, **Maemo SDK**, o bien de IDEs como **Microsoft Visual Studio**, **CodeWarrior**, **Eclipse**, **Netbeans** y últimamente, con mucha presencia entre programadores profesionales, **Android Studio**.
- Si te refieres a lenguajes de programación, normalmente te encontrarás con lenguajes que son ya viejos conocidos para otras plataformas, como pueden ser las aplicaciones de escritorio para los PCs o las aplicaciones web (**Java**, **C#**, **C**, **Kotlin**, etc.).

En definitiva puedes observar que en este nuevo mundo del desarrollo para dispositivos móviles te encuentras con una problemática similar a la que te puedes enfrentar con los ordenadores convencionales: distintos tipos de hardware, distintas opciones de sistemas operativos dependiendo del hardware que los soporte, diferentes lenguajes de programación, plataformas, API y bibliotecas, entornos de desarrollo, etc.

**Para saber más**

A través del siguiente enlace puedes aprender más sobre las PDAs:

[https://www.muycomputer.com/2014/07/06/un-trocito-de-historia-evolucion-y-muerte-de-las-pda/](<https://www.muycomputer.com/2014/07/06/un-trocito-de-historia-evolucion-y-muerte-de-las-pda/>)

![3. Tecnologías disponibles. — figura 2](<../temario/Recursos/Imagenes/t1-a-3-figura-02-29a3a71b1bf2.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.


<a id="t1-a-3-1"></a>

<a id="t1-a-3-1-mod-book-chapter"></a>

##### Docente — 3.1. Hardware.

Como has visto en los apartados anteriores, dependiendo de los criterios que se utilicen para clasificar los dispositivos móviles se puede hablar de más o menos tipos. Este curso se va a centrar sobre todo en **smartPhones** y **tablets**.

###### Docente — **3.1.1.- Smartphones.**

Se puede definir un **smartPhone** o "teléfono inteligente" como un terminal de telefonía móvil que proporciona unas prestaciones y una funcionalidad mayor que la que podría ofrecer un teléfono móvil normal. Hoy día una buena parte de los teléfonos móviles que se pueden adquirir en el mercado son de este tipo.

Este tipo de terminales se caracteriza por tener instalado un sistema operativo y por tanto la posibilidad de ejecutar aplicaciones desarrolladas bien por el propio fabricante del terminal, bien por el operador de telefonía móvil, o bien por un tercero (empresa de desarrollo de software).

![3.1. Hardware. — figura 1](<../temario/Recursos/Imagenes/t1-a-3-1-figura-01-db2663fc0d71.jpg>)

Algunas otras características que suelen tener este tipo de dispositivos son:

- Funcionamiento en multitarea (ejecución concurrente de varios procesos en el sistema operativo).
- Acceso a Internet.
- Conectividad Wi-Fi, Bluetooth, etc.
- Posibilidad de conexión con un ordenador para cargar y descargar información. Normalmente con conexión USB o bien una conexión inalámbrica.
- Posibilidad de ampliación de memoria mediante tarjetas externas de memoria (por ejemplo SD).
- Pequeñas pantallas pero de alta resolución y/o con millones de [colores](<https://www.materialpalette.com/>).
- Posibilidad de pantallas táctiles o incluso multitáctiles (multitouch).
- [Sensores](<../temario/Recursos/PDF/sensores-ff01c9a9e907.pdf>) (de orientación, de temperatura, de presión, acelerómetros, magnetómetros, etc.).
- Cámaras digitales integradas. Capacidades fotográficas. Grabación de audio y vídeo.
- Receptor GPS.
- Receptor de radio FM.
- Emisor de radio FM.
- Posibilidad de instalar y ejecutar aplicaciones sofisticadas:

- Aplicaciones de asistente personal (gestión de contactos, calendarios, citas, agendas, alarmas, etc.).
- Gestión del correo electrónico.
- Gestión del sistema archivos del dispositivo.
- Microaplicaciones de ofimática (procesador de textos, hoja de cálculo, etc.).
- Aplicaciones [multimedia](<../temario/Recursos/PDF/multimedia-dad452485447.pdf>) (reproducción de audio y vídeo en diversos formatos).
- Aplicaciones de cartografía y navegación.
- Diccionarios.
- Pequeñas aplicaciones científicas (matemáticas, física, medicina, etc.).
- Juegos.
- Aplicaciones de mensajería instantánea. Chats.

![3.1. Hardware. — figura 2](<../temario/Recursos/Imagenes/t1-a-3-1-figura-02-074a4e37ecc0.jpg>)



Puedes observar que aunque el dispositivo es un teléfono móvil muchas veces su uso principal no va a ser necesariamente el de un teléfono (hacer y recibir llamadas) sino que podrá estar dedicado a muchos otros usos (hacer fotos, navegar por Internet, reproducir archivos de audio, jugar, gestionar la agenda personal, consultar un mapa, usar un diccionario, escuchar la radio, ver una película, trazar una ruta para el navegador por satélite, etc.).

Dentro de muy poco tiempo es probable que se deje de emplear el término **smartPhone** o "móvil inteligente" pues todos los terminales móviles serán de este tipo y se hablará simplemente de "teléfonos móviles". De hecho en la práctica ya ocurre hoy día, pues cuando nos acercamos a algún catálogo de productos la inmensa mayoría de terminales que se nos ofrecen son de este tipo.

###### Docente — **3.1.2.- El interior de un smartphone.**

Si se te ocurriera abrir un teléfono móvil actual te encontraríamos una placa de circuito impreso con una serie de dispositivos electrónicos integrados o insertos en ella. En cierto modo podría recordar un poco a la placa base de un PC. Entre los dispositivos que podrías observar se encontrarían el procesador principal, procesadores digitales de señal (DSP), procesadores de imagen y de audio, módem, memorias caché, codecs de audio y vídeo, etc. A este conjunto de dispositivos integrados en la placa se le suele llamar chipset (lo cual te debería recordar al mundo del hardware de los PCs y a los conceptos estudiados en el módulo **Sistemas Informáticos**).

La principal arquitectura de microprocesadores utilizada para telefonía móvil es la diseñada por la empresa **ARM** ("Advanced RISC Machines", hoy día **ARM Holdings**), teniendo actualmente más del 90% de la cuota de mercado no ya sólo para teléfonos móviles, sino en general para todo tipo de pequeños dispositivos electrónicos que necesitan un microprocesador. Algunas de las familias de micros **ARM** más conocidas son las **ARM7**, **ARM9**, **ARM11** y **Cortex**. Hoy día muchas otras empresas diseñan microprocesadores basados en las patentes de la arquitectura de los procesadores **ARM** como por ejemplo DEC, **IBM**, **Texas Instrument**, **Samsung**, **Intel**, **Atmel**, **Alcatel-Lucent**, **Apple**, **Qualcomm**, **LG**, **Nintendo**, **Philips**, **Oki**, **Yamaha**, etc. Uno de los más conocidos es por ejemplo el **Intel XScale**.

![3.1. Hardware. — figura 3](<../temario/Recursos/Imagenes/t1-a-3-1-figura-03-82aa836b781b.jpg>)

Algunos ejemplos de productos que incorporan uno o varios micros ARM son: la mayoría de teléfonos móviles (**Nokia**, **Sony Ericsson**, **Samsung**, **Apple**, etc.), el **iPod** de **Apple**, las consolas **Gameboy** y **Nintendo DS**, routers, navegadores GPS, cámaras digitales, etc.

Respecto al chipset, existen diversas posibilidades de arquitectura, según sea el fabricante que las produce. Algunas de las arquitecturas más conocidas son **MSM** (de la empresa **Qualcomm**), **OMAP** (Open [Multimedia](<../temario/Recursos/PDF/multimedia-dad452485447.pdf>) Application Platform, de la empresa **Texas Instrument**), y las de la empresa **Marvell**.

Muchos teléfonos de **Nokia** utilizan la arquitectura **OMAP** de **Texas Instrument** (por ejemplo el **Nokia N810 WiMax Edition** que incorpora un chipset **OMAP 2420** con un procesador **ARM1136**), mientras que algunas BlackBerries hacen uso de la MSM de Qualcomm (por ejemplo la BlackBerry Storm, con una arquitectura MSM7600) o de arquitecturas **Marvell** (por ejemplo la **BlackBerry Bold**, con un chipset **Marvell Travor PXA930**). Algunos modelos de **Samsung** también se han decantado por **Marvell** (por ejemplo el **Samsung Omnia**, que incorpora un chipset **Marvell** a 624 Mhz).



<a id="t1-b"></a>

### Docente — 1.B. Sistemas operativos

<a id="t1-b-1"></a>

<a id="t1-b-1-mod-book-chapter"></a>

#### Docente — 1. Sistemas operativos.

En la actualidad, los dispositivos móviles se han convertido en herramientas indispensables para la vida diaria, ya que concentran funciones de comunicación, trabajo, entretenimiento y gestión personal en un solo aparato. Detrás de esta versatilidad se encuentra el sistema operativo (SO), que es el software encargado de gestionar los recursos del dispositivo y ofrecer una plataforma sobre la cual se ejecutan las aplicaciones.

Los sistemas operativos móviles han evolucionado de manera acelerada en las últimas dos décadas. Mientras que en los años 2000 existía una gran diversidad de plataformas (Symbian, Windows Mobile, BlackBerry OS, Palm OS), hoy el mercado se encuentra dominado principalmente por Android y iOS, que representan casi la totalidad de los smartphones en uso. Ambos han logrado consolidarse gracias a sus ecosistemas de aplicaciones, actualizaciones constantes y compatibilidad con tecnologías emergentes como la inteligencia artificial, el 5G y el Internet de las cosas (IoT).

Además de estos líderes, existen otros sistemas con nichos específicos o en desarrollo, como HarmonyOS de Huawei, KaiOS para dispositivos de gama básica, e iniciativas basadas en Linux como Ubuntu Touch. Aunque su cuota de mercado es menor, aportan alternativas y experimentación en el sector.

![1. Sistemas operativos. — figura 1](<../temario/Recursos/Imagenes/t1-b-1-figura-01-0089ae9ac159.png>)


<a id="t1-b-1-1"></a>

<a id="t1-b-1-1-mod-book-chapter"></a>

##### Docente — 1.1. Android.

**Android** fue inicialmente desarrollado por **Android Inc**., hoy día parte de la compañía **Google**. Está basado en una versión modificada del kernel de **Linux**.

El primer fabricante que incorporó **Android** en sus dispositivos fue **HTC** con su terminal **HTC Dream** (comercializado también como T-Mobile G1 y popularmente conocido con los nombres de **Google Phone** o **GPhone**) en 2008.

![1.1. Android. — figura 1](<../temario/Recursos/Imagenes/t1-b-1-1-figura-01-a356ce5b00b8.png>)

Es uno de los más "jóvenes" dentro del grupo de sistemas operativos para dispositivos móviles y se ha hecho un notable hueco alcanzando más de las dos terceras partes de la cuota de mercado actual. Existen miles de aplicaciones que funcionan sobre **Android**, con un crecimiento cada vez mayor.

Hoy día podemos encontrar multitud de fabricantes que incorporan **Android** en sus terminales: **Sony Ericsson** (p.e., series **Xperia**), **HTC** (p.e., Series **A**), **Acer** (p.e. series **beTouch**), **Motorola** (p.e.,**Droid X**), **Samsung** (p.e.,series **Galaxy** y **Nexus**), **Huawei**, **LG**,**Vivo**, **Oppo**, **Garmin** (**GarminPhone**), **Dell**, **Alcatel**, etc.

A septiembre de 2025, la última versión, de **Android** es 16 . Android comenzó con un simpático criterio de asignación de nombres para las diferentes versiones que se corresponden con postres y que además según avanzan la versión avanza alfabéticamente la letra del postre.

![1.1. Android. — figura 2](<../temario/Recursos/Imagenes/t1-b-1-1-figura-02-b519f76004c9.png>)

Para desarrollar aplicaciones sobre **Android** se necesita el kit de desarrollo de software para **Android** (**Android SDK**), proporcionado gratuitamente por **Google**. Este paquete incluye todo lo necesario para construir aplicaciones sobre el entorno **Android** (depurador, bibliotecas, emulador, documentación, etc.). El lenguaje de programación que se utiliza es **Java** en la actualidad **Kotlin**  (y por tanto es necesario el **JDK** para poder compilar programas Java).

El IDE oficial fue, durante los primeros años, **Eclipse** (a partir de la versión 3.2) junto con el plugin **ADT** (**Android Development Tools** - herramientas de desarrollo para Android). Sin embargo, las desavenencias entre Oracle (propietaria de Java) y Google (propietaria de Android) en los últimos años han provocado que Android abandonara la recomendación de uso de la versión ME de Eclipse para dispositivos móviles y haya desarrollado su propio IDE partiendo del IDE [IntelliJ IDEA de la compañía JetBrains](<https://es.wikipedia.org/wiki/IntelliJ_IDEA>), convirtiéndose, a partir de finales del año 2013, en el nuevo IDE oficial para el desarrollo de aplicaciones para Android.

**Para saber más**

Para saber más sobre Android se pueden consultar los artículos de la Wikipedia sobre este sistema operativo, así como los documentos a los que hace referencia:

[Android en la Wikipedia.](<http://es.wikipedia.org/wiki/Android>)

[developer.android.com](<https://developer.android.com/about/versions?hl=es-419>)


<a id="t1-b-1-2"></a>

<a id="t1-b-1-2-mod-book-chapter"></a>

##### Docente — 1.2. iOS.

Se trata del sistema operativo desarrollado por **Apple** originalmente para su **iPhone**, aunque hoy día también es utilizado por otros dispositivos de la empresa.

**Apple** sólo permite que este sistema operativo funcione sobre hardware **Apple**. Es un sistema operativo derivado del **Mac OS X**, también de **Apple**.

En mayo de 2016 la tienda de aplicaciones de **Apple** (servicio de descarga de aplicaciones), llamada **App Store**, disponía ya de más de 2000000 de aplicaciones para dispositivos con **iOS**. En septiembre de 2017, la cuota de mercado de **iOS** en los dispositivos móviles que se venden a nivel mundial se aproxima al 20%.

![1.2. iOS. — figura 1](<../temario/Recursos/Imagenes/t1-b-1-2-figura-01-03bb12d569d2.jpg>)

La última versión versión más reciente de **iOS** y iPadOS es 18.6.2

Como se ha comentado antes, los únicos dispositivos que incorporan este sistema operativo son los distintos modelos de dispositivos fabricados por la propia compañía **Apple**. Es decir, los **iPhones** (iPhone, iPhone 3G, iPhone 3GS, iPhone 4, etc.), el **iPod Touch**, el **iPad**, y la **Apple TV**.

Para desarrollar aplicaciones sobre iOS, los lenguajes principales son   
Swift. Lenguaje moderno de Apple, rápido, seguro y el estándar actual.  
Objective-C. Lenguaje más antiguo, todavía se usa en proyectos legacy.

El iOS SDK (Software Development Kit) es el conjunto de herramientas que Apple ofrece para desarrollar aplicaciones. Viene integrado en **Xcode**. Que ofrece:

Editor de código con autocompletado para Swift y Objective-C.  
Interface Builder (editor visual) para diseñar pantallas (UIKit) o vista previa en tiempo real (SwiftUI).  
Simuladores de dispositivos (iPhone, iPad, Apple Watch, Apple TV).  
Depuración y profiling con Instruments (CPU, memoria, energía, red).  
Gestor de proyectos con integración para pruebas unitarias y de interfaz.  
Distribución: desde Xcode puedes enviar builds a TestFlight (para beta testers) o a la App Store.

**Para saber más**

Para saber más sobre iOS se pueden consultar los artículos de la Wikipedia sobre este sistema operativo, así como los documentos externos a los que hace referencia:

[iOS en la Wikipedia.](<http://es.wikipedia.org/wiki/IOS_%28sistema_operativo%29>)


<a id="t1-b-1-3"></a>

<a id="t1-b-1-3-mod-book-chapter"></a>

##### Docente — 1.3. Otros sistemas Operativos

###### Docente — **HarmonyOS (Huawei)**

**Desarrollador**: Huawei.  
Cuota de mercado: Creciente, especialmente en China.

![1.3. Otros sistemas Operativos — figura 1](<../temario/Recursos/Imagenes/t1-b-1-3-figura-01-c8300ab15c50.png>)Características:   
Enfoque en la conectividad entre dispositivos (IoT, televisores, relojes, coches).  
Diseñado para funcionar en múltiples tipos de dispositivos.  
Alternativa tras las restricciones de Google en China.

Debemos destacar las siguientes desventajas:

Limitado fuera de Asia.  
Ecosistema de aplicaciones más reducido.

Huawei ha consolidado HarmonyOS como su sistema operativo oficial tras las restricciones de Google. En China ya es muy usado, y desde 2024–2025 están lanzando gamas completas (Mate, Pura, Pocket, plegables) con HarmonyOS NEXT, que deja atrás incluso las bases de Android.  
Es el único sistema alternativo a Android e iOS con una presencia real y sostenida en el mercado actual.

###### Docente — KaiOS

Desarrollador: KaiOS Technologies.  
Enfoque: Teléfonos básicos con funciones inteligentes.  
Ventajas:

Bajo consumo de recursos.  
Acceso a aplicaciones clave como WhatsApp, YouTube, Facebook.  
Ideal para mercados emergentes.  
Desventajas:

Muy limitado para usuarios que buscan un smartphone completo.  
Ecosistema de apps reducido.

Sigue existiendo, pero en un nicho muy reducido.  
KaiOS se orienta a feature phones (teléfonos básicos con apps esenciales como WhatsApp, YouTube, Facebook).

Se vende en algunos mercados emergentes (África, India, Latinoamérica).  
Marcas como Nokia (8110 4G) y dispositivos recientes como Elikia Moké 2 lo usan.  
Sin embargo, su presencia global es mínima y no compite con smartphones Android/iOS.

###### Docente — Otros (Ubuntu Touch, LineageOS, etc.)

Ventajas:

Alternativas libres y basadas en Linux.  
Mayor control de privacidad y personalización.  
Desventajas:

Escasa cuota de mercado.  
Poca compatibilidad con aplicaciones populares.

Destacar que ya no se encuentran dispositivos en el mercado comercial, solo como opción alternativa instalada por comunidades o marcas muy pequeñas.



<a id="t1-c"></a>

### Docente — 1.C. Plataformas de desarrollo y lenguajes de programación

<a id="t1-c-1"></a>

<a id="t1-c-1-mod-book-chapter"></a>

#### Docente — 1. Plataformas de desarrollo y lenguajes de programación.

Para poder desarrollar aplicaciones para alguno de los anteriores sistemas operativos es necesario, disponer de alguna plataforma de desarrollo que permita generar código ejecutable sobre esos sistemas, o bien sobre alguna máquina virtual, o algún intérprete que esté instalado en el dispositivo y que sea soportado por el sistema operativo.

Dependiendo de la versatilidad de la plataforma de desarrollo, la aplicación podrá ser, más o menos portable a otros sistemas operativos y/o dispositivos. Por ejemplo, si realizamos programas en **Objective-C** utilizando el **SDK de Apple**, lo más probable es que nuestra aplicación pueda ser únicamente ejecutada en un dispositivo **Apple** (iPhone por ejemplo) sobre el que esté implantado **iOS**. Si, por el contrario, desarrollamos un programa en **Java** usando el **Java ME** de **Oracle**, y generamos una aplicación tipo **midlet**, ésta podrá ser ejecutada en cualquier dispositivo que disponga de una pequeña máquina virtual de **Java** (**KVM**). Se trata nuevamente de la misma problemática que podemos encontrar en el mundo de los ordenadores convencionales.

Entre las plataformas de desarrollo para móviles más populares se encuentran normalmente las que los propios autores de los sistemas operativos ofrecen para trabajar sobre su plataforma. De hecho ya hemos hablado algo sobre algunas de ellas al describir los sistemas operativos. Hacemos un repaso rápido de las más conocidas:

- **Android**. **Google** proporciona también de manera gratuita el **Android SDK** para programar aplicaciones en **Java** sobre su sistema operativo. El IDE más utilizado es **Eclipse** con el plugin **ADT** (**Android Development Tools**) y últimamente **Android Studio**. También es posible programar en otros lenguajes como **C** o **C++** gracias al uso del **Android NDK** (**Native Development Kit**) que permite generar código nativo (native code), frente al código gestionado (managed code), que se ejecuta sobre una máquina virtual, como es el caso de **Java** o **C#**. Por otro lado, no se debe perder de vista el deliberado impulso que está haciendo Google para que Android sea programado en lenguaje **Kotlin**.

Para más info sobre **Kotlin** ver estos enlaces:

- [https://www.xatakandroid.com/programacion-android/kotlin-ya-es-un-lenguaje-oficial-en-android-que-implicaciones-tiene-y-por-que-es-tan-importante](<https://www.xatakandroid.com/programacion-android/kotlin-ya-es-un-lenguaje-oficial-en-android-que-implicaciones-tiene-y-por-que-es-tan-importante>)

- [https://apiumhub.com/es/tech-blog-barcelona/por-que-kotlin/](<https://apiumhub.com/es/tech-blog-barcelona/por-que-kotlin/>)

- [https://www.paradigmadigital.com/dev/kotlin-otra-moda-mas-spoiler-no/](<https://www.paradigmadigital.com/dev/kotlin-otra-moda-mas-spoiler-no/>)



- **iOS**. El SDK también se puede descargar gratis, pero para poder comercializar el software a través de su tienda de aplicaciones hay que registrarse en el programa de desarrollo del **iPhone**, lo cual **no es gratuito**. El lenguaje de programación en este caso es **Objective-C**.

![1. Plataformas de desarrollo y lenguajes de programación. — figura 1](<../temario/Recursos/Imagenes/t1-c-1-figura-01-ad30348dd6ce.jpg>)

  

- **Java ME**: Este caso sería una excepción respecto a los demás, pues no se trata de una serie de herramientas (bibliotecas, compiladores, IDEs, etc.) asociadas a un sistema operativo, sino de un subconjunto de la plataforma Java orientada para el desarrollo sobre dispositivos móviles. Se programaría en lenguaje **Java** y sería necesario que hubiera instalada una máquina virtual en el sistema operativo del dispositivo sobre el que se deseara ejecutar la aplicación desarrollada como sucede por ejemplo en Symbian (que se puede programar en modo nativo o bien con **Java ME**).

![1. Plataformas de desarrollo y lenguajes de programación. — figura 2](<../temario/Recursos/Imagenes/t1-c-1-figura-02-6bec04936147.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.

- **Windows Phone**. Para desarrollar aplicaciones sobre **Windows Phone** pueden utilizarse las tecnologías **Silverlight**, **XNA** y **.NET Compact Framework** de **Microsoft**. Las herramientas **Visual Studio 2010 Express** y **Expression Blend** para **Windows Phone** son ofrecidas gratuitamente por **Microsoft**. El lenguaje más habitual para el desarrollo ha sido **C#**, aunque la idea es que se pueda utilizar también otros lenguajes de la plataforma **.NET** como **Visual Basic** **.NET**.


<a id="t1-c-2"></a>

<a id="t1-c-2-mod-book-chapter"></a>

#### Docente — 2. Elección de una alternativa.

Dado que durante este Ciclo Formativo, preferentemente se ha programado ya en Java (módulo de **Programación**), las alternativas más propicias son **Java ME** y **Android Studio** sobre **Android**. En cualquier caso, hemos de ser siempre conscientes de que no se trata más que de una de las posibles alternativas disponibles en el mercado y que más adelante (en futuros proyectos dentro de la empresa) es probable que quizá tengas que trabajar con otros lenguajen (por ejemplo C#, C++, Python, Objective-C, Kotlin,...) y para otras plataformas.

Lo importante es adquirir unos conocimientos generales sobre este nuevo tipo de entornos, sobre algunas bibliotecas concretas para estos dispositivos (por ejemplo los paquetes **javax** en el caso de **Java ME**) y comenzar a desarrollar algunos ejemplos de aplicaciones para ir desarrollando una nueva filosofía de trabajo.

En nuestro caso **Java** puede ser una buena elección dado que es el lenguaje con el que aprendiste a programar en el módulo de **Programación** y por tanto no tendrás que aprender un nuevo lenguaje y podrías dedicarte de lleno al aprendizaje de las características específicas para el desarrollo de aplicaciones para dispositivos móviles. Por otro lado, un lenguaje multiplataforma como **Java** es también muy adecuado para un ciclo con un nombre como "**Desarrollo de Aplicaciones Multiplataforma**". Pero en cualquier caso no debes olvidar que se trata de una de las muchas opciones con las que te puedes encontrar en el mercado, y que estas alternativas irán apareciendo y desapareciendo constantemente en función del éxito que vayan obteniendo.

Respecto a la plataforma, debemos elegir entre aquellas que estén relacionadas con **Java** (**Java ME** y **Android Studio**). Concretamente, nos decantaremos por Android Studio, que es la que ha experimentado en los últimos años una progresión mayor.

Recapitulando, para facilitarte el aprendizaje vamos a trabajar con:

- **Lenguaje Java** y **XML**.
- **Plataforma Android**.
- **IDE Android Studio**.
- **Sistema operativo** que permita una máquina virtual **Java** para la emulación, aunque normalmente usaremos un emulador proporcionado por el propio IDE.
- **Hardware** (smartPhones, tablets, etc.) que soporte un sistema operativo del tipo anterior.

![2. Elección de una alternativa. — figura 1](<../temario/Recursos/Imagenes/t1-c-2-figura-01-bc77cd86a001.png>)![2. Elección de una alternativa. — figura 2](<../temario/Recursos/Imagenes/t1-c-2-figura-02-2b70171c5966.png>)![2. Elección de una alternativa. — figura 3](<../temario/Recursos/Imagenes/t1-c-2-figura-03-d5ce0cbfc0c1.png>)



Como suele suceder en el mundo real, normalmente no podrás elegir una opción u otra en función de tus preferencias personales, sino más bien dependiendo cuáles sean las necesidades de tu cliente. Ésa es una buena razón para intentar estar siempre al día.


<a id="t1-c-3"></a>

<a id="t1-c-3-mod-book-chapter"></a>

#### Docente — 3. La plataforma Android.

Los componentes principales del sistema operativo de Android:  
  
  

- **Aplicaciones**: las aplicaciones base incluyen un cliente de correo electrónico, programa de SMS, calendario, mapas, navegador, contactos y otros. Todas las aplicaciones están escritas en lenguaje de programación Java.

![3. La plataforma Android. — figura 1](<../temario/Recursos/Imagenes/t1-c-3-figura-01-f76c2e91240d.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.

- **Marco de trabajo de aplicaciones**: los desarrolladores tienen acceso completo a los mismas API del entorno de trabajo usados por las aplicaciones base. La arquitectura está diseñada para simplificar la reutilización de componentes; cualquier aplicación puede publicar sus capacidades y cualquier otra aplicación puede luego hacer uso de esas capacidades (sujeto a reglas de seguridad del framework). Este mismo mecanismo permite que los componentes sean reemplazados por el usuario.

  

- **Bibliotecas**: Android incluye un conjunto de bibliotecas de C/C++ usadas por varios componentes del sistema. Estas características se exponen a los desarrolladores a través del marco de trabajo de aplicaciones de Android. Algunas son: System C library (implementación biblioteca C estándar), bibliotecas de medios, bibliotecas de gráficos, 3D y SQLite, entre otras.

  

- **Runtime de Android**: Android incluye un set de bibliotecas base que proporcionan la mayor parte de las funciones disponibles en las bibliotecas base del lenguaje Java. Cada aplicación Android corre su propio proceso, con su propia instancia de la máquina virtual Dalvik. Dalvik ha sido escrito de forma que un dispositivo puede correr múltiples máquinas virtuales de forma eficiente. Dalvik ejecutaba hasta la versión 5.0 archivos en el formato de ejecutable Dalvik (.dex), el cual está optimizado para memoria mínima. La Máquina Virtual está basada en registros y corre clases compiladas por el compilador de Java que han sido transformadas al formato.dex por la herramienta incluida dx. Desde la versión 5.0 utiliza el ART, que compila totalmente al momento de instalación de la aplicación.

  

- **Núcleo Linux**: Android depende de Linux para los servicios base del sistema como seguridad, gestión de memoria, gestión de procesos, pila de red y modelo de controladores. El núcleo también actúa como una capa de abstracción entre el hardware y el resto de la pila de software.

**Para saber más**

Para obtener más información sobre **Android** puede consultarse la wikipedia:

[Android](<https://es.wikipedia.org/wiki/Android>)


<a id="t1-c-4"></a>

<a id="t1-c-4-mod-book-chapter"></a>

#### Docente — 4. El entorno de ejecución.

**NOTA IMPORTANTE**: A partir de ahora haremos muchas referencias durante todo el curso a la documentación oficial proporcionada por Google sobre el desarrollo de Android (**developer.android.com**). De hecho se puede decir que es la principal guía para elaborar los contenidos relativos a Android de este curso.

  

Si consultamos la página oficial de desarrollo de Android **(developer.android.com**) podemos observar la siguiente estructura de capas o niveles:

![4. El entorno de ejecución. — figura 1](<../temario/Recursos/Imagenes/t1-c-4-figura-01-878b4c9070c3.png>)

Analicemos las diferentes capas empezando por abajo:

**A) Kernel de Linux**

La base de la plataforma Android es el kernel de Linux. Por ejemplo, [el tiempo de ejecución de Android (ART, acrónimo de Android Run Time)](<https://developer.android.com/guide/platform/index.html?hl=es-419#art>) se basa en el kernel de Linux para funcionalidades subyacentes, como la generación de subprocesos y la administración de memoria de bajo nivel.

El uso del kernel de Linux permite que Android aproveche [funciones de seguridad claves](<https://source.android.com/security/overview/kernel-security.html?hl=es-419>) y, al mismo tiempo, permite a los fabricantes de dispositivos desarrollar controladores de hardware para un kernel conocido.

**B) Capa de abstracción de hardware (HAL)**

La [capa de abstracción de hardware (HAL)](<https://source.android.com/docs/core/architecture/hal?hl=es-419>) brinda interfaces estándares que exponen las capacidades de hardware del dispositivo al [framework de la Java API](<https://developer.android.com/guide/platform/index.html?hl=es-419#api-framework>) de nivel más alto. La HAL consiste en varios módulos de biblioteca y cada uno de estos implementa una interfaz para un tipo específico de componente de hardware, como el módulo de la [cámara](<https://source.android.com/devices/camera/index.html?hl=es-419>) o de [bluetooth](<https://source.android.com/devices/bluetooth.html?hl=es-419>). Cuando el framework de una API realiza una llamada para acceder a hardware del dispositivo, el sistema Android carga el módulo de biblioteca para el componente de hardware en cuestión.

**C) Tiempo de ejecución de Android (ART)**

Para los dispositivos con Android 5.0 (nivel de API 21) o versiones posteriores, cada app ejecuta sus propios procesos con sus propias instancias del [tiempo de ejecución de Android (ART)](<http://source.android.com/devices/tech/dalvik/index.html?hl=es-419>). El ART está escrito para ejecutar varias máquinas virtuales en dispositivos de memoria baja ejecutando archivos DEX, un formato de código de bytes diseñado especialmente para Android y optimizado para ocupar un espacio de memoria mínimo. Crea cadenas de herramientas, como [Jack](<https://source.android.com/source/jack.html?hl=es-419>), y compila fuentes de Java en código de bytes DEX que se pueden ejecutar en la plataforma Android.

Estas son algunas de las funciones principales del ART:

- compilación ahead-of-time (AOT) y just-in-time (JIT);
- recolección de elementos no usados (GC) optimizada;
- mejor compatibilidad con la depuración, como un generador de perfiles de muestras dedicado, excepciones de diagnóstico detalladas e informes de fallos, y la capacidad de establecer puntos de control para controlar campos específicos.

Antes de Android 50 (nivel de API 21), Dalvik era el tiempo de ejecución del sistema operativo. Por tanto ART es una evolución de Dalvik mejorando su rendimiento, en cuanto a velocidad de ejecución y tiempo que tarda en abrir una aplicación. Si tu app se ejecuta bien en el ART, también debe funcionar en Dalvik, pero es posible que no suceda lo contrario.

En Android también se incluye un conjunto de bibliotecas de tiempo de ejecución centrales que proporcionan la mayor parte de la funcionalidad del lenguaje de programación Java; se incluyen algunas [funciones del lenguaje Java 8](<https://developer.android.com/guide/platform/j8-jack.html?hl=es-419>), que el framework de la Java API usa.

**D) Bibliotecas C/C++ nativas**

Muchos componentes y servicios centrales del sistema Android, como el ART y la HAL, se basan en código nativo que requiere bibliotecas nativas escritas en C y C++. La plataforma Android proporciona la API del framework de Java para exponer la funcionalidad de algunas de estas bibliotecas nativas a las apps. Por ejemplo, puedes acceder a [OpenGL ES](<https://developer.android.com/guide/topics/graphics/opengl.html?hl=es-419>) a través de la [Java OpenGL API](<https://developer.android.com/reference/android/opengl/package-summary.html?hl=es-419>) del framework de Android para agregar a tu app compatibilidad con los dibujos y la manipulación de gráficos 2D y 3D.

Si desarrollas una app que requiere C o C++, puedes usar el [NDK de Android](<https://developer.android.com/ndk/index.html?hl=es-419>) para acceder a algunas de estas [bibliotecas de plataformas nativas](<https://developer.android.com/ndk/guides/stable_apis.html?hl=es-419>) directamente desde tu código nativo.

**E) Framework de la API de Java**

Todo el conjunto de funciones del SO Android está disponible mediante API escritas en el lenguaje Java. Estas API son los cimientos que necesitas para crear apps de Android simplificando la reutilización de componentes del sistema y servicios centrales y modulares, como los siguientes:

- Un [sistema de vista](<https://developer.android.com/guide/topics/ui/overview.html?hl=es-419>) enriquecido y extensible que puedes usar para compilar la IU de una app; se incluyen listas, cuadrículas, cuadros de texto, botones e incluso un navegador web integrable.
- Un [administrador de recursos](<https://developer.android.com/guide/topics/resources/overview.html?hl=es-419>) que te brinda acceso a recursos sin código, como strings localizadas, gráficos y archivos de diseño.
- Un [administrador de notificaciones](<https://developer.android.com/guide/topics/ui/notifiers/notifications.html?hl=es-419>) que permite que todas las apps muestren alertas personalizadas en la barra de estado.
- Un [administrador de actividad](<https://developer.android.com/guide/components/activities.html?hl=es-419>) que administra el ciclo de vida de las apps y proporciona una [pila de retroceso de navegación](<https://developer.android.com/guide/components/tasks-and-back-stack.html?hl=es-419>) común.
- [Proveedores de contenido](<https://developer.android.com/guide/topics/providers/content-providers.html?hl=es-419>) que permiten que las apps accedan a datos desde otras apps, como la app de Contactos, o compartan sus propios datos.

Los desarrolladores tienen acceso total a las mismas [API del framework](<https://developer.android.com/reference/packages.html?hl=es-419>) que usan las apps del sistema Android.

**F) Apps del sistema**

En Android se incluye un conjunto de apps centrales para correo electrónico, mensajería SMS, calendarios, navegación en Internet y contactos, entre otros elementos. Las apps incluidas en la plataforma no tienen un estado especial entre las apps que el usuario elije instalar; por ello, una app externa se puede convertir en el navegador web, el sistema de mensajería SMS o, incluso, el teclado predeterminado del usuario (existen algunas excepciones, como la app Settings del sistema).

Las apps del sistema funcionan como apps para los usuarios y brindan capacidades claves a las cuales los desarrolladores pueden acceder desde sus propias apps. Por ejemplo, si en tu app se intenta entregar un mensaje SMS, no es necesario que compiles esa funcionalidad tú mismo; como alternativa, puedes invocar la app de SMS que ya está instalada para entregar un mensaje al receptor que especifiques.


<a id="t1-c-5"></a>

<a id="t1-c-5-mod-book-chapter"></a>

#### Docente — 5. Máquinas Virtuales.

Una máquina virtual es una aplicación software que emula el comportamiento de otra máquina (por ejemplo la emulación de un ordenador "virtual" dentro de un ordenador "real").

![5. Máquinas Virtuales. — figura 1](<../temario/Recursos/Imagenes/t1-c-5-figura-01-06ada0703408.png>)

En el caso de una máquina virtual de **Java** (**JVM** – Java Virtual Machine), si recordamos lo visto en el módulo de **Programación**, se trata de un programa encargado de interpretar código intermedio (bytecode en el caso de **Java**) de los programas precompilados (en lenguaje **Java**) a código máquina ejecutable por el hardware (instrucciones máquina), realizar las llamadas al sistema operativo necesarias, velar por la seguridad e integridad del código ejecutado, etc.

De esta manera, la **JVM** proporciona al programa compilado en **Java** independencia de la plataforma hardware y del sistema operativo que corra sobre él.

Las **JVM** clásicas para la plataforma **Java SE** son demasiado pesadas (necesidades de memoria, requerimientos de cómputo, pantalla, etc.) para dispositivos pequeños. Imagina por ejemplo la limitada pantalla de un teléfono móvil. Es fácil suponer que ese tipo de pantallas serían incapaces de soportar toda la funcionalidad proporcionada por la AWT, que es la principal interfaz gráfica de usuario que tiene **Java**. Es por esta razón que la plataforma **Java ME** ha propuesto otras máquinas virtuales bastante más ligeras.

Por otro lado, una única plataforma de Java podría no encajar adecuadamente con todos los modelos de dispositivos posibles. Es por ello por lo que **Java ME** introdujo los conceptos de configuración y de perfil.

Las dos máquinas virtuales disponibles en **Java ME** son la **KVM** (**K Virtual Machine**, se le ha dado ese nombre porque sólo ocuparía unos pocos Kilobytes de memoria) y la **CVM** (**Compact Virtual Machine**), algo más pesada.

De manera similar, para **Android**, [**Dalvik**](<https://es.wikipedia.org/wiki/Dalvik>), que es la [máquina virtual](<https://es.wikipedia.org/wiki/M%C3%A1quina_virtual>) utilizada originalmente por Android, y lleva a cabo la transformación de la aplicación en instrucciones de máquina, que luego son ejecutadas por el [entorno de ejecución](<https://es.wikipedia.org/wiki/Entorno_de_ejecuci%C3%B3n>) nativo del dispositivo. En versiones más modernas de **Android**, **ART** ha reemplazado a **Dalvik**.



<a id="t1-d"></a>

### Docente — 1.D. Tecnologías para aplicaciones en dispositivos móviles

[PDF original conservado](<../temario/Recursos/PDF/tecnologias-para-aplicaciones-en-dispositivos-moviles-e3ba8d9d6929.pdf>). Las 12 diapositivas se reproducen a continuación, con transcripción y su representación visual.

Herramienta de presentación enlazada en el PDF original: [Gamma](<https://gamma.app/>).

<a id="t1-d-p01"></a>

#### Docente — Diapositiva 01. Tecnologías para aplicaciones en dispositivos móviles

![Diapositiva 1: Tecnologías para aplicaciones en dispositivos móviles](<../temario/Recursos/Imagenes/tema-1-d-pagina-01-26a00e5f9c8c.png>)

Las aplicaciones móviles han transformado la forma en que interactuamos con el mundo. Desde la comunicación hasta el entretenimiento, las aplicaciones se han convertido en herramientas esenciales para la vida diaria.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Tecnologías para
aplicaciones en
dispositivos móviles


Las aplicaciones móviles han transformado la forma en que interactuamos
con el mundo. Desde la comunicación hasta el entretenimiento, las
aplicaciones se han convertido en herramientas esenciales para la vida diaria.
```

</details>

<a id="t1-d-p02"></a>

#### Docente — Diapositiva 02. Introducción a los dispositivos móviles

![Diapositiva 2: Introducción a los dispositivos móviles](<../temario/Recursos/Imagenes/tema-1-d-pagina-02-84cc0256dc89.png>)

1. **Diversidad de plataformas.** El mercado de dispositivos móviles está dominado por sistemas operativos como Android e iOS, cada uno con su propio ecosistema y características únicas.
2. **Variedad de tamaños y formatos.** Los dispositivos móviles vienen en una amplia gama de tamaños y formatos, desde teléfonos inteligentes compactos hasta tabletas de gran tamaño.
3. **Hardware y capacidades.** Los dispositivos móviles modernos cuentan con hardware potente, incluyendo procesadores rápidos, cámaras de alta calidad y conectividad inalámbrica de última generación.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Introducción a los dispositivos
móviles

       Diversidad de plataformas
  1                       2   Variedad de tamaños y
         El mercado de dispositivos          formatos
       móviles está dominado por
                                          Los dispositivos móviles       sistemas operativos como
                                           vienen en una amplia gama       Android e iOS, cada uno con
                                     de tamaños y formatos, desde       su propio ecosistema y
                                             teléfonos inteligentes        características únicas.
                                       compactos hasta tabletas de
                                           gran tamaño.

 3   Hardware y capacidades
       Los dispositivos móviles modernos cuentan con hardware potente,
       incluyendo procesadores rápidos, cámaras de alta calidad y conectividad
        inalámbrica de última generación.
```

</details>

<a id="t1-d-p03"></a>

#### Docente — Diapositiva 03. SO móviles

![Diapositiva 3: SO móviles](<../temario/Recursos/Imagenes/tema-1-d-pagina-03-7ad77844a4c0.png>)

| Nº | SO móvil | Desarrollador (literal del original) |
| --- | --- | --- |
| 1 | android | Google |
| 2 | iOS | Apple |
| 3 | HarmonyOS | Huawei |
| 4 | Tizen | Samsung |
| 5 | KaiOS | KaIOS Techologies |

> Se conserva la grafía «KaIOS Techologies» del material, sin corregirla silenciosamente.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
SO móviles




                                     iOS  1   android               2
        Desarrollador: Google                   Desarrollador: Apple

 3  HarmonyOS                        4  Tizen
      Desarrollador: Huawei                   Desarrollador: Samsung

 5  KaiOS
       Desarrollador: KaIOS Techologies
```

</details>

<a id="t1-d-p04"></a>

#### Docente — Diapositiva 04. Apps nativas, híbridas y web

![Diapositiva 4: Apps nativas, híbridas y web](<../temario/Recursos/Imagenes/tema-1-d-pagina-04-5853366617ef.png>)

| Grupo mostrado en la imagen | Texto y marcas representadas |
| --- | --- |
| Apps Nativas | android y logotipo de Apple |
| Apps Híbridas | React Native y Flutter |
| Apps Web | HTML 5, JS y PHP |

> Esta es la agrupación de la diapositiva; no se ha sustituido por una clasificación técnica diferente.

<a id="t1-d-p05"></a>

#### Docente — Diapositiva 05. Comparativa rápida

![Diapositiva 5: Comparativa rápida](<../temario/Recursos/Imagenes/tema-1-d-pagina-05-e3d0208740f3.png>)

**Comparativa Rápida:**

| Tipo de Aplicación | Lenguajes comunes | Rendimiento | Acceso a hardware | Costo de desarrollo | Mantenimiento |
| --- | --- | --- | --- | --- | --- |
| Nativa | Kotlin, Swift, Java, Objective-C | Alto | Completo | Alto | Alto |
| Web | HTML5, CSS, JavaScript | Medio | Limitado | Bajo | Bajo |
| Híbrida | HTML, CSS, JavaScript (con frameworks) | Medio | Moderado | Medio | Medio |

<a id="t1-d-p06"></a>

#### Docente — Diapositiva 06. Desarrollo de aplicaciones nativas

![Diapositiva 6: Desarrollo de aplicaciones nativas](<../temario/Recursos/Imagenes/tema-1-d-pagina-06-5be2380df9e2.png>)

**Ventajas**

- Mejor rendimiento y acceso a funciones del dispositivo.
- Experiencia de usuario optimizada.
- Mayor seguridad y control.

**Desventajas**

- Coste de desarrollo más alto.
- Tiempo de desarrollo más largo.
- Dificultad para mantener diferentes versiones de la aplicación.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Desarrollo de aplicaciones nativas

Ventajas                                                Desventajas

     •  Mejor rendimiento y acceso a funciones del dispositivo.                •   Coste de desarrollo más alto.

     •   Experiencia de usuario optimizada.                                           •  Tiempo de desarrollo más largo.

     •  Mayor seguridad y control.                                                       •   Dificultad para mantener diferentes versiones de la
                                                                               aplicación.
```

</details>

<a id="t1-d-p07"></a>

#### Docente — Diapositiva 07. Aplicaciones web progresivas (PWA)

![Diapositiva 7: Aplicaciones web progresivas (PWA)](<../temario/Recursos/Imagenes/tema-1-d-pagina-07-27e9222d931a.png>)

**Experiencia de aplicación**

Las PWA brindan una experiencia similar a las aplicaciones nativas, con funciones como notificaciones push y acceso a características del dispositivo.

**Compatibilidad multiplataforma**

Las PWA funcionan en cualquier navegador compatible, lo que facilita su distribución y acceso a una audiencia más amplia.

**Actualizaciones automáticas**

Las PWA se actualizan automáticamente, lo que garantiza que los usuarios siempre tengan la versión más reciente de la aplicación.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Aplicaciones web progresivas
(PWA)

  Experiencia de aplicación         Compatibilidad
                                   multiplataforma  Las PWA brindan una experiencia
  similar a las aplicaciones              Las PWA funcionan en cualquier
  nativas, con funciones como          navegador compatible, lo que
  notificaciones push y acceso a            facilita su distribución y acceso a
  características del dispositivo.        una audiencia más amplia.


  Actualizaciones automáticas

  Las PWA se actualizan automáticamente, lo que garantiza que los
  usuarios siempre tengan la versión más reciente de la aplicación.
```

</details>

<a id="t1-d-p08"></a>

#### Docente — Diapositiva 08. Desarrollo de aplicaciones híbridas

![Diapositiva 8: Desarrollo de aplicaciones híbridas](<../temario/Recursos/Imagenes/tema-1-d-pagina-08-d89141c3c744.png>)

**Marco de trabajo**

Las aplicaciones híbridas utilizan marcos como React Native o Ionic para crear una interfaz de usuario nativa dentro de un contenedor web.

**Acceso a funciones nativas**

Las aplicaciones híbridas pueden acceder a funciones del dispositivo como la cámara y el GPS, mediante plugins o APIs.

**Mayor flexibilidad**

Las aplicaciones híbridas ofrecen una mayor flexibilidad en términos de desarrollo y mantenimiento.

> Se conserva esta descripción del original; no implica que React Native, Ionic y Flutter compartan la misma arquitectura.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Desarrollo de aplicaciones híbridas

          Marco de trabajo

              Las aplicaciones híbridas utilizan marcos como React Native o Ionic
             para crear una interfaz de usuario nativa dentro de un contenedor
             web.

           Acceso a funciones nativas

              Las aplicaciones híbridas pueden acceder a funciones del
               dispositivo como la cámara y el GPS, mediante plugins o APIs.

           Mayor flexibilidad

              Las aplicaciones híbridas ofrecen una mayor flexibilidad en
              términos de desarrollo y mantenimiento.
```

</details>

<a id="t1-d-p09"></a>

#### Docente — Diapositiva 09. Apps multiplataforma frente a apps nativas

![Diapositiva 9: Apps multiplataforma frente a apps nativas](<../temario/Recursos/Imagenes/tema-1-d-pagina-09-b35e88a83d14.png>)

**APPS MULTIPLATAFORMA VS APPS NATIVAS**

**Apps multiplataforma**

Aplicaciones desarrolladas en una sola base de código que funciona en diferentes plataformas.

Marcas y plataformas representadas: React Native, Flutter, Android, Apple y Windows.

**Ventajas**

- El código se crea una sola vez por lo que es más simple de construir y probar.
- Los cambios y actualizaciones se mantienen simultáneamente en todas las plataformas.

**Desventajas**

- Algunas funciones no estarán disponibles cuando no hay conexión a internet.

**Apps nativas**

Aplicaciones desarrolladas para una plataforma específica en su lenguaje de programación nativo.

Marcas y plataformas representadas: C#, Java, Windows, Apple y Android.

**Ventajas**

- Tienen acceso rápido a la cámara, GPS, calendario, micrófono y otras funciones del dispositivo.
- Optimizada para cada sistema operativo, tiene mayor rendimiento y velocidad.

**Desventajas**

- Necesitan más tiempo para desarrollarse en comparación con las aplicaciones híbridas.

> La afirmación sobre disponibilidad sin conexión procede literalmente de la infografía, no es una limitación universal de las aplicaciones multiplataforma.

<a id="t1-d-p10"></a>

#### Docente — Diapositiva 10. Tecnologías de interfaz de usuario

![Diapositiva 10: Tecnologías de interfaz de usuario](<../temario/Recursos/Imagenes/tema-1-d-pagina-10-99b002cb7329.png>)

| Tecnología | Lenguaje |
| --- | --- |
| React Native | JavaScript |
| Flutter | Dart |
| Xamarin | C# |

Otros rótulos del original:

- Android java XML.
- Android JetPack Compose.
- IOS swiftUI.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Tecnologías de interfaz de
usuario


  React Native              Flutter                Xamarin

  JavaScript               Dart                  C#

  Android java XML        Android JetPack ComposeIOS swiftUI
```

</details>

<a id="t1-d-p11"></a>

#### Docente — Diapositiva 11. Optimización de rendimiento y consumo de batería

![Diapositiva 11: Optimización de rendimiento y consumo de batería](<../temario/Recursos/Imagenes/tema-1-d-pagina-11-f0a8c4e0c47e.png>)

1. **Minimización de recursos.** Utilizar imágenes optimizadas, minimizar el uso de animaciones y reducir el tamaño del código.
2. **Gestión de memoria.** Liberar memoria de forma eficiente para evitar ralentizaciones y mejorar el rendimiento general.
3. **Optimización de la red.** Utilizar estrategias de caché y compresión para reducir el consumo de datos y mejorar la velocidad de carga.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Optimización de rendimiento y
consumo de batería

   1          Minimización de recursos
                   Utilizar imágenes optimizadas, minimizar el uso de animaciones
              y reducir el tamaño del código.

  2          Gestión de memoria
                Liberar memoria de forma eficiente para evitar ralentizaciones y
              mejorar el rendimiento general.

  3          Optimización de la red
                   Utilizar estrategias de caché y compresión para reducir el
            consumo de datos y mejorar la velocidad de carga.
```

</details>

<a id="t1-d-p12"></a>

#### Docente — Diapositiva 12. Tendencias y futuro de las aplicaciones móviles

![Diapositiva 12: Tendencias y futuro de las aplicaciones móviles](<../temario/Recursos/Imagenes/tema-1-d-pagina-12-5f9e9d3b603f.png>)

**Realidad virtual y aumentada**

La realidad virtual y aumentada están transformando las experiencias móviles, ofreciendo nuevas formas de interacción y entretenimiento.

**Inteligencia artificial**

La IA está impulsando aplicaciones más inteligentes y personalizadas, desde asistentes virtuales hasta análisis predictivo.

**Computación en la nube**

La computación en la nube permite el acceso a recursos y datos desde cualquier lugar, mejorando la escalabilidad y el rendimiento de las aplicaciones.

**Internet de las cosas (IoT)**

El IoT está creando una red de dispositivos conectados, abriendo nuevas posibilidades para las aplicaciones móviles.

<details>
<summary>Texto extraído íntegro de la capa del PDF (orden automático)</summary>

```text
Tendencias y futuro de las
aplicaciones móviles



Realidad virtual y aumentada             Inteligencia artificial

La realidad virtual y aumentada están        La IA está impulsando aplicaciones más
transformando las experiencias móviles,       inteligentes y personalizadas, desde
ofreciendo nuevas formas de interacción y    asistentes virtuales hasta análisis
entretenimiento.                               predictivo.



Computación en la nube                  Internet de las cosas (IoT)

La computación en la nube permite el         El IoT está creando una red de dispositivos
acceso a recursos y datos desde cualquier    conectados, abriendo nuevas
lugar, mejorando la escalabilidad y el         posibilidades para las aplicaciones
rendimiento de las aplicaciones.              móviles.
```

</details>


<a id="t1-e"></a>

### Docente — 1.E. Actividades propuestas

<a id="t1-e-1"></a>

<a id="t1-e-1-mod-book-chapter"></a>

#### Docente — 1. ActividadUT01-1

Durante el curso nos enfocaremos hacia el desarrollo de aplicaciones, por supuesto basándonos en el sistema operativo Android, pero sin tratar la arquitectura. Es interesante que entiendas la [Arquitectura de la plataforma. ](<https://developer.android.com/guide/platform?hl=es-419>)La tarea propuesta es leer la información de este enlace.
