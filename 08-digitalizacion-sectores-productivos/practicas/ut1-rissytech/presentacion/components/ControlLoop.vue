<script setup>
import TechIcon from './TechIcon.vue'
</script>

<template>
  <div class="feedback-loop" role="group" aria-label="Bucle local: medir, decidir en el controlador, actuar y volver a medir el efecto en el proceso">
    <div class="feedback-nodes">
      <div><TechIcon name="wave" :size="25" /><span><small>SENSOR</small><b>Medir</b></span></div><i aria-hidden="true">→</i>
      <div class="controller"><TechIcon name="chip" :size="25" /><span><small>CONTROLADOR LOCAL</small><b>Decidir</b></span></div><i aria-hidden="true">→</i>
      <div><TechIcon name="valve" :size="25" /><span><small>ACTUADOR</small><b>Actuar físicamente</b></span></div>
    </div>
    <div class="feedback-return"><svg viewBox="0 0 940 40" aria-hidden="true"><path d="M800 1v13q0 10-10 10H150q-10 0-10-10V1" /><path d="m135 7 5-6 5 6" /></svg><span>Volver a medir el efecto sobre el proceso</span></div>
  </div>
</template>

<style scoped>
.feedback-loop { margin-top: 22px; padding: 15px 26px 13px; background: var(--panel); border: 1px solid var(--line); border-radius: 13px; }
.feedback-nodes { display: grid; grid-template-columns: 1fr 40px 1fr 40px 1fr; align-items: center; }
.feedback-nodes > div { display: flex; justify-content: center; align-items: center; gap: 12px; }
.feedback-nodes small { display: block; font-size: 8px; letter-spacing: .1em; color: var(--muted); }
.feedback-nodes b { font-size: 15px; font-weight: 600; }
.feedback-nodes svg { color: var(--teal); }.feedback-nodes i { font-style: normal; color: var(--teal); text-align: center; }
.feedback-nodes .controller svg { color: var(--orange); }
.feedback-return { position: relative; height: 36px; margin-top: 8px; display: flex; justify-content: center; align-items: flex-end; }
.feedback-return svg { position: absolute; inset: 0; width: 100%; height: 40px; fill: none; stroke: #8bb6b8; stroke-width: 1.3; }
.feedback-return span { position: relative; bottom: 1px; padding: 3px 13px; font-size: 10px; color: var(--muted); background: var(--panel); }
</style>
