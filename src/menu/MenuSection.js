import React, {PropTypes, Children} from 'react';

const MenuSection = ({id, collapse, label, children, selectedSection, selectedItem, selectSection, selectItem}) => (
    <section aria-selected={id === selectedSection} className={collapse && label ? 'collapse' : ''}>
        {!!label && <header onMouseOver={() => selectSection(id)}>{label}</header>}
        <ul>
            {Children.map(children, (child) => React.cloneElement(child, {
                key: child.props.id,
                selectedItem,
                selectItem: (itemId) => selectItem(id, itemId),
            }))}
        </ul>
    </section>
);

MenuSection.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    collapse: PropTypes.bool,
    selectedSection: PropTypes.string,
    selectedItem: PropTypes.string,
    selectSection: PropTypes.func,
    selectItem: PropTypes.func,
};

export default MenuSection;
