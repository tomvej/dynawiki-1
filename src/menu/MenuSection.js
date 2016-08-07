import React, {PropTypes, Children} from 'react'

const MenuSection = ({id, label, children, selectedSection, selectedItem, selectSection, selectItem}) => (
    <section aria-selected={id === selectedSection}>
        {!!label && <header onMouseOver={() => selectSection(id)}>{label}</header>}
        <ul>
            {Children.map(children, child => React.cloneElement(child, {
                selectedItem,
                selectItem: (itemId) => selectItem(id, itemId)
            }))}
        </ul>
    </section>
);

MenuSection.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    selectedSection: PropTypes.string,
    selectedItem: PropTypes.string,
    selectSection: PropTypes.func,
    selectItem: PropTypes.func
};

export default MenuSection;
