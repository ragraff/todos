import { takeLeading, all, put, call } from 'redux-saga/effects';
import { Todo } from '../../models/todo';
import { createTodosSetAction } from '../actions';
import { TodosActionTypes } from '../actions/todos.action.types';
import { getTodos } from '../../services/todos.service';

export function* fetchTodosSaga(): Generator {
  try {
    const todos: Todo[] = (yield call(getTodos) as unknown) as Todo[];
    yield put(createTodosSetAction(todos));
  } catch (error) {
    throw new Error(`Error in fetchTodosSaga: ${error}`);
  }
}

export function* todosSaga(): Generator {
  return yield all([takeLeading(TodosActionTypes.FETCH_TODOS, fetchTodosSaga)]);
}
