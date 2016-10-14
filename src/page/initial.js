import {fromJS} from 'immutable';
import {nodeType} from './constants';

export default fromJS({
    0: {
        type: nodeType.PARAGRAPH,
        text: 'Initial',
        id: 0,
    },
});
