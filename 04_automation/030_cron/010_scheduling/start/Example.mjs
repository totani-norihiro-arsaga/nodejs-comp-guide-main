import cron from "node-cron";

import { addScrapingInfoToGS } from "./Example copy.mjs";

cron.schedule('9 * * * *', async ()=>{
    await addScrapingInfoToGS();
})