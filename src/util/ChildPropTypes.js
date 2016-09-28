import {PropTypes} from 'react';

const oneOrMore = (propType) => PropTypes.oneOfType([propType, PropTypes.arrayOf(propType)]);

export default {
    elements: oneOrMore(PropTypes.element),
    nodes: oneOrMore(PropTypes.node),
};
