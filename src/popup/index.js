import {NAME} from './constants';
import {showPopup, hidePopup} from './actions';
import reducer from './reducer';
import Container from './Container';
import './index.less';

export default {NAME, actions: {showPopup, hidePopup}, reducer, Container};
