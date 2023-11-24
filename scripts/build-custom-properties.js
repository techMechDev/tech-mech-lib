const { choices, decisions } = require('../src/styles/tokens.js');
const toKebabCase = require('../utils/toKebabCase.js');
const fs = require('fs');

function buildCustomProperties() {
    const customChoices = getTokens(null, choices);
    const customDecisions = getTokens(null, decisions);
    const data = `:root {
    ${customChoices}
    ${customDecisions}
}`;
    fs.writeFile('./tokens.css', data, 'utf8', function (error) {
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

buildCustomProperties();