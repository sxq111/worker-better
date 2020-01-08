const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rst = fs.readFileSync(path.resolve(__dirname, 'url-data'), 'utf8');

const allPaths = rst.split('\n').filter(str => str && str[0] === '/' && (str.endsWith('js')));

function exec(cmd) {
    const output = execSync(cmd, { encoding: 'utf8' });
    console.log(`exec ${cmd}: ${output}`);
    return output;
}

for (let i = 0; i < allPaths.length; i++) {
    try {
        const output = exec(`npx jscodeshift -t ./mods/replace-zent-form-import.js ${allPaths[i]}`);
        console.log('output:', output);
    }catch(e){
        console.log('Error:',e);
    }
}
