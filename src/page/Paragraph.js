import React from 'react';
import {connect} from 'react-redux';

import {getParagraph} from './selectors';

const Paragraph = ({text}) => (<p>{text}</p>);

const mapStateToProps = (state, {id}) => ({
    text: getParagraph(state, id).text,
});

export default connect(mapStateToProps)(Paragraph);
