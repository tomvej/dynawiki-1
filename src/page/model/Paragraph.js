import Node from './Node';

class Paragraph extends Node {
    get text() {
        return this.node.get('text');
    }
}

export default Paragraph;
