import Node from './Node';
import {nodeType} from '../constants';

class Paragraph extends Node {
    constructor(node) {
        super(node);
    }

    get text() {
        return this.node.get('text');
    }
}
Paragraph.prototype.type = nodeType.PARAGRAPH;

export default Paragraph;
