import React from 'react'

const MenuSection = ({label, children}) => (<section>
    {!!label && <header>{label}</header>}
    <ul>
        {children}
    </ul>
</section>);

export default MenuSection;
