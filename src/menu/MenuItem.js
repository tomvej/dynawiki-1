import React, {PropTypes} from 'react';
import {ChildTypes} from '../util';

const MenuItem = ({id, selectedItem, selectItem, onClick, children}) => (
    <li data-selected={id === selectedItem} onClick={onClick} onMouseOver={() => selectItem(id)}>{children}</li>
);

MenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    selectedItem: PropTypes.string,
    selectItem: PropTypes.func,
    children: ChildTypes.elements,
};

export default MenuItem;
