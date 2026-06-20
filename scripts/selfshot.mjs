import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1,
});
await page
  .goto("http://localhost:3002/", { waitUntil: "networkidle", timeout: 30000 })
  .catch(() => {});
await page.waitForTimeout(1500);
const about = await page.$("#about");
await about?.scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);
await about?.screenshot({ path: "scripts/about-halftone.png" });
await browser.close();
console.log("done");
