const Generator = require('yeoman-generator');
const lodash = require('lodash');
const { fnName } = require('../../utils/string');

module.exports = class extends Generator {
  async init() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Container name',
        default: this.appname,
      },
    ]);
  }

  writing() {
    const name = `${lodash.upperFirst(fnName(this.answers.name))}Container`;
    this.fs.copyTpl(
      this.templatePath('./container.tsx.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.tsx`),
      { myCont: name },
    );
    this.fs.copyTpl(
      this.templatePath('./container.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.tsx`),
      { myCont: name },
    );
  }
};
