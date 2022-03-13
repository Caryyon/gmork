import { cosmiconfig } from "cosmiconfig";
import os from "os";
import open from "open";
import inquirer from "inquirer";
import { Octokit } from "@octokit/core";

export default (name) => async () => {
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
    const repos = data.map((item) => item.full_name);
    // get which one they wanna open
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "githubRepoSlug",
        message: "Which Repository?",
        choices: repos,
      },
    ]);
    // open a browser window with selected repo
    await open(`https://github.com/${answer.githubRepoSlug}`);
  } catch (err) {
    if (err.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("couldn't be rendered in the env");
    } else if (err.code === "ENOENT") {
      console.log("====================== GMORK SAYS ======================");
      console.log(`I couldn't find a config file at ${err.path}`);
      console.log(
        'I must be initialized with "gmork init" before I may do your bidding'
      );
      console.log("========================================================");
    } else {
      // Something else went wrong
      console.error({ err });
    }
  }
};
