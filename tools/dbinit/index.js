import fs from 'fs';
import parsePage from './parsePage';
import buildTree from './buildTree';
import dbInit from './dbInit';

const file = process.argv[3];
const text = fs.readFileSync(file, 'utf-8');
const blocks = parsePage(text);
const tree = buildTree(blocks);
dbInit(tree);
