import { Iany } from '@cpmech/basic';
import { hasSameProp } from '@cpmech/js2ts';
import { IDims } from './types';

export const extractViewBox = (svgStr: string): string => {
  const viewBoxRegex = /<svg .*?viewBox=["'](-?[\d.]+[, ]+-?[\d.]+[, ][\d.]+[, ][\d.]+)["']/;
  const matches = svgStr.match(viewBoxRegex);
  return matches && matches.length >= 2 ? matches[1] : '0 0 10000 10000';
};

export const viewBox2dims = (svgStr: string): IDims => {
  const viewBox = extractViewBox(svgStr);
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
