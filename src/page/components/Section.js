import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {ImmutableTypes} from '../../util';

import {nodeType} from '../constants';
import {getNode} from '../selectors';
import Node from '../Node';

const Section = ({header, children}) => (
    <section>
        <header><h1>{header}</h1></header>
        {children.map((id) => <Node key={id} id={id} />)}
    </section>
);

Section.propTypes = {
    header: PropTypes.string.isRequired,
    children: ImmutableTypes.list.isRequired,
};

const mapStateToProps = (state, {id}) => ({
    header: getNode(state, id, nodeType.SECTION).heading,
    children: getNode(state, id, nodeType.SECTION).children,
});

const Connected = connect(mapStateToProps)(Section);

Connected.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Connected;
