const lodash = require('lodash');

module.exports.fnName = name => lodash
  .chain(name)
  .camelCase()
  .value()
  .replace(/ /g, '');
