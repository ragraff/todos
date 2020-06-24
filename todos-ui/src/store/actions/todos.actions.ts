import { TodosActionTypes } from './todos.action.types';
import { Todo } from '../../models/todo';

export interface TodosFetchAction {
  type: TodosActionTypes.FETCH_TODOS;
}

export function createTodosFetchAction(): TodosFetchAction {
  return {
    type: TodosActionTypes.FETCH_TODOS,
  };
}

export interface TodosSetAction {
  type: TodosActionTypes.SET_TODOS;
  todos: Todo[];
}

export function createTodosSetAction(todos: Todo[]): TodosSetAction {
  return {
    type: TodosActionTypes.SET_TODOS,
    todos: todos,
  };
}
