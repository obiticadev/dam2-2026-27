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

## Revisión controlada — 2026-11-14

- Sustituidas las pistas de ensayo por frases para el espectador, sin añadir contenidos al discurso memorizado. Se conservan los títulos narrativos, las ilustraciones SVG, la paleta, los once slides y el reparto de ponentes.
- Las diapositivas 5 y 8 muestran tres frases literales del guion cada una; el énfasis tipográfico señala present continuous, present perfect y present perfect continuous. Las demás pantallas presentan mensajes y comparaciones completos, con títulos y etiquetas breves donde ayudan a orientarse.
- `GUION.md` permanece idéntico byte a byte. SHA-256 antes y después: `d5d1afaa72ff65d792a84cf42df343dc6d0b9846ef76743b3798f3735cb9db2f`.
- `npm run build` y `npm run check`: correctos. Once pantallas comprobadas a 1600 × 900, 1280 × 800 y 844 × 390, sin desbordamientos ni solapamientos detectados. También se verifican las seis frases contra el guion, la identificación de las escenas ficticias, la navegación, los enlaces y la exclusión del guion completo del build.
- Revisión visual de la hoja de contacto actual de las once pantallas, escenas 5 y 8 y muestra móvil de la 5. Comprobado además el servidor de desarrollo en `http://localhost:3031` y capturas con movimiento habilitado de las pantallas 5, 6 y 8.
- Impeccable aplicado como refinamiento del diseño existente, no como rediseño. Su detector devuelve solo un aviso orientativo sobre el rebote breve preexistente de los iconos; se conserva deliberadamente por el tono infantil y no se añaden animaciones. Se mantiene el modo de movimiento reducido.
- `git diff --check`: correcto. Sin despliegue, commit, push ni cambios en la bóveda o RissyTech. No se ha hecho una nueva auditoría de dependencias ni un ensayo oral humano.
