import {NAME} from '../constants'
import Section from './Section'
import Paragraph from './Paragraph'

const getModel = (state) => state[NAME];

const getNode = (state, id) => (getModel(state).get(String(id)));

export const getTopId = (state) => 0;

export const getType = (state, id) => getNode(state, id).get('type');

export const getSection = (state, id) => new Section(getNode(state, id));

export const getParagraph = (state, id) => new Paragraph(getNode(state, id));
