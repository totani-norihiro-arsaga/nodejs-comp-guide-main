import { GoogleSpreadsheet } from "google-spreadsheet";
import * as env from "dotenv";
env.config();
import {createRequire} from "node:module";
const require = createRequire(import.meta.url);
const secrets = require("../../../google_secret.json");
(async()=>{
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
        client_email:secrets.client_email,
        private_key:secrets.private_key,
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells("A1:C5");
    const c1 = sheet.getCellByA1('C1');
    console.log(c1.value);
})()