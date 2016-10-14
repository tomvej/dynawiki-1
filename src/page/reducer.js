import {combineReducers} from 'redux-immutable';
import {Map, fromJS, List} from 'immutable';

import {SET_NODES} from './actions';
import initialNode from './initial';

const rootIdReducer = (state = '0', action) => {
    switch (action.type) {
        case SET_NODES:
            return action.rootId;
        default:
            return state;
    }
};

const normalizeNodes = (nodes) => Map(
    fromJS(nodes)
        .map((node) => node.set('id', node.get('_id')))
        .map(((node) => List.of(node.get('id'), node)))
); // FIXME set parents

const nodeReducer = (state = initialNode, action) => {
    switch (action.type) {
        case SET_NODES:
            return normalizeNodes(action.nodes);
        default:
            return state;
    }
};

export default combineReducers({
    rootId: rootIdReducer,
    nodes: nodeReducer,
});
