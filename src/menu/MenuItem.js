import React, {PropTypes} from 'react';

const MenuItem = ({id, selectedItem, selectItem, onClick, children}) => (
    <li aria-selected={id === selectedItem} onClick={onClick} onMouseOver={() => selectItem(id)}>{children}</li>
);

MenuItem.propTypes = {
    id: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    selectedItem: PropTypes.string,
    selectItem: PropTypes.func,
};

export default MenuItem;
