import { readFile, writeFile } from 'node:fs';
const [,, _route, component] = process.argv;
const version = 'version 0.0.1';
const questions = ['Nombre del componente: ', 'Tipo de componente (atoms, molecules, layouts): '];
const responses = [];
function question(i) { process.stdout.write(questions[i]); };

console.log(`  \x1b[33m/\x1b[0m\x1b[35m--------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m--------\x1b[0m\x1b[33m\\\x1b[0m                     /\x1b[35m-------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m-------\x1b[0m\\`);
console.log(` \x1b[33m/\x1b[0m | ** ** \x1b[36m||\x1b[0m ** ** | \x1b[33m\\\x1b[0m  \x1b[38;5;152m${version}\x1b[0m  \x1b[33m*\x1b[0m  | ** ** \x1b[36m||\x1b[0m ** ** |  \x1b[33m*\x1b[0m`);
console.log(`\x1b[33m*\x1b[0m  | ** ** \x1b[36m||\x1b[0m ** ** |  \x1b[33m*\x1b[0m \x1b[38;5;152mby techMechDev\x1b[0m  \x1b[33m\\\x1b[0m | ** ** \x1b[36m||\x1b[0m ** ** | \x1b[33m/\x1b[0m`);
console.log(`   \\\x1b[35m-------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m-------\x1b[0m/                     \x1b[33m\\\x1b[0m\x1b[35m--------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m--------\x1b[0m\x1b[33m/\x1b[0m`);

if (!_route) {
    process.stdin.on('data', async function(data) {
        if(responses.length < 1) {
            responses.push(data.toString().trim());
        } else { responses[1] = data.toString().trim(); }
        if (responses[1] != 'atoms' && responses[1] != 'molecules' && responses[1] != ' layouts') {
            question(1);
        }else { process.exit(0); }
    });
    question(0);
}

/*
readFile('./templates/component/Component.js', 'utf8', function (error, dataComponent) {
    if (error) { throw error }
    const replacedData = dataComponent.replace(/Component/g, component);

    writeFile(`./${ruta}/${component}`, replacedData, 'utf8', function (err) {
            if (err) { throw err }
    })
});
*/
