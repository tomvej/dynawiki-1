import React, {PropTypes, Children} from 'react'

const MenuSection = ({id, label, children, selectedSection, selectedItem, selectSection}) => (
    <section aria-selected={id === selectedSection}>
        {!!label && <header onMouseOver={() => selectSection(id)}>{label}</header>}
        <ul>
            {Children.map(children, child => React.cloneElement(child, {
                selectedItem
            }))}
        </ul>
    </section>
);

MenuSection.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    selectedSection: PropTypes.string,
    selectedItem: PropTypes.string,
    selectSection: PropTypes.func
};

export default MenuSection;
