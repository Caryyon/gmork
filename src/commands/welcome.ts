import inquirer from 'inquirer';

export default async function welcome() {
  try {
    console.log('I am, The Gmork!');
    const res = await inquirer.prompt([
      {
        type: 'list',
        name: 'welcome',
        message: 'How May I serve you?',
        choices: [
          'Take me to your lead... docs!',
          'Setup a new project',
          'Setup new gmork plugin',
          'Leave me to my thoughts',
        ],
      },
    ]);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
