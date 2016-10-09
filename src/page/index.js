import {NAME, nodeType} from './constants';
import initial from './initial';
import Container from './Container';
import saga from './saga';

const reducer = (state = initial, action) => state;

export default {NAME, nodeType, reducer, Container, saga};
