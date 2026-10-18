<script setup>
const sources = [
  { model: 'ifm VVB001', use: 'Vibración de la peladora', url: 'https://media.ifm.com/dam/296fa837-fbd4-465c-b537-b952de0ad0aa/Original/VVB001-01_EN-GB.pdf' },
  { model: 'ifm SM8000', use: 'Agua de lavado', url: 'https://media.ifm.com/dam/8cb17057-16b3-479f-850c-c2ee31be61cd/Original/SM8000-03_EN-US.pdf' },
  { model: 'WIKA TR21-A', use: 'Temperatura del aceite', url: 'https://www.wika.com/en-en/tr21_a.WIKA' },
  { model: 'ifm PN2094', use: 'Presión en el sellado', url: 'https://media.ifm.com/dam/1592585c-a3d3-4bee-a43a-8998f17762cd/Original/PN2094-02_EN-GB.pdf' },
  { model: 'Zebra FX9600-4 + AN480', use: 'Lectura RFID de los palés', url: 'https://www.zebra.com/us/en/products/spec-sheets/rfid/rfid-readers/fx9600.html', guide: 'https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/product/fxseries-ig-en.pdf' },
  { model: 'Zebra DS3678-SR', use: 'Códigos de cajas y bastidores', url: 'https://www.zebra.com/us/en/support-downloads/scanners/ultra-rugged-scanners/ds3608-sr-ds3678-sr.html' },
]
</script>

<template>
  <div class="equipment-sources" role="group" aria-label="Modelos propuestos y documentación oficial de sus fabricantes">
    <article v-for="source in sources" :key="source.model">
      <p>{{ source.use }}</p>
      <h3>{{ source.model }}</h3>
      <a :href="source.url" target="_blank" rel="noopener noreferrer" :aria-label="`Documentación oficial de ${source.model}`">Documentación oficial ↗</a>
      <a v-if="source.guide" :href="source.guide" target="_blank" rel="noopener noreferrer">Guía de antenas ↗</a>
    </article>
  </div>
</template>

<style scoped>
.equipment-sources { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.equipment-sources article { border: 1px solid var(--line); border-radius: 9px; padding: 14px; background: white; }
.equipment-sources p { color: var(--muted); font-size: 11px; margin-bottom: 5px; }
.equipment-sources h3 { font-size: 16px; letter-spacing: -.025em; }
.equipment-sources a { display: block; width: fit-content; font-size: 11px; margin-top: 7px; text-decoration: underline; text-underline-offset: 3px; }
</style>
