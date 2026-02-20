import fs from 'fs';
const content = fs.readFileSync(new URL('../src/users/user.controller.js', import.meta.url), 'utf8');
console.log('--- USER CONTROLLER START ---');
console.log(content);
console.log('--- USER CONTROLLER END ---');
