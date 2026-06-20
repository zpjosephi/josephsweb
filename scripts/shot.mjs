import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const shots = [
  { url: "https://epl-xeleven.vercel.app/", out: "public/projects/xeleven.png" },
  { url: "https://bakery-kita.vercel.app/", out: "public/projects/bakery.png" },
  { url: "https://ceritabel.vercel.app/", out: "public/projects/ceritabel.png" },
];

await mkdir("public/projects", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 875 },
  deviceScaleFactor: 2,
});

for (const { url, out } of shots) {
  console.log("capturing", url);
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    // networkidle can time out on live-data apps; fall back to load + delay
    await page.goto(url, { waitUntil: "load", timeout: 45000 }).catch(() => {});
  }
  await page.waitForTimeout(3500); // let charts / data render
  await page.screenshot({ path: out }); // viewport clip
  console.log("saved", out);
}

await browser.close();
console.log("done");
