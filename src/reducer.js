import {combineReducers} from 'redux-immutable';

import popup from './popup';
import page from './page';

export default combineReducers({
    [popup.NAME]: popup.reducer,
    [page.NAME]: page.reducer,
});
