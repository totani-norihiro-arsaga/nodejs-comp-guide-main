import { chromium } from "@playwright/test";

// @see セレクターのチェーンの利用方法(>>)
// https://playwright.dev/docs/selectors#chaining-selectors

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("https://www.jleague.jp/match/j1/2022/090301/live/#live");

  // CSS セレクターで要素を取得
  // const pageTitleLocator = page.locator(".navbar-brand");
  // const pageTitle = await pageTitleLocator.innerText();
  
  const textLocator = page.locator('text=宮本　優太')

  console.log(await textLocator.innerHTML());
  await browser.close();
})();
