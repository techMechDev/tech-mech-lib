const { readFile, writeFile, mkdir, stat, readdir } = require('node:fs');
const path = require('node:path');

const folderComponents = path.join(__dirname, '../src/components');
const folderStories = path.join(__dirname, '../stories');
const folderTemplate = path.join(__dirname, '../template/component/Component');
const _js = '.js';
const _md = '.md';
const _css = '.module.css';
const _stories = '.stories.js';
const _test = '.test.js';
const template_js = folderTemplate.concat(_js);
const template_md = folderTemplate.concat(_md);
const template_css = folderTemplate.concat(_css);
const template_stories = folderTemplate.concat(_stories);
const template_test = folderTemplate.concat(_test);
const [,, component, _route] = process.argv;
const route = {
    atoms: 'atoms',
    molecules: 'molecules',
    layouts: 'layouts',
    a: 'atoms',
    m: 'molecules',
    l: 'layouts'
}
const version = 'version 1.0';
const responses = [];
const questions = [
    'Nombre del componente: ',
    'Tipo de componente (atoms, molecules, layouts): ',
    `El nombre del componente es \x1b[36m#component\x1b[0m, ¿Es correcto? \x1b[32mS\x1b[0m/\x1b[31mN\x1b[0m: `
];
let state = 0;
let nameValid = component?.length > 2;
let routeValid = !(_route != 'atoms' && _route != 'molecules' && _route != 'layouts' && _route != 'a' && _route != 'm' && _route != 'l');

console.log(`  \x1b[33m/\x1b[0m\x1b[35m--------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m--------\x1b[0m\x1b[33m\\\x1b[0m                     /\x1b[35m-------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m-------\x1b[0m\\`);
console.log(` \x1b[33m/\x1b[0m | ** ** \x1b[36m||\x1b[0m ** ** | \x1b[33m\\\x1b[0m   \x1b[38;5;152m${version}\x1b[0m   \x1b[33m*\x1b[0m  | ** ** \x1b[36m||\x1b[0m ** ** |  \x1b[33m*\x1b[0m`);
console.log(`\x1b[33m*\x1b[0m  | ** ** \x1b[36m||\x1b[0m ** ** |  \x1b[33m*\x1b[0m \x1b[38;5;152mby techMechDev\x1b[0m  \x1b[33m\\\x1b[0m | ** ** \x1b[36m||\x1b[0m ** ** | \x1b[33m/\x1b[0m`);
console.log(`   \\\x1b[35m-------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m-------\x1b[0m/                     \x1b[33m\\\x1b[0m\x1b[35m--------\x1b[0m\x1b[36m\\/\x1b[0m\x1b[35m--------\x1b[0m\x1b[33m/\x1b[0m`);

if (nameValid && routeValid) {
    responses[0] = component;
    responses[1] = route[_route];
    scafolding();
}

if (!_route || !component || !routeValid) {
    process.stdin.on('data', data => {
        const datos = data.toString().trim();
        const isEnter = datos === '';

        if(state === 0) {
            if (!isEnter) responses[0] = datos;
            else nameValid = responses[0]?.length > 1;
        }else if (state === 1) {
            responses[1] = datos;
        }else {
            if (isEnter || datos === 'S' || datos === 's') nameValid = responses[0].length > 1;
            else {
                responses[0] = datos;
                nameValid = responses[0].length > 1;
            }
        }

        if (nameValid) {
            if (responses[1] != 'atoms' && responses[1] != 'molecules' && responses[1] != 'layouts') {
                question(1);
            }else {
                scafolding();
            }
        } else {
            if (responses.length < 1 || responses[0]?.length < 2) question(0)
            else question(2);
        }
    });

    if (!component) question(0);
    else {
        responses[0] = component;
        question(2);
    }
}

function question (i) {
    process.stdout.write(questions[i].replace('#component', responses[0]));
    state = i;
}

function scafolding () {
    process.stdin.unref();
    console.log('creating scafolding...');
    const filename = responses[0].charAt(0).toUpperCase().concat(responses[0].slice(1));

    _readFile(template_js, filename, _js, folderComponents, responses[1]);
    _readFile(template_css, filename, _css, folderComponents, responses[1]);
    _readFile(template_md, filename, _md, folderComponents, responses[1]);
    _readFile(template_test, filename, _test, folderComponents, responses[1]);
    _readFile(template_stories, filename, _stories, folderStories, responses[1]);  
}

function _writeFile (path, data) {
    writeFile(path, data, 'utf8', (e) => {
        if (e) throw e;
        console.log(`\x1b[32mSUCCESS:\x1b[0m \x1b[36m${path}\x1b[0m has been created.`);
    })
}

function _readDir (folder, file, data) {
    readdir(folder, 'utf8', (error, dirs) =>{
        if (error) throw error;

        let flag = dirs.some(dir => dir === file);
        if(flag) console.log(`\x1b[33mWARNING:\x1b[0m The file \x1b[36m${file}\x1b[0m already exists, has not been created.`);
        else _writeFile(path.join(folder, file), data);
    });
}

function _mkdir (folder, file, data) {
    mkdir(folder, { recursive: true }, (er) => {
        if (er) throw er;
        _writeFile(path.join(folder, file), data);
    });
}

function _readFile (template, filename, extension, target, nodo) {
    readFile(template, 'utf8', (error, dataComponent) => {
        if (error) { throw error }

        const data = dataComponent.replace(/Component/g, filename);
        const file = filename.concat(extension);
        let folder = path.join(target, nodo, filename);
        if(extension === _stories) folder = path.join(target, nodo);
        
        stat(folder, err => {
            if (err) {
                if(err.errno != -4058) throw err;                
                else _mkdir(folder, file, data);
            }else _readDir(folder, file, data);
        });        
    });
}
