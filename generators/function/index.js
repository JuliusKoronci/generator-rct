const Generator = require('yeoman-generator');
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
    const name = fnName(this.answers.name);
    this.fs.copyTpl(
      this.templatePath('./function.ts.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.ts`),
      { myFunc: name },
    );
    this.fs.copyTpl(
      this.templatePath('./function.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.ts`),
      { myFunc: name },
    );
  }
};
