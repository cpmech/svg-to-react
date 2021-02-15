export const genStorybook = (components: string[]): string => {
  if (components.length < 1) {
    return '';
  }

  let storyboard = `import { Meta, Story } from '@storybook/react/types-6-0';
import { ${components[0]}Props } from './${components[0]}';
`;

  storyboard += components.reduce((acc, curr) => `${acc}import { ${curr} } from '../';\n`, '');

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
  title: 'AllSvg',
  component: ${components[0]},
} as Meta;

export const Default: Story<${components[0]}Props> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
`;

  storyboard += components.reduce(
    (acc, curr) =>
      `${acc}    <div style={rowStyle}><${curr} {...args} style={l} /><span style={s} />${curr}</div>\n`,
    '',
  );

  storyboard += `  </div>
);
`;

  return storyboard;
};
