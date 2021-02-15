export const genXCollection = (components: string[]): string => {
  if (components.length < 1) {
    return '';
  }

  let app = components.reduce(
    (acc, curr) => `${acc}import { ${curr} } from './assets/${curr}';\n`,
    '',
  );

  app += `
export const XCollection: React.FC = () => {
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
