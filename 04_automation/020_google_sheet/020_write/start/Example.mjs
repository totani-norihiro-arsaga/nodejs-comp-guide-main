import { GoogleSpreadsheet } from "google-spreadsheet";
import env from 'dotenv';
env.config();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');


(async () => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: secrets.client_email,
        private_key: secrets.private_key
    });
    
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.loadCells('A1:C5');

    const a1 = sheet.getCell(0,0);
    const b1 = sheet.getCell(0,1);
    const b2 = sheet.getCellByA1('B2');
    const c5 = sheet.getCellByA1('C5');

    c5.value = '=SUM(C1:C4)';

    sheet.saveUpdatedCells();
})();