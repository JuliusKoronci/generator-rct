const Generator = require('yeoman-generator');
const lodash = require('lodash');
const { fnName } = require('../../utils/string');

module.exports = class extends Generator {
  async init() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name',
        default: this.appname,
      },
    ]);
  }

  writing() {
    const name = lodash.upperFirst(fnName(this.answers.name));
    this.fs.copyTpl(
      this.templatePath('./component.tsx.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.tsx`),
      { myComp: name },
    );
    this.fs.copyTpl(
      this.templatePath('./component.test.tsx.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.tsx`),
      { myComp: name },
    );
  }
};
