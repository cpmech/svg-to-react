export const genXCollection = (components: string[], url: string): string => {
  if (components.length < 1) {
    return '';
  }

  const allNames = "'" + components.join("', '") + "'";

  return `import { Suspense, lazy } from 'react';

const size = '64px';
const color = '#3184d1';

const names = [${allNames}];

const Icon: React.FC<{ name: string }> = ({ name }) => {
  const Comp = lazy(() => import(\`./assets/\${name}\`).then((module) => ({ default: module[name] })));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comp size={size} />
    </Suspense>
  );
};

export const XCollection: React.FC = () => {
  return (
    <div
      style={{
        marginTop: 50,
        marginBottom: 50,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {names.map((name, i) => (
        <a
          key={i}
          href={\`${url}/\${name}.tsx\`}
          style={{ color }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                color,
              }}
            >
              <Icon name={name} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                fontSize: '0.7em',
              }}
            >
              {name}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
`;
};
