import { all } from 'redux-saga/effects';
import { todosSaga } from './todos.saga';

type Sagas = ReturnType<typeof all>;

export function* rootSaga(): Generator<Sagas> {
  yield all([todosSaga()]);
}
