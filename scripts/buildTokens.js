const { choices, decisions } = require('../src/styles/tokens.js');
const toKebabCase = require('./toKebabCase.js');
const fs = require('fs');
const pathLib = './lib/tokens.module.css';
const pathStyle = './src/styles/tokens.module.css';
const font = `@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,900;1,400;1,600;1,900&display=swap');`;

function buildTokens() {
  createCSS(pathLib, font);
  createCSS(pathStyle, font);
}


function createCSS( path, font) {
  const customChoices = getTokens(null, choices);
  const customDecisions = getTokens(null, decisions);
  const buildBy = `/* Building by buildTokens.js @techMechDev */\n`;
  const data = `${buildBy}\n\n${font}\n\n:root {\n  ${customChoices}\n  ${customDecisions}\n}`;
  fs.writeFile(path, data, 'utf8', function (error) {
      if (error) return console.log(error);
  });
}

function getTokens(parentKey, object) {
  const objectKeys = Object.keys(object);  
  return objectKeys.reduce((tokens, objectKey) => {
    const value = object[objectKey];
    const customProperty = parentKey
      ? toKebabCase(`${parentKey}-${objectKey}`)
      : toKebabCase(`${objectKey}`);
    if (Array.isArray(value)) {
      return `${tokens}\n  --${customProperty}: ${value.join(', ')};`
    } else if (typeof value === 'object') {
      return `${tokens}\n${getTokens(customProperty, value)}`;
    };
    const label = `--${parentKey}-${toKebabCase(objectKey)}`;
    return `${tokens}\n  ${label}: ${value};`;
  }, '');
}

buildTokens();
