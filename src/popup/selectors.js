import {NAME} from './constants'

const getModel = (state) => state[NAME];

export const getKey = (state) => getModel(state).get('key');

export const isDisplayed = (state) => !!getModel(state).get('key');
