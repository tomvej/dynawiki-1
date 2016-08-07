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
        if (this.state.selectedSection !== null) {
            // select previous
        } else {
            const sectionsSize = Children.count(this.props.children);
            const items = this.items(sectionsSize - 1);
            this.setState({
                selectedSection: sectionsSize - 1,
                selectedItem: Children.count(items) - 1
            });
        }
    }

    moveSelectionDown() {
        if (this.state.selectedSection !== null) {
            const itemsSize = Children.count(this.items(this.state.selectedSection));
            if (itemsSize > this.state.selectedItem + 1) {
                this.setState({
                    selectedItem: this.state.selectedItem + 1
                });
            } else {
                const sectionsSize = Children.count(this.props.children);
                this.setState({
                    selectedSection: (sectionsSize > this.state.selectedSection + 1) ? (this.state.selectedSection + 1) : 0,
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

    items(section) {
        return Children.toArray(this.props.children)[section].props.children;
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
