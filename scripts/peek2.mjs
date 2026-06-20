import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});
await page
  .goto("https://www.nomoredesign.co.uk/", {
    waitUntil: "networkidle",
    timeout: 60000,
  })
  .catch(() => {});
await page.waitForTimeout(4000);
await page.screenshot({ path: "scripts/nmd-1.png" });

for (let i = 1; i <= 3; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), i * 850);
  await page.waitForTimeout(1600);
  await page.screenshot({ path: `scripts/nmd-${i + 1}.png` });
}

await browser.close();
console.log("done");
