const Generator = require('yeoman-generator');
const { capitalize } = require('lodash');
const { fnName } = require('../../utils/string');

module.exports = class extends Generator {
  async init() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Function name',
        default: this.appname,
      },
    ]);
  }

  writing() {
    const selectorName = `${fnName(this.answers.name)}Selector`;
    const selectName = `select${capitalize(fnName(this.answers.name))}`;
    this.fs.copyTpl(
      this.templatePath('./selector.ts.ejs'),
      this.destinationPath(`${process.cwd()}/${selectorName}.ts`),
      { selectorName, selectName },
    );
    this.fs.copyTpl(
      this.templatePath('./selector.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${selectorName}.test.ts`),
      { selectorName, selectName },
    );
  }
};
