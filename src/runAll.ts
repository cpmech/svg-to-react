import glob from 'glob';
import { maybeWriteFile } from '@cpmech/basic-sys';
import { filepath2name, genApp, genStorybook, optimizeSvg, svg2react } from './lib';

export const runAll = async (inputDir: string, outputDir: string) => {
  // generate and save components
  const filepaths = glob.sync(`${inputDir}/*.svg`);
  const names = filepaths.map((fp) => filepath2name(fp));
  const components = names.map(() => '');
  for (let i = 0; i < filepaths.length; i++) {
    console.log(`... optimizing ${names[i]}.svg`);
    const svg = await optimizeSvg(filepaths[i]);
    const react = svg2react(svg);
    components[i] = react.componentName;
    console.log(`... writing ${components[i]} component`);
    maybeWriteFile(true, `${outputDir}/components/${names[i]}.tsx`, () => react.code);
  }

  // generate and save index.ts
  const indexTs = components.reduce((acc, curr) => `${acc}export * from './${curr}';\n`, '');
  maybeWriteFile(true, `${outputDir}/index.ts`, () => indexTs);

  // generate and save App.tsx
  const appTsx = genApp(components);
  maybeWriteFile(true, `${outputDir}/App.tsx`, () => appTsx);

  // generate and save AllSvg.stories.tsx
  const allSvgStories = genStorybook(components);
  maybeWriteFile(
    true,
    `${outputDir}/components/__stories__/AllSvg.stories.tsx`,
    () => allSvgStories,
  );
};
