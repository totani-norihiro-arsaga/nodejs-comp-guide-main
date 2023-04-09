import { GoogleSpreadsheet } from 'google-spreadsheet';
import env from 'dotenv';
env.config();
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const secrets = require('../../../google_secrets.json');
import { getNameByscraping } from './scraping.mjs';

(async () => {

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: secrets.client_email,
    private_key: secrets.private_key,
  });

  await doc.loadInfo();
  await doc.addSheet({
    title: "scraping",
    headerValues: ["name", "company"],
  });

  const cards = await getNameByscraping();
  console.log(cards);
  const cart = doc.sheetsByTitle["scraping"];
  const rows = await cart.addRows(cards);

  rows.forEach(row => async() => {
    await row.save();
  });

})();
