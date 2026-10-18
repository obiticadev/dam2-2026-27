<template>
  <footer class="deck-footer">
    <div class="footer-brand"><span class="brand-square">R</span><b>RISSYTECH</b><span class="footer-divider"></span><span>PLAN DE TRANSFORMACIÓN DIGITAL</span></div>
    <div class="footer-page"><span>UT1 / DAM · 2026–2027</span><b>{{ $page > 13 ? 'ANEXO' : String($page).padStart(2, '0') }}</b><span>{{ $page > 13 ? 'FUENTES' : '/ 13' }}</span></div>
  </footer>
</template>
