import {NAME} from './constants';

export const SET_NODES = `${NAME}/SET_NODES`;

export const setNodes = (nodes, rootId) => ({
    type: SET_NODES,
    nodes,
    rootId,
});
