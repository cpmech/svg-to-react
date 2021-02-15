import { ISvg } from '../types';
import { svg2react } from '../svg2react';

const svg1: ISvg = {
  name: 'sample1',
  dims: { width: '192', height: '512' },
  content: `<path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" fill="currentColor"/>`,
};

const code1 = String.raw`export interface SvgSample1Props {
  size?: string; // size of square container
  style?: React.CSSProperties; // not for height or width
}

export const SvgSample1: React.FC<SvgSample1Props> = ({ size = '24px', style }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
        height: size,
        width: size,
      }}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          width: '100%',
          padding: 0,
          paddingBottom: '100%',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
          }}
          viewBox="0 0 192 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
};
`;

const code2 = String.raw`export interface SvgSample2Props {
  size?: string; // size of square container
  style?: React.CSSProperties; // not for height or width
}

export const SvgSample2: React.FC<SvgSample2Props> = ({ size = '24px', style }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
        height: size,
        width: size,
      }}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          width: '100%',
          padding: 0,
          paddingBottom: '100%',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
          }}
          viewBox="0 0 210mm 297mm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M51.405 61.143l71.06 120.952" fill="none" stroke="#000" stroke-width=".265"/>
        </svg>
      </div>
    </div>
  );
};
`;

const svg2: ISvg = {
  name: 'sample2',
  dims: { width: '210mm', height: '297mm' },
  content: `<path d="M51.405 61.143l71.06 120.952" fill="none" stroke="#000" stroke-width=".265"/>`,
};

describe('svg2react', () => {
  it('should convert svg data to react data', () => {
    const res1 = svg2react(svg1);
    const res2 = svg2react(svg2);
    expect(res1).toStrictEqual({ componentName: 'SvgSample1', code: code1 });
    expect(res2).toStrictEqual({ componentName: 'SvgSample2', code: code2 });
  });
});
