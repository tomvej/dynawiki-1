import {nodeType} from '../constants';
import Paragraph from './Paragraph';
import Section from './Section';

export default {
    [nodeType.PARAGRAPH]: Paragraph,
    [nodeType.SECTION]: Section,
};
