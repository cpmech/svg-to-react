import { genXSvgCollection } from '../genXSvgCollection';

const correct = String.raw`import { SvgSample1 } from './SvgSample1';
import { SvgSample2 } from './SvgSample2';

export const XSvgCollection: React.FC = () => {
  return (
    <div>
      <div style={{ marginTop: 50, width: '90%', display: 'flex', flexWrap: 'wrap' }}>
        <div><SvgSample1 size="64px" /></div>
        <div><SvgSample2 size="64px" /></div>
      </div>
    </div>
  );
};
`;

describe('genXSvgCollection', () => {
  it('should generate the XSvgCollection', () => {
    const res = genXSvgCollection(['SvgSample1', 'SvgSample2']);
    expect(res).toBe(correct);
  });
});
