const fs = require('fs');

const parseToEnv = (object) => {
  return Object.keys(object).reduce((keys, key) => {
    return `${keys}${key}=${object[key]}\n`;
  }, '');
};

(() => {
  try {
    const { SECRETS_VALUES } = process.env;
    const parsedData = JSON.parse(SECRETS_VALUES);
    fs.writeFileSync('.env', parseToEnv(parsedData));
    console.log(`.env created`);
  } catch (e) {
    throw 'No secrets ' + e.message;
  }
})();
