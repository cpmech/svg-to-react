import { genStorybook } from '../genStorybook';

const correct = String.raw`import { Meta, Story } from '@storybook/react/types-6-0';
import { SvgSample1Props } from '../SvgSample1';
import { SvgSample1 } from '../';
import { SvgSample2 } from '../';

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
  component: SvgSample1,
} as Meta;

export const Default: Story<SvgSample1Props> = (args) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={rowStyle}><SvgSample1 {...args} style={l} /><span style={s} />SvgSample1</div>
    <div style={rowStyle}><SvgSample2 {...args} style={l} /><span style={s} />SvgSample2</div>
  </div>
);
`;

describe('genStorybook', () => {
  it('should generate the Storybook', () => {
    const res = genStorybook(['SvgSample1', 'SvgSample2']);
    expect(res).toBe(correct);
  });
});
