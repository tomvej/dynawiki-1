import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {getParagraph} from './selectors';

const Paragraph = ({text}) => (<p>{text}</p>);

Paragraph.propTypes = {
    text: PropTypes.string,
};

const mapStateToProps = (state, {id}) => ({
    text: getParagraph(state, id).text,
});

const Connected = connect(mapStateToProps)(Paragraph);

Connected.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Connected;
