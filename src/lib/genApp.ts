export const genApp = (components: string[]): string => {
  if (components.length < 1) {
    return '';
  }

  let app = `import logo from './logo.svg';
import './App.css';
`;

  app += components.reduce((acc, curr) => `${acc}import { ${curr} } from './components';\n`, '');

  app += `
export const App = () => {
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

  app += components.reduce(
    (acc, curr) => `${acc}          <div><${curr} size="64px" /></div>\n`,
    '',
  );

  app += `        </div>
      </header>
    </div>
  );
};
`;

  return app;
};
