import { takeLeading, all, put, call, select } from 'redux-saga/effects';
import { Todo } from '../../models/todo';
import {
  createTodosSetAction,
  TodoUpdateAction,
  TodoDeleteAction,
  TodoCreateAction,
} from '../actions';
import { TodosActionTypes } from '../actions/todos.action.types';
import {
  getTodos,
  updateTodo,
  deleteTodo,
  createTodo,
} from '../../services/todos.service';
import { getTodoFilter, getSortOptions } from '../selectors';
import { TodoFilter } from '../../models/todo-filter';
import { SortOptions } from '../../models/sort';

export function* fetchTodosSaga(): Generator {
  try {
    const filter: TodoFilter = (yield select(getTodoFilter)) as TodoFilter;
    const sortOptions: SortOptions = (yield select(
      getSortOptions
    )) as SortOptions;

    const todos: Todo[] = (yield call(
      getTodos,
      filter,
      sortOptions
    ) as unknown) as Todo[];
    yield put(createTodosSetAction(todos));
  } catch (error) {
    throw new Error(`Error in fetchTodosSaga: ${error}`);
  }
}

export function* updateTodoSaga(action: TodoUpdateAction): Generator {
  try {
    const { todo } = action;
    const todos: Todo[] = (yield call(updateTodo, todo) as unknown) as Todo[];
    yield put(createTodosSetAction(todos));
  } catch (error) {
    throw new Error(`Error in updateTodoSaga: ${error}`);
  }
}

export function* deleteTodoSaga(action: TodoDeleteAction): Generator {
  try {
    const { todo } = action;
    const todos: Todo[] = (yield call(deleteTodo, todo) as unknown) as Todo[];
    yield put(createTodosSetAction(todos));
  } catch (error) {
    throw new Error(`Error in deleteTodoSaga: ${error}`);
  }
}

export function* createTodoSaga(action: TodoCreateAction): Generator {
  try {
    const { todo } = action;
    const todos: Todo[] = (yield call(createTodo, todo) as unknown) as Todo[];
    yield put(createTodosSetAction(todos));
  } catch (error) {
    throw new Error(`Error in createTodoSaga: ${error}`);
  }
}

export function* todosSaga() {
  return yield all([
    takeLeading(TodosActionTypes.FETCH_TODOS, fetchTodosSaga),
    takeLeading(TodosActionTypes.SET_SORT_OPTIONS, fetchTodosSaga),
    takeLeading(TodosActionTypes.SET_TODO_FILTER, fetchTodosSaga),
    takeLeading(TodosActionTypes.UPDATE_TODO, updateTodoSaga),
    takeLeading(TodosActionTypes.DELETE_TODO, deleteTodoSaga),
    takeLeading(TodosActionTypes.CREATE_TODO, createTodoSaga),
  ]);
}
