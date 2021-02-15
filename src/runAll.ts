import fs from 'fs-extra';
import glob from 'glob';
import path from 'path';
import SVGO from 'svgo';
import { camelize } from '@cpmech/basic';
import { getSvgDims } from './helpers';
import { genCode } from './genCode';

const BUILD_PATH = path.join(__dirname, '..', 'src', 'components');
const STORIES_PATH = path.join(__dirname, '..', 'src', 'components', '__stories__');
const APP_PATH = path.join(__dirname, '..', 'src');

const svgo = new SVGO({});

// optimize file
const handleFile = async (filepath: string, data: string) => {
  try {
    const res = await svgo.optimize(data, { path: filepath });
    const dims = getSvgDims(res.info, res.data);
    const name = getName(filepath);
    console.log(`... generating ${name} ...`);
    return genCode(name, res.data, dims);
  } catch (error) {
    console.error(error);
  }
};

// get the icon name
export const getName = (filepath: string) => path.basename(filepath, path.extname(filepath));

// get component name
export const getComp = (filepath: string) => {
  const name = path.basename(filepath, path.extname(filepath));
  const filename = camelize(name);
  return `Icon${camelize(filename, true)}`;
};

// build the optimized SVG data
export const runAll = (globPattern: string) => {
  //
  // components/Icon{...}.tsx ///////////////////////////////////////////////////////////////

  const filepaths = glob.sync(globPattern);

  filepaths.forEach(async (filepath) => {
    try {
      const data = fs.readFileSync(filepath, 'utf8');
      const res = await handleFile(filepath, data);
      if (res) {
        const fp = path.join(BUILD_PATH, res.filepath);
        fs.outputFileSync(fp, res.code);
      } else {
        throw new Error('handleFile failed');
      }
    } catch (error) {
      console.warn('ERROR: ' + error);
    }
  });

  // components/index.ts ////////////////////////////////////////////////////////////////////

  const idx =
    filepaths.reduce((acc, curr) => `${acc}export * from './${getComp(curr)}';\n`, '') +
    `export * from './withClasses';\n`;

  const fpidx = path.join(BUILD_PATH, 'index.ts');
  fs.outputFileSync(fpidx, idx);

  // AllIcons.stories.tsx ///////////////////////////////////////////////////////////////////

  let storyboard = `import { Meta, Story } from '@storybook/react/types-6-0';
import { IconAccountProps } from '../IconAccount';
`;

  storyboard += filepaths.reduce(
    (acc, curr) => `${acc}import { ${getComp(curr)} } from '../';\n`,
    '',
  );

  storyboard += `
const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
};

const s: React.CSSProperties = {
  marginRight: 10,
};

const l: React.CSSProperties = {
  color: '#d11141',
};

export default {
  title: 'AllIcons',
  component: IconAccount,
} as Meta;

export const Default: Story<IconAccountProps> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
`;

  storyboard += filepaths.reduce((acc, curr) => {
    const n = `${getComp(curr)}`;
    return `${acc}    <div style={rowStyle}><${n} {...args} style={l} /><span style={s} />${n}</div>\n`;
  }, '');

  storyboard += `  </div>
);
`;

  fs.outputFileSync(path.join(STORIES_PATH, 'AllIcons.stories.tsx'), storyboard);

  // App.tsx ////////////////////////////////////////////////////////////////////////////////

  let app = `import React from 'react';
import logo from './logo.svg';
import './App.css';
`;

  app += filepaths.reduce(
    (acc, curr) => `${acc}import { ${getComp(curr)} } from './components';\n`,
    '',
  );

  app += `
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div style={{ marginTop: 50, width: '90%', display: 'flex', flexWrap: 'wrap' }}>
`;

  app += filepaths.reduce(
    (acc, curr) => `${acc}          <div><${getComp(curr)} size="64px" /></div>\n`,
    '',
  );

  app += `        </div>
      </header>
    </div>
  );
}

export default App;
  `;

  fs.outputFileSync(path.join(APP_PATH, 'App.tsx'), app);
};
