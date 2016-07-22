import {combineReducers} from 'redux'

import page from './page';

export default combineReducers({
    [page.NAME]: page.reducer
});
