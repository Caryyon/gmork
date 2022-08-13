import { cosmiconfig } from 'cosmiconfig';
import chalk from 'chalk';
import os from 'os';
import open from 'open';
import inquirer from 'inquirer';
import { Octokit } from '@octokit/core';

export default async (name: string) => {
  try {
    const explorer = cosmiconfig(name);
    // get username from gmorkrc
    const { config } = await explorer.load(`${os.homedir()}/.gmorkrc`);
    // get auth with Octokit
    const octokit = new Octokit({
      auth: config.githubPersonalKey,
    });
    // get users repos
    const { data } = await octokit.request(
      `/users/${config.githubUsername}/repos`
    );
    // get names for repos
    const repos = data.map((item: { full_name: string }) => item.full_name);
    // get which one they wanna open
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'githubRepoSlug',
        message: 'Which Repository?',
        choices: repos,
      },
    ]);
    // open a browser window with selected repo
    await open(`https://github.com/${answer.githubRepoSlug}`);
  } catch (err) {
    if (err.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("couldn't be rendered in the env");
    } else if (err.code === 'ENOENT') {
      console.log(
        chalk.gray('====================== GMORK SAYS ======================')
      );
      console.log(
        chalk.bold.gray(`I couldn't sniff out a config file at ${err.path}`)
      );
      console.log(
        chalk.red(`You must first gather 3 candles and light them in a triangle formation around your
keyboard, sit with your legs crossed and type "gmork init" to open a portal so that I
may enter this world.`)
      );
      console.log(
        chalk.gray('========================================================')
      );
    } else {
      // Something else went wrong
      console.error({ err });
    }
  }
};
