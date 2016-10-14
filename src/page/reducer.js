import {combineReducers} from 'redux-immutable';

import initialNode from './initial';

const rootIdReducer = (state = 0, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const nodeReducer = (state = initialNode, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    rootId: rootIdReducer,
    nodes: nodeReducer,
});
