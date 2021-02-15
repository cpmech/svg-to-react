import { camelize } from '@cpmech/basic';
import { ICode, IDims } from './types';

const problems = [
  'clip-path',
  'color-interpolation-filters',
  'fill-opacity',
  'fill-rule',
  'stop-color',
  'stop-opacity',
  'stroke-width',
];

const replacements = problems.map((p) => ({
  from: p,
  to: camelize(p),
  rx: new RegExp(p, 'g'),
}));

const getSVGContent = (source: string) => source.slice(source.indexOf('>') + 1).slice(0, -6);

const getReactCode = (
  componentName: string,
  width: string,
  height: string,
  svgPaths: string,
): string => {
  const data = replacements.reduce((acc, curr) => {
    return acc.replace(curr.rx, curr.to);
  }, svgPaths);

  return `export interface ${componentName}Props {
  size?: string; // size of square container
  style?: React.CSSProperties; // not for height or width
}

export const ${componentName}: React.FC<${componentName}Props> = ({ size = "24px", style }) => {
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
          viewBox="0 0 ${width} ${height}"
          xmlns="http://www.w3.org/2000/svg"
        >
          ${data}
        </svg>
      </div>
    </div>
  );
};
`;
};

export const genCode = (name: string, svgSource: string, dims: IDims): ICode => {
  const filename = camelize(name);
  const componentName = `Icon${camelize(filename, true)}`;
  const svgPaths = getSVGContent(svgSource);
  const code = getReactCode(componentName, dims.width, dims.height, svgPaths);
  const filepath = `${componentName}.tsx`;
  return { filepath, code };
};
