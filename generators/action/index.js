const Generator = require('yeoman-generator');
const { fnName } = require('../../utils/string');

module.exports = class extends Generator {
  async init() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Action name',
        default: this.appname,
      },
      {
        type: 'input',
        name: 'type',
        message: 'Payload type',
        default: 'string',
      },
      {
        type: 'input',
        name: 'constant',
        message: 'Action constant',
        default: 'MY_ACTION_TYPE',
      },
    ]);
  }

  writing() {
    const name = `${fnName(this.answers.name)}Action`;
    const { type, constant } = this.answers;

    this.fs.copyTpl(
      this.templatePath('./action.ts.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.ts`),
      { myAction: name, myType: type, myConst: constant },
    );
    this.fs.copyTpl(
      this.templatePath('./action.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.ts`),
      { myAction: name, myType: type, myConst: constant },
    );
  }
};
