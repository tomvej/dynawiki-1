import React from 'react'
import {connect} from 'react-redux'

import {getChildren, getHeading} from './selectors'
import Node from './Node'

const Section = ({header, children}) => (
    <section>
        <header><h1>{header}</h1></header>
        {children.map(id => <Node key={id} id={id}/>)}
    </section>
);

const mapStateToProps = (state, {id}) => ({
    header: getHeading(state, id),
    children: getChildren(state, id)
});

export default connect(mapStateToProps)(Section);
