<script setup>
defineProps({ name: { type: String, default: 'chip' }, size: { type: [Number, String], default: 24 } })
const paths = {
  chip: ['M7 7h10v10H7z', 'M9 2v5m6-5v5M9 17v5m6-5v5M2 9h5m-5 6h5m10-6h5m-5 6h5', 'M10 10h4v4h-4z'],
  factory: ['M3 21V9l6 3V8l6 4V4h4l2 17Z', 'M6 16h1m4 0h1m4 0h1M6 19h1m4 0h1m4 0h1'],
  water: ['M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z', 'M8 15a4 4 0 0 0 4 4'],
  heat: ['M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Z', 'M12 8v10m-1 0h2m5-11h3m-3 4h2'],
  pressure: ['M4 18a9 9 0 1 1 16 0Z', 'm12 13 5-5M6 13h1m10 0h1M12 5v2'],
  wave: ['M2 12h4l2-8 4 16 4-12 2 4h4'],
  box: ['m3 7 9-5 9 5v10l-9 5-9-5Z', 'm3 7 9 5 9-5M12 12v10M7 4l10 6'],
  motor: ['M5 7h12v12H5z', 'M8 4h6M11 4v3M2 10h3m-3 6h3m12-5h4v4h-4M8 10v6m3-6v6m3-6v6'],
  valve: ['M3 8v8l9-4Zm18 0v8l-9-4Z', 'M12 12V4M8 4h8'],
  phone: ['M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'M10 5h4m-3 14h2'],
  bell: ['M5 17h14l-2-4V8a5 5 0 0 0-10 0v5Z', 'M10 21h4M12 1v2'],
  database: ['M20 5c0 2-4 3-8 3S4 7 4 5s4-3 8-3 8 1 8 3Z', 'M4 5v7c0 2 4 3 8 3s8-1 8-3V5M4 12v7c0 2 4 3 8 3s8-1 8-3v-7'],
  server: ['M3 3h18v7H3zM3 14h18v7H3z', 'M6 6h1m3 0h1m-5 11h1m3 0h1'],
  shield: ['m12 2 8 3v6c0 5-4 8-8 11-4-3-8-6-8-11V5Z', 'm8 12 3 3 5-6'],
  check: ['m5 12 4 4L19 6'],
  alert: ['m12 3 10 18H2Z', 'M12 9v5m0 3v1'],
  scan: ['M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5', 'M7 7v10m3-10v10m4-10v10m3-10v10'],
  nfc: ['M5 7v10m4-8v6m5-10a10 10 0 0 1 0 14m3-17a14 14 0 0 1 0 20'],
  camera: ['M3 6h5l2-3h4l2 3h5v15H3Z', 'M16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z'],
  mic: ['M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0Z', 'M5 10v2a7 7 0 0 0 14 0v-2M12 19v3m-4 0h8'],
  hand: ['M7 12V5a2 2 0 0 1 4 0v6-8a2 2 0 0 1 4 0v8-6a2 2 0 0 1 4 0v7-3a2 2 0 0 1 4 0v6c0 5-3 7-7 7h-2c-3 0-5-2-7-5l-4-5a2 2 0 0 1 3-2Z'],
  arrow: ['M3 12h18m-6-6 6 6-6 6'],
  clock: ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z', 'M12 6v6l4 2'],
  network: ['M3 3h6v6H3zM15 15h6v6h-6zM3 15h6v6H3z', 'M6 9v6m0-3h12v3'],
  link: ['M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-1.7 1.7', 'M14 11a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7'],
  play: ['m8 4 12 8-12 8Z'],
  reset: ['M3 10a9 9 0 1 1 1 8M3 3v7h7'],
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path v-for="(d, i) in (paths[name] || paths.chip)" :key="i" :d="d" />
  </svg>
</template>
