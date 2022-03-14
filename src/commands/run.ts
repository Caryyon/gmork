import chalk from 'chalk';
import { execa, execaCommand } from 'execa';

export default async (commands) => {
  const [command, ...rest] = commands;
  try {
    //await execa('stmux', ['[ ' + rest.join(' ') + ' ]'], {
    //preferLocal: true,
    //stdio: [0, 1, 2],
    //});
    await execaCommand(`stmux -- [ '${rest.join(' ')}' ] `, {
      preferLocal: true,
      stdio: [0, 1, 2],
    });
  } catch (err) {
    console.log(chalk.bold.red(err));
  }
};
