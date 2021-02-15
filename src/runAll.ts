import glob from 'glob';
import { maybeWriteFile } from '@cpmech/basic-sys';
import { filepath2name, genStorybook, genXSvgCollection, optimizeSvg, svg2react } from './lib';

export const runAll = async (inputDir: string, outputDir: string) => {
  // generate and save components
  const filepaths = glob.sync(`${inputDir}/*.svg`);
  const names = filepaths.map((fp) => filepath2name(fp));
  const components = names.map(() => '');
  for (let i = 0; i < filepaths.length; i++) {
    console.log(`... processing ${names[i]}`);
    const svg = await optimizeSvg(filepaths[i]);
    const react = svg2react(svg);
    components[i] = react.componentName;
    maybeWriteFile(true, `${outputDir}/svgs/${components[i]}.tsx`, () => react.code);
  }

  // generate and save AllSvg.stories.tsx
  const allSvgStories = genStorybook(components);
  maybeWriteFile(true, `${outputDir}/svgs/AllSvg.stories.tsx`, () => allSvgStories);

  // generate and save XSvgCollection.tsx
  const appTsx = genXSvgCollection(components);
  maybeWriteFile(true, `${outputDir}/svgs/XSvgCollection.tsx`, () => appTsx);

  // generate and save index file
  let indexTs = `export * from './XSvgCollection.ts';\n`;
  indexTs = components.reduce((acc, curr) => `${acc}export * from './${curr}';\n`, indexTs);
  maybeWriteFile(true, `${outputDir}/svgs/index.ts`, () => indexTs);
};
