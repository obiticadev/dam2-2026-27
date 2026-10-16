<script setup>
import TechIcon from './TechIcon.vue'
</script>

<template>
  <div class="feedback-loop" role="group" aria-label="Bucle local: medir, decidir en el controlador, actuar y volver a medir el efecto en el proceso">
    <div class="feedback-nodes"><span><TechIcon name="wave" />Medir</span><i>→</i><span class="controller"><TechIcon name="chip" />Decidir en el controlador</span><i>→</i><span><TechIcon name="valve" />Actuar físicamente</span></div>
    <div class="feedback-return"><span>← Volver a medir el efecto sobre el proceso</span></div>
  </div>
</template>

<style scoped>
.feedback-loop { margin-top: 22px; padding: 15px 30px 10px; background: var(--panel); border: 1px solid var(--line); border-radius: 10px; }
.feedback-nodes { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.feedback-nodes > span { display: flex; align-items: center; gap: 10px; font-size: 15px; }.feedback-nodes svg { color: var(--teal); }.feedback-nodes i { font-style: normal; color: var(--teal); }
.feedback-nodes .controller { color: var(--orange); }
.feedback-return { margin: 9px 50px 0; border: 1px solid #a8c7c8; border-top: 0; border-radius: 0 0 12px 12px; text-align: center; height: 24px; }
.feedback-return span { position: relative; top: 10px; padding: 0 15px; font-size: 10px; color: var(--muted); background: var(--panel); }
</style>
