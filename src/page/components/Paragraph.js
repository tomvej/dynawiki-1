import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {getNode} from '../selectors';
import {nodeType} from '../constants';

const Paragraph = ({text}) => (<p>{text}</p>);

Paragraph.propTypes = {
    text: PropTypes.string,
};

const mapStateToProps = (state, {id}) => ({
    text: getNode(state, id, nodeType.PARAGRAPH).text,
});

const Connected = connect(mapStateToProps)(Paragraph);

Connected.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Connected;
