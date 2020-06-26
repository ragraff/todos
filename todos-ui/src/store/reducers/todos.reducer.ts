import {
  TodosSetAction,
  SetTodoFilterAction,
  SetSortOptionsAction,
} from '../actions';
import { TodosActionTypes } from '../actions/todos.action.types';
import { initialState } from './initial-state';
import { TodosSlice } from '../models/todos-slice';

type AllowedTodosAction =
  | TodosSetAction
  | SetTodoFilterAction
  | SetSortOptionsAction;

export function TodosReducer(
  state: TodosSlice = initialState,
  action: AllowedTodosAction
): TodosSlice {
  switch (action.type) {
    case TodosActionTypes.SET_TODOS:
      return { ...state, todos: action.todos };
    case TodosActionTypes.SET_TODO_FILTER:
      return { ...state, todoFilter: action.todoFilter };
    case TodosActionTypes.SET_SORT_OPTIONS:
      return { ...state, sortOptions: action.sortOptions };
    default:
      return state;
  }
}
