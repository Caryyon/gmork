#!/usr/bin/env node
import fs from "fs";
import os from "os";
import meow from "meow";
import open from "open";
import execa from "execa";
import inquirer from "inquirer";
import { Octokit } from "@octokit/core";
import { cosmiconfig } from "cosmiconfig";
import todo from "./utils/todo.js";

const cli = meow(
  `
  Usage:
    $ gmork             Summons The Gmork to your side
    $ gmork init        Will walk you through setup (~/.gmorkrc)
    $ gmork docs        Teleport you to The Gmork docs.
    $ gmork git         Summons a list of your github projects
                        and opens the selected project in a browser
    $ gmork bite        Don't know what this does yet...

  Options:
    --
`
);

//console.log(cli)

async function main({ input, flags, pkg: { name } }) {
  try {
    if (input.length === 0 && flags.length === 0) {
      console.log("I am, The Gmork!");
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "mainOptions",
          message: "How May I serve you?",
          choices: [
            "Take me to github",
            "Tell me a joke",
            "Leave me to my thoughts",
          ],
        },
      ]);
    }
  } catch (err) {
    console.error(err);
  }
  if (input[0] === "init") {
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
  if (input[0] === "bite") {
    todo("Bite at the nearest thing");
  }
  if (input[0] === "docs") {
    try {
      await open(`https://github.com/Caryyon/gmork`);
    } catch (err) {
      console.log(err);
    }
  }
  if (input[0] === "git") {
    try {
      const explorer = cosmiconfig(name);
      const { config } = await explorer.load(`${os.homedir()}/.gmorkrc`);
      const octokit = new Octokit({
        auth: config.githubPersonalKey,
      });
      const { data } = await octokit.request(
        `/users/${config.githubUsername}/repos`
      );
      const repos = data.map((item) => item.full_name);
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "githubRepoSlug",
          message: "Which Repository?",
          choices: repos,
        },
      ]);
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
        console.log({ err });
      }
    }
  }
}
main(cli);
