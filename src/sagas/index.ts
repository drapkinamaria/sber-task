import {all} from 'redux-saga/effects';
import {planetsWatcher} from "./planetsSaga";
import {charactersWatcher} from "./charactersSaga";

export function* rootWatcher() {
    yield all([planetsWatcher(), charactersWatcher()])
}
