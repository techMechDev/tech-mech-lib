const { rmSync } = require('node:fs');
const successMsg = 'clean method execute\x1b[32m successfully\x1b[0m';
function clean(path = 'both') {
    try {
        if (path === 'both' || path=== 'dist') rmSync('./dist', {recursive:true});
        if (path === 'both' || path=== 'lib') rmSync('./lib', {recursive:true});
        console.log(successMsg);
    } catch(error) {
        if (error.errno !== -4058) throw error;
        const errorMsg = `\x1b[43m WARNING \x1b[0m No se ha encontrado el path: \x1b[41m ${error.path} \x1b[0m`;
        console.log(`${errorMsg}\n\x1b[36m Continuando el proceso...\x1b[0m`);
        if (error.path === './dist') clean('lib');
        if (error.path === './lib') console.log(successMsg);
    }    
}
clean();