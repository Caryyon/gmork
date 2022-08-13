function plugin(args) {
  console.log('passed args: ', args);
}
plugin(process.argv.slice(3));
