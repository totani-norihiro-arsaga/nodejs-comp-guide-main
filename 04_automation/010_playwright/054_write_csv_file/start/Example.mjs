import {chromium} from "@playwright/test";
import * as fs from "fs";
import {parse, Parser} from "json2csv";

(async () => {
  const browser = await chromium.launch({headless: false, slowMo: 500});
  const page = await browser.newPage();
  page.goto("http://localhost:3000");
  const inputLocator = page.locator('xpath=//*[@id="__next"]/div/div[1]/label/input');
  await inputLocator.type('佐藤');
  const cardsItem = page.locator('.cards.list-group-item');
  const cardsCount = await cardsItem.count();
  console.log(cardsCount);
  const cardsText = [];
  for (let i = 0; i < cardsCount; i++) {
    const cardItem = page.locator(`.cards.list-group-item >> nth=${i}`);
    const cardText = await cardItem.innerText();
    cardsText.push({
      name: cardText
    });
  }
  const parse = new Parser();
  const cardsTextCsv = parse.parse(cardsText);
  fs.writeFileSync('./name.csv', cardsTextCsv);
  await page.close();
})();