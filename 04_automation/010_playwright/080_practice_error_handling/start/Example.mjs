import { chromium } from "@playwright/test";
import * as fs from "fs";
import {Parser} from "json2csv";
import env from "dotenv";
import { parse } from "path";
env.config();

/**
 * 練習問題
 * 3ページ目の役職が係長の人物名と会社名をすべてtest-data.csvに出力しなさい。
 * ※会社名が取れない場合にも処理が止まらないように例外処理を追加してください。
 * 
 * "company","name"
 * "山本金属株式会社","28 伊藤 友美"
 */
(async () => {
  const browser = await chromium.launch({headless:false, slowMo: 500});
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  
  const pageLinkLocator = page.locator('.page-link.page-number >> nth=2');
  await pageLinkLocator.click();
  
  const cardsLocator = page.locator('.cards.list-group-item');
  const cardsCount = await cardsLocator.count();
  const cards = [];
  for (let i = 0; i < cardsCount; i++) {
    const cardLocator = page.locator(`.cards.list-group-item >> nth=${i} >> a`);
    await cardLocator.click();

    const divisionLocator = page.locator('.division');
    const divisionText = await divisionLocator.innerText();
    const backLocator = page.locator('text=戻る');
    
    if ( divisionText.indexOf('係長') === -1 ) {
      await backLocator.click();
      continue;
    }

    let cardElement = {};
    try {
      const companyLocator = page.locator('.card-title.company');
      const companyText = await companyLocator.innerText();
      cardElement.company = companyText;
    }catch(e){}
    const nameLocator = page.locator('.card-text.name');
    const nameText = await nameLocator.innerText();
    cardElement.name = nameText;
    cards.push(cardElement);
    await backLocator.click();    
  }
  await browser.close();
  
  const Parse = new Parser();
  const csv = Parse.parse(cards);
  fs.writeFileSync('./04_automation/text-data.csv', csv);
})();
