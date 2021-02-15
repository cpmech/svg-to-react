/// <reference types="./enquirer" />
import { Confirm, prompt } from 'enquirer';
import fs from 'fs';

const main = async () => {
  console.log('hello');

  const response = await prompt([
    {
      type: 'input',
      name: 'inputDir',
      message: 'What is the "input" directory?',
      initial: './assets',
    },
    {
      type: 'input',
      name: 'outputDir',
      message: 'What is the "output" directory?',
      initial: '/tmp/svg-to-react',
    },
  ]);

  const { inputDir, outputDir } = response;

  if (!fs.existsSync(inputDir)) {
    console.log('😟 Input directory does not exist');
    return;
  }

  if (!fs.existsSync(outputDir)) {
    console.log('😟 Output directory does not exist');
    return;
  }

  const confirmObject = new Confirm({
    message: 'Rewrite files in the output directory? ️⚠️ ',
  });

  const confirm = await confirmObject.run();
  if (!confirm) {
    console.log('👍 ok, bye');
    return;
  }

  console.log('🚀 Finding SVG files');
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.warn(error);
  }
})();

// filepath: string; // e.g ./assets/houseThreeD.svg
// filepath: string; // e.g /tmp/svg-to-react/HouseThreeD.tsx
