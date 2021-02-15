import path from 'path';
import SVGO from 'svgo';
import {
  extractViewBox,
  filepath2name,
  getSvgContent,
  getSvgDims,
  optimizeSvg,
  viewBox2dims,
} from '../svgTools';

const sample1 = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns="http://www.w3.org/2000/svg"
   id="svg4"
   version="1.1"
   viewBox="0 0 192 512"
   aria-hidden="true">
  <defs
     id="defs8" />
  <path
     id="path2"
     d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"
     fill="currentColor" />
</svg>`;

const sample1optContent = `<path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" fill="currentColor"/>`;

const sample2 = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg8"
   version="1.1"
   viewBox="0 0 210 297"
   height="297mm"
   width="210mm">
  <defs
     id="defs2" />
  <metadata
     id="metadata5">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     id="layer1">
    <path
       id="path815"
       d="M 51.40476,61.142855 122.46428,182.09524"
       style="fill:none;stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" />
  </g>
</svg>`;

const sample2optContent =
  '<path d="M51.405 61.143l71.06 120.952" fill="none" stroke="#000" stroke-width=".265"/>';

describe('filepath2name', () => {
  it('should convert filepath to name', () => {
    expect(filepath2name('./assets/houseThreeD.svg')).toBe('houseThreeD');
  });
});

describe('extractViewBox', () => {
  it('should extract the viewbox of svg file', () => {
    expect(extractViewBox(sample1)).toBe('0 0 192 512');
    expect(extractViewBox(sample2)).toBe('0 0 210 297');
  });
});

describe('viewBox2dims', () => {
  it('should return dims', () => {
    expect(viewBox2dims(sample1)).toEqual({ width: '192', height: '512' });
    expect(viewBox2dims(sample2)).toEqual({ width: '210', height: '297' });
  });
});

describe('getSvgDims', () => {
  it('should return svg dims, from viewBox or {width,height}', async () => {
    const svgo = new SVGO({});
    const opt1 = await svgo.optimize(sample1);
    const opt2 = await svgo.optimize(sample2);
    expect(getSvgDims(opt1.info, sample1)).toEqual({ width: '192', height: '512' });
    expect(getSvgDims(opt2.info, sample2)).toEqual({ width: '210mm', height: '297mm' });
  });
});

describe('getSvgContent', () => {
  it('should return svg content', async () => {
    const svgo = new SVGO({});
    const opt1 = await svgo.optimize(sample1);
    const opt2 = await svgo.optimize(sample2);
    expect(getSvgContent(opt1.data)).toBe(sample1optContent);
    expect(getSvgContent(opt2.data)).toBe(sample2optContent);
  });
});

describe('optimizeSvg', () => {
  it('should optimize SVG', async () => {
    const res1 = await optimizeSvg(path.join(__dirname, '../../../assets/sample1.svg'));
    const res2 = await optimizeSvg(path.join(__dirname, '../../../assets/sample2.svg'));
    expect(res1).toStrictEqual({
      name: 'sample1',
      dims: { width: '192', height: '512' },
      content: sample1optContent,
    });
    expect(res2).toStrictEqual({
      name: 'sample2',
      dims: { width: '210mm', height: '297mm' },
      content: sample2optContent,
    });
  });
});
