<!-- Barco que cruza el Atlántico debajo de la flecha de la diapositiva 6. Decorativo. -->
<template>
  <svg class="voyage" viewBox="0 0 400 130" aria-hidden="true">
    <g fill="none" stroke-linecap="round">
      <path class="vg-wave" style="animation-delay:.1s" pathLength="1" stroke-dasharray="1" d="M6 92c20-12 36-12 56 0s36 12 56 0 36-12 56 0 36 12 56 0 36-12 56 0 36 12 56 0" stroke="#8fb0d8" stroke-width="3" opacity=".55" />
      <path class="vg-wave" style="animation-delay:.3s" pathLength="1" stroke-dasharray="1" d="M34 110c20-12 36-12 56 0s36 12 56 0 36-12 56 0 36 12 56 0 36-12 56 0" stroke="#8fb0d8" stroke-width="3" opacity=".35" />
    </g>
    <g transform="translate(-92 0)"><g class="vg-ship">
      <g class="vg-rock">
        <path d="M206 20v62" stroke="#442e36" stroke-width="4" stroke-linecap="round" />
        <path d="M209 24c22 6 30 22 30 46h-30Z" fill="#fff3df" stroke="#442e36" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M203 30c-18 6-26 20-26 40h26Z" fill="#f0e2c8" stroke="#442e36" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M206 20l18 5-18 5Z" fill="#f6bd79" stroke="#442e36" stroke-width="2" stroke-linejoin="round" />
        <path d="M166 78h82l-12 18c-2 3-56 3-60 0Z" fill="#a7724a" stroke="#442e36" stroke-width="3" stroke-linejoin="round" />
        <path d="M172 86h70" stroke="#7d5236" stroke-width="2.5" />
        <circle cx="190" cy="82" r="2.5" fill="#ffe08a" /><circle cx="206" cy="82" r="2.5" fill="#ffe08a" /><circle cx="222" cy="82" r="2.5" fill="#ffe08a" />
      </g>
    </g></g>
  </svg>
</template>

<style>
.voyage { position: absolute; left: 50%; top: 50%; width: 400px; height: 130px; transform: translate(-50%, -18%); z-index: -1; pointer-events: none; overflow: visible; }
.voyage * { transform-box: fill-box; animation-fill-mode: both; }
.vg-wave { animation: vg-draw 1.4s ease-out; }
.vg-ship { animation: vg-sail 2.8s cubic-bezier(.25, .8, .3, 1) .2s both; }
.vg-rock { transform-origin: 50% 100%; animation: vg-rock 1.4s ease-in-out .3s 2; animation-fill-mode: none; }
@keyframes vg-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes vg-sail { from { transform: translateX(-190px); opacity: 0 } 15% { opacity: 1 } to { transform: none } }
@keyframes vg-rock { 0%, 100% { transform: none } 30% { transform: rotate(-4deg) } 70% { transform: rotate(3deg) } }
</style>
