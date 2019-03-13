const Generator = require('yeoman-generator');
const { fnName } = require('../../utils/string');

const choices = [
  'Take Every',
  'Take Latest',
];

const typeMap = {
  [choices[0]]: 'takeEvery',
  [choices[1]]: 'takeLatest',
};

module.exports = class extends Generator {
  async init() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Saga name',
        default: this.appname,
      },
      {
        type: 'list',
        name: 'type',
        message: 'What type of reducer?',
        choices,
      },
    ]);
  }

  writing() {
    const name = fnName(this.answers.name);
    const type = typeMap[this.answers.type];

    this.fs.copyTpl(
      this.templatePath('./saga.ts.ejs'),
      this.destinationPath(`${process.cwd()}/${name}Saga.ts`),
      { myName: name, type },
    );
    this.fs.copyTpl(
      this.templatePath('./saga.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}Saga.test.ts`),
      { myName: name, type },
    );
  }
};
