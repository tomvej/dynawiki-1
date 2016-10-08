import fs from 'fs';
import parsePage from './parsePage';
import buildTree from './buildTree';

const file = process.argv[3];
const text = fs.readFileSync(file, 'utf-8');
const blocks = parsePage(text);
const tree = buildTree(blocks);

console.log(tree);

