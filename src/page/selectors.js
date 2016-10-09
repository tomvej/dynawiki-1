import {NAME} from './constants';
import modelMap from './model';
import {assert} from '../util';

const getModel = (state) => state.get(NAME);

const getNodeInternal = (state, id) => (getModel(state).get(String(id)));

export const getRootId = (state) => 0;

export const getType = (state, id) => getNodeInternal(state, id).get('type');

export const getNode = (state, id, nodeType) => {
    const type = getType(state, id);
    assert.equal(type, nodeType, 'Wrong node type:');
    const Model = modelMap[type];
    if (!Model) {
        throw new Error(`Cannot find model for ${type}.`);
    }
    return new Model(getNodeInternal(state, id));
};
