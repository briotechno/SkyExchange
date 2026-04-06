const fs = require('fs');
const path = 'd:/HTMl to react/skyReact/src/styles/skyexchange.css';
let content = fs.readFileSync(path, 'utf8');

// Remove hlbr
content = content.replace(/hlbr: expression\(.*?\);/g, '');
// Remove *property hacks
content = content.replace(/^\s*\*[\w-]+:.*?;/gm, '');
// Remove _property hacks
content = content.replace(/^\s*_[\w-]+:.*?;/gm, '');

fs.writeFileSync(path, content);
console.log('Cleaned CSS successfully');
