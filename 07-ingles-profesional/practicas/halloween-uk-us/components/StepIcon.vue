<script setup>
defineProps({ name: String })
</script>

<!-- Iconos pequeños y decorativos para tarjetas. El texto de la tarjeta ya dice lo mismo. -->
<template>
  <svg class="step-icon" viewBox="0 0 64 64" aria-hidden="true">
    <g v-if="name === 'harvest'" stroke="#442e36" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
      <path d="M32 58 18 14M32 58V8M32 58l14-44" fill="none" stroke="#c9a14a" stroke-width="3" />
      <g fill="#edc66d">
        <ellipse v-for="(g, i) in [[18, 14, -18], [21, 22, -18], [32, 8, 0], [32, 17, 0], [46, 14, 18], [43, 22, 18]]" :key="i" :cx="g[0]" :cy="g[1]" rx="4" ry="7" :transform="`rotate(${g[2]} ${g[0]} ${g[1]})`" />
      </g>
      <rect x="24" y="38" width="16" height="7" rx="2" fill="#b85b27" />
    </g>
    <g v-else-if="name === 'candle'" stroke="#442e36" stroke-width="2.2" stroke-linejoin="round">
      <circle cx="32" cy="20" r="17" fill="#ffd36b" opacity=".22" stroke="none" />
      <path d="M32 6c6 7 8 12 4 17-2 3-6 3-8 0-4-5-1-10 4-17Z" fill="#ffd85c" />
      <path d="M32 14c2 4 2 6 0 8" fill="none" stroke="#fffbd2" stroke-width="2" />
      <rect x="24" y="27" width="16" height="30" rx="3" fill="#fff3df" />
      <path d="M24 33c4 0 4 6 7 6s2-6 9-6" fill="none" stroke="#e6d8c0" stroke-width="2" />
      <rect x="18" y="56" width="28" height="4" rx="2" fill="#edc66d" />
    </g>
    <g v-else-if="name === 'mask'" stroke="#442e36" stroke-width="2.2" stroke-linejoin="round">
      <path d="M6 26c8-6 18-6 26 0 8-6 18-6 26 0 0 12-6 20-16 20-6 0-8-4-10-6-2 2-4 6-10 6-10 0-16-8-16-20Z" fill="#9a7cc4" />
      <ellipse cx="20" cy="31" rx="6" ry="4.5" fill="#302a43" /><ellipse cx="44" cy="31" rx="6" ry="4.5" fill="#302a43" />
      <path d="M46 44l6 16" stroke="#edc66d" stroke-width="3.5" stroke-linecap="round" />
      <path d="M12 12c1 3 2 4 5 5-3 1-4 2-5 5-1-3-2-4-5-5 3-1 4-2 5-5Z" fill="#f6bd79" stroke-width="1.4" />
    </g>
    <g v-else-if="name === 'soulcake'" stroke="#442e36" stroke-width="2.2" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="26" ry="9" fill="#fff8e9" />
      <ellipse cx="32" cy="38" rx="21" ry="10" fill="#c98a4f" />
      <ellipse cx="32" cy="33" rx="19" ry="8" fill="#e8b77a" />
      <path d="M22 33h20M32 27v12" stroke="#9c6235" stroke-width="3" stroke-linecap="round" />
      <path d="M20 12c1 3 2 4 5 5-3 1-4 2-5 5-1-3-2-4-5-5 3-1 4-2 5-5Z" fill="#edc66d" stroke-width="1.4" />
    </g>
    <g v-else-if="name === 'pail'" stroke="#442e36" stroke-width="2.2" stroke-linejoin="round">
      <path d="M17 28c0-22 30-22 30 0" fill="none" />
      <circle cx="38" cy="20" r="7" fill="#f07466" /><path d="M38 27v6" stroke="#fff3df" stroke-width="2.5" />
      <rect x="20" y="16" width="14" height="10" rx="4" fill="#edc66d" transform="rotate(-18 27 21)" />
      <path d="M13 28h38l-4 26c-1 4-29 4-30 0Z" fill="#f58a34" />
      <ellipse cx="32" cy="28" rx="19" ry="4" fill="#d8682a" />
      <path d="m23 39 4-6 4 6Zm10 0 4-6 4 6Zm-9 6q8 6 16 0" fill="#442e36" stroke="none" />
    </g>
  </svg>
</template>
