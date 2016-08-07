import React, {Children} from 'react'

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSection: null,
            selectedItem: null
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress({key}) {
        switch (key) {
            case 'ArrowUp':
                this.moveSelectionUp();
                break;
            case 'ArrowDown':
                this.moveSelectionDown();
                break;
            case 'Enter':
                break;
            case 'Escape':
                break;
        }
    }

    moveSelectionUp() {
        const {selectedSection, selectedItem} = this.state;
        if (selectedSection !== null) {
            if (selectedItem > 0) {
                this.setState({
                    selectedItem: selectedItem - 1
                });
            } else {
                const section = (selectedSection > 0) ? (selectedSection - 1) : this.sections().length - 1;
                this.setState({
                    selectedSection: section,
                    selectedItem: this.items(section).length - 1
                });
            }
        } else {
            const sectionsSize = this.sections().length;
            this.setState({
                selectedSection: sectionsSize - 1,
                selectedItem: this.items(sectionsSize - 1).lengt - 1
            });
        }
    }

    moveSelectionDown() {
        const {selectedSection, selectedItem} = this.state;
        if (selectedSection !== null) {
            const itemsSize = this.items(selectedSection).length;
            if (itemsSize > selectedItem + 1) {
                this.setState({
                    selectedItem: selectedItem + 1
                });
            } else {
                const sectionsSize = this.sections().length;
                this.setState({
                    selectedSection: (sectionsSize > selectedSection + 1) ? (selectedSection + 1) : 0,
                    selectedItem: 0
                });
            }
        } else {
            this.setState({
                selectedSection: 0,
                selectedItem: 0
            });
        }
    }

    sections() {
        return Children.toArray(this.props.children);
    }

    items(section) {
        return Children.toArray(this.sections()[section].props.children);
    }

    render() {
        const selectedSection = Children.toArray(this.props.children)[this.state.selectedSection];
        const selectedItem = selectedSection && Children.toArray(selectedSection.props.children)[this.state.selectedItem];
        return <div className="popup-menu">
            {Children.map(this.props.children, child => React.cloneElement(child, {
                selectedSection: selectedSection && selectedSection.props.id,
                selectedItem: selectedItem && selectedItem.props.id
            }))}
        </div>;
    }
}

export default Menu;
