import React from 'react';
import {connect} from 'react-redux';

import Popup from './Popup';
import {isDisplayed} from './selectors';

const Container = ({showing}) => showing && <Popup />;

const mapStateToProps = (state) => ({
    showing: isDisplayed(state),
});

export default connect(mapStateToProps)(Container);
