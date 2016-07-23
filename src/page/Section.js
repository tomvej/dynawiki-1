import React from 'react'
import {connect} from 'react-redux'

import {getSection} from './selectors'
import Node from './Node'

const Section = ({header, children}) => (
    <section>
        <header><h1>{header}</h1></header>
        {children.map(id => <Node key={id} id={id}/>)}
    </section>
);

const mapStateToProps = (state, {id}) => ({
    header: getSection(state, id).heading,
    children: getSection(state, id).children
});

export default connect(mapStateToProps)(Section);
