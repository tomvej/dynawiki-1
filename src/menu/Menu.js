import React from 'react'

class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return <div className="popup-menu">
            {this.props.children}
        </div>;
    }
}

export default Menu;
