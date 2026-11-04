# Verificación — 2026-11-04

## Ejecutado

- `npm install`: dependencias y `package-lock.json` generados para este proyecto.
- `npm run build`: compilación estática correcta con Slidev 53.0.0 y `--without-notes`.
- `npm run check` sobre el build servido con preview: **correcto**.
  - Once diapositivas con título y fuente local cargada.
  - Sin desbordamientos detectados en las áreas de texto e ilustración comprobadas.
  - Navegación de teclado y relevo Rubén → Oliver.
  - Enlaces entre cierre y anexo; dos enlaces externos de fuentes presentes (no se abren durante las pruebas).
  - Viewport escritorio 1600 × 900 y muestras de cinco páginas en móvil horizontal 844 × 390, sin recorte.
  - Sin errores JS, respuestas HTTP fallidas ni solicitudes de recursos remotos en el recorrido.
  - Guion y documentación privada no copiados al build; búsqueda de una frase del guion en los archivos públicos negativa.
- `npm ls dompurify`: versión 3.4.17 aplicada correctamente mediante override.
- `npm audit --json`: quedan **4 avisos altos**, 0 críticos, en la cadena de exportación PPTX; véanse las limitaciones de seguridad del README. Auditoría no limpia.
- `git diff --check`: sin incidencias en archivos ya seguidos. El proyecto nuevo continúa sin seguimiento; no se ha hecho commit ni push.

## Revisión visual y documental

- Revisadas capturas individuales de portada, religión, transición a USA, escena del superhéroe y fuentes; después, hoja de contacto de las once páginas y muestra móvil del fantasma.
- Detectado y corregido un pie que quedaba detrás del fondo; pruebas repetidas tras corregirlo.
- Ilustraciones legibles, paleta crema/lila con páginas nocturnas, contraste reforzado y sin animaciones continuas.
- Cobertura de los cuatro apartados del enunciado contrastada con el guion y registrada en `FUENTES.md`.
- Ambos ponentes tienen ejemplos de present simple, continuous, perfect y perfect continuous, y vocabulario de Unit 1 con traducción y procedencia en `GUIA-LINGUISTICA.md`.
- Recuento aproximado del texto hablado: **Rubén 323 palabras, Oliver 330**. Con doce segundos de pausas por persona, equivale a unas 115–118 palabras por minuto para llegar a tres minutos. No se ha realizado un ensayo oral humano ni se garantiza la duración exacta.

Capturas e informe automático disponibles localmente en `.qa/` e ignorados por Git. No se incluyen en el despliegue.

## No realizado / límites

- Sin despliegue, dominio, commit, push ni cambios en la bóveda o RissyTech.
- Sin PDF o PowerPoint: la entrega preparada es una web Slidev y documentación Markdown.
- Sin acceso a una rúbrica no presente en el material revisado ni confirmación docente del foco en Inglaterra.
- La prueba visual no certifica legibilidad en el proyector real ni en móviles verticales. Se recomienda ensayo en el aula.
- Las fuentes culturales se han leído; no se han seguido sus imágenes ni copiado artículos. Los ejemplos ilustrados son ficticios.
