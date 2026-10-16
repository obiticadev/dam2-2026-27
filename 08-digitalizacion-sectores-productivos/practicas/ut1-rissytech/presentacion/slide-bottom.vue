<template>
  <footer class="deck-footer">
    <div class="footer-brand"><span class="brand-square">R</span><b>RISSYTECH</b><span class="footer-divider"></span><span>PLAN DE TRANSFORMACIÓN DIGITAL</span></div>
    <div class="footer-page"><span>UT1 / DAM · 2026–2027</span><b>{{ String($page).padStart(2, '0') }}</b><span>/ 14</span></div>
    <div class="footer-progress" :style="{ width: `${($page / 14) * 100}%` }"></div>
  </footer>
</template>
