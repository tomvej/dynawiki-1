import React, {PropTypes} from 'react'

const MenuItem = ({id, selectedItem, onClick, children}) => (
    <li aria-selected={id === selectedItem} onClick={onClick}>{children}</li>
);

MenuItem.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired,
    selectedItem: PropTypes.string
};

export default MenuItem;
