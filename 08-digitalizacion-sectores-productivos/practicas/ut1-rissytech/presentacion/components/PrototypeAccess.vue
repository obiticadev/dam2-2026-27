<script setup>
import TechIcon from './TechIcon.vue'
const url = 'https://www.figma.com/make/iSTIGsoBR2aFBGX2rocvTo/Industrial-Maintenance-App-Interface'
</script>

<template>
  <div class="prototype-access">
    <div class="prototype-preview"><div class="preview-bar"><span class="preview-dots">● ● ●</span><span>RISSYTECH / PROTOTIPO DE MANTENIMIENTO</span><span>FIGMA MAKE</span></div><img src="/figma-mantenimiento.png" alt="Captura real del prototipo de Figma: diagnóstico del motor de peladora y protocolo de seguridad" /><div class="preview-caption"><TechIcon name="motor" :size="18" /><span>Estado del motor · Causa de la parada · Diagnóstico del operario</span></div></div>
    <div class="prototype-invite"><span class="pill blue-pill">EXPLORA EL PROTOTIPO</span><h2>De la idea<br>a la interfaz.</h2><p>Abre el proyecto para recorrer la propuesta de mantenimiento y sus estados.</p><a :href="url" target="_blank" rel="noopener noreferrer" class="prototype-link" @click.stop><TechIcon name="link" :size="18" />Abrir prototipo en Figma <span aria-hidden="true">↗</span></a><div class="prototype-qr"><a :href="url" target="_blank" rel="noopener noreferrer" aria-label="Abrir el prototipo de Figma del código QR" @click.stop><img src="/figma-prototipo-qr.svg" alt="Código QR al proyecto Industrial Maintenance App Interface de Figma" /></a><div><b>También en tu móvil</b><span>Escanea el QR con la cámara.</span><small>El enlace abre Figma Make.<br>La previsualización requiere Internet.</small></div></div></div>
  </div>
  <div class="prototype-disclaimer"><TechIcon name="shield" :size="17" /><span>Prototipo de interfaz · Sin conexión a maquinaria. Las demos de esta presentación adaptan su flujo con validación local y arranque separado.</span></div>
</template>

<style scoped>
.prototype-access { display: grid; grid-template-columns: 1.6fr 1fr; align-items: center; gap: 35px; margin-top: 28px; }
.prototype-preview { border: 1px solid #d7e1ed; border-radius: 14px; overflow: hidden; box-shadow: 0 15px 35px #1b314c0d; background: #f0f4fa; }
.preview-bar { display: flex; align-items: center; justify-content: space-between; padding: 12px; background: white; font-size: 6px; letter-spacing: .09em; color: #607494; border-bottom: 1px solid #d7e1ed; }
.preview-dots { color: #a8b9cd; letter-spacing: 3px; font-size: 8px; }
.prototype-preview > img { width: 100%; height: 290px; object-fit: contain; background: #f3f6fa; }
.preview-caption { display: flex; align-items: center; gap: 9px; background: white; padding: 13px; color: #536a78; font-size: 9px; }
.preview-caption > svg { color: #335faa; }
.prototype-invite h2 { font-size: 34px; line-height: 1.15; margin-top: 14px; }
.prototype-invite > p { color: var(--muted); font-size: 13px; line-height: 1.65; margin-top: 13px; }
a.prototype-link { display: flex; align-items: center; gap: 9px; background: #2563eb; color: white; padding: 13px 14px; border-radius: 9px; font-size: 13px; font-weight: 600; margin-top: 17px; }
.prototype-link > span { margin-left: auto; }
.prototype-link:hover { background: #1d4ed8; }
.prototype-qr { display: flex; align-items: center; gap: 14px; margin-top: 17px; }
.prototype-qr img { width: 113px; height: 113px; border: 1px solid #d7e1ed; border-radius: 9px; }
.prototype-qr b { display: block; font-size: 12px; }
.prototype-qr span { display: block; font-size: 10px; color: var(--muted); margin-top: 6px; }
.prototype-qr small { display: block; font-size: 8px; color: var(--muted); line-height: 1.6; margin-top: 10px; }
.prototype-disclaimer { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 9px; margin-top: 20px; }
.prototype-disclaimer svg { flex-shrink: 0; color: var(--teal); }
</style>
