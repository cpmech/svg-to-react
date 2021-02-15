import { sync as delSync } from 'del';
import fs from 'fs-extra';
import path from 'path';
import { runAll } from './runAll';

const DIST_PATH = path.join(__dirname, '..', 'dist');
const BUILD_PATH = path.join(__dirname, '..', 'src', 'components');

delSync(DIST_PATH);
delSync(BUILD_PATH);
fs.mkdirSync(BUILD_PATH);
runAll('assets/*.svg');
fs.copyFileSync('scripts/extra/withClasses.tsx', BUILD_PATH + '/withClasses.tsx');
