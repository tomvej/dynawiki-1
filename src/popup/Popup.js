import React from 'react'
import {connect} from 'react-redux'
import assert from 'assert'

import {hidePopup} from './actions'
import {getKey} from './selectors'
import popups from '../popups'

class Popup extends React.Component {

    componentDidMount() {
        window.addEventListener('mousedown', this.outsideClick.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.outsideClick.bind(this));
    }

    outsideClick() {
        if (!this.insideClick) {
            this.props.hide();
        }
    }

    setInsideClick(value) {
        this.insideClick = value;
    }

    render() {
        const Component = popups[this.props.popupKey];
        assert.ok(Component, `Cannot find component for ${this.props.popupKey}.`);
        return <div
            onMouseDown={this.setInsideClick.bind(this, true)}
            onMouseUp={this.setInsideClick.bind(this, false)}>
                <Component/>
        </div>;
    }

}

const mapStateToProps = (state) => ({
    popupKey: getKey(state)
});

const mapDispatchToProps = (dispatch) => ({
    hide: () => dispatch(hidePopup())
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
