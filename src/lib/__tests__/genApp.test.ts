import { genApp } from '../genApp';

const correct = String.raw`import logo from './logo.svg';
import './App.css';
import { SvgSample1 } from './components';
import { SvgSample2 } from './components';

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
          <div><SvgSample1 size="64px" /></div>
          <div><SvgSample2 size="64px" /></div>
        </div>
      </header>
    </div>
  );
};
`;

describe('genApp', () => {
  it('should generate the App', () => {
    const res = genApp(['SvgSample1', 'SvgSample2']);
    expect(res).toBe(correct);
  });
});
