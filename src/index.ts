#!/usr/bin/env node
import open from 'open';
import fs from 'fs';
import chalk from 'chalk';
import type { Result, AnyFlags } from 'meow';
import { github, init, help, welcome, run } from './commands/index.js';

async function main({ input, flags, pkg: { name } }: Result<AnyFlags>) {
  const commands = fs.readdirSync(process.cwd() + '/dist/commands');
  console.log(commands);
  switch (input[0]) {
    case 'init':
      init();
      break;
    case 'bite':
      console.log(
        chalk.bold.red('Leaps forward with a growl, nearly biting your hand.')
      );
      console.log(chalk.bold.gray('What were you thinking?'));
      break;
    case 'docs':
      try {
        await open(`https://github.com/Caryyon/gmork`);
      } catch (err) {
        console.log(err);
      }
      break;
    case 'run':
      run(input);
      break;
    case 'git':
      github(name);
      break;
    default:
      welcome();
  }
}
main(help);
