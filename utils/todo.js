/*
 * helper funciton that allows for a message to be passed
 * this is for stubbing out api flags quickly
 * @param {string} message
 */
export default function todo(message) {
  try {
    message ? console.log(message) : console.log(`This is a future feature`);
  } catch (error) {
    console.log(error);
  }
}
