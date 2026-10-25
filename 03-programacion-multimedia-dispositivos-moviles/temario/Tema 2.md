# Tema 2 — Entorno de trabajo y desarrollo con Android Studio

[Tema 1](<Tema%201.md>)

> **Edición de estudio, no resumen.** Conserva el contenido docente cotejado con el aula, el código y las figuras. Se han mejorado la estructura, el orden y los enlaces, sin actualizar silenciosamente afirmaciones o ejemplos antiguos. Los avisos editoriales se identifican como tales.

> **Rótulos de organización del aula original:** Contenidos · Actividades y recursos · Evaluación. Son separadores del aula; no incluyen por sí mismos instrucciones adicionales de examen.

## Índice

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

## Información, resultados de aprendizaje y criterios

<a id="t2-informacion-contenido"></a>

### Resultados de aprendizaje y criterios de evaluación.

1\. Aplica tecnologías de desarrollo para dispositivos móviles evaluando sus características y capacidades.

### Contenidos

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

## 2.A. Módulos para el desarrollo de aplicaciones

<a id="t2-a-1"></a>

<a id="t2-a-1-mod-book-chapter"></a>

### 1. Módulos para el desarrollo de aplicaciones.

Una vez realizado, en el capítulo anterior, un repaso general sobre las características con las que podemos encontrarnos en el entorno de ejecución de una aplicación **Android**, ¿qué bibliotecas adicionales hay que instalar para poder desarrollar con **Android**? ¿Es suficiente con el **SDK** clásico? ¿Es necesario o aconsejable tener también un IDE?

Para compilar un programa con **Android** se necesita como mínimo tener instalado el SDK el cual se puede descargar de por separado. A partir de ahí se pueden descargar e instalar el resto de herramientas (emuladores, entornos de desarrollo, depurador, etc.).

Del mismo modo que se haría con Android, podría hacerse con cualquier otra plataforma de desarrollo con la que se hubiera decidido trabajar: **Java ME, iOS, Windows Phone**, etc. En cada caso serían necesarias unas herramientas específicas (compiladores, editores, depuradores, emuladores, etc.). Todo esto lo hemos tratado ya en un apartado anterior.

En el caso particular de **Android** puedes optar por la posibilidad que se ha planteado de instalar el **SDK** junto con otros elementos o bien utilizar algún otro entorno compatible que traiga todas las herramientas necesarias incorporadas. Para este curso usaremos el entorno **Android Studio**, con los paquetes necesarios para trabajar con **Android**. Precisamente en la página oficial de **Android Studio** nos da la posibilidad de instalarnos el IDE Android Studio, incluyendo el SDK, o bien sin incluirlo:

![Página web de Android Studio](<Recursos/Imagenes/t2-a-1-figura-01-257153fcadba.png>)



<a id="t2-b"></a>

## 2.B. Entornos integrados de trabajo

<a id="t2-b-1"></a>

<a id="t2-b-1-mod-book-chapter"></a>

### 1. Instalación de Android Studio.

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

![1. Instalación de Android Studio. — figura 1](<Recursos/Imagenes/t2-b-1-figura-01-839506b9d057.png>)

**Para saber más**

Aquí tienes un video para repasar sobre la instalación y uso de **Android Studio**:

<a id="t2-b-1-id-videojs-6ade35dc9d3d0-1"></a>

<video controls preload="metadata" src="Recursos/Videos/instalacion-android-studio-windows-267dc9fd56a7.mp4" title="Instalación de Android Studio"></video>

**Vídeo de instalación de Android Studio:** [Abrir el vídeo local](<Recursos/Videos/instalacion-android-studio-windows-267dc9fd56a7.mp4>).



<a id="t2-c"></a>

## 2.C. Integración en el entorno de desarrollo

<a id="t2-c-1"></a>

<a id="t2-c-1-mod-book-chapter"></a>

### 1. Integración en el entorno de desarrollo.

Una vez se ha descargado e instalado en tu ordenador la aplicación Android Studio, debemos ver qué pasos debemos seguir para desarrollar, probar y ejecutar una mínima aplicación móvil con esta herramienta. A lo largo de los siguientes subapartados describiremos de manera concisa cómo proceder para crear la clásica aplicación ¡Hola Mundo! o Hello World! que marcará nuestro punto de partida para sumergirnos en el desarrollo de aplicaciones móviles para plataforma Android. ¡Comencemos!.

![1. Integración en el entorno de desarrollo. — figura 1](<Recursos/Imagenes/t2-c-1-figura-01-105f3b550032.png>)


<a id="t2-c-2"></a>

<a id="t2-c-2-mod-book-chapter"></a>

### 2. Creación de un proyecto.

Para describir este apartado, usaremos la referencia proporcionada desde [https://developer.android.com/studio/projects/create-project.html](<https://developer.android.com/studio/projects/create-project.html>) y cuyo contenido transcribo:

Un proyecto de Android Studio contiene uno o más módulos que mantienen tu código organizado en unidades de funcionalidad discretas. Veremos la manera de iniciar un proyecto nuevo o importar uno existente.

Para obtener más información sobre la estructura del proyecto y los tipos de módulo de Android, lee [Información general sobre proyectos](<https://developer.android.com/studio/projects/index.html?hl=es-419>). Para obtener más información sobre la manera de agregar un módulo para un dispositivo nuevo a un proyecto existente, consulta [Agregar un módulo para un dispositivo nuevo](<https://developer.android.com/studio/projects/add-app-module.html?hl=es-419>).

Android Studio facilita la creación de apps de Android para varios factores de forma, como teléfonos, tablets, TV, Wear y Google Glass. El asistente **New Project** te permite elegir los formatos para tu app y completa la estructura del proyecto con todo lo que necesitas para comenzar. Usa los siguientes pasos para crear un proyecto nuevo.

![2. Creación de un proyecto. — figura 1](<Recursos/Imagenes/t2-c-2-figura-01-a115ea407a10.jpg>)


<a id="t2-c-2-1"></a>

<a id="t2-c-2-1-mod-book-chapter"></a>

#### 2.1. Paso 1: Iniciar y configurar el proyecto

Si no tienes un proyecto abierto, Android Studio te muestra la pantalla de bienvenida. Para crear un proyecto nuevo, haz clic en **Start a New Android Studio project**.

Si tienes un proyecto abierto, Android Studio muestra el entorno de desarrollo. Para crear un proyecto nuevo, haz clic en **File** &gt; **New** &gt; **New Project**.

En la siguiente ventana, puedes configurar el nombre de tu app, el nombre de paquete y la ubicación de tu proyecto.

![2.1. Paso 1: Iniciar y configurar el proyecto — figura 1](<Recursos/Imagenes/t2-c-2-1-figura-01-c36c1cd93d25.png>)

**Figura 1:** Pantalla **Configure your new project**.

Ingresa los valores para tu proyecto y luego haz clic en **Next**.


<a id="t2-c-2-2"></a>

<a id="t2-c-2-2-mod-book-chapter"></a>

#### 2.2. Paso 2: Seleccionar factores de forma y el nivel de API

En la siguiente ventana, puedes seleccionar los factores de forma admitidos por tu app, como teléfonos, tablets, TV, Wear y Google Glass. Los formatos seleccionados se convierten en los módulos de la app dentro del proyecto. Para cada formato, también puedes seleccionar el nivel de API para esa app. Para obtener más información, haz clic en **Help me choose**.

![2.2. Paso 2: Seleccionar factores de forma y el nivel de API — figura 1](<Recursos/Imagenes/t2-c-2-2-figura-01-cf4ec82ed0db.png>)

**Figura 3:** Pantalla **Target Android Devices**.

En la ventana Android Platform Distribution, se muestra la distribución de dispositivos móviles en los que se ejecuta cada versión de Android, como se muestra en la figura 2.

![2.2. Paso 2: Seleccionar factores de forma y el nivel de API — figura 2](<Recursos/Imagenes/t2-c-2-2-figura-02-55a1ca893017.png>)

**Figura 2:** Gráfico de la distribución actual de las versiones de Android, que se muestra al hacer clic en **Help me choose**.

Haz clic en un nivel de API para ver una lista de las funciones presentadas en la versión de Android correspondiente. Esto te permite elegir el nivel de API mínimo que cuenta con todas las funciones que necesitan tus apps, de modo que puedas llegar a la mayor cantidad de dispositivos posible. Luego, haz clic en **OK**.

Luego, en la ventana Target Android Devices, una vez que hayas seleccionado tus formatos y versiones de API haz clic en **Next**.


<a id="t2-c-2-3"></a>

<a id="t2-c-2-3-mod-book-chapter"></a>

#### 2.3. Paso 3: Agregar una actividad

En la siguiente pantalla, puedes seleccionar un tipo de actividad para agregar a tu app, como se muestra en la figura 4. En esta pantalla, se muestra un conjunto diferente de actividades para cada formato (o factor de forma) que seleccionaste antes.

![2.3. Paso 3: Agregar una actividad — figura 1](<Recursos/Imagenes/t2-c-2-3-figura-01-1dd4b62265fc.png>)

**Figura 4:** Pantalla **Add an Activity** para un formato de dispositivo móvil.

Elige un tipo de actividad y, luego, haz clic en **Next**.

**Nota:** Si seleccionas “Add No Activity”, haz clic en **Finish** para crear el proyecto.


<a id="t2-c-2-4"></a>

<a id="t2-c-2-4-mod-book-chapter"></a>

#### 2.4. Paso 4: Configurar tu actividad

Puedes configurar la actividad que deseas agregar a tu app, como se muestra en la figura 5.

**![2.4. Paso 4: Configurar tu actividad — figura 1](<Recursos/Imagenes/t2-c-2-4-figura-01-c1bbb776a5d2.png>)**

**Figura 5:** Pantalla **Customize the Activity**.

Ingresa el nombre de la actividad, el nombre del diseño y el título de la actividad. Luego, haz clic en **Finish**.

Nota: No es obligatorio, sin embargo, de manera general, durante el curso, la primera actividad que crearemos será la actividad principal de la aplicación. Normalmente mantendremos el nombre **MainActivity** con fichero de interfaz **activity\_main**, lo cual ayudará a identificar y organizar las partes de la aplicación. Por otro lado, comentar que la actividad principal no tiene por qué ser la primera actividad que se abre en la aplicación, aunque será lo más frecuente. Puede suceder, que antes de abrir la actividad principal se abra lo que se conoce como una pantalla de splash screen que ayude a mejorar la experiencia de usuario. Esto será habitual en aplicaciones más trabajadas o en fase de producción.


<a id="t2-c-2-5"></a>

<a id="t2-c-2-5-mod-book-chapter"></a>

#### 2.5. Paso 5: Desarrollar tu app

Android Studio crea la estructura predeterminada de tu proyecto y se abre el entorno de desarrollo. Si tu app se ha configurado para más de un formato (factor de forma), Android Studio crea una carpeta de módulos con archivos de origen completos para cada uno de ellos, como se muestra en la figura 6.

![2.5. Paso 5: Desarrollar tu app — figura 1](<Recursos/Imagenes/t2-c-2-5-figura-01-96e5480cd772.png>)

**Figura 6:** Estructura de proyecto para una app recientemente creada.

En la imagen anterior se puede apreciar que en la parte superior nos encontramos con un menú y/o barra de herramientas. En el panel lateral izquierdo tenemos un navegador de la estructura de ficheros del proyecto. En parte central disponemos de un panel con una paleta de elementos incorporables en una emulación de la interfaz visual de mi aplicación. En el panel lateral derecho disponemos de un árbol de componentes de la interfaz visual, así como un descriptor de propiedades de cada elemento incorporado.


<a id="t2-c-3"></a>

<a id="t2-c-3-mod-book-chapter"></a>

### 3. Escritura de código.

Lo más habitual, al menos en los primeros pasos con Android Studio es partir de una aplicación previa básica que a modo de esqueleto permita agregar las particularidades necesarias para dar respuesta a las necesidades a cubrir por nuestra aplicación. Es decir, aprovecharemos las plantillas que nos proporciona Android Studio, y sobre la que elijamos, comenzaremos a trabajar para desarrollar nuestra aplicación. Concretamente, vamos a trabajar sobre la plantilla "**Empty Activity**", la cual podemos ver seleccionada en la figura 4 de esta unidad y que tiene los elementos estrictamente necesarios para poder ejecutar la aplicación generada. Además, es habitual también, al menos, en los primeros pasos con Android Studio, mantener el nombre de **Activity** que pone por defecto (**MainActivity**), de forma que cuando arranque la aplicación, esta será la **Activity** que cargará en primer lugar:

![3. Escritura de código. — figura 1](<Recursos/Imagenes/t2-c-3-figura-01-dacbecad5aa2.png>)

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

![3. Escritura de código. — figura 2](<Recursos/Imagenes/t2-c-3-figura-02-f84fbff6fdd5.png>)

· **MainActivity**, es en realidad la clase Java correspondiente al fichero MainActivity.java, y que contendrá las especificaciones lógicas de la actividad principal y de momento única, de nuestra aplicación.

· **activity\_main.xml** contendrá las especificaciones de apariencia o diseño de la interfaz de esa actividad.

En los siguientes subpartados veremos el contenido de cada fichero y los explicaremos con más detalle.


<a id="t2-c-3-1"></a>

<a id="t2-c-3-1-mod-book-chapter"></a>

#### 3.1. MainActivity

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

#### 3.2. activity\_main.xml

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

### 4. Compilación.

Para compilar el proyecto basta con ir a Build--&gt;Make Proyect y veremos que nos notifica que empezará a correr el Gradle.

Para compilar y además ejecutar tu app, bastará con hacer clic en el el botón **Run** ![4. Compilación. — figura 1](<Recursos/Imagenes/t2-c-4-figura-01-6438e35d024d.png>) situado en la barra de herramientas, o bien, a través de menú Run--&gt;Run 'app'.

Android Studio compilará la app con Gradle, y a continuación, solicitará que seleccionemos un destino de implementación (un emulador o un dispositivo conectado) y, luego, cargará la app en dicho destino. Podremos personalizar parte de este comportamiento predeterminado (por ejemplo, la selección de un destino de implementación automático).

· Veremos en el siguiente apartado aspectos relacionados con el emulador y ejecución de aplicación sobre el.

· Veremos en otro apartado. aspectos relacionados con ejecución en un dispositivo físico.

**Nota:** Además, puedes implementar tu app en el modo de depuración. Para ello, haz clic en **Debug ![4. Compilación. — figura 2](<Recursos/Imagenes/t2-c-4-figura-02-ff9244c5dd24.png>)**. La ejecución de tu app en el modo de depuración te permite configurar puntos de interrupción en el código, examinar variables y evaluar expresiones en tiempo de ejecución, y también ejecutar herramientas de depuración.

Para obtener más información, consulta [Depuración de tu app](<https://developer.android.com/studio/debug/index.html?hl=es-419>).


<a id="t2-c-5"></a>

<a id="t2-c-5-mod-book-chapter"></a>

### 5. Emuladores.

Normalmente las herramientas de desarrollo integradas suelen incorporar uno o varios emuladores que te servirán para poder probar las aplicaciones antes de instalarlas en el dispositivo para el cual se han programado. Así podrás observar si la aplicación funciona correctamente y si tiene más o menos el aspecto que tenías pensado. Hay que tener en cuenta que los emuladores no siempre van coincidir en aspecto (y a veces incluso en funcionalidad) con el dispositivo real y podrás encontrar abundantes diferencias dependiendo de diversos factores como por ejemplo el tipo de dispositivo que se emule. No es lo mismo emular un teléfono o una PDA con **Windows Phone**, que un **iPhone** o un **iPAD**, o un teléfono con Android, o un dispositivo móvil con **Java ME**.

Independientemente de la plataforma para la que vayas a desarrollar las aplicaciones (**Android**, **iOS**, **Java ME**, etc.) es importante que la herramienta que elijas disponga de emuladores pues es lo que utilizarás la mayor parte del tiempo. Sólo cuando la aplicación comience a trabajar al 80 o 90 por ciento de su funcionalidad será cuando empieces a instalarla en el dispositivo para ir probando algunas cosas específicas dependientes del dispositivo físico final. La mayor parte del proceso de depuración (por no decir todo) se realizará normalmente con el emulador, pues podremos depurar el software como con un programa en un ordenador convencional (ejecutar las instrucciones paso a paso, establecer breakpoints, observar el contenido de variables, etc.). Además en muchos casos es posible que no tengas a tu disposición en ese momento el dispositivo concreto para el que deseas programar de manera que necesitarás obligatoriamente el emulador.

En principio trataremos de trabajar con la aplicación de emulación proporcionada por Android (AVD), pero es posible utilizar otras aplicaciones gratuitas o de pago que consiguen emulaciones tan buenas o incluso más rápidas que la AVD. Éstas, normalmente se valen del uso de máquinas virtuales para poder funcionar.

![5. Emuladores. — figura 1](<Recursos/Imagenes/t2-c-5-figura-01-fb929f94f4cb.png>)

Hay que tener en cuenta que si decidimos cambiar el tipo de emulador utilizado, la salida podrá ser ligeramente diferente en cuanto al aspecto estético del dispositivo emulado.

Si deseamos [usar **Android Emulator**](<https://developer.android.com/studio/run/emulator.html?hl=es-419>) para ejecutar nuestra app, debes preparar un Android Virtual Device (AVD). Si todavía no lo hemos creado, cuando hagamos clic en **Run, aparecerá una ventana para seleccionar el destino de nuestra ejecución. En dicha ventana pulsaremos** en **Create New Emulator**, en el diálogo **Select Deployment Target**. Seguiremos las instrucciones del asistente Virtual Device Configuration para definir el tipo de dispositivo que deseas emular.

Para obtener más información, consulta [Creación y administración de dispositivos virtuales](<https://developer.android.com/studio/run/managing-avds.html?hl=es-419>).

Si quieres echar un vistazo a otros emuladores externos, puedes ver este vídeo:

**Vídeo complementario:** [Ver en YouTube](<https://www.youtube.com/watch?v=nk2IuYfGkH8>) — recurso externo, requiere conexión.


<a id="t2-c-6"></a>

<a id="t2-c-6-mod-book-chapter"></a>

### 6. Instalación y ejecución en un dispositivo real.

Como ya se ha comentado antes, algo que debes tener en cuenta cuando se desarrollan aplicaciones con la tecnología Android Studio (y en general para casi cualquier plataforma) es que el aspecto e incluso el funcionamiento que presente la aplicación puede que sea diferente en un dispositivo real con respecto al que se podía observar en un emulador. Es muy posible que su aspecto varíe según se instale en un dispositivo u otro, así como también si lo pruebas en un emulador u otro.

Esto se debe tanto a las características físicas del propio dispositivo (tamaño, resolución y [colores](<https://www.materialpalette.com/>) de la pantalla, tipo de joystick, botones, etc.) como a la implementación de la máquina virtual de Java que tenga ese dispositivo. Aunque la comparación no es del todo precisa, la situación podría se similar a la que se produce cuando navegas por un mismo sitio web con ordenadores distintos, con sistemas operativos diferentes y con navegadores también distintos, obteniendo visualizaciones de la web diferentes.

La manera más sencilla de probar tu aplicación será transfiriendo el archivo .apk generado de la aplicación a la memoria del dispositivo donde deseas realizar la prueba (a través de un cable USB, por Bluetooth, mediante una tarjeta de memoria, etc.).

Dependiendo del fabricante del dispositivo, es posible que se disponga de alguna utilidad que permita realizar la instalación desde el ordenador (como por ejemplo el **Huawei HiSuite**, **LG PC Suite**, **Samsung Kies**, **Nokia PC SuiteN**, etc), pero tambíen podemos disponer de utilidades no propietarias de fabricantes de móviles(como **AirDroid, MobileGo, Mobo, 91 PC suite**, etc). En cualquier caso siempre se puede hacer lo que se ha comentado antes: copiar el archivo .jar al dispositivo y una vez copiado, instalarlo en el dispositivo simplemente pinchando sobre el archivo **.jar**. El dispositivo preguntará si deseas instalarlo, contestas afirmativamente y la aplicación quedará instalada en el aparato junto con el resto de aplicaciones. Ya sólo faltará ejecutarla como una aplicación más. Si estuvieras desarrollando para otra plataforma diferente a **Java ME**, el proceso podría cambiar dependiendo del fabricante del dispositivo así como del tipo de archivos generados (no será el mismo proceso para un **iOS** que para un **Windows Phone** o para un **Android**, cada plataforma tendrá sus procedimientos específicos de instalación de software).

Nota Importante: Si usas un dispositivo Android físico, debes habilitar la depuración USB en el dispositivo. Puedes ver este video:

**Vídeo complementario:** [Ver en YouTube](<https://www.youtube.com/watch?v=Zqg6Kl46_c4>) — recurso externo, requiere conexión.

Para obtener más información, consulta [Ejecutar apps en un dispositivo de hardware](<https://developer.android.com/studio/run/device.html?hl=es-419>).



<a id="t2-d"></a>

## 2.D. Gestión del entorno y framework de ejecución

<a id="t2-d-1"></a>

<a id="t2-d-1-mod-book-chapter"></a>

### 1. Aspectos fundamentales.

Para describir el entorno de ejecución debemos considerar 3 aspectos importantes:

· El administrador de aplicaciones.

· [El ciclo de vida de una aplicación](<#t2-d-4>).

· [El modelo de estados de una aplicación](<#t2-d-4>).


<a id="t2-d-2"></a>

<a id="t2-d-2-mod-book-chapter"></a>

### 2. El administrador de aplicaciones.

El administrador de aplicaciones o gestor de aplicaciones permite mostrar todas las **apps** que tenemos instaladas en nuestro dispositivo y controlar de un vistazo las que se está ejecutando, desinstalarlas o detenerlas, o incluso conocer en cada momento los recursos que está consumiendo cada una de ellas. Llevará a cabo esencialmente dos funciones:

1. La gestión del ciclo de vida de las aplicaciones en el dispositivo.
2. El control de los estados por los que pasa la aplicación mientras resida en la memoria del dispositivo, es decir, mientras esté en ejecución.

Si estuvieras trabajando una plataforma diferente a **Java ME**, en lugar de Midlets tendrías otro tipo de aplicaciones y su gestión sería también diferente, pero en cualquier caso existirá algún software similar al Gestor de Aplicaciones AMS que permitirá controlar y gestionar las aplicaciones que se instalan y se ejecutan en el dispositivo.

![2. El administrador de aplicaciones. — figura 1](<Recursos/Imagenes/t2-d-2-figura-01-f32a66063475.png>)

A continuación vas a ver cada una de esas dos funciones: cuáles son las fases por las que puede pasar una aplicación y cuáles son los estados de una aplicación en ejecución.


<a id="t2-d-3"></a>

<a id="t2-d-3-mod-book-chapter"></a>

### 3. Ciclo de vida de una aplicación.

El ciclo de vida de una aplicación de Android pasa por cinco fases: **descubrimiento**, **instalación**, **ejecución**, **actualización** y **borrado**.

1. **Descubrimiento** (o **localización**). Consiste en el proceso por el cual un usuario localiza una aplicación Android a través de su dispositivo. El gestor de aplicaciones es el que proporciona los mecanismos necesarios para realizar la elección de la aplicación que se desea descargar (mediante un cable USB, Bluetooth, conexión a Internet, etc.).
2. **Instalación**. Una vez que la aplicación ha sido descargada en el dispositivo, ésta puede ser instalada. El gestor de aplicaciones de Android se encargará de controlar el proceso de instalación informando al usuario de la evolución de este proceso. Una vez instalado la aplicación, éste permanecerá en el dispositivo (en memoria persistente) hasta que el usuario decida borrarlo.
3. **Ejecución**. El gestor de aplicaciones de Android es también el que permite poner en ejecución la aplicación. Una vez que una aplicación está en ejecución, el gestor de aplicaciones también tendrá el control de los distintos estados por los que pueda pasar dicha aplicación dependiendo de los eventos que se vayan desencadenando durante esa ejecución.
4. **Actualización**. Una vez que una aplicación ha sido descargada, el gestor de aplicaciones de Android debe ser capaz de detectar si se trata de una actualización de una aplicación ya presente en el dispositivo. En tal caso se informaría al usuario para que decidiera si quiere llevar a cabo o no la actualización.
5. **Borrado**. Si el usuario así lo desea, el gestor de aplicaciones de Android se encargará de borrar la aplicación del dispositivo. Normalmente se solicitará confirmación y se informará de las posibles incidencias durante el proceso de borrado.


<a id="t2-d-4"></a>

<a id="t2-d-4-mod-book-chapter"></a>

### 4. Modelo de estados de una aplicación.

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

**![4. Modelo de estados de una aplicación. — figura 1](<Recursos/Imagenes/t2-d-4-figura-01-a964f212e58e.png>)**

Figura 1: Ciclo de vida de la actividad en relación a la **gestión de sus eventos principales**.

  

![4. Modelo de estados de una aplicación. — figura 2](<Recursos/Imagenes/restaurar-estado-de-actividad-a23602756100.png>)

Figura 2 - Estados de una actividad **en relación a su información de estado**. Fuente: developer.android.com

![Ciclo de vida de una actividad - en relación a la gestión de su estado](<Recursos/Imagenes/t2-d-4-figura-03-ddb6ea9c1702.png>)

Figura 3: Ciclo de vida de una Actividad **en relación a los eventos principales y la gestión de su estado**. Hacer notar que las llamadas callback para la gestión explicita del estado sólo se hacen cuando el ciclo de vida es el señalado por el camino en rojo. (para mayor detalle ver este [link](<https://www.okhelp.cz/android/how-going-life-cycle-if-screen-orientation-changed-android-example/>))
