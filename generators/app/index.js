const Generator = require('yeoman-generator');
const chalk = require('chalk');

module.exports = class extends Generator {
  async prompting() {
    this.log(`Welcome to ${chalk.red('rct')} generator!`);

    const prompts = [
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
          'component',
          'container',
          'reducer',
          'selector',
          'action',
          'saga',
          'function',
        ],
      },
    ];

    const answers = await this.prompt(prompts);

    this.log(`...generating ${answers.action}`);

    await this.spawnCommand('yo', [`rct:${answers.action}`]);
  }
};
