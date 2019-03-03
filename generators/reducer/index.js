const Generator = require('yeoman-generator');
const { fnName } = require('../../utils/string');

const choices = [
  'Main Reducer',
  'Reducer function',
  'API Scaffold',
];

module.exports = class extends Generator {
  async init() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Reducer name',
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
    const name = `${fnName(this.answers.name)}Reducer`;
    const { type } = this.answers;
    switch (type) {
      case choices[0]: {
        this._mainReducer(name);
        break;
      }
      case choices[1]: {
        this._reducer(name);
        break;
      }
      case choices[2]: {
        break;
      }
      default:
        break;
    }
  }

  _reducer(name) {
    this.fs.copyTpl(
      this.templatePath('./reducer.ts.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.ts`),
      { myRed: name },
    );
    this.fs.copyTpl(
      this.templatePath('./reducer.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.ts`),
      { myRed: name },
    );
  }

  _mainReducer(name) {
    this.fs.copyTpl(
      this.templatePath('./main-reducer.ts.ejs'),
      this.destinationPath(`${process.cwd()}/${name}.ts`),
      { myRed: name },
    );
    this.fs.copyTpl(
      this.templatePath('./main-reducer.test.ts.ejs'),
      this.destinationPath(`${process.cwd()}/__tests__/${name}.test.ts`),
      { myRed: name },
    );
  }
};
