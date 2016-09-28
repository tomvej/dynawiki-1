import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {nodeType} from './constants';
import {getType} from './selectors';
import Section from './Section';
import Paragraph from './Paragraph';

const nodeMap = {
    [nodeType.SECTION]: Section,
    [nodeType.PARAGRAPH]: Paragraph,
};

const Node = ({id, type}) => {
    const Component = nodeMap[type];
    return <Component id={id} />;
};

Node.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(nodeType)),
};

const mapStateToProps = (state, {id}) => ({
    type: getType(state, id),
});

const Connected = connect(mapStateToProps)(Node);

Connected.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Connected;
