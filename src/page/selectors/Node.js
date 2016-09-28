import assert from '../../util/assert';

class Node {
    constructor(node) {
        this.node = node;
        assert.equal(node.get('type'), this.type, 'Wrong node type.');
    }

    get parent() {
        return this.node.get('parent');
    }

    get id() {
        return this.node.get('id');
    }
}
Node.prototype.type = undefined;

export default Node;
