import {NAME} from './constants';

const getModel = (state) => state[NAME];

export const getKey = (state) => getModel(state).get('key');

export const isDisplayed = (state) => !!getModel(state).get('key');

export const getX = (state) => getModel(state).get('x');

export const getY = (state) => getModel(state).get('y');
