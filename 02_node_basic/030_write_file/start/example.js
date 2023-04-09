const fs = require('fs');
const path = require('path');

const distpath = path.resolve(__dirname, '../dist/test.txt');

fs.writeFileSync(distpath, 'hello world');