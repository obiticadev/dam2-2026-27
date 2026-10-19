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
async function assertPanelPadding(root, childSelector, panelSelector) {
  const gap = await root.locator(childSelector).evaluate((child, selector) => {
    const panel = child.closest(selector)
    const scale = panel.closest('.slidev-layout').getBoundingClientRect().width / 1100
    return (panel.getBoundingClientRect().bottom - child.getBoundingClientRect().bottom) / scale
  }, panelSelector)
  assert(gap >= 13, `${childSelector} needs at least 13px of space below it; got ${gap.toFixed(1)}px`)
}
try {
  for (let n = 1; n <= 16; n++) {
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
    await assertContained(slide, '.station-card, .signal-card, .sensor-card, .phone-shell, .maintenance-demo, .equipment-sources article')
  }

  // Keep the proposed models and the official sources aligned with the document.
  const sensors = await go(4)
  for (const model of ['ifm VVB001', 'ifm SM8000', 'WIKA TR21-A', 'ifm PN2094', 'Zebra FX9600-4', 'AN480']) {
    assert((await sensors.innerText()).includes(model), `Missing sensor model: ${model}`)
  }
  assert.doesNotMatch(await sensors.innerText(), /mm\/s|DN25|IO-Link|MHz|\[\d\]/)
  const warehouse = await go(12)
  for (const model of ['Zebra FX9600-4', 'AN480', 'Zebra DS3678-SR']) {
    assert((await warehouse.innerText()).includes(model), `Missing warehouse model: ${model}`)
  }
  const prototype = await go(10)
  const prototypeUrl = 'https://www.figma.com/make/iSTIGsoBR2aFBGX2rocvTo/Industrial-Maintenance-App-Interface'
  assert.equal(await prototype.getByRole('link', { name: /Abrir prototipo en Figma/ }).getAttribute('href'), prototypeUrl)
  assert.equal(await prototype.locator('.prototype-qr a, .prototype-qr button').count(), 0)
  assert.equal(await prototype.locator('.prototype-disclaimer').innerText(), 'Prototipo de interfaz')
  for (const image of await prototype.locator('img').all()) assert(await image.evaluate(img => img.complete && img.naturalWidth > 0), 'Prototype image failed to load')
  const sources = await go(15)
  const sourceLinks = sources.locator('.equipment-sources a')
  assert.equal(await sourceLinks.count(), 7)
  const hrefs = await sourceLinks.evaluateAll(links => links.map(link => link.href))
  assert(hrefs.every(href => ['media.ifm.com', 'www.wika.com', 'www.zebra.com'].includes(new URL(href).hostname)))
  assert.match(await sources.innerText(), /ANEXO|Los modelos que hemos consultado/)
  assert.equal(await sources.locator('.source-main, .source-pages').count(), 0)
  assert.doesNotMatch(await sources.innerText(), /Son modelos propuestos para la actividad\./)

  const farewell = await go(16)
  assert.match(await farewell.innerText(), /Gracias por/)
  assert.equal(await farewell.locator('.presentation-address').innerText(), 'https://ut1-rissytech.pages.dev/')
  assert.equal(await farewell.locator('a, button').count(), 0)
  assert(await farewell.locator('.farewell-qr img').evaluate(img => img.complete && img.naturalWidth > 0))
  assert.match(await page.locator('.slidev-page-16 .deck-footer').innerText(), /15\s*\/ 15/)

  // Hover must not move the control, its contents, or neighbouring content.
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  for (const n of [8, 9, 10, 15]) {
    const slide = await go(n)
    for (const control of await slide.locator('a, button:not(:disabled)').all()) {
      await page.mouse.move(1580, 10)
      await page.waitForTimeout(250)
      const bounds = () => slide.locator('*').evaluateAll(elements => elements.map(element => {
        const r = element.getBoundingClientRect()
        return [r.x, r.y, r.width, r.height]
      }))
      const before = await bounds()
      await control.hover()
      await page.waitForTimeout(250)
      const after = await bounds()
      assert.equal(before.length, after.length)
      assert(before.every((r, i) => r.every((value, j) => Math.abs(value - after[i][j]) < .1)), `Hover moved content on slide ${n}: ${await control.innerText()}`)
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const traceability = await go(12)
  const iconBounds = await traceability.locator('.trace-rule > svg').evaluate(svg => {
    const b = svg.getBBox()
    return { x: b.x, y: b.y, right: b.x + b.width, bottom: b.y + b.height }
  })
  assert(iconBounds.x >= .8 && iconBounds.y >= .8 && iconBounds.right <= 23.2 && iconBounds.bottom <= 23.2, 'Link icon stroke is clipped by its SVG viewport')

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
  assert.doesNotMatch(await alertSlide.innerText(), /Sin sonido ni vibración reales/)
  assert(await alertSlide.locator('.reset-button').evaluate(button => {
    const content = document.createRange()
    content.selectNodeContents(button)
    return button.getBoundingClientRect().width <= content.getBoundingClientRect().width + 4
  }), 'Reset hover must fit its icon and text, not the full row')
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

  // Figma-inspired flow: confirm repair checks local conditions, but never starts the motor.
  const motor = await go(9)
  assert.equal(await motor.locator('.operator-avatar').innerText(), 'OB')
  assert.doesNotMatch(await motor.innerText(), /Basado en el prototipo/)
  await assertPanelPadding(motor, '.motor-metrics', '.motor-panel')
  await assertPanelPadding(motor, '.repair-primary', '.safety-panel')
  const start = motor.getByRole('button', { name: /Arranque simulado/ })
  assert.equal(await start.count(), 0)
  await motor.getByLabel('Guardas de seguridad cerradas').uncheck()
  await motor.getByRole('button', { name: /Confirmar reparación/ }).click()
  assert.equal(await start.count(), 0)
  assert.match(await motor.innerText(), /Arranque bloqueado/)
  assert.match(await motor.innerText(), /Motor detenido/)
  await motor.getByLabel('Guardas de seguridad cerradas').check()
  await motor.getByRole('button', { name: /Confirmar reparación/ }).click()
  assert(await start.isEnabled())
  await assertPanelPadding(motor, '.repair-primary', '.safety-panel')
  assert.match(await motor.innerText(), /Motor detenido/)
  await page.mouse.move(1580, 10)
  await page.screenshot({ path: `${output}/motor-autorizado.png` })
  await start.click()
  assert.match(await motor.innerText(), /En funcionamiento/)
  assert.match(await motor.innerText(), /1\.480/)
  await assertPanelPadding(motor, '.motor-metrics', '.motor-panel')
  await assertContained(motor, '.maintenance-demo')
  await page.mouse.move(1580, 10)
  await page.screenshot({ path: `${output}/motor-funcionando.png` })
  await motor.getByLabel('Atasco mecánico').check()
  await motor.getByLabel('Observaciones (opcional)').fill('Obstrucción retirada; comprobaciones locales simuladas.')
  await motor.getByRole('button', { name: 'Guardar diagnóstico' }).click()
  assert.match(await motor.innerText(), /Diagnóstico guardado en esta demo/)
  await assertContained(motor, '.safety-panel, .motor-panel')
  await page.screenshot({ path: `${output}/diagnostico-guardado.png` })
  await motor.getByRole('button', { name: 'Reiniciar', exact: true }).click()
  assert.match(await motor.innerText(), /Motor detenido/)
  await motor.getByRole('button', { name: /Confirmar reparación/ }).click()
  await motor.getByLabel('Zona de giro despejada').uncheck()
  assert.equal(await start.count(), 0)
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
  for (const n of [10, 15, 16]) {
    await go(n)
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
    await page.screenshot({ path: `${output}/mobile-${n}.png` })
  }

  await writeFile(`${output}/report.json`, JSON.stringify({ slides, errors, frameworkWarnings: [...frameworkWarnings], externalRequests: [...externalRequests] }, null, 2))
  console.log(JSON.stringify({ checkedSlides: slides.length, layoutWarnings: slides.filter(s => s.warnings.length), browserErrors: errors, frameworkWarnings: [...frameworkWarnings], externalRequests: [...externalRequests], interactions: 'passed' }, null, 2))
  assert.equal(errors.length, 0, 'Browser errors found')
  assert.equal(externalRequests.size, 0, 'Presentation should not require external resources')
  assert.equal(slides.filter(s => s.warnings.length).length, 0, 'Layout overflow found')
} finally {
  await browser.close()
}
