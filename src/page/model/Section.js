import Node from './Node';

class Section extends Node {
    get heading() {
        return this.node.get('heading');
    }

    get children() {
        return this.node.get('children');
    }
}

export default Section;
