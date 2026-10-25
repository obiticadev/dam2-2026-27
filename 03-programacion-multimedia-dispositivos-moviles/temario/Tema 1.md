# Tema 1 — Análisis de tecnologías para aplicaciones móviles

[Tema 2](<Tema%202.md>)

> **Edición de estudio, no resumen.** Conserva el contenido docente cotejado con el aula, el código y las figuras. Se han mejorado la estructura, el orden y los enlaces, sin actualizar silenciosamente afirmaciones o ejemplos antiguos. Los avisos editoriales se identifican como tales.

> **Rótulos de organización del aula original:** Contenidos · Evaluación. Son separadores del aula; no incluyen por sí mismos instrucciones adicionales de examen.

## Índice

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

## Información, resultados de aprendizaje y criterios

<a id="t1-informacion-contenido"></a>

### **Resultados de aprendizaje y criterios de evaluación.**

1\. Aplica tecnologías de desarrollo para dispositivos móviles evaluando sus características y capacidades.

Criterios de evaluación:  
a) Se han analizado las limitaciones que plantea la ejecución de aplicaciones en los dispositivos móviles.  
b) Se han identificado las tecnologías de desarrollo de aplicaciones para dispositivos móviles.



<a id="t1-a"></a>

## 1.A. Primeros conceptos

<a id="t1-a-1"></a>

<a id="t1-a-1-mod-book-chapter"></a>

### 1. Introducción.

El uso generalizado en los últimos tiempos de dispositivos móviles como smartphones, tablets, etc... ha dado lugar a una gran demanda de software para este nuevo tipo de hardware.

![1. Introducción. — figura 1](<Recursos/Imagenes/t1-a-1-figura-01-54830b746c95.png>)

En los próximos apartados, cubriremos de forma general los aspectos más importantes de estas nuevas tecnologías que cada vez están más presentes en el día a día de millones de usuarios, que muchas veces se incorporan a la era digital apoyándose en estos dispositivos sin tan siquiera tener conocimientos previos de informática a nivel de usuario, o prácticamente sin haber utilizado apenas un ordenador. La inmediatez, hiperconectividad y movilidad son aspectos claves para que ya, en la actualidad, la tecnología smartphone y de dispositivo móvil tenga más usuarios en el mundo que las propias tecnologías de PC.


<a id="t1-a-1-1"></a>

<a id="t1-a-1-1-mod-book-chapter"></a>

#### 1.1. Introducción. ¿Qué es un dispositivo móvil?

La primera pregunta que podemos hacernos es ¿qué entendemos por "**móvil**"? Si se nos ocurre investigar sobre ese término, a través de algún buscador de Internet, podremos observar que no hay una respuesta única y que en algunas ocasiones las diferencias pueden ser sustanciales en función de qué es lo que consideremos "móvil". Obviamente esto da lugar a su vez a muchas otras preguntas como por ejemplo: Es móvil… ¿alguna parte del dispositivo? ¿El dispositivo completo? ¿La aplicación que usamos en el dispositivo? ¿Una aplicación cliente? ¿Una aplicación servidor? ¿El usuario del dispositivo? ¿Es "móvil" sinónimo de "portátil"? ¿Es "móvil" sinónimo de "limitado"? ¿Hasta qué punto "móvil" es sinónimo de "autónomo"? ¿Existen diversos grados de "movilidad"? ¿Se pueden clasificar los dispositivos móviles en distintos tipos? ¿Bajo qué criterios? Y así sucesivamente podríamos plantearnos más y más preguntas…

Para evitar este tipo de controversias, en nuestro caso vamos a intentar dar una definición con la que trabajaremos a lo largo del desarrollo del módulo:

¿**Qué es un dispositivo móvil**? Se trata de un aparato de pequeño tamaño (normalmente que quepa en un bolsillo) y de poco peso, con pantalla y teclado, con pequeñas capacidades de procesamiento, memoria limitada y conexión (permanente o no) a una red. Este tipo de dispositivos están diseñados para cumplir algún tipo de función específica (realizar llamadas telefónicas, servir como agendas, jugar, navegación GPS, escuchar música, acceso al correo electrónico, navegar por Internet, proporcionar servicio de chat con otros dispositivos móviles, etc.) aunque normalmente pueden llevar a cabo también funciones más generales.

Estos aparatos son cada vez más populares especialmente para aquellos entornos en los que llevar consigo un ordenador convencional (incluso un portátil) no es práctico.

Por otro lado en la definición anterior, en relación a la capacidad de proceso hemos apuntado que tienen "pequeñas capacidades de proceso", lo cual es una verdad a medias, puesto que hoy en día, los dispositivos más avanzados pueden superar a equipos no móviles de gama media-baja de hace apenas 5 ó 6 años. Algo similar ocurre con la memoria, siendo ya frecuente encontrar en el mercado teléfonos móviles con 3 y 4 GB de RAM, e incluso valores más elevados.

**Para saber más**

Para obtener más información acerca de cuáles pueden ser las características de un dispositivo móvil puedes consultar el siguiente artículo en la Wikipedia sobre dispositivos móviles:

[Dispositivo Móvil en la Wikipedia.](<http://es.wikipedia.org/wiki/Dispositivo_m%C3%B3vil>)

##### **1.1.- Clasificación de los dispositivos móviles.**

¿Qué tipos de dispositivos móviles existen?

Entre los dispositivos móviles más habituales se encuentran:

- SmartPhones o "teléfonos inteligentes".
- PDA (Personal Digital Assistant - asistentes digitales personales) o PocketPC (PC de bolsillo).
- Handheld, o PCs de mano.
- Internet tables, que se encontrarían entre las PDA y los PC Ultramóviles (pequeños tablet PC).

![1.1. Introducción. ¿Qué es un dispositivo móvil? — figura 1](<Recursos/Imagenes/t1-a-1-1-figura-01-afd0cc9ddc4e.png>)![1.1. Introducción. ¿Qué es un dispositivo móvil? — figura 2](<Recursos/Imagenes/t1-a-1-1-figura-02-5a2d841b34fb.png>)

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

### 2. Limitaciones de las tecnologías móviles.

Antes de comenzar a desarrollar software para alguno de estos dispositivos, es necesario ser conscientes de las limitaciones con las que nos podemos encontrar en estos aparatos. ¿Cuáles son las restricciones a las que nos vamos a tener que enfrentar?

Algunas de estas restricciones son:

- Suministro de energía limitado (normalmente dependiente de baterías).
- Procesadores con capacidad de cómputo reducida. Suelen tener una baja frecuencia de reloj por la necesidad de ahorrar energía. En algunos casos, por ejemplo, podrían no disponer de la capacidad de cálculos en punto flotante.
- Poca memoria principal (RAM).
- Almacenamiento de datos persistente reducido (pequeña memoria flash interna, tarjetas SD, etc.).
- Conexión a algún tipo de red intermitente y con ancho de banda limitado.
- Pantallas de reducidas dimensiones.
- Teclados con funcionalidad muy básica y muy pequeños.

![2. Limitaciones de las tecnologías móviles. — figura 1](<Recursos/Imagenes/t1-a-2-figura-01-ec7687906362.png>)

Este tipo de restricciones, y algunas otras que dependerán de cada dispositivo en concreto, habrán de ser tenidas muy en cuenta a la hora del análisis y diseño de una aplicación "**móvil**", pues no podemos pretender, que esa aplicación pueda contener la misma funcionalidad, que la que podemos encontrar habitualmente en un programa que es ejecutado en un ordenador de sobremesa o un portátil.

Por otro lado, no todo va a ser restricciones. También habrá que tener en consideración que esta tecnología va a aportar una serie de **ventajas** muy importantes: movilidad, poco peso, pequeño tamaño, facilidad para el transporte, conectividad a diversos tipos de redes de comunicaciones (mensajería SMS y MMS; voz; Internet; Bluetooth; infrarrojos; radiofrecuencia, etc.). Ésas serán las ventajas que podrás explotar en tus aplicaciones.


<a id="t1-a-3"></a>

<a id="t1-a-3-mod-book-chapter"></a>

### 3. Tecnologías disponibles.

Programar para un dispositivo móvil no va a ser exactamente lo mismo que programar para un ordenador convencional, debido a las limitaciones y características especiales que aquellos aparatos pueden presentar. Hay que conocer qué tipos de tecnologías se pueden encontrar en este ámbito, tanto a nivel de hardware (dispositivos sobre los que se realizarán las aplicaciones) como a nivel de software (sistemas operativos que funcionan sobre esos dispositivos, plataformas de desarrollo disponibles, entornos, APIs, lenguajes de programación, etc.).

Cuando vas a desarrollar una aplicación para un dispositivo móvil, algunas de las primeras preguntas que te puedes hacer son:

- ¿Sobre qué tipos de dispositivos móviles se pueden hacer programas? ¿Sobre qué tipo de hardware se puede programar?
- ¿Qué sistema operativo puede llevar ese hardware?
- ¿Qué plataformas de desarrollo existen para desarrollar sobre ese hardware y ese sistema operativo? ¿con qué lenguajes puedo programar? ¿qué herramientas (compiladores, bibliotecas, entornos, etc.) hay disponibles?

Las respuestas a este tipo de preguntas pueden ser múltiples y muy variadas:

- Respecto al hardware, te puedes encontrar, como has visto ya, principalment con teléfonos móviles (smartPhones) y tablets (las PDA están actualmente completamente en desuso). Entre los principales fabricantes de teléfonos móviles se encuentran **Samsung**, **Apple, Huawei, HTC**, **LG**, **Motorola**, **Sony Ericsson**, **Nokia**, **Alcatel-Lucent**, **Xiaomi**, etc. Además en los últimos años fabricantes chinos como **Oppo** y **Vivo** han conseguido hacerse un hueco importante en el mercado, desbancando a muchos de los fabricantes anteriormente mencionados.

![3. Tecnologías disponibles. — figura 1](<Recursos/Imagenes/t1-a-3-figura-01-bf1ed46d8013.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.

  

- En cuanto a los sistemas operativos, dependiendo del hardware habrá sistemas diseñados para unos u otros dispositivos. Los hay basados en **Microsoft Windows**, en **Linux**, y en **MAC OS X**, así como otros totalmente originales y desarrollados específicamente para estos nuevos tipos de dispositivos. Entre los más populares se encuentran , **Android**, **iOS**, **Symbian OS**, **Blackberry OS** y **Windows Phone**.
- Si lo que deseas es conocer algo acerca de las plataformas de desarrollo disponibles para cada entorno (hardware y/o sistema operativo), podemos hablar de **Java ME**, **Windows Mobile SDK**, **Maemo SDK**, o bien de IDEs como **Microsoft Visual Studio**, **CodeWarrior**, **Eclipse**, **Netbeans** y últimamente, con mucha presencia entre programadores profesionales, **Android Studio**.
- Si te refieres a lenguajes de programación, normalmente te encontrarás con lenguajes que son ya viejos conocidos para otras plataformas, como pueden ser las aplicaciones de escritorio para los PCs o las aplicaciones web (**Java**, **C#**, **C**, **Kotlin**, etc.).

En definitiva puedes observar que en este nuevo mundo del desarrollo para dispositivos móviles te encuentras con una problemática similar a la que te puedes enfrentar con los ordenadores convencionales: distintos tipos de hardware, distintas opciones de sistemas operativos dependiendo del hardware que los soporte, diferentes lenguajes de programación, plataformas, API y bibliotecas, entornos de desarrollo, etc.

**Para saber más**

A través del siguiente enlace puedes aprender más sobre las PDAs:

[https://www.muycomputer.com/2014/07/06/un-trocito-de-historia-evolucion-y-muerte-de-las-pda/](<https://www.muycomputer.com/2014/07/06/un-trocito-de-historia-evolucion-y-muerte-de-las-pda/>)

![3. Tecnologías disponibles. — figura 2](<Recursos/Imagenes/t1-a-3-figura-02-29a3a71b1bf2.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.


<a id="t1-a-3-1"></a>

<a id="t1-a-3-1-mod-book-chapter"></a>

#### 3.1. Hardware.

Como has visto en los apartados anteriores, dependiendo de los criterios que se utilicen para clasificar los dispositivos móviles se puede hablar de más o menos tipos. Este curso se va a centrar sobre todo en **smartPhones** y **tablets**.

##### **3.1.1.- Smartphones.**

Se puede definir un **smartPhone** o "teléfono inteligente" como un terminal de telefonía móvil que proporciona unas prestaciones y una funcionalidad mayor que la que podría ofrecer un teléfono móvil normal. Hoy día una buena parte de los teléfonos móviles que se pueden adquirir en el mercado son de este tipo.

Este tipo de terminales se caracteriza por tener instalado un sistema operativo y por tanto la posibilidad de ejecutar aplicaciones desarrolladas bien por el propio fabricante del terminal, bien por el operador de telefonía móvil, o bien por un tercero (empresa de desarrollo de software).

![3.1. Hardware. — figura 1](<Recursos/Imagenes/t1-a-3-1-figura-01-db2663fc0d71.jpg>)

Algunas otras características que suelen tener este tipo de dispositivos son:

- Funcionamiento en multitarea (ejecución concurrente de varios procesos en el sistema operativo).
- Acceso a Internet.
- Conectividad Wi-Fi, Bluetooth, etc.
- Posibilidad de conexión con un ordenador para cargar y descargar información. Normalmente con conexión USB o bien una conexión inalámbrica.
- Posibilidad de ampliación de memoria mediante tarjetas externas de memoria (por ejemplo SD).
- Pequeñas pantallas pero de alta resolución y/o con millones de [colores](<https://www.materialpalette.com/>).
- Posibilidad de pantallas táctiles o incluso multitáctiles (multitouch).
- [Sensores](<Recursos/PDF/sensores-ff01c9a9e907.pdf>) (de orientación, de temperatura, de presión, acelerómetros, magnetómetros, etc.).
- Cámaras digitales integradas. Capacidades fotográficas. Grabación de audio y vídeo.
- Receptor GPS.
- Receptor de radio FM.
- Emisor de radio FM.
- Posibilidad de instalar y ejecutar aplicaciones sofisticadas:

- Aplicaciones de asistente personal (gestión de contactos, calendarios, citas, agendas, alarmas, etc.).
- Gestión del correo electrónico.
- Gestión del sistema archivos del dispositivo.
- Microaplicaciones de ofimática (procesador de textos, hoja de cálculo, etc.).
- Aplicaciones [multimedia](<Recursos/PDF/multimedia-dad452485447.pdf>) (reproducción de audio y vídeo en diversos formatos).
- Aplicaciones de cartografía y navegación.
- Diccionarios.
- Pequeñas aplicaciones científicas (matemáticas, física, medicina, etc.).
- Juegos.
- Aplicaciones de mensajería instantánea. Chats.

![3.1. Hardware. — figura 2](<Recursos/Imagenes/t1-a-3-1-figura-02-074a4e37ecc0.jpg>)



Puedes observar que aunque el dispositivo es un teléfono móvil muchas veces su uso principal no va a ser necesariamente el de un teléfono (hacer y recibir llamadas) sino que podrá estar dedicado a muchos otros usos (hacer fotos, navegar por Internet, reproducir archivos de audio, jugar, gestionar la agenda personal, consultar un mapa, usar un diccionario, escuchar la radio, ver una película, trazar una ruta para el navegador por satélite, etc.).

Dentro de muy poco tiempo es probable que se deje de emplear el término **smartPhone** o "móvil inteligente" pues todos los terminales móviles serán de este tipo y se hablará simplemente de "teléfonos móviles". De hecho en la práctica ya ocurre hoy día, pues cuando nos acercamos a algún catálogo de productos la inmensa mayoría de terminales que se nos ofrecen son de este tipo.

##### **3.1.2.- El interior de un smartphone.**

Si se te ocurriera abrir un teléfono móvil actual te encontraríamos una placa de circuito impreso con una serie de dispositivos electrónicos integrados o insertos en ella. En cierto modo podría recordar un poco a la placa base de un PC. Entre los dispositivos que podrías observar se encontrarían el procesador principal, procesadores digitales de señal (DSP), procesadores de imagen y de audio, módem, memorias caché, codecs de audio y vídeo, etc. A este conjunto de dispositivos integrados en la placa se le suele llamar chipset (lo cual te debería recordar al mundo del hardware de los PCs y a los conceptos estudiados en el módulo **Sistemas Informáticos**).

La principal arquitectura de microprocesadores utilizada para telefonía móvil es la diseñada por la empresa **ARM** ("Advanced RISC Machines", hoy día **ARM Holdings**), teniendo actualmente más del 90% de la cuota de mercado no ya sólo para teléfonos móviles, sino en general para todo tipo de pequeños dispositivos electrónicos que necesitan un microprocesador. Algunas de las familias de micros **ARM** más conocidas son las **ARM7**, **ARM9**, **ARM11** y **Cortex**. Hoy día muchas otras empresas diseñan microprocesadores basados en las patentes de la arquitectura de los procesadores **ARM** como por ejemplo DEC, **IBM**, **Texas Instrument**, **Samsung**, **Intel**, **Atmel**, **Alcatel-Lucent**, **Apple**, **Qualcomm**, **LG**, **Nintendo**, **Philips**, **Oki**, **Yamaha**, etc. Uno de los más conocidos es por ejemplo el **Intel XScale**.

![3.1. Hardware. — figura 3](<Recursos/Imagenes/t1-a-3-1-figura-03-82aa836b781b.jpg>)

Algunos ejemplos de productos que incorporan uno o varios micros ARM son: la mayoría de teléfonos móviles (**Nokia**, **Sony Ericsson**, **Samsung**, **Apple**, etc.), el **iPod** de **Apple**, las consolas **Gameboy** y **Nintendo DS**, routers, navegadores GPS, cámaras digitales, etc.

Respecto al chipset, existen diversas posibilidades de arquitectura, según sea el fabricante que las produce. Algunas de las arquitecturas más conocidas son **MSM** (de la empresa **Qualcomm**), **OMAP** (Open [Multimedia](<Recursos/PDF/multimedia-dad452485447.pdf>) Application Platform, de la empresa **Texas Instrument**), y las de la empresa **Marvell**.

Muchos teléfonos de **Nokia** utilizan la arquitectura **OMAP** de **Texas Instrument** (por ejemplo el **Nokia N810 WiMax Edition** que incorpora un chipset **OMAP 2420** con un procesador **ARM1136**), mientras que algunas BlackBerries hacen uso de la MSM de Qualcomm (por ejemplo la BlackBerry Storm, con una arquitectura MSM7600) o de arquitecturas **Marvell** (por ejemplo la **BlackBerry Bold**, con un chipset **Marvell Travor PXA930**). Algunos modelos de **Samsung** también se han decantado por **Marvell** (por ejemplo el **Samsung Omnia**, que incorpora un chipset **Marvell** a 624 Mhz).



<a id="t1-b"></a>

## 1.B. Sistemas operativos

<a id="t1-b-1"></a>

<a id="t1-b-1-mod-book-chapter"></a>

### 1. Sistemas operativos.

En la actualidad, los dispositivos móviles se han convertido en herramientas indispensables para la vida diaria, ya que concentran funciones de comunicación, trabajo, entretenimiento y gestión personal en un solo aparato. Detrás de esta versatilidad se encuentra el sistema operativo (SO), que es el software encargado de gestionar los recursos del dispositivo y ofrecer una plataforma sobre la cual se ejecutan las aplicaciones.

Los sistemas operativos móviles han evolucionado de manera acelerada en las últimas dos décadas. Mientras que en los años 2000 existía una gran diversidad de plataformas (Symbian, Windows Mobile, BlackBerry OS, Palm OS), hoy el mercado se encuentra dominado principalmente por Android y iOS, que representan casi la totalidad de los smartphones en uso. Ambos han logrado consolidarse gracias a sus ecosistemas de aplicaciones, actualizaciones constantes y compatibilidad con tecnologías emergentes como la inteligencia artificial, el 5G y el Internet de las cosas (IoT).

Además de estos líderes, existen otros sistemas con nichos específicos o en desarrollo, como HarmonyOS de Huawei, KaiOS para dispositivos de gama básica, e iniciativas basadas en Linux como Ubuntu Touch. Aunque su cuota de mercado es menor, aportan alternativas y experimentación en el sector.

![1. Sistemas operativos. — figura 1](<Recursos/Imagenes/t1-b-1-figura-01-0089ae9ac159.png>)


<a id="t1-b-1-1"></a>

<a id="t1-b-1-1-mod-book-chapter"></a>

#### 1.1. Android.

**Android** fue inicialmente desarrollado por **Android Inc**., hoy día parte de la compañía **Google**. Está basado en una versión modificada del kernel de **Linux**.

El primer fabricante que incorporó **Android** en sus dispositivos fue **HTC** con su terminal **HTC Dream** (comercializado también como T-Mobile G1 y popularmente conocido con los nombres de **Google Phone** o **GPhone**) en 2008.

![1.1. Android. — figura 1](<Recursos/Imagenes/t1-b-1-1-figura-01-a356ce5b00b8.png>)

Es uno de los más "jóvenes" dentro del grupo de sistemas operativos para dispositivos móviles y se ha hecho un notable hueco alcanzando más de las dos terceras partes de la cuota de mercado actual. Existen miles de aplicaciones que funcionan sobre **Android**, con un crecimiento cada vez mayor.

Hoy día podemos encontrar multitud de fabricantes que incorporan **Android** en sus terminales: **Sony Ericsson** (p.e., series **Xperia**), **HTC** (p.e., Series **A**), **Acer** (p.e. series **beTouch**), **Motorola** (p.e.,**Droid X**), **Samsung** (p.e.,series **Galaxy** y **Nexus**), **Huawei**, **LG**,**Vivo**, **Oppo**, **Garmin** (**GarminPhone**), **Dell**, **Alcatel**, etc.

A septiembre de 2025, la última versión, de **Android** es 16 . Android comenzó con un simpático criterio de asignación de nombres para las diferentes versiones que se corresponden con postres y que además según avanzan la versión avanza alfabéticamente la letra del postre.

![1.1. Android. — figura 2](<Recursos/Imagenes/t1-b-1-1-figura-02-b519f76004c9.png>)

Para desarrollar aplicaciones sobre **Android** se necesita el kit de desarrollo de software para **Android** (**Android SDK**), proporcionado gratuitamente por **Google**. Este paquete incluye todo lo necesario para construir aplicaciones sobre el entorno **Android** (depurador, bibliotecas, emulador, documentación, etc.). El lenguaje de programación que se utiliza es **Java** en la actualidad **Kotlin**  (y por tanto es necesario el **JDK** para poder compilar programas Java).

El IDE oficial fue, durante los primeros años, **Eclipse** (a partir de la versión 3.2) junto con el plugin **ADT** (**Android Development Tools** - herramientas de desarrollo para Android). Sin embargo, las desavenencias entre Oracle (propietaria de Java) y Google (propietaria de Android) en los últimos años han provocado que Android abandonara la recomendación de uso de la versión ME de Eclipse para dispositivos móviles y haya desarrollado su propio IDE partiendo del IDE [IntelliJ IDEA de la compañía JetBrains](<https://es.wikipedia.org/wiki/IntelliJ_IDEA>), convirtiéndose, a partir de finales del año 2013, en el nuevo IDE oficial para el desarrollo de aplicaciones para Android.

**Para saber más**

Para saber más sobre Android se pueden consultar los artículos de la Wikipedia sobre este sistema operativo, así como los documentos a los que hace referencia:

[Android en la Wikipedia.](<http://es.wikipedia.org/wiki/Android>)

[developer.android.com](<https://developer.android.com/about/versions?hl=es-419>)


<a id="t1-b-1-2"></a>

<a id="t1-b-1-2-mod-book-chapter"></a>

#### 1.2. iOS.

Se trata del sistema operativo desarrollado por **Apple** originalmente para su **iPhone**, aunque hoy día también es utilizado por otros dispositivos de la empresa.

**Apple** sólo permite que este sistema operativo funcione sobre hardware **Apple**. Es un sistema operativo derivado del **Mac OS X**, también de **Apple**.

En mayo de 2016 la tienda de aplicaciones de **Apple** (servicio de descarga de aplicaciones), llamada **App Store**, disponía ya de más de 2000000 de aplicaciones para dispositivos con **iOS**. En septiembre de 2017, la cuota de mercado de **iOS** en los dispositivos móviles que se venden a nivel mundial se aproxima al 20%.

![1.2. iOS. — figura 1](<Recursos/Imagenes/t1-b-1-2-figura-01-03bb12d569d2.jpg>)

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

#### 1.3. Otros sistemas Operativos

##### **HarmonyOS (Huawei)**

**Desarrollador**: Huawei.  
Cuota de mercado: Creciente, especialmente en China.

![1.3. Otros sistemas Operativos — figura 1](<Recursos/Imagenes/t1-b-1-3-figura-01-c8300ab15c50.png>)Características:   
Enfoque en la conectividad entre dispositivos (IoT, televisores, relojes, coches).  
Diseñado para funcionar en múltiples tipos de dispositivos.  
Alternativa tras las restricciones de Google en China.

Debemos destacar las siguientes desventajas:

Limitado fuera de Asia.  
Ecosistema de aplicaciones más reducido.

Huawei ha consolidado HarmonyOS como su sistema operativo oficial tras las restricciones de Google. En China ya es muy usado, y desde 2024–2025 están lanzando gamas completas (Mate, Pura, Pocket, plegables) con HarmonyOS NEXT, que deja atrás incluso las bases de Android.  
Es el único sistema alternativo a Android e iOS con una presencia real y sostenida en el mercado actual.

##### KaiOS

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

##### Otros (Ubuntu Touch, LineageOS, etc.)

Ventajas:

Alternativas libres y basadas en Linux.  
Mayor control de privacidad y personalización.  
Desventajas:

Escasa cuota de mercado.  
Poca compatibilidad con aplicaciones populares.

Destacar que ya no se encuentran dispositivos en el mercado comercial, solo como opción alternativa instalada por comunidades o marcas muy pequeñas.



<a id="t1-c"></a>

## 1.C. Plataformas de desarrollo y lenguajes de programación

<a id="t1-c-1"></a>

<a id="t1-c-1-mod-book-chapter"></a>

### 1. Plataformas de desarrollo y lenguajes de programación.

Para poder desarrollar aplicaciones para alguno de los anteriores sistemas operativos es necesario, disponer de alguna plataforma de desarrollo que permita generar código ejecutable sobre esos sistemas, o bien sobre alguna máquina virtual, o algún intérprete que esté instalado en el dispositivo y que sea soportado por el sistema operativo.

Dependiendo de la versatilidad de la plataforma de desarrollo, la aplicación podrá ser, más o menos portable a otros sistemas operativos y/o dispositivos. Por ejemplo, si realizamos programas en **Objective-C** utilizando el **SDK de Apple**, lo más probable es que nuestra aplicación pueda ser únicamente ejecutada en un dispositivo **Apple** (iPhone por ejemplo) sobre el que esté implantado **iOS**. Si, por el contrario, desarrollamos un programa en **Java** usando el **Java ME** de **Oracle**, y generamos una aplicación tipo **midlet**, ésta podrá ser ejecutada en cualquier dispositivo que disponga de una pequeña máquina virtual de **Java** (**KVM**). Se trata nuevamente de la misma problemática que podemos encontrar en el mundo de los ordenadores convencionales.

Entre las plataformas de desarrollo para móviles más populares se encuentran normalmente las que los propios autores de los sistemas operativos ofrecen para trabajar sobre su plataforma. De hecho ya hemos hablado algo sobre algunas de ellas al describir los sistemas operativos. Hacemos un repaso rápido de las más conocidas:

- **Android**. **Google** proporciona también de manera gratuita el **Android SDK** para programar aplicaciones en **Java** sobre su sistema operativo. El IDE más utilizado es **Eclipse** con el plugin **ADT** (**Android Development Tools**) y últimamente **Android Studio**. También es posible programar en otros lenguajes como **C** o **C++** gracias al uso del **Android NDK** (**Native Development Kit**) que permite generar código nativo (native code), frente al código gestionado (managed code), que se ejecuta sobre una máquina virtual, como es el caso de **Java** o **C#**. Por otro lado, no se debe perder de vista el deliberado impulso que está haciendo Google para que Android sea programado en lenguaje **Kotlin**.

Para más info sobre **Kotlin** ver estos enlaces:

- [https://www.xatakandroid.com/programacion-android/kotlin-ya-es-un-lenguaje-oficial-en-android-que-implicaciones-tiene-y-por-que-es-tan-importante](<https://www.xatakandroid.com/programacion-android/kotlin-ya-es-un-lenguaje-oficial-en-android-que-implicaciones-tiene-y-por-que-es-tan-importante>)

- [https://apiumhub.com/es/tech-blog-barcelona/por-que-kotlin/](<https://apiumhub.com/es/tech-blog-barcelona/por-que-kotlin/>)

- [https://www.paradigmadigital.com/dev/kotlin-otra-moda-mas-spoiler-no/](<https://www.paradigmadigital.com/dev/kotlin-otra-moda-mas-spoiler-no/>)



- **iOS**. El SDK también se puede descargar gratis, pero para poder comercializar el software a través de su tienda de aplicaciones hay que registrarse en el programa de desarrollo del **iPhone**, lo cual **no es gratuito**. El lenguaje de programación en este caso es **Objective-C**.

![1. Plataformas de desarrollo y lenguajes de programación. — figura 1](<Recursos/Imagenes/t1-c-1-figura-01-ad30348dd6ce.jpg>)

  

- **Java ME**: Este caso sería una excepción respecto a los demás, pues no se trata de una serie de herramientas (bibliotecas, compiladores, IDEs, etc.) asociadas a un sistema operativo, sino de un subconjunto de la plataforma Java orientada para el desarrollo sobre dispositivos móviles. Se programaría en lenguaje **Java** y sería necesario que hubiera instalada una máquina virtual en el sistema operativo del dispositivo sobre el que se deseara ejecutar la aplicación desarrollada como sucede por ejemplo en Symbian (que se puede programar en modo nativo o bien con **Java ME**).

![1. Plataformas de desarrollo y lenguajes de programación. — figura 2](<Recursos/Imagenes/t1-c-1-figura-02-6bec04936147.png>)

Imágenes extraídas de curso PMDM (distancia) del MECD.

- **Windows Phone**. Para desarrollar aplicaciones sobre **Windows Phone** pueden utilizarse las tecnologías **Silverlight**, **XNA** y **.NET Compact Framework** de **Microsoft**. Las herramientas **Visual Studio 2010 Express** y **Expression Blend** para **Windows Phone** son ofrecidas gratuitamente por **Microsoft**. El lenguaje más habitual para el desarrollo ha sido **C#**, aunque la idea es que se pueda utilizar también otros lenguajes de la plataforma **.NET** como **Visual Basic** **.NET**.


<a id="t1-c-2"></a>

<a id="t1-c-2-mod-book-chapter"></a>

### 2. Elección de una alternativa.

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

![2. Elección de una alternativa. — figura 1](<Recursos/Imagenes/t1-c-2-figura-01-bc77cd86a001.png>)![2. Elección de una alternativa. — figura 2](<Recursos/Imagenes/t1-c-2-figura-02-2b70171c5966.png>)![2. Elección de una alternativa. — figura 3](<Recursos/Imagenes/t1-c-2-figura-03-d5ce0cbfc0c1.png>)



Como suele suceder en el mundo real, normalmente no podrás elegir una opción u otra en función de tus preferencias personales, sino más bien dependiendo cuáles sean las necesidades de tu cliente. Ésa es una buena razón para intentar estar siempre al día.


<a id="t1-c-3"></a>

<a id="t1-c-3-mod-book-chapter"></a>

### 3. La plataforma Android.

Los componentes principales del sistema operativo de Android:  
  
  

- **Aplicaciones**: las aplicaciones base incluyen un cliente de correo electrónico, programa de SMS, calendario, mapas, navegador, contactos y otros. Todas las aplicaciones están escritas en lenguaje de programación Java.

![3. La plataforma Android. — figura 1](<Recursos/Imagenes/t1-c-3-figura-01-f76c2e91240d.png>)

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

### 4. El entorno de ejecución.

**NOTA IMPORTANTE**: A partir de ahora haremos muchas referencias durante todo el curso a la documentación oficial proporcionada por Google sobre el desarrollo de Android (**developer.android.com**). De hecho se puede decir que es la principal guía para elaborar los contenidos relativos a Android de este curso.

  

Si consultamos la página oficial de desarrollo de Android **(developer.android.com**) podemos observar la siguiente estructura de capas o niveles:

![4. El entorno de ejecución. — figura 1](<Recursos/Imagenes/t1-c-4-figura-01-878b4c9070c3.png>)

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

### 5. Máquinas Virtuales.

Una máquina virtual es una aplicación software que emula el comportamiento de otra máquina (por ejemplo la emulación de un ordenador "virtual" dentro de un ordenador "real").

![5. Máquinas Virtuales. — figura 1](<Recursos/Imagenes/t1-c-5-figura-01-06ada0703408.png>)

En el caso de una máquina virtual de **Java** (**JVM** – Java Virtual Machine), si recordamos lo visto en el módulo de **Programación**, se trata de un programa encargado de interpretar código intermedio (bytecode en el caso de **Java**) de los programas precompilados (en lenguaje **Java**) a código máquina ejecutable por el hardware (instrucciones máquina), realizar las llamadas al sistema operativo necesarias, velar por la seguridad e integridad del código ejecutado, etc.

De esta manera, la **JVM** proporciona al programa compilado en **Java** independencia de la plataforma hardware y del sistema operativo que corra sobre él.

Las **JVM** clásicas para la plataforma **Java SE** son demasiado pesadas (necesidades de memoria, requerimientos de cómputo, pantalla, etc.) para dispositivos pequeños. Imagina por ejemplo la limitada pantalla de un teléfono móvil. Es fácil suponer que ese tipo de pantallas serían incapaces de soportar toda la funcionalidad proporcionada por la AWT, que es la principal interfaz gráfica de usuario que tiene **Java**. Es por esta razón que la plataforma **Java ME** ha propuesto otras máquinas virtuales bastante más ligeras.

Por otro lado, una única plataforma de Java podría no encajar adecuadamente con todos los modelos de dispositivos posibles. Es por ello por lo que **Java ME** introdujo los conceptos de configuración y de perfil.

Las dos máquinas virtuales disponibles en **Java ME** son la **KVM** (**K Virtual Machine**, se le ha dado ese nombre porque sólo ocuparía unos pocos Kilobytes de memoria) y la **CVM** (**Compact Virtual Machine**), algo más pesada.

De manera similar, para **Android**, [**Dalvik**](<https://es.wikipedia.org/wiki/Dalvik>), que es la [máquina virtual](<https://es.wikipedia.org/wiki/M%C3%A1quina_virtual>) utilizada originalmente por Android, y lleva a cabo la transformación de la aplicación en instrucciones de máquina, que luego son ejecutadas por el [entorno de ejecución](<https://es.wikipedia.org/wiki/Entorno_de_ejecuci%C3%B3n>) nativo del dispositivo. En versiones más modernas de **Android**, **ART** ha reemplazado a **Dalvik**.



<a id="t1-d"></a>

## 1.D. Tecnologías para aplicaciones en dispositivos móviles

[PDF original conservado](<Recursos/PDF/tecnologias-para-aplicaciones-en-dispositivos-moviles-e3ba8d9d6929.pdf>). Las 12 diapositivas se reproducen a continuación, con transcripción y su representación visual.

Herramienta de presentación enlazada en el PDF original: [Gamma](<https://gamma.app/>).

<a id="t1-d-p01"></a>

### Diapositiva 01. Tecnologías para aplicaciones en dispositivos móviles

![Diapositiva 1: Tecnologías para aplicaciones en dispositivos móviles](<Recursos/Imagenes/tema-1-d-pagina-01-26a00e5f9c8c.png>)

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

### Diapositiva 02. Introducción a los dispositivos móviles

![Diapositiva 2: Introducción a los dispositivos móviles](<Recursos/Imagenes/tema-1-d-pagina-02-84cc0256dc89.png>)

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

### Diapositiva 03. SO móviles

![Diapositiva 3: SO móviles](<Recursos/Imagenes/tema-1-d-pagina-03-7ad77844a4c0.png>)

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

### Diapositiva 04. Apps nativas, híbridas y web

![Diapositiva 4: Apps nativas, híbridas y web](<Recursos/Imagenes/tema-1-d-pagina-04-5853366617ef.png>)

| Grupo mostrado en la imagen | Texto y marcas representadas |
| --- | --- |
| Apps Nativas | android y logotipo de Apple |
| Apps Híbridas | React Native y Flutter |
| Apps Web | HTML 5, JS y PHP |

> Esta es la agrupación de la diapositiva; no se ha sustituido por una clasificación técnica diferente.

<a id="t1-d-p05"></a>

### Diapositiva 05. Comparativa rápida

![Diapositiva 5: Comparativa rápida](<Recursos/Imagenes/tema-1-d-pagina-05-e3d0208740f3.png>)

**Comparativa Rápida:**

| Tipo de Aplicación | Lenguajes comunes | Rendimiento | Acceso a hardware | Costo de desarrollo | Mantenimiento |
| --- | --- | --- | --- | --- | --- |
| Nativa | Kotlin, Swift, Java, Objective-C | Alto | Completo | Alto | Alto |
| Web | HTML5, CSS, JavaScript | Medio | Limitado | Bajo | Bajo |
| Híbrida | HTML, CSS, JavaScript (con frameworks) | Medio | Moderado | Medio | Medio |

<a id="t1-d-p06"></a>

### Diapositiva 06. Desarrollo de aplicaciones nativas

![Diapositiva 6: Desarrollo de aplicaciones nativas](<Recursos/Imagenes/tema-1-d-pagina-06-5be2380df9e2.png>)

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

### Diapositiva 07. Aplicaciones web progresivas (PWA)

![Diapositiva 7: Aplicaciones web progresivas (PWA)](<Recursos/Imagenes/tema-1-d-pagina-07-27e9222d931a.png>)

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

### Diapositiva 08. Desarrollo de aplicaciones híbridas

![Diapositiva 8: Desarrollo de aplicaciones híbridas](<Recursos/Imagenes/tema-1-d-pagina-08-d89141c3c744.png>)

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

### Diapositiva 09. Apps multiplataforma frente a apps nativas

![Diapositiva 9: Apps multiplataforma frente a apps nativas](<Recursos/Imagenes/tema-1-d-pagina-09-b35e88a83d14.png>)

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

### Diapositiva 10. Tecnologías de interfaz de usuario

![Diapositiva 10: Tecnologías de interfaz de usuario](<Recursos/Imagenes/tema-1-d-pagina-10-99b002cb7329.png>)

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

### Diapositiva 11. Optimización de rendimiento y consumo de batería

![Diapositiva 11: Optimización de rendimiento y consumo de batería](<Recursos/Imagenes/tema-1-d-pagina-11-f0a8c4e0c47e.png>)

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

### Diapositiva 12. Tendencias y futuro de las aplicaciones móviles

![Diapositiva 12: Tendencias y futuro de las aplicaciones móviles](<Recursos/Imagenes/tema-1-d-pagina-12-5f9e9d3b603f.png>)

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

## 1.E. Actividades propuestas

<a id="t1-e-1"></a>

<a id="t1-e-1-mod-book-chapter"></a>

### 1. ActividadUT01-1

Durante el curso nos enfocaremos hacia el desarrollo de aplicaciones, por supuesto basándonos en el sistema operativo Android, pero sin tratar la arquitectura. Es interesante que entiendas la [Arquitectura de la plataforma. ](<https://developer.android.com/guide/platform?hl=es-419>)La tarea propuesta es leer la información de este enlace.
