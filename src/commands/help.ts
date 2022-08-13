import meow from 'meow';
export default meow(
  `
  Usage:
    $ gmork             Summons The Gmork to your side
    $ gmork init        Will walk you through setup (~/.gmorkrc)
    $ gmork docs        Teleport you to The Gmork docs.
    $ gmork git         Summons a list of your github projects
                        and opens the selected project in a browser
    $ gmork bite        I wouldn't do that if I were you...

`
);
