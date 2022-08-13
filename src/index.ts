#!/usr/bin/env node
import open from 'open';
import fs from 'fs';
import chalk from 'chalk';
import { execa } from 'execa';
import type { Result, AnyFlags } from 'meow';
import { github, init, help, welcome, run } from './commands/index.js';

async function main({ input, flags, pkg: { name } }: Result<AnyFlags>) {
  try {
    const { stdout } = await execa('node', [
      `${process.cwd()}/dist/commands/${input[0]}`,
      ...input,
    ]);
    console.log(chalk.green(stdout));
  } catch (error) {
    console.log(
      chalk.gray('====================== GMORK SAYS ======================')
    );
    console.log(
      chalk.red(`${input[0]} ${input[0]} ${input[0]}!
... I don't think that is a real spell.
Are you saying it right? ${input[0]}???`)
    );
    console.log(
      chalk.gray('========================================================')
    );
  }
}
main(help);
