import fs from 'fs';
import Enquirer from 'enquirer';
import { runAll } from './runAll';

const main = async () => {
  const response = await Enquirer.prompt([
    {
      type: 'input',
      name: 'inputDir',
      message: 'What is the "input" directory?',
      initial: '/tmp/svg-to-react/assets',
    },
    {
      type: 'input',
      name: 'outputDir',
      message: 'What is the "output" directory?',
      initial: '/tmp/svg-to-react/svgs',
    },
    {
      type: 'input',
      name: 'prefix',
      message: 'What is the prefix for the components?',
      initial: 'Icon',
    },
    {
      type: 'input',
      name: 'url',
      message: 'What is the base url for XCollection.tsx?',
      // initial: 'https://github.com/cpmech/ion-react-icons/blob/main/src/svgs/assets',
    },
  ]);

  const inputDir = (response as any).inputDir as string;
  const outputDir = (response as any).outputDir as string;
  const prefix = (response as any).prefix as string;
  const url = (response as any).url as string;

  if (!fs.existsSync(inputDir)) {
    console.log('😟 Input directory does not exist');
    return;
  }

  if (!outputDir) {
    console.log('😟 Name of output directory must be given');
    return;
  }

  if (!outputDir.startsWith('/tmp/svg-to-react')) {
    console.log('😟 We can only work with directories starting with "/tmp/svg-to-react"');
    return;
  }

  const confirmObject = new (Enquirer as any).Confirm({
    message: 'Delete existent output directory? ️⚠️ ',
  });

  const confirm = await confirmObject.run();
  if (!confirm) {
    console.log('👍 ok, bye');
    return;
  }

  if (fs.existsSync(outputDir)) {
    fs.rmSync(`${outputDir}`, { recursive: true });
  }

  console.log('🚀 Processing SVG files');
  await runAll(inputDir, outputDir, prefix, url);

  console.log('😀 DONE');
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.warn(error);
  }
})();
