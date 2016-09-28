import React, {PropTypes} from 'react';
import {ChildPropTypes} from '../util';

const MenuItem = ({id, selectedItem, selectItem, onClick, children}) => (
    <li aria-selected={id === selectedItem} onClick={onClick} onMouseOver={() => selectItem(id)}>{children}</li>
);

MenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    selectedItem: PropTypes.string,
    selectItem: PropTypes.func,
    children: ChildPropTypes.elements,
};

export default MenuItem;
