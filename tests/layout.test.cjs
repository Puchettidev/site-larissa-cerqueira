const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { chromium } = require(process.argv[2] || "playwright");

const root = path.resolve(__dirname, "..");
const output = fs.mkdtempSync(path.join(os.tmpdir(), "larissa-layout-"));
const viewports = [[1920, 1080], [1440, 900], [1366, 768], [1280, 800], [1100, 800], [1050, 800], [1024, 768], [768, 1024], [721, 900], [720, 900], [430, 932], [390, 844], [360, 800]];
const baseline = Object.fromEntries(["index.html", "styles.css", "script.js"].map((file) =>
  [file, execFileSync("git", ["show", `HEAD:${file}`], { cwd: root, encoding: "utf8" })],
));
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg" };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://localhost");
  const previous = url.pathname.startsWith("/baseline/");
  const file = decodeURIComponent(url.pathname.replace(/^\/baseline\//, "/")).slice(1) || "index.html";
  const target = path.resolve(root, file);
  if (!target.startsWith(root + path.sep)) return response.writeHead(403).end();
  try {
    const content = previous && baseline[file] ? baseline[file] : fs.readFileSync(target);
    response.writeHead(200, { "Content-Type": `${types[path.extname(file)] || "application/octet-stream"}; charset=utf-8` });
    response.end(content);
  } catch {
    response.writeHead(404).end();
  }
});

async function ready(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
}

async function geometry(page) {
  return page.evaluate(() => {
    const bounds = (element) => {
      const { x, y, width, height } = element.getBoundingClientRect();
      return { x, y, width, height, text: element.textContent.trim() };
    };
    const overlap = (a, b) => a.x < b.x + b.width - 1 && a.x + a.width > b.x + 1 && a.y < b.y + b.height - 1 && a.y + a.height > b.y + 1;
    const nodes = [...document.querySelectorAll(".map-node")].map(bounds);
    const card = bounds(document.querySelector(".map-result"));
    const collisions = nodes.flatMap((node, index) => nodes.slice(index + 1).filter((other) => overlap(node, other)).map((other) => `${node.text}/${other.text}`));
    nodes.forEach((node) => { if (overlap(node, card)) collisions.push(`${node.text}/card`); });
    const labels = [...document.querySelectorAll(".map-node span")];
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      radial: document.querySelector(".legal-map").classList.contains("is-radial"),
      orbiting: document.querySelector(".portrait-orbit").classList.contains("is-orbiting"),
      collisions,
      clippedLabels: labels.filter((label) => label.scrollWidth > label.clientWidth + 1 || label.scrollHeight > label.clientHeight + 1).map((label) => label.textContent),
      unloadedImages: [...document.querySelectorAll(".portrait-image img")].filter((img) => !img.complete || !img.naturalWidth).length,
      cardHeight: card.height,
    };
  });
}

async function orbitSnapshot(page) {
  return page.evaluate(() => ({
    phase: orbitAnimations[0]?.currentTime,
    scheduled: orbitAnimations.some((animation) => animation.playState === "running"),
    transforms: [...document.querySelectorAll(".orbit-chip")].map((chip) => getComputedStyle(chip).transform),
    photo: document.querySelector(".portrait-image").getBoundingClientRect().toJSON(),
  }));
}

async function checkOrbitCycle(page) {
  return page.evaluate(() => {
    const times = orbitAnimations.map((animation) => animation.currentTime);
    orbitAnimations.forEach((animation) => animation.pause());
    const issues = [];
    const photo = document.querySelector(".portrait-image").getBoundingClientRect();
    const face = { left: photo.left + photo.width * 0.32, right: photo.left + photo.width * 0.68, top: photo.top + photo.height * 0.08, bottom: photo.top + photo.height * 0.32 };
    const overlap = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    for (let step = 0; step < 120; step++) {
      orbitAnimations.forEach((animation) => { animation.currentTime = step * orbitDuration / 120; });
      const chips = [...document.querySelectorAll(".orbit-chip")].map((chip) => ({ rect: chip.getBoundingClientRect(), name: chip.textContent, element: chip }));
      chips.forEach(({ rect, name, element }, index) => {
        if (overlap(rect, face)) issues.push(`Face/${name}/${step}`);
        if (rect.left < 0 || rect.right > innerWidth) issues.push(`Viewport/${name}/${step}`);
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        if (y > 100 && y < innerHeight - 80 && document.elementFromPoint(x, y)?.closest(".orbit-chip") !== element) {
          issues.push(`Occluded/${name}/${step}`);
        }
        chips.slice(index + 1).forEach((other) => { if (overlap(rect, other.rect)) issues.push(`${name}/${other.name}/${step}`); });
      });
    }
    orbitAnimations.forEach((animation, index) => { animation.currentTime = times[index]; });
    syncOrbit();
    return issues;
  });
}

async function performanceSample(browser, url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await ready(page, url);
  await page.mouse.move(0, 0);
  const session = await page.context().newCDPSession(page);
  await session.send("Performance.enable");
  const sample = async () => Object.fromEntries((await session.send("Performance.getMetrics")).metrics.map(({ name, value }) => [name, value]));
  const before = await sample();
  await page.waitForTimeout(3000);
  const after = await sample();
  await page.close();
  return Object.fromEntries(["TaskDuration", "ScriptDuration", "LayoutDuration", "RecalcStyleDuration", "LayoutCount"].map((key) => [key, Number(((after[key] - before[key]) * (key.endsWith("Count") ? 1 : 1000)).toFixed(2))]));
}

(async () => {
  let browser;
  const errors = [];
  const report = { output, viewports: [] };
  try {
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const url = `http://127.0.0.1:${server.address().port}/`;
    browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || "msedge" });
    const page = await browser.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (/ResizeObserver loop/.test(message.text())) errors.push(message.text());
    });
    for (const [width, height] of viewports) {
      await page.setViewportSize({ width, height });
      await ready(page, url);
      const initial = await geometry(page);
      console.log("Viewport", width, height, JSON.stringify(initial));
      assert.equal(initial.overflow, false, `Page overflow at ${width}`);
      assert.deepEqual(initial.collisions, [], `Map overlap at ${width}`);
      assert.deepEqual(initial.clippedLabels, [], `Clipped map labels at ${width}`);
      assert.equal(initial.unloadedImages, 0);
      if (initial.orbiting) assert.deepEqual(await checkOrbitCycle(page), [], `Orbit collision at ${width}`);
      const cardHeights = [];
      for (const key of await page.locator(".map-node").evaluateAll((nodes) => nodes.map((node) => node.dataset.node))) {
        await page.locator(`[data-node="${key}"]`).click();
        assert.equal(await page.locator(`[data-node="${key}"]`).getAttribute("aria-pressed"), "true");
        await page.waitForTimeout(280);
        const selected = await geometry(page);
        assert.deepEqual(selected.collisions, [], `Selected map overlap at ${width}/${key}`);
        cardHeights.push(selected.cardHeight);
      }
      assert.ok(Math.max(...cardHeights) - Math.min(...cardHeights) < 1, `Unstable result height at ${width}`);
      await page.locator('[data-node="familia"]').click();
      await page.waitForTimeout(300);
      await page.locator(".legal-map").screenshot({ path: path.join(output, `map-${width}.png`), style: ".site-header, .chat-widget { visibility: hidden; }" });
      await page.locator(".hero").scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
      if (width === 390) {
        await page.locator(".hero").screenshot({ path: path.join(output, "hero-mobile-full.png"), style: ".site-header, .chat-widget { visibility: hidden; }" });
      }
      report.viewports.push({ width, height, ...initial });
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    await ready(page, url);
    await page.mouse.move(0, 0);
    await page.waitForTimeout(150);
    const first = await orbitSnapshot(page);
    await page.waitForTimeout(500);
    const moved = await orbitSnapshot(page);
    assert.notEqual(first.phase, moved.phase, "Orbit did not move");
    assert.deepEqual(first.photo, moved.photo, "Photo moved");

    await page.locator(".portrait-image").hover();
    await page.locator(".orbit-chip").first().hover();
    const hovered = await orbitSnapshot(page);
    await page.waitForTimeout(250);
    assert.equal((await orbitSnapshot(page)).phase, hovered.phase, "Hover did not pause orbit");
    await page.mouse.move(0, 0);
    await page.waitForTimeout(150);
    assert.notEqual((await orbitSnapshot(page)).phase, hovered.phase, "Orbit did not resume");

    await page.locator(".orbit-chip").first().focus();
    const focused = await orbitSnapshot(page);
    await page.waitForTimeout(250);
    assert.equal((await orbitSnapshot(page)).phase, focused.phase, "Focus did not pause orbit");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(800);
    assert.equal(await page.locator('[data-node="familia"]').getAttribute("aria-pressed"), "true");
    assert.equal((await orbitSnapshot(page)).scheduled, false, "Offscreen orbit kept running");
    await ready(page, url);

    await page.locator("[data-orbit-toggle]").click();
    await page.mouse.move(0, 0);
    await page.locator(".hero-copy a").first().focus();
    const paused = await orbitSnapshot(page);
    await page.waitForTimeout(250);
    assert.equal((await orbitSnapshot(page)).phase, paused.phase, "Manual pause did not persist");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(150);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(150);
    assert.ok(Math.abs((await orbitSnapshot(page)).phase - paused.phase) < 1, "Resize reset the paused position");
    await page.locator("[data-orbit-toggle]").click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(150);
    const resumed = await orbitSnapshot(page);
    assert.ok(Math.abs(resumed.phase - paused.phase) < 400, "Resume jumped or reset");

    // Sample a full revolution, including face clearance and every pair of labels.
    await page.evaluate(() => { orbitPaused = true; syncOrbit(); });
    const orbitIssues = await checkOrbitCycle(page);
    console.log("Full orbit issues", orbitIssues);
    assert.deepEqual(orbitIssues, []);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(150);
    const reduced = await orbitSnapshot(page);
    await page.waitForTimeout(250);
    assert.equal((await orbitSnapshot(page)).phase, reduced.phase);
    assert.equal(await page.locator("[data-orbit-toggle]").isVisible(), false);

    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, url);
    await page.locator('[data-jump="saude"]').scrollIntoViewIfNeeded();
    await page.locator('[data-jump="saude"]').click();
    assert.equal(await page.locator('[data-node="saude"]').getAttribute("aria-pressed"), "true");
    assert.equal(await page.locator("[data-map-label]").textContent(), "Direito da Saúde");
    await page.locator('[data-node="consumidor"]').focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator('[data-node="consumidor"]').getAttribute("aria-pressed"), "true");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await ready(page, url);
    await page.locator('[data-answer="familia"]').click();
    await page.locator('[data-answer="importante"]').click();
    await page.locator('[data-answer="whatsapp"]').click();
    assert.match(await page.locator("[data-whatsapp]").getAttribute("href"), /^https:\/\/wa\.me\/5532999304225\?text=/);
    await page.locator("[data-chat-toggle]").click();
    assert.equal(await page.locator("[data-chat-panel]").isVisible(), true);
    await page.locator("[data-chat-close]").click();
    await page.locator("[data-carousel-next]").click();
    assert.equal(await page.locator("[data-slide].active").count(), 1);
    const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(url);
    assert.equal(await staticPage.locator(".orbit-chip:visible").count(), 6);
    assert.equal(await staticPage.locator(".map-node:visible").count(), 10);
    assert.equal(await staticPage.locator("h1").count(), 1);
    await staticContext.close();
    report.functional = "Map, orbit, keyboard, pause/resume, reduced motion, mobile navigation, diagnostic, chat and carousel passed";
    report.performance = {
      baseline: await performanceSample(browser, `${url}baseline/`),
      current: await performanceSample(browser, url),
      durationSeconds: 3,
    };
    assert.deepEqual(errors, [], "Browser errors");
    report.errors = errors;
    console.log(JSON.stringify(report, null, 2));
    fs.writeFileSync(path.join(output, "report.json"), JSON.stringify(report, null, 2));
  } finally {
    await browser?.close();
    await new Promise((resolve) => server.close(resolve));
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
