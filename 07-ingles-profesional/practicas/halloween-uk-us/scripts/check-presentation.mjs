import assert from 'node:assert/strict'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'

const base = process.env.SLIDEV_URL || 'http://127.0.0.1:4174'
const output = '.qa'
await mkdir(output, { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || (process.platform === 'linux' ? '/usr/bin/chromium' : chromium.executablePath()),
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: 'reduce' })
const errors = []
const frameworkWarnings = new Set()
const externalRequests = new Set()
const failedResponses = []
const results = []
page.on('pageerror', error => errors.push(error.message))
page.on('console', message => {
  if (message.type() !== 'error') return
  if (message.text().includes('Failed to patch FloatingVue')) frameworkWarnings.add(message.text())
  else errors.push(message.text())
})
page.on('request', request => {
  if (/^https?:/.test(request.url()) && new URL(request.url()).origin !== new URL(base).origin) externalRequests.add(request.url())
})
page.on('response', response => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`) })

async function go(n) {
  await page.goto(`${base}/#/${n}`)
  const slide = page.locator(`.slidev-page-${n} .slidev-layout`)
  await slide.waitFor({ state: 'visible' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  return slide
}

async function geometry(slide) {
  return slide.evaluate(root => {
    const bounds = root.getBoundingClientRect()
    const scale = bounds.width / 1100
    const prompt = root.querySelector('.prompt')?.getBoundingClientRect()
    const warnings = []
    for (const el of root.querySelectorAll('h1,h2,p,.eyebrow,.tag,.large-word,.small-note,.mini-fact,.clue-stack strong,.clue-stack span,.tickets span,.shared,.ribbon,.source-list strong,.source-list span,.source-note,.ending,.sources-link,.prompt,svg.story-art')) {
      const r = el.getBoundingClientRect()
      const footer = root.parentElement.querySelector('.deck-footer')?.getBoundingClientRect()
      const bottomLimit = footer ? footer.top - 5 * scale : bounds.bottom - 42 * scale
      if (r.left < bounds.left + 22 * scale || r.right > bounds.right - 22 * scale || r.top < bounds.top + 20 * scale || r.bottom > bottomLimit) {
        warnings.push({ kind: 'outside', text: (el.getAttribute('aria-label') || el.textContent).trim().slice(0, 100) })
      }
      if (prompt && !el.closest('.prompt') && r.bottom > prompt.top - 4 * scale && r.top < prompt.bottom) warnings.push({ kind: 'prompt-overlap', text: el.textContent.trim().slice(0, 100) })
      if (el.scrollWidth > el.clientWidth + 2 && el.tagName.toLowerCase() !== 'svg') warnings.push({ kind: 'text-overflow', text: el.textContent.trim().slice(0, 100) })
    }
    return { title: root.querySelector('h1')?.textContent, warnings, fontsReady: document.fonts.check('20px "Manrope Variable"') }
  })
}

let failure
try {
  for (let n = 1; n <= 11; n++) {
    const slide = await go(n)
    const result = await geometry(slide)
    assert(result.title, `Slide ${n} has no heading`)
    assert(result.fontsReady, `Local font missing on slide ${n}`)
    const footerZ = await page.locator(`.slidev-page-${n} .deck-footer`).evaluate(el => Number(getComputedStyle(el).zIndex))
    assert(footerZ >= 1, `Footer could be hidden behind slide ${n}`)
    const text = await slide.innerText()
    assert(text.split(/\s+/).length < 115, `Slide ${n} contains too much text`)
    await page.mouse.move(1590, 0)
    await page.screenshot({ path: `${output}/slide-${String(n).padStart(2, '0')}.png` })
    results.push({ slide: n, ...result })
  }
  const allWarnings = results.flatMap(r => r.warnings.map(w => ({ slide: r.slide, ...w })))
  assert.deepEqual(allWarnings, [], 'Slide content overlaps or escapes its safe area')

  await go(5)
  assert.match(await page.locator('.slidev-page-5 .deck-footer').innerText(), /RUBÉN/)
  await page.keyboard.press('ArrowRight')
  await page.locator('.slidev-page-6 .slidev-layout').waitFor({ state: 'visible' })
  assert.match(await page.locator('.slidev-page-6 .deck-footer').innerText(), /OLIVER/)
  await page.keyboard.press('ArrowLeft')
  await page.locator('.slidev-page-5 .slidev-layout').waitFor({ state: 'visible' })

  const finale = await go(10)
  await finale.getByRole('link', { name: /Our sources/ }).click()
  const sources = page.locator('.slidev-page-11 .slidev-layout')
  await sources.waitFor({ state: 'visible' })
  assert.equal(await sources.locator('a[target="_blank"]').count(), 2)
  await sources.getByRole('link', { name: /Back to the goodbye/ }).click()
  await page.locator('.slidev-page-10 .slidev-layout').waitFor({ state: 'visible' })

  await page.setViewportSize({ width: 844, height: 390 })
  for (const n of [1, 5, 8, 10, 11]) {
    const slide = await go(n)
    const result = await geometry(slide)
    assert.deepEqual(result.warnings, [], `Mobile geometry on slide ${n}`)
    const box = await slide.boundingBox()
    assert(box.x >= -1 && box.y >= -1 && box.x + box.width <= 845 && box.y + box.height <= 391, 'Mobile slide is cropped')
    await page.screenshot({ path: `${output}/mobile-${n}.png` })
  }

  // Only static build output is publishable. The separate script must not leak.
  const buildFiles = await readdir('dist', { recursive: true })
  assert(!buildFiles.some(f => /GUION|GUIA-LINGUISTICA|FUENTES\.md/.test(f)), 'Private documentation copied to dist')
  for (const file of buildFiles.filter(f => /\.(js|html|json)$/.test(f))) {
    const content = await readFile(`dist/${file}`, 'utf8')
    assert(!content.includes('Our story has ancient roots. Ancient means very, very old!'), 'Full script leaked into public build')
  }
  assert.deepEqual(errors, [], 'Browser JavaScript/console errors')
  assert.deepEqual(failedResponses, [], 'Failed resource loads')
  assert.equal(externalRequests.size, 0, 'Unexpected remote resources')
} catch (error) {
  failure = error
} finally {
  await writeFile(`${output}/report.json`, JSON.stringify({
    checkedAt: new Date().toISOString(), base, success: !failure,
    slides: results, errors, failedResponses,
    frameworkWarnings: [...frameworkWarnings], externalRequests: [...externalRequests],
    failure: failure?.message,
  }, null, 2))
  await browser.close()
}
if (failure) throw failure
console.log('PASS: 11 slides, keyboard handoff, source links, mobile landscape, local resources and private-script exclusion.')
if (frameworkWarnings.size) console.warn('Separate Slidev framework warnings:', [...frameworkWarnings])
