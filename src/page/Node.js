import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {nodeType} from './constants';
import {getType} from './selectors';
import componentMap from './components';

const Node = ({id, type}) => {
    const Component = componentMap[type];
    return <Component id={id} />;
};

Node.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(Object.values(nodeType)),
};

const mapStateToProps = (state, {id}) => ({
    type: getType(state, id),
});

const Connected = connect(mapStateToProps)(Node);

Connected.propTypes = {
    id: PropTypes.string.isRequired,
};

export default Connected;
