import fs from 'fs';
const path = new URL('../configs/cors-configurations.js', import.meta.url);
console.log('path:', path.href);
const content = fs.readFileSync(path, 'utf8');
console.log('--- SOURCE START ---');
console.log(content);
console.log('--- SOURCE END ---');
