import { all } from 'redux-saga/effects';
import { watchTaskSaga } from './taskSaga';

export default function* rootSaga() {
  yield all([
    watchTaskSaga(),
  ]);
} 