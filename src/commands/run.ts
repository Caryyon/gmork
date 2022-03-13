import chalk from 'chalk';

export default (command) => async () => {
  console.log(chalk.bold.blue('INSIDE'), command);
};
