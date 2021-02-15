import fs from 'fs';
import Enquirer from 'enquirer';
import { runAll } from './runAll';

const main = async () => {
  console.log('hello');

  const response = await Enquirer.prompt([
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

  const { inputDir, outputDir } = response as any;

  if (!fs.existsSync(inputDir)) {
    console.log('😟 Input directory does not exist');
    return;
  }

  if (!fs.existsSync(outputDir)) {
    console.log('😟 Output directory does not exist');
    return;
  }

  const confirmObject = new (Enquirer as any).Confirm({
    message: 'Rewrite files in the output directory? ️⚠️ ',
  });

  const confirm = await confirmObject.run();
  if (!confirm) {
    console.log('👍 ok, bye');
    return;
  }

  console.log('🚀 Processing SVG files');
  await runAll(inputDir, outputDir);

  console.log('😀 DONE');
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.warn(error);
  }
})();
