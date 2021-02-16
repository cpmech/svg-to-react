export const genXCollection = (components: string[], url: string): string => {
  if (components.length < 1) {
    return '';
  }

  const imports = components.reduce(
    (acc, curr) => `${acc}import { ${curr} } from './assets/${curr}';\n`,
    '',
  );

  const details = components.reduce(
    (acc, curr) => `${acc}  { name: '${curr}', icon: <${curr} size={size} /> },\n`,
    '',
  );

  return `${imports}

const size = '64px';
const color = '#3184d1';

const icons = [
${details}
];

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
      {icons.map(({ name, icon }, i) => (
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
              {icon}
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
