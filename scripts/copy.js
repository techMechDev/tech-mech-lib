const { copyFile, readdirSync, stat } = require('node:fs');
const path = require('node:path');
const fs = require('fs');

function copy() {
    console.log('\x1b[33m initializing... node copy.js\x1b[0m');
    const src = path.join(__dirname, '../src/');
    const lib = path.join(__dirname, '../lib/');
    readdirSync(src, {recursive: true}).forEach((file) => {
        stat(src.concat(file), (err, stats) => {
            if (err) throw err;
            if (!stats.isDirectory() && file.match(/\module.css$/i)) {
                copyFile(src.concat(file), lib.concat(file), fs.constants.COPYFILE_EXCL, error => {
                    if (error) {
                        console.log(`\x1b[31m failed copy\x1b[0m:\x1b[33m${lib.concat(file)}\x1b[0m`);
                    }else console.log(`\x1b[32m copy succesful\x1b[0m:\x1b[33m${lib.concat(file)}\x1b[0m`);
                });
            }            
        });
    });
}

copy();
