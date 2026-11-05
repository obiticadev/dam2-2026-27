# Halloween — Two stops, one spooky night

Presentación **Slidev en inglés**, orientada a niños de unos 8–11 años. Diez diapositivas para unos seis minutos más una de fuentes opcional. Rubén presenta UK con foco en Inglaterra (1–5); Oliver, Estados Unidos (6–10). El tiempo definitivo se ajusta ensayando, no se garantiza por el número de diapositivas.

## Lo que hay

- **[GUION.md](./GUION.md)**: texto de ensayo separado, tiempos, reparto y pistas. No se incluye en el sitio público.
- **[GUIA-LINGUISTICA.md](./GUIA-LINGUISTICA.md)**: traducciones, pronunciación, vocabulario de la bóveda y cuatro tiempos del presente por persona.
- **[FUENTES.md](./FUENTES.md)**: fuentes culturales, cobertura y matices, incluida la diferencia Inglaterra/UK.
- `slides.md`: únicamente apoyo visual y palabras clave, sin el discurso completo.
- `components/StoryArt.vue`: ocho escenas SVG originales e ilustradas (cielo, decorado y personajes), sin recursos de imagen remotos.
- `components/NightSky.vue`, `Voyage.vue` y `StepIcon.vue`: cielo de las diapositivas nocturnas, barco del cruce del Atlántico e iconos de tarjetas. Todo decorativo (`aria-hidden`).
- `style.css` y `slide-bottom.vue`: identidad de cuento ilustrado, navegación y relevo visibles.
- `scripts/check-presentation.mjs`: comprobaciones y capturas del build.

## Abrir y ensayar

Node.js **22.12 o posterior compatible con Slidev**:

```bash
npm ci
npm run dev
```

Abrir `http://localhost:3031`. Flecha derecha / espacio: siguiente. Flecha izquierda: anterior. `O`: vista general. Pantalla completa desde la barra de Slidev. Las transiciones son fundidos, salvo el relevo 5 → 6, que se desliza como un viaje. Al entrar en cada diapositiva, las ilustraciones y las tarjetas aparecen con una animación breve que termina sola (unos 2–3 s); no hay pasos ocultos que puedan dejar a alguien sin una pista. No hay sonidos, sustos ni movimiento continuo. Se respeta movimiento reducido.

La intervención infantil dura unos segundos, sin depender de que el público conteste. La diapositiva 10 cierra la charla. El enlace **Our sources** abre la 11; no hace falta avanzar a ella durante el speaking. En móvil, usar orientación horizontal: es una presentación 16:9, no una web de lectura vertical.

## Build y comprobación

```bash
npm run build
npm run preview
```

Con preview activo, en otra terminal:

```bash
npm run check
```

El test usa `http://127.0.0.1:4174`, recorre las once pantallas, comprueba límites del contenido, recursos, errores JS, enlaces de ida/vuelta al anexo, navegación de teclado y viewport móvil. Deja capturas e informe en `.qa/` (ignorado por Git). Usa Chromium del sistema en Linux, o `CHROMIUM_PATH`; en otros sistemas utiliza el Chromium instalado por Playwright. Para instalarlo si hace falta: `npx playwright install chromium`.

## Cloudflare Pages (preparado, no publicado)

Si se conecta el repositorio del curso:

| Campo | Valor |
|---|---|
| Directorio raíz | `07-ingles-profesional/practicas/halloween-uk-us` |
| Comando | `npm run build` |
| Salida | `dist` |
| Node.js | 22.12.0 o posterior compatible |

También se puede subir **solo el contenido de `dist/`** mediante Direct Upload. La navegación hash (`/#/6`, etc.) evita reglas especiales para cada diapositiva. No se ha reservado un dominio ni configurado una cuenta. El build no despliega automáticamente.

**No subir la carpeta del proyecto completa**: ni la bóveda, ni el guion, ni las guías, ni `node_modules`, ni las capturas de pruebas. No poner documentos privados en `public/`, porque esa carpeta sí se copia al sitio. Las fuentes culturales públicas también aparecen en el anexo. Los nombres de los dos ponentes son públicos en los metadatos del deck.

## Decisiones de contenido

Se ha leído la actividad y una selección de gramática y vocabulario de Unit 1 de la bóveda, sin modificarla. No se ha encontrado rúbrica. La adaptación infantil conserva los cuatro apartados del enunciado, pero no garantiza una nota ni que la profesora acepte cualquier alcance: si proporciona una rúbrica o exige más sobre Escocia, Gales o Irlanda del Norte, habrá que adaptarlo.

Las escenas inventadas están identificadas como tales. La presentación se centra en comparar con cuidado, no en afirmar que todos los ingleses o estadounidenses celebran igual. El guion no está incrustado en comentarios ni notas; `build` usa además `--without-notes` por prevención.

## Dependencias y seguridad

La instalación inicial mostró 8 avisos de auditoría, incluido uno crítico. Se fijó `dompurify` en **3.4.17** mediante `overrides`, eliminando los avisos asociados a esa dependencia. La auditoría posterior conserva **4 avisos altos** en la cadena `image-size → pptxgenjs → Slidev`. Su origen es el análisis de imágenes de exportación PPTX; esta presentación no importa imágenes de terceros ni ofrece esa exportación. Esto no equivale a certificar ausencia de riesgos.

No se ha forzado una actualización mayor de `image-size` ni un downgrade de Slidev. No procesar materiales no confiables ni exponer el servidor de desarrollo a Internet. Chromium del sistema se ha usado para las pruebas, sin aprobar scripts de instalación adicionales de Playwright. Antes de publicar, se recomienda volver a ejecutar `npm audit` y revisar si Slidev ha corregido esa cadena.
