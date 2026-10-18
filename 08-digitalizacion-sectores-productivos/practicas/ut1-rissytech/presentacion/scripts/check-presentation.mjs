import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'

// Start `npm run dev` or `npm run preview` before running this check.
const base = process.env.SLIDEV_URL || 'http://localhost:3030'
const output = '.qa'
await mkdir(output, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || (process.platform === 'win32' ? chromium.executablePath() : '/usr/bin/chromium'),
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: 'reduce' })
const errors = []
const frameworkWarnings = new Set()
const externalRequests = new Set()
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => {
  if (message.type() !== 'error') return
  if (message.text().includes('Failed to patch FloatingVue')) frameworkWarnings.add(message.text())
  else errors.push(message.text())
})
page.on('request', request => {
  if (!request.url().startsWith(new URL(base).origin) && /^https?:/.test(request.url())) externalRequests.add(request.url())
})
const slides = []
async function go(n, clicks = 0) {
  await page.goto(`${base}/#/${n}?clicks=${clicks}`)
  const slide = page.locator(`.slidev-page-${n} .slidev-layout`)
  await slide.waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  return slide
}
async function assertContained(root, containerSelector) {
  const overflows = await root.locator(containerSelector).evaluateAll(containers => containers.flatMap(container => {
    const bounds = container.getBoundingClientRect()
    return Array.from(container.querySelectorAll('button, p, h2, h3, label, small')).flatMap(element => {
      const r = element.getBoundingClientRect()
      if (r.bottom <= bounds.bottom + 1 && r.right <= bounds.right + 1) return []
      return [element.textContent.trim()]
    })
  }))
  assert.deepEqual(overflows, [], `Content escaped ${containerSelector}`)
}
try {
  for (let n = 1; n <= 14; n++) {
    const slide = await go(n, n === 2 ? 2 : n === 6 || n === 7 ? 3 : 0)
    const geometry = await slide.evaluate(root => {
      const scale = root.getBoundingClientRect().width / 1100
      const bounds = root.getBoundingClientRect()
      const footerTop = root.parentElement.querySelector('.deck-footer')?.getBoundingClientRect().top || bounds.bottom - 55 * scale
      const warnings = []
      for (const element of root.querySelectorAll('*')) {
        if ((element.closest('svg') && element.tagName.toLowerCase() !== 'text') || element.closest('.slidev-vclick-hidden') || element.children.length || !element.textContent.trim()) continue
        const r = element.getBoundingClientRect()
        if (!r.width || !r.height || getComputedStyle(element).opacity === '0') continue
        if (r.right > bounds.right - 25 * scale || r.left < bounds.left + 25 * scale || r.bottom > footerTop - 7 * scale) warnings.push({ text: element.textContent.trim().slice(0, 90), x: Math.round((r.left - bounds.left) / scale), y: Math.round((r.top - bounds.top) / scale), bottom: Math.round((r.bottom - bounds.top) / scale) })
      }
      return { warnings, title: root.querySelector('h1')?.textContent, height: root.scrollHeight }
    })
    await page.mouse.move(1580, 10)
    await page.screenshot({ path: `${output}/slide-${String(n).padStart(2, '0')}.png` })
    slides.push({ slide: n, ...geometry })
    assert(geometry.title, `Slide ${n} has no heading`)
    await assertContained(slide, '.station-card, .sensor-card, .phone-shell, .maintenance-demo, .equipment-sources article')
  }

  // Keep the proposed models and the official sources aligned with the document.
  const sensors = await go(4)
  for (const model of ['ifm VVB001', 'ifm SM8000', 'WIKA TR21-A', 'ifm PN2094', 'Zebra FX9600-4', 'AN480']) {
    assert((await sensors.innerText()).includes(model), `Missing sensor model: ${model}`)
  }
  assert.doesNotMatch(await sensors.innerText(), /mm\/s|DN25|IO-Link|MHz|\[\d\]/)
  const warehouse = await go(11)
  for (const model of ['Zebra FX9600-4', 'AN480', 'Zebra DS3678-SR']) {
    assert((await warehouse.innerText()).includes(model), `Missing warehouse model: ${model}`)
  }
  const sources = await go(14)
  const sourceLinks = sources.locator('.equipment-sources a')
  assert.equal(await sourceLinks.count(), 7)
  const hrefs = await sourceLinks.evaluateAll(links => links.map(link => link.href))
  assert(hrefs.every(href => ['media.ifm.com', 'www.wika.com', 'www.zebra.com'].includes(new URL(href).hostname)))
  assert.match(await sources.innerText(), /ANEXO|Los modelos que hemos consultado/)

  // The architecture and workflow must actually follow Slidev's click state.
  await go(6)
  assert.equal(await page.locator('.slidev-page-6 .diagram-muted').count(), 3)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(150)
  assert.equal(await page.locator('.slidev-page-6 .diagram-muted').count(), 2)
  await go(6, 3)
  assert.equal(await page.locator('.slidev-page-6 .diagram-muted').count(), 0)
  await go(7, 3)
  assert.equal(await page.locator('.slidev-page-7 .is-dim').count(), 0)

  // Alert acknowledgement must not resume the machine.
  const alertSlide = await go(8)
  await alertSlide.getByRole('button', { name: 'Simular caída de presión' }).click()
  assert.match(await alertSlide.innerText(), /Sellado interrumpido por el PLC/)
  await alertSlide.getByRole('button', { name: 'Simular plazo agotado' }).click()
  assert.match(await alertSlide.innerText(), /escalado a mantenimiento/)
  await assertContained(alertSlide, '.phone-shell')
  await page.mouse.move(1580, 10)
  await page.screenshot({ path: `${output}/alerta-escalada.png` })
  await alertSlide.getByRole('button', { name: 'Alerta recibida', exact: true }).click()
  assert.match(await alertSlide.innerText(), /La máquina sigue detenida/)
  assert.match(await alertSlide.innerText(), /Sellado interrumpido por el PLC/)
  await assertContained(alertSlide, '.phone-shell')
  await page.screenshot({ path: `${output}/alerta-confirmada.png` })

  // Repair, controller validation and start are three independent transitions.
  const motor = await go(9)
  const start = motor.getByRole('button', { name: 'Arranque simulado' })
  assert(await start.isDisabled())
  await motor.getByLabel('Intervención terminada').check()
  await motor.getByRole('button', { name: 'Confirmar reparación' }).click()
  await motor.getByRole('button', { name: 'Validar PLC' }).click()
  assert(await start.isDisabled())
  assert.match(await motor.innerText(), /arranque bloqueado/)
  await motor.getByLabel('Guardas de seguridad cerradas').check()
  await motor.getByLabel('Zona de giro despejada').check()
  assert(await start.isDisabled())
  await motor.getByRole('button', { name: 'Validar PLC' }).click()
  assert(await start.isEnabled())
  await page.mouse.move(1580, 10)
  await page.screenshot({ path: `${output}/motor-autorizado.png` })
  await start.click()
  assert.match(await motor.innerText(), /En funcionamiento/)
  assert.match(await motor.innerText(), /1\.480/)
  await assertContained(motor, '.maintenance-demo')
  await page.mouse.move(1580, 10)
  await page.screenshot({ path: `${output}/motor-funcionando.png` })
  await motor.getByLabel('Guardas de seguridad cerradas').uncheck()
  assert(await start.isDisabled())
  assert.match(await motor.innerText(), /Motor detenido/)
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(250)
  assert(await page.locator('.slidev-page-10 .slidev-layout').isVisible(), 'Arrow navigation should still work after a demo')

  // Static print/PDF view should show an actual alert, not an empty phone.
  await page.goto(`${base}/?print=true#/8`)
  await page.locator('.slidev-page-8 .phone-shell').waitFor({ state: 'visible' })
  assert.match(await page.locator('.slidev-page-8').innerText(), /INCIDENCIA ABIERTA/)

  // The slide canvas scales to smaller screens without overflowing the viewport.
  await page.setViewportSize({ width: 390, height: 844 })
  await go(8)
  assert(await page.locator('.slidev-page-8 .slidev-layout').isVisible())
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
  await page.screenshot({ path: `${output}/mobile.png` })

  await writeFile(`${output}/report.json`, JSON.stringify({ slides, errors, frameworkWarnings: [...frameworkWarnings], externalRequests: [...externalRequests] }, null, 2))
  console.log(JSON.stringify({ checkedSlides: slides.length, layoutWarnings: slides.filter(s => s.warnings.length), browserErrors: errors, frameworkWarnings: [...frameworkWarnings], externalRequests: [...externalRequests], interactions: 'passed' }, null, 2))
  assert.equal(errors.length, 0, 'Browser errors found')
  assert.equal(externalRequests.size, 0, 'Presentation should not require external resources')
  assert.equal(slides.filter(s => s.warnings.length).length, 0, 'Layout overflow found')
} finally {
  await browser.close()
}
