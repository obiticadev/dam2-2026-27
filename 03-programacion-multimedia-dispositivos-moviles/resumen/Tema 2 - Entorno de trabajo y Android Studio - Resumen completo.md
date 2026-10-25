# Tema 2 — Entorno de trabajo y desarrollo con Android Studio — Resumen completo para NotebookLM

## S00. Alcance, procedencia y modo de lectura

**Asignatura:** Programación Multimedia y Dispositivos Móviles (PMDM), segundo de DAM. **Primer examen:** Tema 1 y Tema 2 completos, según indicó el estudiante; fecha prevista el **viernes 30 de octubre de 2026**, sin hora comunicada. **Alcance de este documento:** Tema 2 completo, apartados 2.A–2.D. **Formato de examen:** no comunicado. Como formato de entrenamiento se usa el test de **cuatro opciones y una sola respuesta correcta**, elegido por el estudiante para practicar; no es información del profesor. No se conocen preguntas oficiales ni ponderación.

**Fuente docente principal:** `../temario/Tema 2.md`. Este documento desarrolla su contenido, añade aclaraciones, trazas y práctica, y conserva al final el texto docente como **anexo documental**. El anexo es respaldo, no una segunda versión que deba narrarse otra vez. Las figuras siguen enlazadas al temario; los diagramas del ciclo de vida se describen en texto en S14 y S15.

**Convenciones:** «Temario» identifica lo enseñado; «Aclaración técnica» precisa simplificaciones, datos caducados o errores; «Práctica añadida» no es una pregunta oficial. Fecha de referencia de las aclaraciones: **octubre de 2026**. El código del temario usa la biblioteca antigua `android.support` y capturas de Android Studio de 2016–2017: se estudia tal como aparece, pero se indica su equivalente actual.

**Prioridad para NotebookLM:** estudiar S01–S16; usar S17 para trampas, S18 como comprobación y el anexo solo para consultar formulaciones y código originales. El bloque más denso para un test es el del ciclo de vida (S13–S15).

### Resultado de aprendizaje y criterios del tema

| Elemento | Texto docente | Bloques que lo trabajan |
|---|---|---|
| RA1 | Aplica tecnologías de desarrollo para dispositivos móviles evaluando sus características y capacidades | Todo el tema |
| Criterio c | Instalar, configurar y utilizar entornos de trabajo para desarrollo móvil | S01–S04, S08–S10 |
| Criterio d | Identificar configuraciones que clasifican los dispositivos móviles según sus características | S03 (factores de forma, nivel de API); configuraciones Java ME en el Tema 1 (M12.2) |
| Criterio e | Describir perfiles que relacionan dispositivo y aplicación | Perfiles Java ME (M12.2); en Android, `minSdk` y factores de forma (S03) |
| Criterio f | Analizar la estructura de aplicaciones existentes identificando las clases utilizadas | S04–S07 |
| Criterio g | Realizar modificaciones sobre aplicaciones existentes | S03.4, S06–S07 (plantilla Empty Activity como esqueleto) |
| Criterio h | Utilizar emuladores para comprobar el funcionamiento | S09 |

### Recorrido de aprendizaje

1. S01–S02: qué hay que instalar y requisitos.
2. S03–S04: asistente de proyecto, factores de forma, nivel de API, plantillas y estructura.
3. S05–S07: Activity, Java y XML; `MainActivity` y `activity_main.xml` línea a línea.
4. S08–S10: compilar, ejecutar, depurar, emulador y dispositivo real.
5. S11–S15: administrador de aplicaciones, fases, estados, *callbacks* y conservación del estado.
6. S16–S18: comprobaciones, trampas y preguntas.

## S01. Qué se necesita para desarrollar con Android

- **Mínimo para compilar:** el **SDK de Android**, que puede descargarse por separado. A partir de él se instalan el resto de herramientas: emuladores, entorno de desarrollo, depurador, etc.
- Cualquier plataforma (Java ME, iOS, Windows Phone…) necesita sus propias herramientas: compiladores, editores, depuradores, emuladores.
- Dos opciones en Android: instalar el **SDK junto con otros elementos** o usar un **entorno que traiga todo integrado**. El curso usa **Android Studio**; su página oficial permitía descargar el IDE **con el SDK o sin él**.

| Pieza | Función | No confundir con |
|---|---|---|
| SDK | Bibliotecas y herramientas para construir apps de una plataforma | IDE |
| IDE (Android Studio) | Entorno que integra editor, diseño, compilación, ejecución y depuración | El SDK que usa |
| Emulador / AVD | Dispositivo virtual donde se prueba | El runtime ART del Tema 1 |
| Gradle | Sistema de construcción que usa Android Studio | El compilador de Java por sí solo |

**Aclaración técnica:** actualmente el instalador de Android Studio descarga el SDK en el primer arranque, mediante su asistente y el **SDK Manager**. Instalar el IDE no garantiza tener cualquier plataforma o paquete del SDK que un proyecto necesite.

## S02. Instalación de Android Studio y requisitos

El temario remite a la página oficial de instalación, que incluía un vídeo para cada sistema. Android Studio es **multiplataforma**: Windows, Mac y Linux.

| Requisito del temario | Windows | Mac | Linux |
|---|---|---|---|
| Sistema | Windows 7/8/10, 32 o 64 bits | OS X 10.10 (Yosemite) hasta 10.12 (Sierra) | GNOME o KDE; distribución de 64 bits capaz de ejecutar apps de 32 bits; glibc 2.19 o posterior; probado en Ubuntu 12.04 |
| RAM | 3 GB mínimo, 8 recomendados, + 1 GB para el emulador | Igual | Igual |
| Disco | 2 GB mínimo, 4 recomendados: 500 MB IDE + 1,5 GB SDK e imagen del emulador | Igual | Igual |
| Pantalla | 1280 × 800 mínimo | Igual | Igual |
| Emulador acelerado | 64 bits; Intel con VT-x, EM64T y Execute Disable (XD) Bit | — | Intel con VT-x, EM64T y XD Bit, **o AMD con AMD-V** |

Observaciones del profesor: conviene al menos un Intel i3 o similar; sus pruebas con i5 y 8 GB fueron satisfactorias. La carga del emulador será algo tediosa por potente que sea el equipo. A 1 de noviembre de 2017 ya estaba disponible la **versión 3.0**.

**Aclaración técnica:** estos requisitos y la versión 3.0 son **datos históricos**. Las versiones actuales solo funcionan en sistemas de 64 bits y piden bastante más memoria; desde 2020–2021 se nombran con animales en orden alfabético (Arctic Fox, Bumblebee…). Para instalar en 2026 hay que consultar los requisitos vigentes. En Linux, el emulador se acelera con **KVM**.

## S03. Crear un proyecto: módulos, factores de forma y nivel de API

### S03.1. Proyecto y módulos

Un proyecto de Android Studio contiene **uno o más módulos**, que organizan el código en **unidades de funcionalidad discretas**. Se puede crear un proyecto nuevo o importar uno existente.

Android Studio facilita apps para varios **factores de forma** (formatos de dispositivo): teléfonos, tablets, TV, Wear y Google Glass. El asistente **New Project** permite elegir los formatos y genera la estructura necesaria.

### S03.2. Los cinco pasos del asistente

| Paso | Pantalla | Qué se decide | Detalle de examen |
|---|---|---|---|
| 1 | **Configure your new project** | Nombre de la app, nombre de paquete y ubicación | Se llega con **Start a New Android Studio project** (sin proyecto abierto) o con **File > New > New Project** (con uno abierto). En la captura, *Company Domain* `mycompany.com` genera el paquete `com.mycompany.myapplication`: dominio invertido + nombre |
| 2 | **Target Android Devices** | Factores de forma y **nivel de API mínimo** de cada uno | **Cada formato seleccionado se convierte en un módulo** del proyecto. **Help me choose** muestra la distribución de versiones |
| 3 | **Add an Activity** | Tipo de actividad inicial | La lista cambia según el formato. Con **Add No Activity** se pulsa **Finish** directamente |
| 4 | **Customize the Activity** | Nombre de la actividad, del diseño (layout) y título | En el curso: `MainActivity` con layout `activity_main` |
| 5 | Desarrollar la app | Android Studio crea la estructura y abre el entorno | Con varios formatos, una carpeta de módulo por formato, cada una con sus fuentes completas |

### S03.3. Nivel de API y distribución acumulada

- Cada versión de Android tiene un **nivel de API**. En la captura del paso 2: teléfono y tablet con **API 15: Android 4.0.3 (Ice Cream Sandwich)**; Wear y TV con **API 21: Android 5.0 (Lollipop)**; Glass con *Glass Development Kit Preview* (API 19).
- Mensaje del asistente: **un nivel de API más bajo llega a más dispositivos, pero con menos funciones disponibles**. Con API 15, la app llegaría aproximadamente al 97,4 % de los dispositivos activos en Google Play (dato de la captura).
- La ventana **Android Platform Distribution** muestra para cada versión su porcentaje **acumulado**: el de dispositivos con esa versión **o superior**. Al pulsar un nivel se ven las funciones que introdujo (en la captura, Ice Cream Sandwich: proveedor de contactos y calendario, multimedia, cámara con detección de caras, Wi-Fi P2P, accesibilidad…).
- Objetivo: elegir el **nivel mínimo que tenga todas las funciones que necesita la app**, para llegar al mayor número posible de dispositivos.

| Versión en la captura | API | Acumulado |
|---|---|---|
| 2.3 Gingerbread | 10 | 97,4 % |
| 4.0 Ice Cream Sandwich | 15 | 95,2 % |
| 4.1 Jelly Bean | 16 | 87,4 % |
| 4.2 Jelly Bean | 17 | 76,9 % |
| 4.3 Jelly Bean | 18 | 73,9 % |
| 4.4 KitKat | 19 | 40,5 % |
| 5.0 Lollipop | 21 | 24,1 % |
| 5.1 Lollipop | 22 | 4,7 % |
| 6.0 Marshmallow | 23 | — |

**Cómo leer la tabla:** el porcentaje baja al subir de versión, porque cada vez se excluyen más dispositivos antiguos. Las dos capturas son de fechas distintas (97,4 % para API 15 en un sitio y 95,2 % en otro): **no memorizar las cifras**, sí la relación.

**Aclaración técnica:** el nivel mínimo se declara en Gradle como `minSdk` (antes `minSdkVersion`). Un dispositivo con un nivel de API **inferior** al mínimo no puede instalar la app; cambiar el nombre de una clase no resuelve esa incompatibilidad. Google Glass ya no se comercializa.

### S03.4. Plantillas de actividad

En la captura del paso 3 aparecen: Add No Activity, Basic Activity, **Empty Activity**, Fullscreen Activity, Google AdMob Ads Activity, Google Maps Activity, Login Activity y Master/Detail Flow.

El curso trabaja sobre **Empty Activity**: contiene **los elementos estrictamente necesarios** para ejecutar la app y sirve de esqueleto sobre el que añadir lo necesario.

Sobre la actividad principal:

- No es obligatorio, pero se mantiene el nombre **`MainActivity`** con el layout **`activity_main`** para organizar la app.
- La actividad principal **no tiene por qué ser la primera que se abre**, aunque es lo más frecuente: puede abrirse antes una **splash screen** (pantalla de presentación), habitual en apps de producción.

**Aclaración técnica:** en las versiones actuales, la plantilla «Empty Activity» genera una interfaz con **Jetpack Compose** en Kotlin; la equivalente al curso (layout XML) se llama **«Empty Views Activity»** y permite elegir Java.

## S04. El entorno de desarrollo y la estructura del proyecto

### S04.1. Zonas del IDE (figura del paso 5)

| Zona | Contenido |
|---|---|
| Superior | Menú y barra de herramientas |
| Panel izquierdo | Navegador de la estructura de ficheros del proyecto |
| Panel central | **Paleta** de elementos y emulación visual de la interfaz (editor de diseño) |
| Panel derecho | **Árbol de componentes** de la interfaz y **propiedades** de cada elemento |

### S04.2. Estructura en la vista Android

Lectura textual de las capturas del temario (proyecto con módulos `mobile` y `wear`, y proyecto HolaMundo):

```text
app                                   ← módulo (uno por factor de forma)
├── manifests
│   └── AndroidManifest.xml           ← declara componentes y actividad de arranque
├── java
│   ├── com.example.dell.holamundo
│   │   └── MainActivity              ← lógica (MainActivity.java)
│   ├── com.example.dell.holamundo (androidTest)
│   └── com.example.dell.holamundo (test)
└── res                               ← recursos sin código
    ├── drawable                      ← gráficos
    ├── layout
    │   └── activity_main.xml         ← diseño de la interfaz
    ├── mipmap                        ← iconos del lanzador
    └── values                        ← cadenas, colores, estilos
Gradle Scripts                        ← build.gradle del proyecto y de cada módulo, settings.gradle…
```

**Trampa:** `res/layout` contiene el XML de la interfaz; el código Java está bajo `java`, organizado por paquete. Las carpetas `test` y `androidTest` contienen pruebas, no otra app.

## S05. Activity: concepto, pila y doble naturaleza

### S05.1. Definición (Android Developers, citada por el temario)

Una **Activity** es un componente de la aplicación que contiene **una pantalla** con la que el usuario interactúa para una acción: marcar un número, tomar una foto, enviar un correo, ver un mapa. Cada actividad tiene **una ventana** donde dibuja su interfaz; normalmente ocupa toda la pantalla, pero puede ser más pequeña y quedar «flotando» sobre otras.

Simplificación del curso: **Activity ≈ pantalla o ventana**. Cada pantalla que se ve en una app tiene asociada una actividad.

### S05.2. Varias actividades y la pila de actividades

- Una app suele tener **varias actividades vinculadas de forma flexible**; una se especifica como **principal**, la que ve el usuario al iniciar la app.
- Cada actividad puede iniciar otra. Al iniciarse una nueva, **la anterior se detiene**, pero el sistema la **conserva en una pila** (la *back stack*).
- La nueva actividad entra en la pila y **capta el foco**.
- La pila es **LIFO** («el último en entrar es el primero en salir»): al pulsar **Atrás**, la actividad actual **se quita de la pila y se destruye**, y **se reanuda la anterior**.

Traza de la pila (práctica añadida):

```text
Abrir app            → [Main]
Main inicia Detalle  → [Main, Detalle]          Main detenida, Detalle con foco
Detalle inicia Mapa  → [Main, Detalle, Mapa]
Atrás                → [Main, Detalle]          Mapa destruida, Detalle reanudada
Atrás                → [Main]                   Detalle destruida, Main reanudada
```

### S05.3. Parte lógica y parte gráfica

| Parte | Fichero | Lenguaje | Contenido |
|---|---|---|---|
| **Lógica** | `.java` (por ejemplo `MainActivity.java`) | Java | Clase de la actividad y sus métodos; puede apoyarse en otras clases |
| **Gráfica** | `.xml` (por ejemplo `activity_main.xml`) | XML | Elementos visibles y también los **layouts**, que no se ven directamente pero **distribuyen** los elementos visibles |

También puede crearse la interfaz **programáticamente** en Java, pero suele costar bastante más esfuerzo y tiempo.

Todas las actividades quedan reflejadas en **`AndroidManifest.xml`**, que además establece **con qué actividad arranca la app**.

**Aclaración técnica:** la actividad de arranque se marca en el manifiesto con un `intent-filter` que combina la acción `android.intent.action.MAIN` y la categoría `android.intent.category.LAUNCHER`. Una actividad no declarada en el manifiesto no puede iniciarse.

## S06. `MainActivity.java` línea a línea

**Objetivo:** identificar qué hace cada línea y qué pasaría si faltara.

```java
package com.example.dell.holamundo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

| Línea | Significado |
|---|---|
| `package com.example.dell.holamundo;` | Paquete donde está la clase; coincide con el nombre de paquete del paso 1 |
| `import android.support.v7.app.AppCompatActivity;` | Clase base de la actividad, de la biblioteca de compatibilidad |
| `import android.os.Bundle;` | Tipo del parámetro de `onCreate` |
| `public class MainActivity extends AppCompatActivity` | **Herencia**: la actividad hereda todo lo necesario para comportarse como actividad |
| `@Override` | Indica que se **sobrescribe** un método de la clase padre |
| `protected void onCreate(Bundle savedInstanceState)` | Método que inicia la actividad. El `Bundle` permite inicializar o **restaurar el estado** |
| `super.onCreate(savedInstanceState);` | **Lo primero**: llamar a la implementación del padre con el mismo `Bundle` |
| `setContentView(R.layout.activity_main);` | **Enlaza la parte lógica con la gráfica**: muestra el layout `activity_main` |

Regla general del temario para cada actividad nueva: **heredar de `AppCompatActivity`** (o, de forma más general, de **`Activity`**) y **vincular un XML con `setContentView`**, usando su nombre en el registro de recursos, con el prefijo **`R.layout.`**.

### S06.1. La clase `R` y los recursos

`R` es una clase **generada automáticamente** en la compilación. Contiene un identificador entero por recurso: `R.layout.activity_main` identifica `res/layout/activity_main.xml`; `R.string.app_name`, una cadena de `res/values/strings.xml`. Se escribe el nombre del fichero **sin extensión**.

**Aclaración técnica — errores tipográficos del temario:** en la explicación aparece `SetContentView(R.Layout.acivity_main)`. Java distingue mayúsculas y minúsculas: lo correcto es **`setContentView(R.layout.activity_main)`**, como en el código. `SetContentView`, `R.Layout` o `acivity_main` **no compilarían**.

### S06.2. Equivalente actual

```java
package com.example.holamundo;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

**Aclaración técnica:** desde 2018 la Support Library (`android.support.*`) se sustituyó por **AndroidX** (`androidx.*`). La lógica es idéntica; solo cambia el paquete. Las plantillas actuales pueden añadir más líneas, como `EdgeToEdge.enable(this)`, que no cambian lo que se estudia.

**Matices de examen:**

- En la práctica, toda actividad con interfaz **sobrescribe** `onCreate` para cargar su layout. La clase `Activity` ya tiene un `onCreate`; lo que se escribe es una sobrescritura.
- Si una sobrescritura de `onCreate` no llama a `super.onCreate`, Android lanza **`SuperNotCalledException`** en ejecución, no un error de compilación.
- `savedInstanceState` es **`null`** cuando la actividad se crea por primera vez; contiene datos cuando se **recrea** tras haber guardado estado (S15).

## S07. `activity_main.xml` línea a línea

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.example.dell.holamundo.MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

| Elemento | Significado |
|---|---|
| `<?xml version="1.0" encoding="utf-8"?>` | Declaración de versión XML y codificación; normalmente se mantiene |
| `ConstraintLayout` | Elemento raíz: **tipo de layout**, que distribuye los elementos mediante **restricciones** |
| `xmlns:android`, `xmlns:app`, `xmlns:tools` | **Espacios de nombres**, identificados por URI: `android` (atributos del sistema), `app` (atributos de bibliotecas, como las restricciones), `tools` (atributos para las herramientas de diseño) |
| `android:layout_width/height="match_parent"` | El layout ocupa todo el tamaño de su contenedor |
| `tools:context` | Actividad asociada al layout, según el temario |
| `<TextView …/>` | Etiqueta de texto, similar a un `Label` de Java o un `label` de HTML |
| `wrap_content` | El `TextView` mide lo justo para su contenido |
| `android:text="Hello World!"` | Texto mostrado |
| Cuatro `app:layout_constraint…_to…Of="parent"` | Restringen los cuatro lados al padre: el texto queda **centrado** horizontal y verticalmente |

**Aclaración técnica:**

- `tools:context` **solo sirve al editor de diseño** (tema, vista previa, ayudas). Los atributos `tools:` no llegan a la app instalada. **Quien asocia en ejecución el layout a la actividad es `setContentView`** en el código Java; cambiar `tools:context` no lo sustituye.
- `match_parent` y `wrap_content` no son intercambiables: el primero ocupa el espacio del padre; el segundo, el del contenido.
- Equivalente actual del elemento raíz: `androidx.constraintlayout.widget.ConstraintLayout`. Las restricciones actuales suelen usar `Start/End` en lugar de `Left/Right` para soportar idiomas de derecha a izquierda.
- Fijar `android:text="Hello World!"` directamente en el XML funciona, pero lo recomendado es una cadena de `res/values/strings.xml` (`@string/…`), relación con el administrador de recursos del Tema 1.

## S08. Compilar, ejecutar y depurar

| Acción | Cómo | Qué ocurre |
|---|---|---|
| **Compilar** | **Build > Make Project** | Se ejecuta **Gradle**, que construye el proyecto |
| **Compilar y ejecutar** | Botón **Run** (triángulo verde) o **Run > Run 'app'** | Gradle compila, se elige un **destino de implementación** (emulador o dispositivo conectado) y se carga la app en él. Puede configurarse, por ejemplo, un destino automático |
| **Depurar** | Botón **Debug** | Ejecución en modo depuración: **puntos de interrupción**, examinar variables, evaluar expresiones en tiempo de ejecución, herramientas de depuración |

Etapas que conviene separar (práctica añadida): **construir** (¿compila y se empaqueta?), **instalar** (¿llega al destino?), **ejecutar** (¿arranca y se comporta bien?) y **depurar** (¿por qué falla?). Que un proyecto compile no garantiza que su interfaz o su comportamiento sean correctos en todos los dispositivos.

**Aclaración técnica:** el resultado instalable de Android es un **APK**. Para publicar en Google Play, desde agosto de 2021 las apps nuevas se suben como **Android App Bundle (`.aab`)**, a partir del cual Google Play genera los APK.

## S09. Emuladores

### S09.1. Papel del emulador

- Los IDE suelen incluir emuladores para **probar antes de instalar** en el dispositivo real: comprobar funcionamiento y aspecto.
- El emulador **no siempre coincide** con el dispositivo real en aspecto y, a veces, en funcionalidad: depende del tipo de dispositivo emulado.
- Es lo que más se usa: según el profesor, solo cuando la app tiene el **80–90 %** de su funcionalidad se empieza a instalar en el dispositivo físico para probar aspectos que dependen de él.
- La mayor parte de la **depuración** se hace con el emulador, como en un programa de ordenador: paso a paso, *breakpoints*, contenido de variables.
- A veces el emulador es **obligatorio**: no se dispone del dispositivo concreto.

### S09.2. AVD y otros emuladores

- El curso usa el emulador de Android: **AVD**, *Android Virtual Device*.
- Existen emuladores externos, gratuitos o de pago, a veces más rápidos; suelen apoyarse en **máquinas virtuales**. Cambiar de emulador puede variar el aspecto del dispositivo emulado.
- Si no hay un AVD, al pulsar **Run** aparece **Select Deployment Target**; se pulsa **Create New Emulator** y se sigue el asistente **Virtual Device Configuration** para definir el dispositivo.

**Aclaración técnica:** un AVD define el hardware simulado (perfil de dispositivo, pantalla, memoria) y una **imagen del sistema** con un nivel de API. Hoy se gestiona desde el **Device Manager**. Crear un AVD no modifica el código de la app.

**Trampa:** «emulador» (dispositivo virtual completo para probar) no es lo mismo que «máquina virtual de ejecución» (ART/Dalvik, que ejecuta el código dentro de cualquier dispositivo, real o emulado).

## S10. Instalación y ejecución en un dispositivo real

- El aspecto e incluso el funcionamiento pueden cambiar entre emulador y dispositivo real, y entre dispositivos. Causas: características físicas (tamaño, resolución y colores de la pantalla, botones…) y la **implementación de la máquina virtual** del dispositivo. Analogía del temario: la misma web vista con distintos ordenadores, SO y navegadores.
- Forma más sencilla de probar: **transferir el `.apk`** al dispositivo (USB, Bluetooth, tarjeta de memoria…).
- Utilidades de fabricantes para instalar desde el ordenador: Huawei HiSuite, LG PC Suite, Samsung Kies, Nokia PC Suite; y no propietarias: AirDroid, MobileGo, Mobo, 91 PC Suite.
- **Para ejecutar desde Android Studio en un dispositivo físico hay que habilitar la depuración USB** en el dispositivo.

**Aclaración técnica:**

- El temario mezcla un texto de **Java ME**: habla de copiar e instalar un archivo **`.jar`**, que corresponde a los midlets. En Android el paquete instalable es el **`.apk`**; un `.jar` no se instala como app Android.
- La **depuración USB** está en **Opciones de desarrollador**, que se muestran pulsando siete veces el **número de compilación** en Ajustes. Instalar un APK copiado a mano exige permitir la **instalación de apps de origen desconocido**.
- Desde Android Studio, la instalación en el dispositivo se hace mediante **ADB** (*Android Debug Bridge*); también existe la depuración inalámbrica (Wi-Fi).

## S11. Entorno de ejecución: administrador de aplicaciones

Tres aspectos para describir el entorno de ejecución: **administrador de aplicaciones**, **ciclo de vida de una aplicación** y **modelo de estados**.

El **administrador** o **gestor de aplicaciones** muestra las apps instaladas, cuáles se ejecutan, permite desinstalarlas o detenerlas y ver los recursos que consume cada una. Dos funciones esenciales:

1. **Gestión del ciclo de vida de las aplicaciones** en el dispositivo (S12).
2. **Control de los estados** por los que pasa una aplicación mientras está en memoria, es decir, en ejecución (S13–S15).

El temario procede en parte de un material de Java ME: menciona los **midlets** y el **AMS** (*Application Management Software*, gestor de aplicaciones de Java ME), y dice que cualquier plataforma tiene un software equivalente para controlar las apps instaladas y en ejecución.

## S12. Ciclo de vida de una aplicación: cinco fases

| Fase | Qué ocurre | Papel del gestor de aplicaciones |
|---|---|---|
| 1. **Descubrimiento** (o localización) | El usuario localiza la app desde su dispositivo | Proporciona los mecanismos para elegir y descargar: USB, Bluetooth, Internet… |
| 2. **Instalación** | La app descargada se instala | Controla el proceso e informa de su evolución. La app permanece en **memoria persistente** hasta que el usuario la borra |
| 3. **Ejecución** | La app se pone en marcha | Permite ejecutarla y **controla sus estados** según los eventos |
| 4. **Actualización** | Llega una versión de una app ya instalada | Detecta que es una actualización e **informa al usuario para que decida** |
| 5. **Borrado** | El usuario elimina la app | La borra; normalmente pide confirmación e informa de incidencias |

Regla mnemotécnica (añadida): **D-I-E-A-B**, descubrir, instalar, ejecutar, actualizar, borrar.

**Trampa:** estas cinco fases son el ciclo de vida de **la aplicación instalada** en el dispositivo. No son los estados de una **Activity** (S13) ni sus *callbacks* (S14).

## S13. Modelo de estados de una actividad

### S13.1. Analogía con el sistema operativo

Igual que el **planificador de procesos** (*scheduler*) gestiona los estados de los procesos, el **administrador de aplicaciones** gestiona los estados de una app durante su ejecución. Al ejecutarse, la app se carga en memoria y **entra en funcionamiento una activity**. El ciclo de vida de una activity depende de su relación con otras actividades, sus tareas y la pila de actividades.

### S13.2. Los tres estados de una actividad

| Estado | Visible | Foco | Objeto en memoria | Anexada al administrador de ventanas | ¿Puede eliminarla el sistema? |
|---|---|---|---|---|---|
| **Reanudada** (*resumed*, «en ejecución») | Sí, en primer plano | **Sí** | Sí | Sí | — |
| **Pausada** (*paused*) | **Sí, parcialmente**: otra actividad encima es transparente o no cubre toda la pantalla | **No** | Sí, «completamente viva», con su estado y miembros | **Sí** | Solo con memoria **extremadamente baja** |
| **Detenida** (*stopped*) | **No**: completamente oculta («segundo plano») | No | Sí, también «viva» | **No** | Sí, **cuando necesite memoria** |

Si se pausa o detiene una actividad, el sistema puede quitarla de memoria **pidiéndole que termine** (llamando a su **`finish()`**) o **eliminando su proceso**. Al volver a abrirla tras ser eliminada o destruida, **hay que crearla de nuevo**.

### S13.3. Estados de un midlet: no mezclarlos

El temario intercala, sin indicarlo, los estados de un **midlet** de Java ME:

| Estado del midlet | Significado |
|---|---|
| **Activo** | Se está ejecutando |
| **Pausa** | No se ejecuta; no debe usar recursos compartidos; para ejecutar código debe volver a activo |
| **Destruido** | Ya no se ejecuta ni puede pasar a otro estado; se liberan todos sus recursos |

**Aclaración técnica:** en un examen sobre **actividades de Android**, los estados son **reanudada, pausada y detenida**, y además existe la actividad **destruida** como final. «Activo / Pausa / Destruido» son los estados del **midlet**. Si una pregunta habla de midlets, se responde con estos.

## S14. Métodos *callback* y los tres bucles anidados

### S14.1. Los *callbacks*

Al entrar y salir de cada estado, Android notifica a la actividad llamando a métodos **callback**. Son enlaces que se **sobrescriben** para hacer tareas cuando cambia el estado. Esqueleto del temario:

```java
public class ExampleActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The activity is being created.
    }
    @Override
    protected void onStart() {
        super.onStart();
        // The activity is about to become visible.
    }
    @Override
    protected void onResume() {
        super.onResume();
        // The activity has become visible (it is now "resumed").
    }
    @Override
    protected void onPause() {
        super.onPause();
        // Another activity is taking focus (this activity is about to be "paused").
    }
    @Override
    protected void onStop() {
        super.onStop();
        // The activity is no longer visible (it is now "stopped")
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        // The activity is about to be destroyed.
    }
}
```

**Nota del temario:** las implementaciones deben **llamar siempre a la superclase antes de cualquier otra tarea**.

| Callback | Momento | Uso típico |
|---|---|---|
| `onCreate(Bundle)` | Se está creando | Estado **global**: definir el diseño (`setContentView`), crear subprocesos |
| `onStart()` | Va a hacerse visible | Preparar lo necesario para mostrarla |
| `onResume()` | Visible y en primer plano: **reanudada** | Iniciar lo que requiere interacción |
| `onPause()` | Otra actividad toma el foco: va a **pausarse** | Código **ligero**; liberar lo que no hace falta sin foco |
| `onStop()` | Ya no es visible: **detenida** | Liberar recursos de visualización |
| `onDestroy()` | Va a destruirse | Liberar los recursos restantes |
| `onRestart()` | Vuelve tras estar detenida, antes de `onStart()` | Aparece en la figura 1, no en el esqueleto |

### S14.2. Tres bucles anidados

```text
onCreate ──────────────────────────────────────────── onDestroy   ciclo COMPLETO
           onStart ─────────────────────── onStop                 ciclo VISIBLE
                      onResume ──── onPause                       ciclo en PRIMER PLANO
```

| Bucle | Entre | Qué caracteriza ese tiempo | Ejemplo del temario |
|---|---|---|---|
| **Completo** | `onCreate()` y `onDestroy()` | Toda la vida de la instancia | Crear en `onCreate` un subproceso de descarga en segundo plano y detenerlo en `onDestroy` |
| **Visible** | `onStart()` y `onStop()` | El usuario **ve** la actividad y puede interactuar; se conservan recursos para mostrarla. **Puede repetirse muchas veces** | Se llama a `onStop` al iniciar una actividad nueva que la oculta |
| **Primer plano** | `onResume()` y `onPause()` | Al frente de todas y **con el foco**. **Cambia con mucha frecuencia**: el código debe ser **liviano** para no hacer esperar al usuario | `onPause` cuando el dispositivo entra en suspensión o aparece un diálogo |

### S14.3. Figura 1 en texto: el diagrama del ciclo de vida

Recorrido principal, de arriba abajo:

```text
Activity launched
  → onCreate()
  → onStart()
  → onResume()
  → Activity running
      («otra actividad pasa a primer plano»)
  → onPause()
      («la actividad ya no es visible»)
  → onStop()
      («la actividad termina o el sistema la destruye»)
  → onDestroy()
  → Activity shut down
```

Flechas de retorno del diagrama:

```text
onPause()  ──«el usuario vuelve a la actividad»──────────────→ onResume()
onStop()   ──«el usuario navega a la actividad»──→ onRestart() → onStart()
onPause()/onStop() ──«apps con más prioridad necesitan memoria»──→ App process killed
App process killed ──«el usuario navega a la actividad»──────→ onCreate()
```

Rutas que salen de la figura:

- De `onPause()` se vuelve a `onResume()` si el usuario regresa a la actividad.
- De `onStop()` se vuelve a `onRestart()` → `onStart()` → `onResume()` si el usuario navega a ella.
- Desde pausada o detenida, si apps con más prioridad necesitan memoria, **se mata el proceso**; si el usuario vuelve, se empieza de nuevo en **`onCreate()`**.

### S14.4. Trazas de escenarios (práctica añadida, comportamiento estándar)

| Escenario | Secuencia de *callbacks* |
|---|---|
| Abrir la app | A: `onCreate` → `onStart` → `onResume` |
| A abre B a pantalla completa | A: `onPause` → B: `onCreate` → `onStart` → `onResume` → A: `onStop` |
| Atrás desde B | B: `onPause` → A: `onRestart` → `onStart` → `onResume` → B: `onStop` → `onDestroy` |
| Actividad translúcida o tipo diálogo encima de A | A: solo `onPause` (sigue visible). Al cerrarla: A: `onResume` |
| Botón Inicio y vuelta | `onPause` → `onStop`; al volver: `onRestart` → `onStart` → `onResume` |
| Llamar a `finish()` desde una actividad reanudada | `onPause` → `onStop` → `onDestroy` |
| Girar la pantalla (cambio de configuración) | `onPause` → `onStop` → `onDestroy` → **nueva instancia**: `onCreate` → `onStart` → `onResume` |
| Proceso eliminado estando detenida | No hay garantía de `onDestroy`; al volver, nueva instancia desde `onCreate` |

Fíjate en el orden al abrir B: **A se pausa antes de que B se cree**, pero **A se detiene después** de que B se muestre.

**Aclaración técnica:**

- Un `AlertDialog` mostrado por la propia actividad **no** la pausa; sí lo hace una **actividad** con aspecto de diálogo o translúcida. La frase del temario «aparece un diálogo» se refiere a esto último.
- Hoy el sistema solo puede eliminar el proceso de una actividad **detenida**, no de una pausada (desde Android 3.0). El temario conserva la formulación antigua sobre la memoria extremadamente baja.
- Si el proceso se elimina, `onDestroy()` puede **no llamarse**: no es un lugar fiable para guardar datos críticos.
- Desde Android 12, pulsar Atrás en la actividad raíz de la app **la manda a segundo plano en lugar de destruirla**. El comportamiento de pila LIFO del temario sigue valiendo para las actividades que no son la raíz.

## S15. Conservación del estado de una actividad

### S15.1. Figura 2 en texto: guardar y restaurar

```text
Activity running
   │ «otra actividad pasa a primer plano»
   ↓
onSaveInstanceState()   → guardar el estado de la actividad
   ↓
Activity is not visible ──«el usuario vuelve»──→ onRestart() → Activity running
   │                                             (instancia intacta: no hace falta restaurar)
   │ «apps con más prioridad necesitan memoria»
   ↓
App process killed*  ──«el usuario vuelve»──→ onCreate() u onRestoreInstanceState()
                                                → restaurar el estado → Activity running

* Se destruye la instancia, pero se conserva el estado guardado en onSaveInstanceState()
```

Idea clave: si la **instancia sigue intacta**, al volver no hay que restaurar nada (ruta `onRestart`). Si **se destruyó**, el estado guardado llega a la nueva instancia en el **`Bundle`**: en `onCreate(Bundle)` o en `onRestoreInstanceState(Bundle)`.

### S15.2. Figura 3 en texto: el giro de pantalla

La figura 3 marca **dos caminos**:

- **Azul (arranque normal):** `Activity starts` → `onCreate()` → `onStart()` → `onResume()` → `Activity is running`.
- **Rojo (el usuario cambia la orientación de la pantalla):** `onSaveInstanceState()` → `onPause()` → `onStop()` → `onDestroy()` → `Activity is shut down` → la actividad **vuelve a empezar**: `onCreate()` → `onStart()` → **`onRestoreInstanceState()`** → `onResume()` → `Activity is running`.

Nota del temario: los *callbacks* de **gestión explícita del estado** (`onSaveInstanceState`, `onRestoreInstanceState`) solo se ejecutan en el **camino rojo**.

### S15.3. Reglas para el examen

| Pregunta | Respuesta |
|---|---|
| ¿Qué pasa al girar la pantalla por defecto? | La actividad **se destruye y se recrea** con una nueva instancia |
| ¿Dónde se guarda el estado temporal de la interfaz? | En el `Bundle` de `onSaveInstanceState(Bundle)` |
| ¿Dónde se recupera? | En `onCreate(Bundle)` (comprobando que no sea `null`) o en `onRestoreInstanceState(Bundle)`, que se llama **después de `onStart()`** |
| ¿Se restaura al volver de detenida sin que se destruyera? | No hace falta: la instancia está intacta |
| ¿`savedInstanceState` en el primer arranque? | `null` |

**Aclaración técnica:**

- La figura 3 coloca `onSaveInstanceState()` **antes de `onPause()`**: es el comportamiento antiguo. Desde **Android 9 (API 28)** se llama **después de `onStop()`**; antes de esa versión, antes de `onStop()`. Lo importante es que se llama **antes de destruir** una actividad que el sistema podría recrear.
- `onSaveInstanceState` **no** se llama cuando el usuario cierra la actividad a propósito (Atrás o `finish()`): no habrá nada que restaurar.
- La implementación por defecto ya guarda el estado de las vistas que tienen un `android:id` (por ejemplo, el texto escrito en un `EditText`).
- El `Bundle` sirve para **estado temporal y pequeño** de la interfaz. Los datos que deben sobrevivir al cierre de la app se guardan de forma **persistente**: preferencias, ficheros, bases de datos (unidades posteriores).

## S16. Comprobaciones añadidas y resultados

**Objetivo:** comprobar que el código y el XML del temario son válidos, sin un SDK de Android en el equipo de preparación.

| Comprobación | Método | Resultado |
|---|---|---|
| Código copiado **literalmente** del temario | `xmllint` y `javac` sobre los bloques tal como están | **Falla**: los bloques contienen **espacios no separables** (U+00A0) heredados de la web del aula. `javac` informa *illegal character ' '* y `xmllint`, un error de atributo. No es un error de Java ni de XML del contenido |
| `activity_main.xml`, con esos espacios normalizados | `xmllint --noout` | **Bien formado** |
| `MainActivity.java`, normalizado | `javac --release 17` con **sustitutos mínimos** (*stubs*) de `AppCompatActivity`, `Bundle` y `R` | **Compila**: sintaxis, herencia, `@Override` y llamadas coherentes |
| `ExampleActivity` (esqueleto del ciclo de vida), normalizado | `javac --release 17` con un *stub* de `Activity` que declara los seis *callbacks* | **Compila**; los seis `@Override` corresponden a métodos de la superclase |
| Variante con el error tipográfico `SetContentView(R.Layout.acivity_main)` | Misma compilación | **No compila** (*cannot find symbol*), como se explica en S06.1 |

**Consejo práctico:** si copias código del temario a Android Studio y aparecen errores de carácter ilegal en líneas aparentemente correctas, vuelve a escribir la sangría o sustituye esos espacios. Los bloques de este resumen ya usan espacios normales.

**Límites:** los *stubs* solo verifican la sintaxis y los tipos; **no** son Android. Ninguna app se ha ejecutado en un emulador o dispositivo, y el orden de los *callbacks* de S14.4 procede de la documentación de Android, no de una ejecución propia.

## S17. Matices técnicos y trampas de alta discriminación

| Afirmación susceptible de aparecer como distractor | Evaluación y corrección |
|---|---|
| «Para compilar Android basta con un IDE cualquiera, sin SDK» | Falso: el SDK es el **mínimo** imprescindible |
| «Cada factor de forma seleccionado es un proyecto distinto» | Falso: se convierte en un **módulo** del mismo proyecto |
| «Un nivel de API mínimo más alto llega a más dispositivos» | Falso: llega a **menos**, aunque con más funciones |
| «El porcentaje de Help me choose es el de dispositivos con esa versión exacta» | Falso: es **acumulado**, esa versión o superior |
| «La actividad principal es siempre la primera que se abre» | Falso: puede haber antes una *splash screen* |
| «`tools:context` asocia el layout a la actividad en ejecución» | Falso: lo hace `setContentView`; `tools:` solo afecta al editor |
| «`R.layout.activity_main.xml`» | Falso: el identificador va sin extensión: `R.layout.activity_main` |
| «`super.onCreate` es opcional» | Falso: sin ella, `SuperNotCalledException` en ejecución |
| «`savedInstanceState` nunca es `null`» | Falso: es `null` en la primera creación |
| «`match_parent` ajusta el tamaño al contenido» | Falso: eso es `wrap_content` |
| «Build > Make Project instala la app» | Falso: compila con Gradle; **Run** compila, elige destino e instala |
| «El emulador reproduce exactamente cualquier dispositivo real» | Falso: puede diferir en aspecto y funcionalidad |
| «Un AVD es la máquina virtual ART» | Falso: AVD es un dispositivo virtual de pruebas |
| «En Android se instala copiando un `.jar`» | Falso: `.apk`; el `.jar` es de los midlets de Java ME |
| «Las cinco fases son los estados de una actividad» | Falso: descubrimiento, instalación, ejecución, actualización y borrado son el ciclo de vida de la **aplicación** |
| «Activo, Pausa y Destruido son los estados de una Activity» | Falso: son del **midlet**; la Activity: reanudada, pausada, detenida |
| «Una actividad pausada no es visible» | Falso: sigue **parcialmente visible**, pero sin foco |
| «Una actividad detenida está anexada al administrador de ventanas» | Falso: la pausada sí; la detenida no |
| «Una actividad detenida se destruye inmediatamente» | Falso: sigue viva en memoria hasta que el sistema necesite memoria |
| «El ciclo visible va de `onResume` a `onPause`» | Falso: visible = `onStart`–`onStop`; primer plano = `onResume`–`onPause` |
| «`onPause` es buen sitio para operaciones largas» | Falso: debe ser **liviano** porque se ejecuta con frecuencia |
| «Al abrir B, A se detiene antes de que B se cree» | Falso: A se **pausa** antes; se **detiene** después de que B se muestre |
| «Al volver a una actividad detenida se llama a `onCreate`» | Falso si la instancia sigue viva: `onRestart` → `onStart` → `onResume` |
| «`onDestroy` siempre se ejecuta» | Falso: si se elimina el proceso, puede no llamarse |
| «Girar la pantalla solo llama a `onPause` y `onResume`» | Falso: por defecto destruye y recrea la actividad |
| «`onRestoreInstanceState` se llama antes de `onCreate`» | Falso: después de `onStart` |
| «`onSaveInstanceState` se llama al pulsar Atrás» | Falso: no se llama en un cierre explícito |
| «La pila de actividades es FIFO» | Falso: **LIFO** |

## S18. Cuestionario de contraste añadido — cuatro opciones y una respuesta

Estas preguntas entrenan distinciones; no predicen la distribución del examen. Resolver antes de consultar la explicación.

### S18.1. Bucles del ciclo de vida

¿Entre qué dos *callbacks* transcurre el ciclo de vida **visible** de una actividad?

A. `onCreate()` y `onDestroy()`. B. `onStart()` y `onStop()`. C. `onResume()` y `onPause()`. D. `onRestart()` y `onResume()`.

**Correcta: B.** A es el ciclo completo; C, el de primer plano; D no delimita ningún bucle del temario.

### S18.2. Estados

Una actividad tiene encima otra que no cubre toda la pantalla. La de debajo sigue en memoria y anexada al administrador de ventanas, pero sin foco. ¿En qué estado está?

A. Reanudada. B. Pausada. C. Detenida. D. Destruida.

**Correcta: B.** A exigiría el foco; C exigiría estar completamente oculta y desanexada del administrador de ventanas; D implicaría que ya no existe la instancia.

### S18.3. Orden de *callbacks*

La actividad A, reanudada, inicia la actividad B a pantalla completa. ¿Qué secuencia es correcta?

A. A `onStop` → B `onCreate` → B `onStart` → B `onResume` → A `onPause`. B. A `onPause` → B `onCreate` → B `onStart` → B `onResume` → A `onStop`. C. A `onPause` → A `onStop` → A `onDestroy` → B `onCreate`. D. B `onCreate` → B `onStart` → B `onResume` → A `onPause` → A `onStop`.

**Correcta: B.** A invierte pausa y detención; C destruye A, pero A se conserva en la pila; D crea B antes de que A pierda el foco.

### S18.4. Enlace lógica-interfaz

¿Qué instrucción hace que `MainActivity` muestre en ejecución la interfaz definida en `res/layout/activity_main.xml`?

A. `tools:context="…MainActivity"` en el XML. B. `setContentView(R.layout.activity_main);` en `onCreate`. C. `SetContentView(R.Layout.activity_main);` en `onCreate`. D. `import android.os.Bundle;`.

**Correcta: B.** A solo informa al editor de diseño; C no compila porque Java distingue mayúsculas y minúsculas; D importa el tipo del parámetro.

### S18.5. Fases del ciclo de vida de la aplicación

¿Cuál es el orden de las cinco fases del ciclo de vida de una aplicación según el temario?

A. Instalación, descubrimiento, ejecución, borrado, actualización. B. Descubrimiento, instalación, ejecución, actualización, borrado. C. Creación, inicio, reanudación, pausa, detención. D. Activo, pausa, destruido, actualización, borrado.

**Correcta: B.** A desordena las fases; C mezcla *callbacks* de una actividad; D mezcla estados del midlet.

### S18.6. Giro de pantalla

Con el comportamiento por defecto, el usuario gira el móvil con una actividad en primer plano. ¿Qué ocurre?

A. Solo se llaman `onPause()` y `onResume()`. B. La actividad se destruye y se crea una instancia nueva; el estado guardado llega en el `Bundle`. C. La app pasa a la fase de actualización. D. Se llama a `onRestart()` y no se crea ninguna instancia nueva.

**Correcta: B.** A ignora la recreación; C confunde con el ciclo de vida de la aplicación instalada; D describe la vuelta a una actividad detenida que sigue intacta.

### S18.7. Lista final de dominio

Poder explicar sin consultar: SDK frente a IDE; requisitos como datos históricos; proyecto y módulo; factores de forma; nivel de API mínimo y distribución acumulada; plantillas y Empty Activity; `MainActivity`/`activity_main`; zonas del IDE y estructura `manifests/java/res`; Activity, pila LIFO, parte lógica y gráfica; manifiesto y actividad de arranque; cada línea de `MainActivity.java` y de `activity_main.xml`; `R`; `tools:context` frente a `setContentView`; Make Project, Run, Debug; AVD y dispositivo real; APK frente a JAR; depuración USB; administrador de aplicaciones; cinco fases; tres estados frente a estados del midlet; seis *callbacks* y `onRestart`; tres bucles; trazas de escenarios; guardado y restauración del estado; giro de pantalla. No considerar dominado un bloque solo por haber escuchado el podcast.

<!-- INICIO ANEXO DOCENTE -->

## Anexo documental — texto original para consulta

El texto siguiente conserva íntegro el material docente del tema, incluidas sus repeticiones, ejemplos, figuras y formulaciones. **No usarlo para repetir el podcast completo ni para anular las aclaraciones técnicas del desarrollo principal.** Los ejemplos originales no se declaran ejecutados. Las imágenes, PDF y vídeo son recursos locales de consulta; el contenido conceptual necesario para el audio está desarrollado en texto antes de este anexo.

Transformaciones editoriales declaradas:

- Codificación de salida UTF-8 y finales de línea LF; texto y código docentes sin modificar, incluidos los espacios no separables (U+00A0) de sus bloques de código.
- Encabezados docentes desplazados un nivel y prefijados con «Docente —» para distinguirlos del desarrollo elaborado; los bloques de código no se tocan.
- Rutas `Recursos/` adaptadas a `../temario/Recursos/` y enlace al otro tema adaptado a `../temario/`, para conservar figuras, PDF y vídeo.
- Omitida la línea de navegación inicial hacia el otro tema; las anclas internas `<a id>` y el índice original se conservan.

## Docente — Tema 2 — Entorno de trabajo y desarrollo con Android Studio


> **Edición de estudio, no resumen.** Conserva el contenido docente cotejado con el aula, el código y las figuras. Se han mejorado la estructura, el orden y los enlaces, sin actualizar silenciosamente afirmaciones o ejemplos antiguos. Los avisos editoriales se identifican como tales.

> **Rótulos de organización del aula original:** Contenidos · Actividades y recursos · Evaluación. Son separadores del aula; no incluyen por sí mismos instrucciones adicionales de examen.

### Docente — Índice

- [Información, resultados de aprendizaje y criterios](#t2-informacion)
- [2.A. Módulos para el desarrollo de aplicaciones](#t2-a)
  - [1. Módulos para el desarrollo de aplicaciones.](#t2-a-1)
- [2.B. Entornos integrados de trabajo](#t2-b)
  - [1. Instalación de Android Studio.](#t2-b-1)
- [2.C. Integración en el entorno de desarrollo](#t2-c)
  - [1. Integración en el entorno de desarrollo.](#t2-c-1)
  - [2. Creación de un proyecto.](#t2-c-2)
    - [2.1. Paso 1: Iniciar y configurar el proyecto](#t2-c-2-1)
    - [2.2. Paso 2: Seleccionar factores de forma y el nivel de API](#t2-c-2-2)
    - [2.3. Paso 3: Agregar una actividad](#t2-c-2-3)
    - [2.4. Paso 4: Configurar tu actividad](#t2-c-2-4)
    - [2.5. Paso 5: Desarrollar tu app](#t2-c-2-5)
  - [3. Escritura de código.](#t2-c-3)
    - [3.1. MainActivity](#t2-c-3-1)
    - [3.2. activity_main.xml](#t2-c-3-2)
  - [4. Compilación.](#t2-c-4)
  - [5. Emuladores.](#t2-c-5)
  - [6. Instalación y ejecución en un dispositivo real.](#t2-c-6)
- [2.D. Gestión del entorno y framework de ejecución](#t2-d)
  - [1. Aspectos fundamentales.](#t2-d-1)
  - [2. El administrador de aplicaciones.](#t2-d-2)
  - [3. Ciclo de vida de una aplicación.](#t2-d-3)
  - [4. Modelo de estados de una aplicación.](#t2-d-4)

---

<a id="t2-informacion"></a>

### Docente — Información, resultados de aprendizaje y criterios

<a id="t2-informacion-contenido"></a>

#### Docente — Resultados de aprendizaje y criterios de evaluación.

1\. Aplica tecnologías de desarrollo para dispositivos móviles evaluando sus características y capacidades.

#### Docente — Contenidos

\- Módulos para el desarrollo de aplicaciones.

\- Entornos integrados de trabajo.

1\. Instalación de Android Studio.

\- Integración en el entorno de desarrollo.

1\. Creación de un proyecto.

2\. Escritura de código.

MainActivity

activity\_main.xml

3\. Compilación.

4\. Emuladores.

5\. Instalación y ejecución en un dispositivo real.

\- Gestión del entorno de ejecución.

1\. El administrador de aplicaciones.

2\. Ciclo de vida de una aplicación.

3\. Modelo de estados de una aplicación.

Criterios de evaluación:  
  
c) Se han instalado, configurado y utilizado entornos de trabajo para el desarrollo de aplicaciones para dispositivos móviles.  
d) Se han identificado configuraciones que clasifican los dispositivos móviles en base a sus características.  
e) Se han descrito perfiles que establecen la relación entre el dispositivo y la aplicación.  
f) Se ha analizado la estructura de aplicaciones existentes para dispositivos móviles identificando las clases utilizadas.  
g) Se han realizado modificaciones sobre aplicaciones existentes.  
h) Se han utilizado emuladores para comprobar el funcionamiento de las aplicaciones.



<a id="t2-a"></a>

### Docente — 2.A. Módulos para el desarrollo de aplicaciones

<a id="t2-a-1"></a>

<a id="t2-a-1-mod-book-chapter"></a>

#### Docente — 1. Módulos para el desarrollo de aplicaciones.

Una vez realizado, en el capítulo anterior, un repaso general sobre las características con las que podemos encontrarnos en el entorno de ejecución de una aplicación **Android**, ¿qué bibliotecas adicionales hay que instalar para poder desarrollar con **Android**? ¿Es suficiente con el **SDK** clásico? ¿Es necesario o aconsejable tener también un IDE?

Para compilar un programa con **Android** se necesita como mínimo tener instalado el SDK el cual se puede descargar de por separado. A partir de ahí se pueden descargar e instalar el resto de herramientas (emuladores, entornos de desarrollo, depurador, etc.).

Del mismo modo que se haría con Android, podría hacerse con cualquier otra plataforma de desarrollo con la que se hubiera decidido trabajar: **Java ME, iOS, Windows Phone**, etc. En cada caso serían necesarias unas herramientas específicas (compiladores, editores, depuradores, emuladores, etc.). Todo esto lo hemos tratado ya en un apartado anterior.

En el caso particular de **Android** puedes optar por la posibilidad que se ha planteado de instalar el **SDK** junto con otros elementos o bien utilizar algún otro entorno compatible que traiga todas las herramientas necesarias incorporadas. Para este curso usaremos el entorno **Android Studio**, con los paquetes necesarios para trabajar con **Android**. Precisamente en la página oficial de **Android Studio** nos da la posibilidad de instalarnos el IDE Android Studio, incluyendo el SDK, o bien sin incluirlo:

![Página web de Android Studio](<../temario/Recursos/Imagenes/t2-a-1-figura-01-257153fcadba.png>)



<a id="t2-b"></a>

### Docente — 2.B. Entornos integrados de trabajo

<a id="t2-b-1"></a>

<a id="t2-b-1-mod-book-chapter"></a>

#### Docente — 1. Instalación de Android Studio.

Para la instalación de Android Studio, nos remitimos a la página oficial de Android Studio

**[https://developer.android.com/studio/install.html](<https://developer.android.com/studio/install.html>)**

En ella podrás visualizar un video descriptivo de todo el proceso de instalación sea cual sea tu sistema operativo, puesto que al ser una aplicación multiplataforma, está completamente testada y optimizada para los sistemas operativos más habituales (**Windows**, **Mac** y **Linux**)

En cuanto a los requisitos del sistema, necesitarás, según se detalla en la página oficial:

**Requisitos del sistema**

**Windows**

- Microsoft® Windows® 7/8/10 (32 o 64 bits).
- 3 GB de memoria RAM como mínimo (se recomiendan 8), más 1 GB para el emulador de Android.
- 2 GB de espacio en disco disponible como mínimo  
   (se recomiendan 4); 500 MB para el IDE + 1,5 GB para Android SDK y la imagen de sistema del emulador.
- Resolución de pantalla mínima de 1280 x 800.
- Para el emulador acelerado: Sistema operativo de 64 bits y procesador Intel® compatible con Intel® VT-x, Intel® EM64T (Intel® 64) y la funcionalidad Execute Disable (XD) Bit.

**Mac**

- Mac® OS X® 10.10 (Yosemite) o versiones posteriores, hasta la 10.12 (macOS Sierra).
- 3 GB de memoria RAM como mínimo (se recomiendan 8), más 1 GB para el emulador de Android.
- 2 GB de espacio en disco disponible como mínimo  
   (se recomiendan 4); 500 MB para el IDE + 1,5 GB para Android SDK y la imagen de sistema del emulador.
- Resolución de pantalla mínima de 1280 x 800.

**Linux**

- GNOME o KDE de escritorio.

*Pruebas realizadas en Ubuntu® 12.04, Precise Pangolin (distribución de 64 bits capaz de ejecutar aplicaciones de 32 bits)*.

- Distribución de 64 bits capaz de ejecutar aplicaciones de 32 bits.
- GNU C Library (glibc) 2.19 o versiones posteriores.
- 3 GB de memoria RAM como mínimo (se recomiendan 8), más 1 GB para el emulador de Android.
- 2 GB de espacio en disco disponible como mínimo  
   (se recomiendan 4); 500 MB para el IDE + 1,5 GB para Android SDK y la imagen de sistema del emulador.
- Resolución de pantalla mínima de 1280 x 800.
- Para el emulador acelerado: Procesador Intel® compatible con Intel® VT-x, Intel® EM64T (Intel® 64) y la funcionalidad Execute Disable (XD) Bit, o procesador AMD compatible con AMD Virtualization™ (AMD-V™).

Por otro, lado, y aunque no lo menciona, será deseable que el procesador sea al menos un Intel I3 o similar (las pruebas que yo he realizado sobre procesadores I5 de distintas generaciones, incluyendo las primeras, con 8GB de memoria, han sido satisfactorias)

En todo caso el proceso de carga del emulador será algo tedioso por muy elevadas que sean las prestaciones del sistema.

**Debes conocer**

La página de descarga de **Android Studio** es:

[Página de descarga de Android Studio.](<https://developer.android.com/studio/index.html?hl=es-419>)

A fecha 1 de noviembre de 2017 ya se encuentra disponible la versión 3.0 para las diferentes plataformas.

![1. Instalación de Android Studio. — figura 1](<../temario/Recursos/Imagenes/t2-b-1-figura-01-839506b9d057.png>)

**Para saber más**

Aquí tienes un video para repasar sobre la instalación y uso de **Android Studio**:

<a id="t2-b-1-id-videojs-6ade35dc9d3d0-1"></a>

<video controls preload="metadata" src="../temario/Recursos/Videos/instalacion-android-studio-windows-267dc9fd56a7.mp4" title="Instalación de Android Studio"></video>

**Vídeo de instalación de Android Studio:** [Abrir el vídeo local](<../temario/Recursos/Videos/instalacion-android-studio-windows-267dc9fd56a7.mp4>).



<a id="t2-c"></a>

### Docente — 2.C. Integración en el entorno de desarrollo

<a id="t2-c-1"></a>

<a id="t2-c-1-mod-book-chapter"></a>

#### Docente — 1. Integración en el entorno de desarrollo.

Una vez se ha descargado e instalado en tu ordenador la aplicación Android Studio, debemos ver qué pasos debemos seguir para desarrollar, probar y ejecutar una mínima aplicación móvil con esta herramienta. A lo largo de los siguientes subapartados describiremos de manera concisa cómo proceder para crear la clásica aplicación ¡Hola Mundo! o Hello World! que marcará nuestro punto de partida para sumergirnos en el desarrollo de aplicaciones móviles para plataforma Android. ¡Comencemos!.

![1. Integración en el entorno de desarrollo. — figura 1](<../temario/Recursos/Imagenes/t2-c-1-figura-01-105f3b550032.png>)


<a id="t2-c-2"></a>

<a id="t2-c-2-mod-book-chapter"></a>

#### Docente — 2. Creación de un proyecto.

Para describir este apartado, usaremos la referencia proporcionada desde [https://developer.android.com/studio/projects/create-project.html](<https://developer.android.com/studio/projects/create-project.html>) y cuyo contenido transcribo:

Un proyecto de Android Studio contiene uno o más módulos que mantienen tu código organizado en unidades de funcionalidad discretas. Veremos la manera de iniciar un proyecto nuevo o importar uno existente.

Para obtener más información sobre la estructura del proyecto y los tipos de módulo de Android, lee [Información general sobre proyectos](<https://developer.android.com/studio/projects/index.html?hl=es-419>). Para obtener más información sobre la manera de agregar un módulo para un dispositivo nuevo a un proyecto existente, consulta [Agregar un módulo para un dispositivo nuevo](<https://developer.android.com/studio/projects/add-app-module.html?hl=es-419>).

Android Studio facilita la creación de apps de Android para varios factores de forma, como teléfonos, tablets, TV, Wear y Google Glass. El asistente **New Project** te permite elegir los formatos para tu app y completa la estructura del proyecto con todo lo que necesitas para comenzar. Usa los siguientes pasos para crear un proyecto nuevo.

![2. Creación de un proyecto. — figura 1](<../temario/Recursos/Imagenes/t2-c-2-figura-01-a115ea407a10.jpg>)


<a id="t2-c-2-1"></a>

<a id="t2-c-2-1-mod-book-chapter"></a>

##### Docente — 2.1. Paso 1: Iniciar y configurar el proyecto

Si no tienes un proyecto abierto, Android Studio te muestra la pantalla de bienvenida. Para crear un proyecto nuevo, haz clic en **Start a New Android Studio project**.

Si tienes un proyecto abierto, Android Studio muestra el entorno de desarrollo. Para crear un proyecto nuevo, haz clic en **File** &gt; **New** &gt; **New Project**.

En la siguiente ventana, puedes configurar el nombre de tu app, el nombre de paquete y la ubicación de tu proyecto.

![2.1. Paso 1: Iniciar y configurar el proyecto — figura 1](<../temario/Recursos/Imagenes/t2-c-2-1-figura-01-c36c1cd93d25.png>)

**Figura 1:** Pantalla **Configure your new project**.

Ingresa los valores para tu proyecto y luego haz clic en **Next**.


<a id="t2-c-2-2"></a>

<a id="t2-c-2-2-mod-book-chapter"></a>

##### Docente — 2.2. Paso 2: Seleccionar factores de forma y el nivel de API

En la siguiente ventana, puedes seleccionar los factores de forma admitidos por tu app, como teléfonos, tablets, TV, Wear y Google Glass. Los formatos seleccionados se convierten en los módulos de la app dentro del proyecto. Para cada formato, también puedes seleccionar el nivel de API para esa app. Para obtener más información, haz clic en **Help me choose**.

![2.2. Paso 2: Seleccionar factores de forma y el nivel de API — figura 1](<../temario/Recursos/Imagenes/t2-c-2-2-figura-01-cf4ec82ed0db.png>)

**Figura 3:** Pantalla **Target Android Devices**.

En la ventana Android Platform Distribution, se muestra la distribución de dispositivos móviles en los que se ejecuta cada versión de Android, como se muestra en la figura 2.

![2.2. Paso 2: Seleccionar factores de forma y el nivel de API — figura 2](<../temario/Recursos/Imagenes/t2-c-2-2-figura-02-55a1ca893017.png>)

**Figura 2:** Gráfico de la distribución actual de las versiones de Android, que se muestra al hacer clic en **Help me choose**.

Haz clic en un nivel de API para ver una lista de las funciones presentadas en la versión de Android correspondiente. Esto te permite elegir el nivel de API mínimo que cuenta con todas las funciones que necesitan tus apps, de modo que puedas llegar a la mayor cantidad de dispositivos posible. Luego, haz clic en **OK**.

Luego, en la ventana Target Android Devices, una vez que hayas seleccionado tus formatos y versiones de API haz clic en **Next**.


<a id="t2-c-2-3"></a>

<a id="t2-c-2-3-mod-book-chapter"></a>

##### Docente — 2.3. Paso 3: Agregar una actividad

En la siguiente pantalla, puedes seleccionar un tipo de actividad para agregar a tu app, como se muestra en la figura 4. En esta pantalla, se muestra un conjunto diferente de actividades para cada formato (o factor de forma) que seleccionaste antes.

![2.3. Paso 3: Agregar una actividad — figura 1](<../temario/Recursos/Imagenes/t2-c-2-3-figura-01-1dd4b62265fc.png>)

**Figura 4:** Pantalla **Add an Activity** para un formato de dispositivo móvil.

Elige un tipo de actividad y, luego, haz clic en **Next**.

**Nota:** Si seleccionas “Add No Activity”, haz clic en **Finish** para crear el proyecto.


<a id="t2-c-2-4"></a>

<a id="t2-c-2-4-mod-book-chapter"></a>

##### Docente — 2.4. Paso 4: Configurar tu actividad

Puedes configurar la actividad que deseas agregar a tu app, como se muestra en la figura 5.

**![2.4. Paso 4: Configurar tu actividad — figura 1](<../temario/Recursos/Imagenes/t2-c-2-4-figura-01-c1bbb776a5d2.png>)**

**Figura 5:** Pantalla **Customize the Activity**.

Ingresa el nombre de la actividad, el nombre del diseño y el título de la actividad. Luego, haz clic en **Finish**.

Nota: No es obligatorio, sin embargo, de manera general, durante el curso, la primera actividad que crearemos será la actividad principal de la aplicación. Normalmente mantendremos el nombre **MainActivity** con fichero de interfaz **activity\_main**, lo cual ayudará a identificar y organizar las partes de la aplicación. Por otro lado, comentar que la actividad principal no tiene por qué ser la primera actividad que se abre en la aplicación, aunque será lo más frecuente. Puede suceder, que antes de abrir la actividad principal se abra lo que se conoce como una pantalla de splash screen que ayude a mejorar la experiencia de usuario. Esto será habitual en aplicaciones más trabajadas o en fase de producción.


<a id="t2-c-2-5"></a>

<a id="t2-c-2-5-mod-book-chapter"></a>

##### Docente — 2.5. Paso 5: Desarrollar tu app

Android Studio crea la estructura predeterminada de tu proyecto y se abre el entorno de desarrollo. Si tu app se ha configurado para más de un formato (factor de forma), Android Studio crea una carpeta de módulos con archivos de origen completos para cada uno de ellos, como se muestra en la figura 6.

![2.5. Paso 5: Desarrollar tu app — figura 1](<../temario/Recursos/Imagenes/t2-c-2-5-figura-01-96e5480cd772.png>)

**Figura 6:** Estructura de proyecto para una app recientemente creada.

En la imagen anterior se puede apreciar que en la parte superior nos encontramos con un menú y/o barra de herramientas. En el panel lateral izquierdo tenemos un navegador de la estructura de ficheros del proyecto. En parte central disponemos de un panel con una paleta de elementos incorporables en una emulación de la interfaz visual de mi aplicación. En el panel lateral derecho disponemos de un árbol de componentes de la interfaz visual, así como un descriptor de propiedades de cada elemento incorporado.


<a id="t2-c-3"></a>

<a id="t2-c-3-mod-book-chapter"></a>

#### Docente — 3. Escritura de código.

Lo más habitual, al menos en los primeros pasos con Android Studio es partir de una aplicación previa básica que a modo de esqueleto permita agregar las particularidades necesarias para dar respuesta a las necesidades a cubrir por nuestra aplicación. Es decir, aprovecharemos las plantillas que nos proporciona Android Studio, y sobre la que elijamos, comenzaremos a trabajar para desarrollar nuestra aplicación. Concretamente, vamos a trabajar sobre la plantilla "**Empty Activity**", la cual podemos ver seleccionada en la figura 4 de esta unidad y que tiene los elementos estrictamente necesarios para poder ejecutar la aplicación generada. Además, es habitual también, al menos, en los primeros pasos con Android Studio, mantener el nombre de **Activity** que pone por defecto (**MainActivity**), de forma que cuando arranque la aplicación, esta será la **Activity** que cargará en primer lugar:

![3. Escritura de código. — figura 1](<../temario/Recursos/Imagenes/t2-c-3-figura-01-dacbecad5aa2.png>)

Posteriormente, podremos incorporar más actividades para completar nuestra aplicación. También podremos cambiar el nombre de cualquiera de ellas, incluido **MainActivity**. Todas las actividades que vayamos incorporando en nuestra aplicación quedarán reflejadas en el archivo **AndroidManifest.xml** que veremos posteriormente. Además dicho fichero permitirá establecer cúal será la actividad con la que arrancará la aplicación.

Según la documentación proporcionada por Android Developers:

*Una* [***Activity***](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419>) *es un componente de la aplicación que contiene una pantalla con la que los usuarios pueden interactuar para realizar una acción, como marcar un número telefónico, tomar una foto, enviar un correo electrónico o ver un mapa. A cada actividad se le asigna una ventana en la que se puede dibujar su interfaz de usuario. La ventana generalmente abarca toda la pantalla, pero en ocasiones puede ser más pequeña que esta y quedar "flotando" encima de otras ventanas.*

*Una aplicación generalmente consiste en múltiples actividades vinculadas de forma flexible entre sí. Normalmente, una actividad en una aplicación se especifica como la actividad "principal" que se presenta al usuario cuando este inicia la aplicación por primera vez. Cada actividad puede a su vez iniciar otra actividad para poder realizar diferentes acciones. Cada vez que se inicia una actividad nueva, se detiene la actividad anterior, pero el sistema conserva la actividad en una pila (la "pila de actividades"). Cuando se inicia una actividad nueva, se incluye en la pila de actividades y capta el foco del usuario. La pila de actividades cumple con el mecanismo de pila **"el último en entrar es el primero en salir"** (LIFO), por lo que, cuando el usuario termina de interactuar con la actividad actual y presiona el botón Atrás, se quita de la pila (y se destruye) y se reanuda la actividad anterior.*

Así pues, de forma un poco simple, podremos asociar el concepto de **Activity** al de pantalla o ventana de la aplicación, de forma que todas las diferentes pantallas que pudiéramos ver en una aplicación tendrán asociadas una actividad.

Las **Activities** estarán compuestas por una **parte lógica** y una **parte gráfica**.

La **parte lógica** se corresponderá con un archivo **.java**, que contiene la clase para poder interactuar desde esa actividad, a través de los diferentes métodos de que disponga, e incluso apoyándose en otros ficheros .java que contengan clases que también interactúen entre sí.

Por otro lado, la **parte gráfica** normalmente se corresponderá con un fichero **.xml**. Dicho fichero contendrá todos los elementos que se ven en la ventana, e incluso otros, como los **Layouts**, que aunque no se ven directamente, **proporcionan una distribución específica de los elementos visibles**. Así, en dicho fichero, mediante etiquetas de XML específicas, se podrán incorporar todos aquellos elementos que yo quiero que participen en mi interfaz.

Veremos más adelante, cuando planteemos alguna aplicación con interfaz "programática", que será posible incorporar los elementos gráficos directamente en el fichero .java, pero en general, esto suele ser bastante más costoso en esfuerzo y tiempo.

Resumiendo, la escritura se hará en ficheros .java, para incorporar el código (utilizando lenguaje de programación Java) responsable de la lógica de mi aplicación y en ficheros .xml para incorporar el código (utilizando lenguaje de etiquetas XML) responsable de la presentación o aspecto de la interfaz.

Al crear nuestra primera aplicación, podemos ver ambas facetas. Para ello, completamos la creación de nuestro primer proyecto (llamado HolaMundo), y vemos que a través del navegador de proyectos ubicado en el frame de la izquierda se crean 2 ficheros relacionados entre sí:

![3. Escritura de código. — figura 2](<../temario/Recursos/Imagenes/t2-c-3-figura-02-f84fbff6fdd5.png>)

· **MainActivity**, es en realidad la clase Java correspondiente al fichero MainActivity.java, y que contendrá las especificaciones lógicas de la actividad principal y de momento única, de nuestra aplicación.

· **activity\_main.xml** contendrá las especificaciones de apariencia o diseño de la interfaz de esa actividad.

En los siguientes subpartados veremos el contenido de cada fichero y los explicaremos con más detalle.


<a id="t2-c-3-1"></a>

<a id="t2-c-3-1-mod-book-chapter"></a>

##### Docente — 3.1. MainActivity

Contenido de **MainActivity.java**:

  

```java
package com.example.dell.holamundo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }
}
```

Pasemos a explicar que significa este código:

```java
package com.example.dell.holamundo;         
```

Indica el nombre del paquete en donde se encuentra nuestra clase.

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
```

Incorporamos con estas 2 líneas unas librerías básicas para no tener que programar completamente nuestra aplicación.  
  

```java
public class MainActivity extends AppCompatActivity {
    @Override    protected void onCreate(Bundle savedInstanceState) {        super.onCreate(savedInstanceState);        setContentView(R.layout.activity_main);    }
}
```

Creamos una clase que se llama "**MainActivity**" y le aplicamos el mecanismo de herencia habitual propio de Java haciendo que extienda de la clase **AppCompatActivity**. Esta clase formará parte de la librería anteriormente incorporada y dispondrá de las definiciones necesarias para cargar una actividad.

Por otro lado se incorpora una sobreecritura del método "onCreate". Todas las *activities* deben llevar el método "onCreate", el cual hará que inicie la actividad. Se debe pasar como parámetro un objeto de la clase **Bundle**, el cual permitirá inicializar el estado de la actividad.

Lo primero que tendremos que hacer en este método será llamar al método onCreate de la clase padre pasando el objeto Bundle anterior.

A continuación, a través de la línea de código: SetContentView(R.Layout.acivity\_main) conseguiremos enlazar la parte lógica con la parte gráfica. El archivo XML que va a mostrarse cuando se ejecute la clase "**MainActivity**" será el archivo XML llamado dentro del registro de recursos de Android Studio llamado "**activity\_main**".

En general, cada vez que creemos una actividad nueva con un determinado nombre, debo hace que herede de la clase AppCompatActivity (o incluso de una manera más general, de la clase Activity) y además debe tener vinculado un archivo XML que relacionaré a través del método "SetContentView", pasando como parámetro el nombre que recibe dentro del registro de recursos que tiene Android y que para las actividades tiene prefijo "**R.layout.**", como por ejemplo sucede en el caso anterior: R.layout.activity\_main.


<a id="t2-c-3-2"></a>

<a id="t2-c-3-2-mod-book-chapter"></a>

##### Docente — 3.2. activity\_main.xml

Contenido de **activity\_main.xml**:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.example.dell.holamundo.MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

Pasemos a explicar que significa este código:

La primera etiqueta corresponderá a la especificación de la versión de XML y la codificación de caracteres utilizada. Habitualmente mantendremos estos valores.

La segunda etiqueta, "&lt;android.support.constraint.ConstraintLayout....&gt;" corresponde al tipo de layout que queremos que se establezca, e incorpora una serie de atributos correspondientes a los espacios de nombres indicando unas URIs para identificarlos. Además tiene otros atributos que caracterizarán la anchura y altura del layout y una especificación del contexto de este layout que servirá para especificar que Activity se le asociará.

Por otro lado tenemos una etiqueta "&lt;TextView...&gt;" corresponderá a una etiqueta de tipo texto que tendrá comportamiento similar al control Label de Java o label de html. Dispondrá de atributos para especificar anchura y altura, así como el texto contenido y además una serie de atributos correspondientes a la forma en que se situará este control dentro del layout.

Para saber más sobre el acceso a recursos de Android Studio, será muy interesante el siguiente enlace:

[Acceso a recursos en Android Studio](<https://developer.android.com/guide/topics/resources/accessing-resources.html?hl=es-419>)


<a id="t2-c-4"></a>

<a id="t2-c-4-mod-book-chapter"></a>

#### Docente — 4. Compilación.

Para compilar el proyecto basta con ir a Build--&gt;Make Proyect y veremos que nos notifica que empezará a correr el Gradle.

Para compilar y además ejecutar tu app, bastará con hacer clic en el el botón **Run** ![4. Compilación. — figura 1](<../temario/Recursos/Imagenes/t2-c-4-figura-01-6438e35d024d.png>) situado en la barra de herramientas, o bien, a través de menú Run--&gt;Run 'app'.

Android Studio compilará la app con Gradle, y a continuación, solicitará que seleccionemos un destino de implementación (un emulador o un dispositivo conectado) y, luego, cargará la app en dicho destino. Podremos personalizar parte de este comportamiento predeterminado (por ejemplo, la selección de un destino de implementación automático).

· Veremos en el siguiente apartado aspectos relacionados con el emulador y ejecución de aplicación sobre el.

· Veremos en otro apartado. aspectos relacionados con ejecución en un dispositivo físico.

**Nota:** Además, puedes implementar tu app en el modo de depuración. Para ello, haz clic en **Debug ![4. Compilación. — figura 2](<../temario/Recursos/Imagenes/t2-c-4-figura-02-ff9244c5dd24.png>)**. La ejecución de tu app en el modo de depuración te permite configurar puntos de interrupción en el código, examinar variables y evaluar expresiones en tiempo de ejecución, y también ejecutar herramientas de depuración.

Para obtener más información, consulta [Depuración de tu app](<https://developer.android.com/studio/debug/index.html?hl=es-419>).


<a id="t2-c-5"></a>

<a id="t2-c-5-mod-book-chapter"></a>

#### Docente — 5. Emuladores.

Normalmente las herramientas de desarrollo integradas suelen incorporar uno o varios emuladores que te servirán para poder probar las aplicaciones antes de instalarlas en el dispositivo para el cual se han programado. Así podrás observar si la aplicación funciona correctamente y si tiene más o menos el aspecto que tenías pensado. Hay que tener en cuenta que los emuladores no siempre van coincidir en aspecto (y a veces incluso en funcionalidad) con el dispositivo real y podrás encontrar abundantes diferencias dependiendo de diversos factores como por ejemplo el tipo de dispositivo que se emule. No es lo mismo emular un teléfono o una PDA con **Windows Phone**, que un **iPhone** o un **iPAD**, o un teléfono con Android, o un dispositivo móvil con **Java ME**.

Independientemente de la plataforma para la que vayas a desarrollar las aplicaciones (**Android**, **iOS**, **Java ME**, etc.) es importante que la herramienta que elijas disponga de emuladores pues es lo que utilizarás la mayor parte del tiempo. Sólo cuando la aplicación comience a trabajar al 80 o 90 por ciento de su funcionalidad será cuando empieces a instalarla en el dispositivo para ir probando algunas cosas específicas dependientes del dispositivo físico final. La mayor parte del proceso de depuración (por no decir todo) se realizará normalmente con el emulador, pues podremos depurar el software como con un programa en un ordenador convencional (ejecutar las instrucciones paso a paso, establecer breakpoints, observar el contenido de variables, etc.). Además en muchos casos es posible que no tengas a tu disposición en ese momento el dispositivo concreto para el que deseas programar de manera que necesitarás obligatoriamente el emulador.

En principio trataremos de trabajar con la aplicación de emulación proporcionada por Android (AVD), pero es posible utilizar otras aplicaciones gratuitas o de pago que consiguen emulaciones tan buenas o incluso más rápidas que la AVD. Éstas, normalmente se valen del uso de máquinas virtuales para poder funcionar.

![5. Emuladores. — figura 1](<../temario/Recursos/Imagenes/t2-c-5-figura-01-fb929f94f4cb.png>)

Hay que tener en cuenta que si decidimos cambiar el tipo de emulador utilizado, la salida podrá ser ligeramente diferente en cuanto al aspecto estético del dispositivo emulado.

Si deseamos [usar **Android Emulator**](<https://developer.android.com/studio/run/emulator.html?hl=es-419>) para ejecutar nuestra app, debes preparar un Android Virtual Device (AVD). Si todavía no lo hemos creado, cuando hagamos clic en **Run, aparecerá una ventana para seleccionar el destino de nuestra ejecución. En dicha ventana pulsaremos** en **Create New Emulator**, en el diálogo **Select Deployment Target**. Seguiremos las instrucciones del asistente Virtual Device Configuration para definir el tipo de dispositivo que deseas emular.

Para obtener más información, consulta [Creación y administración de dispositivos virtuales](<https://developer.android.com/studio/run/managing-avds.html?hl=es-419>).

Si quieres echar un vistazo a otros emuladores externos, puedes ver este vídeo:

**Vídeo complementario:** [Ver en YouTube](<https://www.youtube.com/watch?v=nk2IuYfGkH8>) — recurso externo, requiere conexión.


<a id="t2-c-6"></a>

<a id="t2-c-6-mod-book-chapter"></a>

#### Docente — 6. Instalación y ejecución en un dispositivo real.

Como ya se ha comentado antes, algo que debes tener en cuenta cuando se desarrollan aplicaciones con la tecnología Android Studio (y en general para casi cualquier plataforma) es que el aspecto e incluso el funcionamiento que presente la aplicación puede que sea diferente en un dispositivo real con respecto al que se podía observar en un emulador. Es muy posible que su aspecto varíe según se instale en un dispositivo u otro, así como también si lo pruebas en un emulador u otro.

Esto se debe tanto a las características físicas del propio dispositivo (tamaño, resolución y [colores](<https://www.materialpalette.com/>) de la pantalla, tipo de joystick, botones, etc.) como a la implementación de la máquina virtual de Java que tenga ese dispositivo. Aunque la comparación no es del todo precisa, la situación podría se similar a la que se produce cuando navegas por un mismo sitio web con ordenadores distintos, con sistemas operativos diferentes y con navegadores también distintos, obteniendo visualizaciones de la web diferentes.

La manera más sencilla de probar tu aplicación será transfiriendo el archivo .apk generado de la aplicación a la memoria del dispositivo donde deseas realizar la prueba (a través de un cable USB, por Bluetooth, mediante una tarjeta de memoria, etc.).

Dependiendo del fabricante del dispositivo, es posible que se disponga de alguna utilidad que permita realizar la instalación desde el ordenador (como por ejemplo el **Huawei HiSuite**, **LG PC Suite**, **Samsung Kies**, **Nokia PC SuiteN**, etc), pero tambíen podemos disponer de utilidades no propietarias de fabricantes de móviles(como **AirDroid, MobileGo, Mobo, 91 PC suite**, etc). En cualquier caso siempre se puede hacer lo que se ha comentado antes: copiar el archivo .jar al dispositivo y una vez copiado, instalarlo en el dispositivo simplemente pinchando sobre el archivo **.jar**. El dispositivo preguntará si deseas instalarlo, contestas afirmativamente y la aplicación quedará instalada en el aparato junto con el resto de aplicaciones. Ya sólo faltará ejecutarla como una aplicación más. Si estuvieras desarrollando para otra plataforma diferente a **Java ME**, el proceso podría cambiar dependiendo del fabricante del dispositivo así como del tipo de archivos generados (no será el mismo proceso para un **iOS** que para un **Windows Phone** o para un **Android**, cada plataforma tendrá sus procedimientos específicos de instalación de software).

Nota Importante: Si usas un dispositivo Android físico, debes habilitar la depuración USB en el dispositivo. Puedes ver este video:

**Vídeo complementario:** [Ver en YouTube](<https://www.youtube.com/watch?v=Zqg6Kl46_c4>) — recurso externo, requiere conexión.

Para obtener más información, consulta [Ejecutar apps en un dispositivo de hardware](<https://developer.android.com/studio/run/device.html?hl=es-419>).



<a id="t2-d"></a>

### Docente — 2.D. Gestión del entorno y framework de ejecución

<a id="t2-d-1"></a>

<a id="t2-d-1-mod-book-chapter"></a>

#### Docente — 1. Aspectos fundamentales.

Para describir el entorno de ejecución debemos considerar 3 aspectos importantes:

· El administrador de aplicaciones.

· [El ciclo de vida de una aplicación](<#t2-d-4>).

· [El modelo de estados de una aplicación](<#t2-d-4>).


<a id="t2-d-2"></a>

<a id="t2-d-2-mod-book-chapter"></a>

#### Docente — 2. El administrador de aplicaciones.

El administrador de aplicaciones o gestor de aplicaciones permite mostrar todas las **apps** que tenemos instaladas en nuestro dispositivo y controlar de un vistazo las que se está ejecutando, desinstalarlas o detenerlas, o incluso conocer en cada momento los recursos que está consumiendo cada una de ellas. Llevará a cabo esencialmente dos funciones:

1. La gestión del ciclo de vida de las aplicaciones en el dispositivo.
2. El control de los estados por los que pasa la aplicación mientras resida en la memoria del dispositivo, es decir, mientras esté en ejecución.

Si estuvieras trabajando una plataforma diferente a **Java ME**, en lugar de Midlets tendrías otro tipo de aplicaciones y su gestión sería también diferente, pero en cualquier caso existirá algún software similar al Gestor de Aplicaciones AMS que permitirá controlar y gestionar las aplicaciones que se instalan y se ejecutan en el dispositivo.

![2. El administrador de aplicaciones. — figura 1](<../temario/Recursos/Imagenes/t2-d-2-figura-01-f32a66063475.png>)

A continuación vas a ver cada una de esas dos funciones: cuáles son las fases por las que puede pasar una aplicación y cuáles son los estados de una aplicación en ejecución.


<a id="t2-d-3"></a>

<a id="t2-d-3-mod-book-chapter"></a>

#### Docente — 3. Ciclo de vida de una aplicación.

El ciclo de vida de una aplicación de Android pasa por cinco fases: **descubrimiento**, **instalación**, **ejecución**, **actualización** y **borrado**.

1. **Descubrimiento** (o **localización**). Consiste en el proceso por el cual un usuario localiza una aplicación Android a través de su dispositivo. El gestor de aplicaciones es el que proporciona los mecanismos necesarios para realizar la elección de la aplicación que se desea descargar (mediante un cable USB, Bluetooth, conexión a Internet, etc.).
2. **Instalación**. Una vez que la aplicación ha sido descargada en el dispositivo, ésta puede ser instalada. El gestor de aplicaciones de Android se encargará de controlar el proceso de instalación informando al usuario de la evolución de este proceso. Una vez instalado la aplicación, éste permanecerá en el dispositivo (en memoria persistente) hasta que el usuario decida borrarlo.
3. **Ejecución**. El gestor de aplicaciones de Android es también el que permite poner en ejecución la aplicación. Una vez que una aplicación está en ejecución, el gestor de aplicaciones también tendrá el control de los distintos estados por los que pueda pasar dicha aplicación dependiendo de los eventos que se vayan desencadenando durante esa ejecución.
4. **Actualización**. Una vez que una aplicación ha sido descargada, el gestor de aplicaciones de Android debe ser capaz de detectar si se trata de una actualización de una aplicación ya presente en el dispositivo. En tal caso se informaría al usuario para que decidiera si quiere llevar a cabo o no la actualización.
5. **Borrado**. Si el usuario así lo desea, el gestor de aplicaciones de Android se encargará de borrar la aplicación del dispositivo. Normalmente se solicitará confirmación y se informará de las posibles incidencias durante el proceso de borrado.


<a id="t2-d-4"></a>

<a id="t2-d-4-mod-book-chapter"></a>

#### Docente — 4. Modelo de estados de una aplicación.

De manera similar a como el planificador de procesos (scheduler) en sistemas operativos se encarga de gestionar el estado de los procesos (programas en ejecución), el Administrador de Aplicaciones es también el encargado de gestionar los estados de una aplicación durante su ejecución.

Cuando una aplicación se pone en **ejecución** es cargada en la memoria del dispositivo, **entrando en funcionamiento una activity**. El ciclo de vida de cualquier activity dependerá de cómo esté relacionado con otras actividades, con sus tareas y con la pila de actividades que tenga la aplicación.

Según la página de Android Developer:

Una actividad puede existir básicamente en tres estados:

**Reanudada**:

La actividad se encuentra en el primer plano de la pantalla y tiene la atención del usuario. (A veces, este estado también se denomina "en ejecución").

**Pausada**:

Otra actividad se encuentra en el primer plano y tiene la atención del usuario, pero esta todavía está visible. Es decir, otra actividad está visible por encima de esta y esa actividad es parcialmente transparente o no cubre toda la pantalla. Una actividad pausada está completamente "viva" (el objeto [Activity](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419>) se conserva en la memoria, mantiene toda la información de estado y miembro y continúa anexado al administrador de ventanas pero ha perdido el foco), pero el sistema puede eliminarla en situaciones en que la memoria sea extremadamente baja.

**Detenida**:

La actividad está completamente oculta por otra actividad (ahora la actividad se encuentra en "segundo plano"). Una actividad detenida también permanece "viva" (el objeto [Activity](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419>) se conserva en memoria, mantiene toda la información de estado y miembro, pero *no* está anexado al administrador de ventanas). Sin embargo, ya no está visible para el usuario y el sistema puede eliminarla cuando necesite memoria en alguna otra parte.

Si se pausa o se detiene una actividad, el sistema puede excluirla de la memoria al solicitarle que se cierre (llamando a su método **finish()**), o simplemente eliminando su proceso. Cuando se vuelve a abrir la actividad (después de haber sido eliminada o destruida), es necesario crearla nuevamente.

- **Activo**. El midlet está en ese momento ejecutándose.
- **Pausa**. El midlet no se encuentra ejecutándose en ese momento. En ese estado no se debe utilizar ningún recurso compartido. Para volver a ejecutar instrucciones de su código, el midlet debe de pasar a estado activo.
- **Destruido**. El midlet no está ya en ejecución ni podrá pasar a otro estado. Se liberan todos los recursos ocupados.

Cuando una actividad entra y sale de los diferentes estados que se describieron más arriba, esto se notifica a través de diferentes métodos llamados **callback**. Todos los métodos callback son enlaces que puedes **sobreescribir** para realizar las tareas correspondientes cuando cambia el estado de la actividad. La siguiente actividad estructural incluye todos los métodos fundamentales del ciclo de vida:

```java
public class ExampleActivity extends Activity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The activity is being created.
    }
    @Override
    protected void onStart() {
        super.onStart();
        // The activity is about to become visible.
    }
    @Override
    protected void onResume() {
        super.onResume();
        // The activity has become visible (it is now "resumed").
    }
    @Override
    protected void onPause() {
        super.onPause();
        // Another activity is taking focus (this activity is about to be "paused").
    }
    @Override
    protected void onStop() {
        super.onStop();
        // The activity is no longer visible (it is now "stopped")
    }
    @Override
    protected void onDestroy() {
        super.onDestroy();
        // The activity is about to be destroyed.
    }
}
```

**Nota:** La implementación que realices de estos métodos del ciclo de vida siempre deben llamar la implementación de la superclase antes de realizar cualquier otra tarea, como se muestra en los ejemplos anteriores.

En conjunto, estos métodos definen el ciclo de vida completo de una actividad. Al implementar estos métodos, puedes monitorear tres bucles anidados en el ciclo de vida de la actividad:

- El ciclo de vida completo de una actividad transcurre entre la llamada a [**onCreate**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onCreate(android.os.Bundle)>) y la llamada a [**onDestroy**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onDestroy()>). Tu actividad debe configurar el estado "global" (como la definición del diseño) en [**onCreate**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onCreate(android.os.Bundle)>), y liberar todos los recursos restantes en [**onDestroy**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onDestroy()>). Por ejemplo, si hay un subproceso de descarga de datos de la red en ejecución en segundo plano en tu actividad, esta podría crear ese subproceso en [**onCreate**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onCreate(android.os.Bundle)>) y luego detenerlo en [**onDestroy**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onDestroy()>).

· El ciclo de vida visible de una actividad transcurre entre la llamada a [**onStart**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onStart()>) y la llamada a [**onStop**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onStop()>). Durante ese tiempo, el usuario puede ver la actividad en pantalla e interactuar con ella. Por ejemplo, se llama a [**onStop**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onStop()>) cuando se inicia una nueva actividad y esta ya no está visible. Entre estos dos métodos, puedes conservar los recursos necesarios para mostrarle la actividad al usuario. El sistema podría llamar a [**onStart**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onStart()>) y [**onStop**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onStop()>) muchas veces durante el ciclo de vida completo de la actividad, ya que la actividad pasa de ser visible y a estar oculta para el usuario.

· El ciclo de vida en primer plano de una actividad transcurre entre la llamada a [**onResume**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onResume()>) y la llamada a [**onPause**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onPause()>). Durante ese tiempo, la actividad se encuentra al frente de todas las demás actividades en la pantalla y tiene el **foco** en la interacción del usuario. Con frecuencia, una actividad puede entrar y salir de primer plano, por ejemplo, se llama a [**onPause**()](<https://developer.android.com/reference/android/app/Activity.html?hl=es-419#onPause()>) cuando el dispositivo entre en suspensión o cuando aparece un diálogo. Dado que este estado puede cambiar con frecuencia, el código en estos métodos debe ser bastante liviano para evitar las transiciones lentas que hacen que el usuario deba esperar.

La figura 1 ilustra esos bucles y el camino que debe tomar una actividad entre estados. Los rectángulos representan los métodos callback que puedes implementar para realizar operaciones cuando la actividad cambie de estado.

**![4. Modelo de estados de una aplicación. — figura 1](<../temario/Recursos/Imagenes/t2-d-4-figura-01-a964f212e58e.png>)**

Figura 1: Ciclo de vida de la actividad en relación a la **gestión de sus eventos principales**.

  

![4. Modelo de estados de una aplicación. — figura 2](<../temario/Recursos/Imagenes/restaurar-estado-de-actividad-a23602756100.png>)

Figura 2 - Estados de una actividad **en relación a su información de estado**. Fuente: developer.android.com

![Ciclo de vida de una actividad - en relación a la gestión de su estado](<../temario/Recursos/Imagenes/t2-d-4-figura-03-ddb6ea9c1702.png>)

Figura 3: Ciclo de vida de una Actividad **en relación a los eventos principales y la gestión de su estado**. Hacer notar que las llamadas callback para la gestión explicita del estado sólo se hacen cuando el ciclo de vida es el señalado por el camino en rojo. (para mayor detalle ver este [link](<https://www.okhelp.cz/android/how-going-life-cycle-if-screen-orientation-changed-android-example/>))
