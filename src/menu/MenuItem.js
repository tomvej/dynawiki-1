import React from 'react'

const MenuItem = ({onClick, children}) => <li onClick={onClick}>{children}</li>;

export default MenuItem;
