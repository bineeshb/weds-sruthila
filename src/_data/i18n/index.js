const en = require('./en');
const ml = require('./ml');
const ta = require('./ta');

function getLabels() {
  let labels = {};
  const keys = Object.keys({ ...en, ...ml, ...ta });

  keys.forEach(key => {
    labels = {
      ...labels,
      [key]: {
        en: en[key],
        ml: ml[key],
        ta: ta[key]
      }
    };
  });

  return labels;
}

module.exports = getLabels();
