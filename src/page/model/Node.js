class Node {
    constructor(node) {
        this.node = node;
    }

    get parent() {
        return this.node.get('parent');
    }

    get id() {
        return this.node.get('id');
    }
}

export default Node;
