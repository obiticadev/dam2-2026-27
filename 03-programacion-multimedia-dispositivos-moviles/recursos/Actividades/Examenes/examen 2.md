# RA3-Tarea individual: Reproductor Multimedia MP3

> **Módulo:** Programación Multimedia y Dispositivos Móviles (`PMM_V`)  
> **Unidad:** UT03 - Desarrollo de aplicaciones básicas para Android  
> **Actividad evaluable:** RA3 - Tarea individual  
> **Apertura:** miércoles, 3 de diciembre de 2025, 15:35  
> **Cierre:** jueves, 11 de diciembre de 2025, 23:00

---

## Contenidos

1. [Enunciado](#enunciado)
2. [Requisitos funcionales y de ciclo de vida](#requisitos-funcionales-y-de-ciclo-de-vida)
3. [Formato de la entrega](#formato-de-la-entrega)
4. [Criterios de evaluación](#evaluación)
5. [Estado de la entrega](#estado-de-la-entrega)

---

## ENUNCIADO

Crea una app en Android Studio que permita reproducir archivos de audio en
formato MP3 utilizando el MediaPlayer.

Los ficheros a reproducir podrán estar ubicados en local o en Internet, por lo
que deberás proporcionar un selector adecuado en el layout de la actividad.

También deberás proporcionar botones de Play, Pause y Stop, así como una barra
de progreso (SeekBar) que permita buscar una posición en la canción y reproducir
a partir de ella.

Mostrarás el tiempo actual de reproducción y la duración total de la canción.

Si la aplicación se cierra mientras se reproduce una canción, al volver a
abrirla deberás continuar con la reproducción en el punto en que se encontraba.

También deberás realizar la gestión adecuada del ciclo de vida, reservando y
liberando los recursos en los eventos adecuados.

---

## Requisitos funcionales y de ciclo de vida

### 1. Fuente y reproducción de medios (`MediaPlayer`)

- Soporte dual para archivos de audio MP3:
  - **Local:** directorio `res/raw` o almacenamiento del dispositivo.
  - **Remoto:** URL HTTP/HTTPS con permisos de red (`INTERNET`).
- Selector de origen accesible desde el layout principal (`RadioGroup`,
  `Spinner` o botones de selección).

### 2. Controles de reproducción e interfaz

- Botones de acción: `Play`, `Pause` y `Stop`.
- Barra de desplazamiento (`SeekBar`):
  - Actualización periódica en tiempo real durante la reproducción.
  - Capacidad de arrastrar para posicionar la reproducción (`seekTo(position)`).
- Visualización de tiempos: contador de posición actual (`00:00`) y duración
  total (`00:00`).

### 3. Persistencia y gestión del ciclo de vida

- **Supervivencia a cierres:**
  - Almacenar la última pista y milisegundo de reproducción (`SharedPreferences`
    o `Bundle`).
  - Reanudar en la posición guardada al iniciar la aplicación.
- **Liberación de recursos:**
  - Liberación ordenada del objeto `MediaPlayer` (`release()`) en `onStop()` /
    `onDestroy()` para evitar fugas de memoria o retención indebida de hardware
    de audio.

---

## FORMATO DE LA ENTREGA

Deberás entregar el **APK** y el **código** utilizando la opción exportar de
Android Studio.

El nombre de los ficheros deberá seguir el formato
**nombre_apellido1_apellido2**

---

## EVALUACIÓN

- Se comprobará el funcionamiento correcto de la aplicación instalando el APK en
  un móvil Android, de modo que si no se ejecuta o da errores, se evaluará
  automáticamente con un 0.
- Posteriormente, se realizará una inspección del código para evaluar la
  implementación de la solución.
- Cuando el profesor tenga dudas de la autoría del trabajo o de la comprensión
  de la solución aportada por parte de alumno, podrá requerir una defensa oral
  del trabajo.

---

## Estado de la entrega

| Campo               | Estado                                |
| :------------------ | :------------------------------------ |
| **Intento**         | Intento 1 ( 2 intentos permitidos )   |
| **Entrega**         | Todavía no se han realizado envíos    |
| **Calificación**    | Sin calificar                         |
| **Tiempo restante** | Tarea retrasada por 284 días 15 horas |
