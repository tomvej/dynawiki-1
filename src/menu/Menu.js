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
            //select last
        }
    }

    moveSelectionDown() {
        if (this.state.selectedSection !== null) {
            // select next
        } else {
            // select first
        }
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
