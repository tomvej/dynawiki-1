import React, {PropTypes} from 'react'

const MenuItem = ({onClick, children}) => <li onClick={onClick}>{children}</li>;

MenuItem.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string.isRequired
};

export default MenuItem;
