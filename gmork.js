#!/usr/bin/env node
import fs from "fs"
import os from "os"
import meow from "meow"
import open from "open"
import execa from "execa"
import inquirer from "inquirer"
import { Octokit } from "@octokit/core"
import { cosmiconfig } from "cosmiconfig"

const cli = meow(
  `
  Usage:
    $ gmork         summons gmork to your service
    $ gmork init    will ask for config settings(~/.gmorkrc)
  Options:
    --git         summons list of github projects and take you to url
`
)

//console.log(cli)
async function main({ input, flags, pkg: { name } }) {
  try {
    if (input.length === 0 && flags.length === 0) {
      console.log("I am, The Gmork!")
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
      ])
    }
  } catch (err) {
    console.error(err)
  }
  if (input[0] === "init") {
    try {
      console.log(`
      If you need a github personal access token,
      follow the instructions here: https://tinyurl.com/aczjurff
      `)
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "init",
          message: "What is your github private key?",
        },
      ])
      if (answer.init !== "") {
        fs.writeFile(
          `${os.homedir()}/.gmorkrc`,
          JSON.stringify({ gitkey: answer.init })
        )
      }
    } catch (err) {
      console.log(err)
    }
  }
  if (flags.git) {
    const explorer = cosmiconfig(name)
    const { config } = await explorer.load(`${os.homedir()}/.gmorkrc`)
    const octokit = new Octokit({
      auth: config.gitkey,
    })
    const { data } = await octokit.request("/users/Caryyon/repos")
    const repos = data.map((item) => item.full_name)
    try {
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "githubRepoSlug",
          message: "Which Repository?",
          choices: repos,
        },
      ])
      await open(`https://github.com/${answer.githubRepoSlug}`)
    } catch (err) {
      if (err.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("couldn't be rendered in the env")
      } else {
        // Something else went wrong
        console.log(err)
      }
    }
  }
}
main(cli)
