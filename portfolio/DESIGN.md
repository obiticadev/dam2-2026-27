---
name: Portfolio de Oliver Bitica
description: Portfolio personal con diagramas que explican proyectos reales.
colors:
  paper: "#fbf8ef"
  ink: "#272720"
  primary: "#dceac3"
  canvas: "#f0ebdd"
  marker: "#ead8a8"
  rule: "#cec6b4"
  muted: "#554f42"
  sheet: "#f6f1e5"
  host: "#f2ecd9"
  compose: "#edf0ee"
  catalog: "#f8f1df"
  editor: "#eef2f6"
  issue: "#eaf0dd"
  pdf: "#f3ebf4"
  active-edge: "#596847"
  node-edge: "#aea48e"
  night-paper: "#211e1a"
  night-ink: "#efe6d6"
  night-primary: "#3f4c2b"
  night-canvas: "#28241f"
  night-marker: "#53472d"
  night-muted: "#c6bfb7"
typography:
  display:
    fontFamily: 'ui-monospace, "DejaVu Sans Mono", Consolas, monospace'
    fontSize: "clamp(2.55rem, 6vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-.035em"
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.65
rounded:
  control: ".45rem"
  action: ".5rem"
  inset: ".55rem"
  host: ".65rem"
  panel: ".95rem"
---

# Sistema visual: Portfolio de Oliver Bitica

## Overview

Portfolio editorial sobre papel cálido, con titulares monoespaciados y diagramas isométricos. Designed to Scale orienta la animación, los iconos, los resaltados y la paleta nocturna, no la composición.

## Colors

Verde para acciones y pasos activos, ocre para subrayar texto y colores distintos para reconocer las piezas de cada recorrido. El modo noche usa marrones cálidos y tinta crema, sin invertir las ilustraciones. Los valores operativos están en `src/styles/site.css`.

## Typography

Monoespaciada para titulares, navegación y etiquetas; fuente de sistema para párrafos y explicaciones.

## Layout

Columna de hasta 1200 px. La presentación precede al proyecto destacado; su texto y diagrama van en paralelo en escritorio y se apilan en pantallas pequeñas.

## Elevation & Depth

La profundidad está en las figuras isométricas; el resto se separa con bordes finos y cambios de superficie.

## Components

Los diagramas muestran el recorrido completo en reposo. Al reproducir, se resalta el paso activo y un pulso recorre la conexión. Con movimiento reducido, el resaltado y las explicaciones siguen disponibles sin el pulso ni el desplazamiento.

## Do's and Don'ts

- Mantén separados el recorrido del presupuesto y el orden de arranque del despliegue.
- No introduzcas barras laterales de curso ni confíes solo en el color para explicar un paso.
