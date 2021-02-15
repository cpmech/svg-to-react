import fs from 'fs';
import SVGO from 'svgo';
import { Iany } from '@cpmech/basic';
import { hasSameProp } from '@cpmech/js2ts';
import { IDims, ISvg } from './types';

const svgo = new SVGO({});

export const extractViewBox = (svg: string): string => {
  const viewBoxRegex = /<svg .*?viewBox=["'](-?[\d.]+[, ]+-?[\d.]+[, ][\d.]+[, ][\d.]+)["']/;
  const noLinebreaks = svg.replace(/(?:\r\n|\r|\n)/g, '');
  const matches = noLinebreaks.match(viewBoxRegex);
  return matches && matches.length >= 2 ? matches[1] : '0 0 10000 10000';
};

export const viewBox2dims = (svg: string): IDims => {
  const viewBox = extractViewBox(svg);
  const list = viewBox.split(' ');
  if (list.length === 4) {
    return { width: list[2], height: list[3] };
  } else {
    return { width: '10000', height: '10000' };
  }
};

const reference = { width: '', height: '' };

export const getSvgDims = (svgInfo: Iany, svgStr: string): IDims => {
  if (hasSameProp(reference, svgInfo, 'width') && hasSameProp(reference, svgInfo, 'height')) {
    return {
      width: svgInfo.width,
      height: svgInfo.height,
    };
  }
  return viewBox2dims(svgStr);
};

export const getSvgContent = (source: string) => source.slice(source.indexOf('>') + 1).slice(0, -6);

export const optimizeSvg = async (filepath: string): Promise<ISvg> => {
  const data = fs.readFileSync(filepath, 'utf8');
  const res = await svgo.optimize(data, { path: filepath });
  const dims = getSvgDims(res.info, res.data);
  const content = getSvgContent(res.data);
  return { dims, content };
};
