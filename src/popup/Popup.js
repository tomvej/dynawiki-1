import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import assert from 'assert';

import {hidePopup} from './actions';
import {getKey, getX, getY} from './selectors';
import popups from '../popups';

const prevent = (event) => {
    event.preventDefault();
};

class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.outsideClick = this.outsideClick.bind(this);
        this.mouseDown = this.setInsideClick.bind(this, true);
        this.mouseUp = this.setInsideClick.bind(this, false);
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

    outsideClick() {
        if (!this.insideClick) {
            this.props.hide();
        }
    }

    render() {
        const Component = popups[this.props.popupKey];
        assert.ok(Component, `Cannot find component for ${this.props.popupKey}.`);
        const position = {
            left: this.props.left,
            top: this.props.top,
        };
        return (<div id="popup" style={position} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
            <Component />
        </div>);
    }

}

Popup.propTypes = {
    popupKey: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    hide: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    popupKey: getKey(state),
    left: getX(state),
    top: getY(state),
});

const mapDispatchToProps = (dispatch) => ({
    hide: () => dispatch(hidePopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
