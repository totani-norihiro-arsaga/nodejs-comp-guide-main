import { chromium } from "@playwright/test";
 
(async()=>{
    const browser =  await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jleague.jp/match/j1/2022/090301/live/#live');
    const list = page.locator(".MemberList.ListRight.ListTop");
    const text = await list.allTextContents();
    console.log(text);
    page.close();
})();
