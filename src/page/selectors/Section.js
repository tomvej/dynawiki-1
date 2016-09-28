import Node from './Node';
import {nodeType} from '../constants';

class Section extends Node {
    get heading() {
        return this.node.get('heading');
    }

    get children() {
        return this.node.get('children');
    }
}
Section.prototype.type = nodeType.SECTION;

export default Section;
