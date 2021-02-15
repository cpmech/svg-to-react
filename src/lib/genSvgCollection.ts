export const genSvgCollection = (components: string[]): string => {
  if (components.length < 1) {
    return '';
  }

  let app = `import logo from './logo.svg';
import './SvgCollection.css';
`;

  app += components.reduce((acc, curr) => `${acc}import { ${curr} } from './components';\n`, '');

  app += `
export const SvgCollection:React.FC = () => {
  return (
    <div>
      <div style={{ marginTop: 50, width: '90%', display: 'flex', flexWrap: 'wrap' }}>
`;

  app += components.reduce((acc, curr) => `${acc}        <div><${curr} size="64px" /></div>\n`, '');

  app += `      </div>
    </div>
  );
};
`;

  return app;
};
