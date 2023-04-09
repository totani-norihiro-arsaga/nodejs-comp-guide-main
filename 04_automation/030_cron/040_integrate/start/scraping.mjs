import { chromium } from "@playwright/test";

async function getNameByscraping() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");
  const listItemLocator = page.locator(".cards.list-group-item");
  const itemCount = await listItemLocator.count();
  const cards = [];
  for (let i = 0; i < itemCount; i++) {
    const itemLocator = page.locator(`.cards.list-group-item >> nth=${i} >> a`);
    await itemLocator.click();
    const companyLocator = page.locator(".card-title.company");
    const companyText = await companyLocator.innerText();
    const nameLocator = page.locator(".card-text.name");
    const nameText = await nameLocator.innerText();
    cards.push({ company: companyText, name: nameText });
    const backLocator = page.locator('xpath=//*[@id="__next"]/div[2]/button');
    await backLocator.click();
  }

  page.close();

  return cards;
}

export {getNameByscraping};
