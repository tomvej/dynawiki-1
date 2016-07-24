import React from 'react'
import {connect} from 'react-redux'
import assert from 'assert'

import './index.less'

import {hidePopup} from './actions'
import {getKey, getX, getY} from './selectors'
import popups from '../popups'

const prevent = event => {
    event.preventDefault();
};

class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.outsideClick = this.outsideClick.bind(this);
    }

    outsideClick() {
        if (!this.insideClick) {
            this.props.hide();
        }
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.outsideClick);
        window.addEventListener('wheel', prevent);
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.outsideClick);
        window.removeEventListener('wheel', prevent);
    }

    setInsideClick(value) {
        this.insideClick = value;
    }

    render() {
        const Component = popups[this.props.popupKey];
        assert.ok(Component, `Cannot find component for ${this.props.popupKey}.`);
        return <div id="popup" style={this.props.position}
            onMouseDown={this.setInsideClick.bind(this, true)}
            onMouseUp={this.setInsideClick.bind(this, false)}>
                <Component/>
        </div>;
    }

}

const mapStateToProps = (state) => ({
    popupKey: getKey(state),
    position: {
        left: getX(state),
        top: getY(state)
    }
});

const mapDispatchToProps = (dispatch) => ({
    hide: () => dispatch(hidePopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
