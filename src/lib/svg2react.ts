import { camelize } from '@cpmech/basic';
import { ISvg, IReact } from './types';

const problems = [
  'clip-path',
  'color-interpolation-filters',
  'fill-opacity',
  'fill-rule',
  'stop-color',
  'stop-opacity',
  'stroke-width',
  'stroke-linejoin',
  'stroke-width',
  'stroke-miterlimit',
  'stroke-linecap',
  'fill-rule',
];

const replacements = problems.map((p) => ({
  from: p,
  to: camelize(p),
  rx: new RegExp(p, 'g'),
}));

export const svg2react = (svg: ISvg): IReact => {
  const data = replacements.reduce((acc, curr) => {
    return acc.replace(curr.rx, curr.to);
  }, svg.content);

  const componentName = `Svg${camelize(svg.name, true)}`;

  const code = `export interface ${componentName}Props {
  size?: string; // size of square container
  style?: React.CSSProperties; // not for height or width
}

export const ${componentName}: React.FC<${componentName}Props> = ({ size = '24px', style }) => {
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
          viewBox="0 0 ${svg.dims.width} ${svg.dims.height}"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${data}
        </svg>
      </div>
    </div>
  );
};
`;

  return { componentName, code };
};
