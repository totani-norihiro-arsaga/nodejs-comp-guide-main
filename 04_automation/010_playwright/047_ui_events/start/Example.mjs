import { chromium } from "@playwright/test";

// @see セレクターのチェーンの利用方法(>>)
// https://playwright.dev/docs/selectors#chaining-selectors

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  // CSS セレクターで要素を取得
  const inputLocator = page.locator("xpath=//*[@id=\"__next\"]/div/div[1]/label/input");
  inputLocator.inpu
  console.log(pageTitle);

  await browser.close();

})();
