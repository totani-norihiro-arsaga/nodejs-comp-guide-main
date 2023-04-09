import cron from "node-cron";

import { addScrapingInfoToGS } from "./write_to_sheet.mjs";
import { sendMail } from "./send_mail.mjs";

// cron.schedule('9 * * * *', async ()=>{
//     await addScrapingInfoToGS();
// })

async function main(){
    try {
        await addScrapingInfoToGS();
        sendMail('成功', '情報を取得しました。');
    } catch (e) {
        sendMail('失敗', `情報を取得できませんでした。\n${e}`);
    }
}

await main();