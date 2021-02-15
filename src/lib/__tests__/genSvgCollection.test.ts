import { genSvgCollection } from '../genSvgCollection';

const correct = String.raw`import logo from './logo.svg';
import './SvgCollection.css';
import { SvgSample1 } from './components';
import { SvgSample2 } from './components';

export const SvgCollection:React.FC = () => {
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

describe('genSvgCollection', () => {
  it('should generate the SvgCollection', () => {
    const res = genSvgCollection(['SvgSample1', 'SvgSample2']);
    expect(res).toBe(correct);
  });
});
