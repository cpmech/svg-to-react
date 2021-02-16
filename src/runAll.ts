import glob from 'glob';
import path from 'path';
import { maybeWriteFile } from '@cpmech/basic-sys';
import { genXCollection, optimizeSvg, svg2react } from './lib';
import { camelize } from '@cpmech/basic';

export const getCompName = (prefix: string, filepath: string): string => {
  const filekey = path
    .basename(filepath, path.extname(filepath))
    .replace(/-/g, '_')
    .replace(/\s/g, '_');
  return `${prefix}${camelize(filekey, true)}`;
};

export const runAll = async (inputDir: string, outputDir: string, prefix: string, url: string) => {
  // generate and save components
  const filepaths = glob.sync(`${inputDir}/*.svg`);
  const components = filepaths.map((filepath) => getCompName(prefix, filepath));
  for (let i = 0; i < filepaths.length; i++) {
    console.log(`... processing ${components[i]}`);
    const svg = await optimizeSvg(filepaths[i]);
    const code = svg2react(components[i], svg);
    maybeWriteFile(true, `${outputDir}/assets/${components[i]}.tsx`, () => code);
  }

  // generate and save XCollection.tsx
  const appTsx = genXCollection(components, url);
  maybeWriteFile(true, `${outputDir}/XCollection.tsx`, () => appTsx);
};
