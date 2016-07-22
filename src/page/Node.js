import React from 'react'
import {connect} from 'react-redux'

import {nodeType} from './constants'
import {getType} from './selectors'
import Section from './Section'
import Paragraph from './Paragraph'

const nodeMap = {
    [nodeType.SECTION]: Section,
    [nodeType.PARAGRAPH]: Paragraph
};

const Node = ({id, type}) => {
    const Component = nodeMap[type];
    return <Component id={id}/>
};

const mapStateToProps = (state, {id}) => ({
    id,
    type: getType(state, id)
});

export default connect(mapStateToProps)(Node);
