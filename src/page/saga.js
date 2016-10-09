import {call, put} from 'redux-saga/effects';
import {Set, Iterable} from 'immutable';
import server, {GET_ALL} from '../server';
import {setNodes} from './actions';

export default function* () {
    const nodes = yield call(server.pagenode[GET_ALL]);
    const ids = Set(nodes.map(({_id}) => _id));
    const childIds = Iterable(nodes).flatMap(({children}) => Iterable(children));
    yield put(setNodes(nodes, ids.subtract(childIds).first()));
};
