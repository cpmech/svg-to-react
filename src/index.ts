const main = async () => {
  console.log('hello');
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.warn(error);
  }
})();
