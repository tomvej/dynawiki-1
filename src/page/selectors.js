import {NAME} from './constants'

const getModel = (state) => state[NAME];

const getNode = (state, id) => (getModel(state).get(String(id)));

export const getTopId = (state) => 0;

export const getType = (state, id) => getNode(state, id).get('type');

export const getHeading = (state, id) => getNode(state, id).get('heading');

export const getText = (state, id) => getNode(state, id).get('text');

export const getChildren = (state, id) => getNode(state, id).get('children');
