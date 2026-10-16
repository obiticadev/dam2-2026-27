# RissyTech — La fábrica a ciegas

Presentación de la UT1 de Digitalización: **13 diapositivas principales y un anexo conservado pero desactivado**, con diagramas SVG propios, arquitectura OT–IT por zonas y dos demos interactivas. Tema claro editorial. Duración orientativa: **15–17 minutos**.

Dirección creativa, alternativas distópicas, guion de apertura y fuentes de investigación: [DIRECCION-CREATIVA.md](./DIRECCION-CREATIVA.md). «La fábrica a ciegas» es una metáfora narrativa, no un incidente real.

## Ver y presentar

Requiere Node.js >=22.12.0. Desde este directorio:

```bash
npm ci
npm run dev
```

Abre `http://localhost:3030`. Avanza con `→` o `Espacio`, retrocede con `←` y abre la vista general con `O`. Para pantalla completa utiliza el control de la barra de Slidev. En móvil se recomienda orientación horizontal.

Las diapositivas 2, 6 y 7 tienen revelaciones por pasos. Las demos 8 y 9 se manejan con sus propios controles; los clics en ellas no avanzan la presentación. Al volver a entrar en una demo, se restablece su estado.

Las notas del presentador están en los comentarios de `slides.md`, con fuentes, secuencia y tiempos orientativos. Se pueden ver en el modo presentador del servidor local.

### Demo 8: alerta de presión

1. «Simular caída de presión»: el PLC ya ha interrumpido el sellado.
2. «Simular plazo agotado»: se repite el aviso y escala a mantenimiento.
3. «Alerta recibida»: asigna la atención, **sin reiniciar la máquina**.

### Demo 9: reparación del motor

1. Marca «Intervención terminada» y pulsa «Confirmar reparación».
2. Pulsa «Validar PLC» sin marcar las otras dos condiciones: el arranque sigue bloqueado.
3. Marca guardas cerradas y zona despejada. Valida de nuevo.
4. Pulsa «Arranque simulado». El panel cambia a funcionamiento.
5. Quitar una condición retira la autorización y detiene el motor simulado.

**Son simulaciones educativas.** No hay conexión a sensores, maquinaria, servicios de notificaciones ni sistemas de seguridad. La app web no vibra ni reproduce sonidos. Las casillas simulan señales que en una instalación real vendrían del hardware y de procedimientos autorizados.

## Estructura

```text
slides.md                    Contenido, pasos y notas para exponer
style.css                    Identidad visual y tipografías locales
components/                  Iconos, diagramas y demos Vue
slide-bottom.vue             Marca, progreso y paginación por diapositiva
public/favicon.svg           Identidad del sitio
scripts/check-presentation.mjs  Pruebas de navegador
.opencode/skills/             Skill oficial, tres comunitarias y skill del proyecto
```

Los documentos originales permanecen en `../documentacion/`, fuera de los recursos públicos.

## Compilación y Cloudflare Pages

```bash
npm run build
npm run preview
```

El build **no incluye las notas del presentador**. Fuentes, iconos y diagramas se sirven localmente: no se necesitan Google Fonts, imágenes remotas ni un backend para las demos.

Configuración de Cloudflare Pages si se conecta el repositorio del curso:

| Campo | Valor |
|---|---|
| Directorio raíz | `08-digitalizacion-sectores-productivos/practicas/ut1-rissytech/presentacion` |
| Comando de compilación | `npm run build` |
| Directorio de salida | `dist` |
| Node.js | 22.12.0 o posterior compatible con Slidev |

También se puede subir **solo el contenido de `dist/`** mediante Direct Upload. Se usa navegación hash para que los enlaces a diapositivas no requieran reglas de redirección. No subas la carpeta completa del proyecto.

No se ha realizado ningún despliegue ni configurado una cuenta de Cloudflare.

## PDF de respaldo

`playwright-chromium` ya está en las dependencias de desarrollo. En esta máquina se utiliza Chromium del sistema:

```bash
npm run export -- --per-slide
```

Genera `rissytech-transformacion-digital.pdf` (ignorado por Git). Puedes instalar el navegador con `npx playwright install chromium`. En Linux, si se usa Chromium del sistema, añadir `--executable-path /usr/bin/chromium`. Se exporta en claro, de acuerdo con `colorSchema: light`.

El PDF muestra todos los pasos de los diagramas y una alerta de presión activa. Las demos se convierten en representaciones estáticas; no sustituyen a la web interactiva. El `wait: 1000` de exportación permite terminar las transiciones antes de capturar.

La exportación puede emitir un aviso interno de TwoSlash/FloatingVue de Slidev («Failed to patch FloatingVue»). El verificador lo informa por separado de los errores de la presentación.

## Verificación

Con el servidor activo:

```bash
npm run check
```

Para comprobar el build estático, arranca `npm run preview -- --port 4173` y ejecuta:

```bash
SLIDEV_URL=http://localhost:4173 npm run check
```

Se comprueban 13 diapositivas, límites del contenido (incluidos textos SVG), pasos de arquitectura, escalado y confirmación de alertas, bloqueo/validación/arranque, revocación de seguridad y un viewport móvil. Guarda capturas e informe en `.qa/`, ignorado por Git.

El script utiliza el Chromium de Playwright en Windows y `/usr/bin/chromium` en Linux; admite otra ruta con `CHROMIUM_PATH`. También verifica que no haya errores de JavaScript ni solicitudes a recursos externos.

## Criterios editoriales

- Blanco dominante y tinta azul noche; turquesa para control físico, naranja para regulación, azul para IT y morado para registros/almacén. Rojo reservado a anomalías.
- Manrope para titulares e Inter para lectura, empaquetadas localmente mediante Fontsource. Sus licencias SIL OFL se distribuyen en `public/licenses/`.
- Diagramas inspirados en el lenguaje visual de arquitectura cloud, **sin iconos oficiales ni servicios AWS**. No se presupone infraestructura de ningún proveedor.
- Animaciones de revelación y trazado de conexiones, no movimiento continuo. Respeto de `prefers-reduced-motion`.
- Fuente: PDF del equipo, páginas impresas 1–8. La arquitectura detallada, hoja de ruta e indicadores se identifican como propuestas, no como resultados medidos.
- Skills instaladas solo en `.opencode/skills/`; procedencia y licencias en su README.

## Dependencias

La instalación de Slidev 53.0.0 notificó 19 avisos de `npm audit` (9 moderados y 10 altos) en el árbol de dependencias. Su revisión sigue pendiente; no se ha ejecutado `npm audit fix --force` ni cambiado a versiones incompatibles. Compilar correctamente no equivale a una auditoría de seguridad. No procesar materiales no confiables ni exponer el servidor de desarrollo a Internet.
