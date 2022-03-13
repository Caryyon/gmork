import os from "os";
import fs from "fs";
import inquirer from "inquirer";

export default async function init() {
  try {
    console.log(`
      If you need a github personal access token,
      follow the instructions here: https://tinyurl.com/aczjurff
      `);
    const { githubUsername, githubPersonalKey } = await inquirer.prompt([
      {
        type: "input",
        name: "githubUsername",
        message: "What is your github username?",
      },
      {
        type: "input",
        name: "githubPersonalKey",
        message: "What is your github private key?",
      },
    ]);
    if (githubPersonalKey !== "") {
      fs.writeFile(
        `${os.homedir()}/.gmorkrc`,
        JSON.stringify({
          githubUsername,
          githubPersonalKey,
        }),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}
