# Tool to convert SVG files to React components

## Installation

```bash
npm install -g @cpmech/svg-to-react
```

## Usage

```bash
$ svg-to-react
```

![](docs/fig-usage.png)

## Examples of output

### SvgSync.tsx

```typescript
export interface SvgSyncProps {
  size?: string; // size of square container
  style?: React.CSSProperties; // not for height or width
}

export const SvgSync: React.FC<SvgSyncProps> = ({ size = '24px', style }) => {
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
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M434.67 285.59v-29.8c0-98.73-80.24-178.79-179.2-178.79a179 179 0 00-140.14 67.36m-38.53 82v29.8C76.8 355 157 435 256 435a180.45 180.45 0 00140-66.92" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M32 256l44-44 46 44m358 0l-44 44-46-44"/>
        </svg>
      </div>
    </div>
  );
};
```

### XCollection.tsx

```typescript
import { Suspense, lazy } from 'react';

const size = '64px';
const color = '#3184d1';

const names = ['SvgSync'];

const Icon: React.FC<{ name: string }> = ({ name }) => {
  const Comp = lazy(() => import(`./assets/${name}`).then((module) => ({ default: module[name] })));
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
          href={`http://localhost:3000/${name}.tsx`}
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
```
