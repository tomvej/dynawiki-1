import React, {PropTypes} from 'react'

const MenuSection = ({label, children}) => (<section>
    {!!label && <header>{label}</header>}
    <ul>
        {children}
    </ul>
</section>);

MenuSection.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired
};

export default MenuSection;
