import inquirer from 'inquirer';

export default async function welcome(name) {
  try {
    console.log('I am, The Gmork!');
    const res = await inquirer.prompt([
      {
        type: 'list',
        name: 'welcome',
        message: 'How May I serve you?',
        choices: ['Tell me a joke', 'Leave me to my thoughts'],
      },
      {
        type: 'list',
        name: 'goodbye',
        message: 'Is there anything else I can help you with?',
        choices: ['Yes', 'Leave me to my thoughts'],
      },
    ]);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}
