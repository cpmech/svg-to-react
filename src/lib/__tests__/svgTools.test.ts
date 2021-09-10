import path from 'path';
import { optimize } from 'svgo';
import { extractViewBox, getSvgContent, getSvgDims, optimizeSvg, viewBox2dims } from '../svgTools';

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

const sample3optContent =
  '<path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 0 0 3.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 0 1-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0 0 25.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 0 1 5-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 0 1 112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 0 1 5 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 0 0 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" fill="currentColor"/>';

const sample2optContent =
  '<path d="m51.405 61.143 71.06 120.952" style="fill:none;stroke:#000;stroke-width:.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"/>';

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
    const opt1 = optimize(sample1);
    const opt2 = optimize(sample2);
    expect(getSvgDims(opt1.info, sample1)).toEqual({ width: '192', height: '512' });
    expect(getSvgDims(opt2.info, sample2)).toEqual({ width: '210mm', height: '297mm' });
  });
});

describe('getSvgContent', () => {
  it('should return svg content', async () => {
    const opt1 = optimize(sample1);
    const opt2 = optimize(sample2);
    expect(getSvgContent(opt1.data)).toBe(sample1optContent);
    expect(getSvgContent(opt2.data)).toBe(sample2optContent);
  });
});

describe('optimizeSvg', () => {
  it('should optimize SVG', async () => {
    const res1 = await optimizeSvg(path.join(__dirname, '../../../assets/sample1.svg'), true);
    const res2 = await optimizeSvg(path.join(__dirname, '../../../assets/sample2.svg'), true);
    const res3 = await optimizeSvg(path.join(__dirname, '../../../assets/logo-github.svg'), true);
    expect(res1).toStrictEqual({
      dims: { width: '192', height: '512' },
      content: sample1optContent,
    });
    expect(res2).toStrictEqual({
      dims: { width: '210mm', height: '297mm' },
      content: sample2optContent,
    });
    expect(res3).toStrictEqual({
      dims: { width: '512', height: '512' },
      content: sample3optContent,
    });
  });
});
