import { cosmiconfig } from 'cosmiconfig';
import os from 'os';
import open from 'open';
import inquirer from 'inquirer';

export default (name) => async () => {
  try {
    const explorer = cosmiconfig(name);
    // get username from gmorkrc
    const { config } = await explorer.load(`${os.homedir()}/.gmorkrc`);
    console.log(config);
  } catch (err) {
    if (err.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error("couldn't be rendered in the env");
    } else if (err.code === 'ENOENT') {
      console.error('====================== GMORK SAYS ======================');
      console.error(`I couldn't find a config file at ${err.path}`);
      console.error(
        'I must be initialized with "gmork init" before I may do your bidding'
      );
      console.error('========================================================');
    } else {
      // Something else went wrong
      console.error({ err });
    }
  }
};
