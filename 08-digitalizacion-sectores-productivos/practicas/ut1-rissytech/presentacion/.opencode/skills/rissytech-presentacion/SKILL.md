---
name: rissytech-presentacion
description: Diseñar y revisar la presentación de la UT1 de RissyTech, transformar el documento académico en un relato visual sobre IT y OT y preparar su publicación estática en Cloudflare Pages.
---

# Presentación de RissyTech

## Fuente y alcance

Lee `../documentacion/TAREA_presentacion.pdf` desde la raíz del proyecto antes de desarrollar el contenido definitivo. Usa la skill `slidev` para la implementación técnica.

## Relato

1. Presentar el problema de la fábrica tradicional.
2. Recorrer las estaciones: lavado y pelado, corte y fritura, embolsado, almacén.
3. Conectar variable física, sensor, controlador y actuador sin confundir IT y OT.
4. Explicar el flujo de alertas críticas y la actuación del operario.
5. Mostrar la app de mantenimiento y la ergonomía con guantes y ruido.
6. Cerrar con beneficios esperados, sin inventar métricas.

## Diseño

- Una idea por diapositiva; estructura actual: 13 diapositivas principales y un anexo.
- Priorizar esquemas, tarjetas y diagramas frente a tablas densas del PDF.
- Tipografía legible en proyector, contraste alto y formato 16:9.
- Azul noche y turquesa como base; rojo para alarmas. Añadir texto e iconos: el color no basta.
- Animaciones discretas al servicio de la explicación. Evitar movimiento continuo.
- Añadir notas para la exposición sin saturar la pantalla.

## Seguridad y rigor

- El PLC/controlador local actúa sin depender de Internet ni del móvil.
- Distinguir «alerta recibida», «reparación confirmada» y «arranque autorizado».
- Rotular las demos como simulaciones educativas sin conexión a maquinaria real.
- No atribuir al sensor de vibración una identificación directa de piedras.
- Mantener el intervalo de fritura del caso: 170–190 °C.

## Verificación y publicación

- Ejecutar `npm run build`; revisar desbordamientos y navegación en navegador.
- Comprobar que las notas privadas no se incluyen en el build público.
- Cloudflare Pages: raíz = directorio `presentacion`, comando = `npm run build`, salida = `dist`.
- No publicar documentos originales, skills ni secretos. No desplegar sin autorización.
