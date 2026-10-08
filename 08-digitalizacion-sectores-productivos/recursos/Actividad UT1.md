# Actividad UT1: Digitalización en entornos IT y OT

**Actividad:** "El Gemelo Digital en Papel" – Consultores de la Fábrica del Futuro  
**Módulo:** Digitalización Aplicada a los Sistemas Productivos  
**Perfil:** DAM (Desarrollo de Aplicaciones Multiplataforma)  
**Modalidad:** Trabajo en Equipo (Recomendado: 3 o 4 integrantes con roles IT y OT)

---

## 🎯 Objetivo de la actividad

Aprender a identificar qué elementos del mundo físico (OT) necesitan ser conectados al mundo digital (IT), qué datos generan, cómo viajan y qué valor aportan al negocio, utilizando únicamente diagramas de flujo, mapas conceptuales y pensamiento lógico.

---

## 🏢 El Caso de Estudio: La Fábrica de Patatas Fritas "RissyTech"

Descripción de una fábrica tradicional que quiere dar el salto a la Industria 4.0. La fábrica tiene 4 estaciones físicas (OT):

1. **Lavado y Pelado:** Una máquina que consume mucha agua y donde a veces entran piedras que rompen las cuchillas.
2. **Corte y Fritura:** Una freidora industrial gigante a gas. Si el aceite se calienta de más, las patatas se queman; si se enfría, salen aceitosas.
3. **Embolsado:** Una máquina neumática que sella las bolsas con aire a presión.
4. **Almacén y Expedición:** Palés listos para subirse a los camiones de reparto.

---

## 👥 Dinámica de Trabajo (Roles IT / OT)

Grupos de 4 alumnos. Dentro de cada grupo, se asignan roles emparejados:

- **Perfil OT (2 alumnos):** Hacen el rol de "Directores de Planta". Conocen cómo funciona la maquinaria física y sus problemas diarios.
- **Perfil IT (2 alumnos):** Hacen el rol de "Arquitectos de Software (futuros DAM)". Conocen qué se puede hacer con bases de datos, webs y apps móviles.

---

## 🏭 1. Introducción al Caso: La Fábrica "RissyTech"

La empresa familiar "RissyTech S.A." se dedica a la fabricación industrial de patatas fritas desde hace 30 años. Su maquinaria es analógica y robusta (Mundo OT), pero la dirección ha notado que pierden mucho dinero por falta de información en tiempo real (Mundo IT). Actualmente, si una máquina falla o el producto sale defectuoso, se dan cuenta horas más tarde, cuando el lote ya está arruinado. Te han contratado como equipo de consultoría de digitalización para transformar su planta tradicional en una *Smart Factory* (Fábrica Inteligente).

### El Proceso Productivo Actual (Tus áreas de intervención):

1. **Estación de Lavado y Pelado:** Entran las patatas con tierra. A veces se cuelan piedras que dañan las cuchillas de corte, parando la fábrica durante horas.
2. **Estación de Corte y Fritura:** Una freidora gigante a gas. Si el aceite supera los 190°C, las patatas se queman. Si baja de 170°C, absorben demasiado aceite y quedan blandas. Actualmente, un operario mide la temperatura manualmente cada hora con un termómetro de mano.
3. **Estación de Embolsado y Sellado:** Una máquina sella las bolsas usando aire a presión. Si la presión del compresor baja, las bolsas quedan mal selladas y las patatas se ponen rancias antes de llegar al supermercado.
4. **Almacén y Expedición:** Las cajas se apilan en palés. El recuento de stock se hace a mano en una libreta al final del día.

---

## ❓ 2. Preguntas Clave y Retos a Resolver

Vuestro equipo debe diseñar el Plan de Transformación Digital de la fábrica. Para ello, extended vuestras respuestas y diagramas resolviendo los siguientes retos:

### 🧠 RETO 1 (Común): Captura de Datos en el Mundo Físico (Foco OT)

- **Pregunta 1.1 (Sensores):** ¿Qué sensores instalaríais en cada una de las 4 estaciones para sustituir el control manual? Especificad qué variable física mide cada uno.
- **Pregunta 1.2 (Actuadores):** ¿Qué elementos mecánicos o automáticos (actuadores) proponéis instalar para que el sistema reaccione físicamente ante un peligro sin intervención humana? (Ejemplo: una válvula de gas, un brazo expulsor...).

---

### 📱 GRUPO DAM: Movilidad, Interacción de Operarios y Edge Computing

Este grupo se centrará en la experiencia del trabajador que está a pie de máquina, la usabilidad en dispositivos portátiles y la reacción rápida ante emergencias.

#### ❓ Preguntas Específicas / Retos

- **Reto DAM.1: Lógica de Notificaciones Críticas.** Cuando el sensor de presión de la Estación 3 (Embolsado) detecta una anomalía, el operario no está mirando una pantalla de ordenador; está caminando por la fábrica. Diseña el flujo lógico de cómo la aplicación móvil debe capturar ese evento y captar la atención del usuario de forma inmediata (vibración, alertas sonoras, colores).
- **Reto DAM.2: App del Operario del Futuro (Diseño Móvil/Tablet).** Dibuja el boceto de la interfaz de una aplicación para tablet industrial que llevará el mecánico de mantenimiento. La pantalla debe permitir:
  1. Ver el estado del motor de la peladora.
  2. Un botón gigante de "Confirmar Reparación" que, al pulsarlo, envíe una señal al actuador físico para que la máquina vuelva a girar de forma segura.
- **Pregunta Clave de Reflexión:** Los operarios trabajan con guantes, ruido industrial y las manos a menudo manchadas. ¿Qué funciones de los smartphones o dispositivos móviles modernos (ej: control por voz, lectura NFC, linterna/cámara) propones integrar en la app para facilitarles el trabajo diario sin que tengan que teclear?

---

## 📱 Rúbrica de Evaluación: GRUPO DAM (Movilidad y Experiencia del Operario)

| Criterio de Evaluación | Excelente (9-10 pts) | Aceptable (5-8 pts) | Insuficiente (0-4 pts) |
| :--- | :--- | :--- | :--- |
| **Mundo Físico (OT)** | Identifica con precisión sensores y actuadores lógicos para las 4 estaciones. | Identifica sensores básicos pero confunde algún concepto o deja alguna estación incompleta. | No distingue entre sensor y actuador o las propuestas no tienen sentido industrial. |
| **Lógica de Notificaciones (Reto DAM.1)** | Diseña un flujo excelente y multisensorial (vibración, color, sonido) adaptado a un entorno ruidoso para captar la atención del operario. | El flujo de la notificación es correcto pero se basa únicamente en texto en pantalla, poco efectivo para un operario en movimiento. | La notificación no está diseñada para la movilidad o ignora por completo el entorno físico de la fábrica. |
| **App para Tablet Industrial (Reto DAM.2)** | El boceto para tablet/móvil es impecable, adaptado a la usabilidad industrial, mostrando el motor e incluyendo el botón crítico de confirmación. | El boceto de la app muestra la información pero los controles son pequeños, complejos o poco interactivos para un mecánico. | El diseño de la aplicación móvil carece de interactividad, botones de acción o control de la maquinaria. |
| **Uso de Características Hardware** | Propone una integración brillante y justificada de hardware móvil (NFC, Voz, Cámara/Linterna) para resolver las limitaciones del operario (guantes, ruido). | Menciona el uso de alguna característica del móvil pero de forma genérica o sin adaptarla a la problemática de la planta. | No aprovecha las ventajas nativas del dispositivo móvil o propone soluciones que dificultan el trabajo del operario. |
| **Presentación y Cohesión** | Defiende el prototipo enfocándose totalmente en la experiencia del usuario (UX) en planta y la rapidez de respuesta ante emergencias. | Expone el diseño de la app pero de forma estática, sin transmitir cómo interactúa realmente el operario con el entorno industrial. | La presentación no se centra en la movilidad o los integrantes no demuestran coordinación en el diseño del flujo móvil. |
