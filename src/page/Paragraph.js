import React from 'react'
import {connect} from 'react-redux'

import {getText} from './selectors'

const Paragraph = ({text}) => (<p>{text}</p>);

const mapStateToProps = (state, {id}) => ({
    text: getText(state, id)
});

export default connect(mapStateToProps)(Paragraph);
