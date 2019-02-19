const Generator = require('yeoman-generator');

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
    const { name } = this.answers;
    this.fs.copyTpl(
      this.templatePath('./function.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.ts`),
      { myFunc: name },
    );
    this.fs.copyTpl(
      this.templatePath('./function.test.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.ts`),
      { myFunc: name },
    );
  }
};
