#!/usr/bin/env node
import open from 'open';
import chalk from 'chalk';
import { github, init, help, welcome, run } from './commands/index.js';

async function main({ input, flags, pkg: { name } }) {
  switch (input[0]) {
    case 'init':
      init();
      break;
    case 'bite':
      spit(console.log(chalk.bold.red('Bite at the nearest thing')));
      break;
    case 'docs':
      async () => {
        try {
          await open(`https://github.com/Caryyon/gmork`);
        } catch (err) {
          console.log(err);
        }
      };
      break;
    case 'run':
      run(input);
      break;
    case 'git':
      github();
      break;
    default:
      welcome(name);
  }
}

main(help);
