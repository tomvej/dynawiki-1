import {Map} from 'immutable'

import {SHOW_POPUP, HIDE_POPUP} from './actions'

const initial = Map({
    key: null
});

export default (state = initial, action) => {
    switch(action.type) {
        case SHOW_POPUP:
            return state.set('key', action.payload);
        case HIDE_POPUP:
            return state.set('key', null);
        default:
            return state;
    }
};
