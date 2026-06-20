import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto("https://www.hirotos.com/", {
  waitUntil: "networkidle",
  timeout: 60000,
}).catch(() => {});
await page.waitForTimeout(4000);

// Hero (top viewport)
await page.screenshot({ path: "scripts/peek-hero.png" });

// A bit further down
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(1500);
await page.screenshot({ path: "scripts/peek-mid.png" });

await page.evaluate(() => window.scrollTo(0, 1900));
await page.waitForTimeout(1500);
await page.screenshot({ path: "scripts/peek-mid2.png" });

await browser.close();
console.log("done");
