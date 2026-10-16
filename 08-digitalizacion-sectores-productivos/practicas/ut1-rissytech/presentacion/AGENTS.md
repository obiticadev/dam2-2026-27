# Proyecto RissyTech

- Antes de editar diapositivas, carga las skills locales `slidev` y `rissytech-presentacion`.
- Las skills están en `.opencode/skills/`, exclusivamente para este proyecto. No instalar skills globales.
- Fuente académica: `../documentacion/TAREA_presentacion.pdf`. Conserva los originales.
- Escribe en español. La presentación consta de 13 diapositivas principales y un anexo de fuentes.
- Usa `slidev-styling`, `slidev-click-animations` y `slidev-components` como referencias comunitarias complementarias; la documentación oficial prevalece si hay discrepancias.
- Separa hechos del documento, propuestas y simulaciones. No inventes resultados o ahorros.
- El controlador local valida la seguridad: confirmar una alerta o reparación no debe arrancar una máquina automáticamente.
- Verifica con `npm run build` y revisa visualmente los cambios de diseño.
- Ejecuta `npm run check` con el servidor de desarrollo o preview activo. Las capturas y el informe se generan en `.qa/` (ignorado por Git).
- Al exportar el PDF, conserva la espera de 1000 ms para evitar capturar transiciones entre páginas. Revisa el PDF generado, no solo el resultado del comando.
- Publica solo `dist/`, nunca los documentos ni `.opencode/`. No desplegar sin petición expresa.
