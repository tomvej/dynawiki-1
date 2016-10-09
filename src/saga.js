import {call} from 'redux-saga/effects';

import page from './page';

export default function* () {
    yield call(page.saga);
}
