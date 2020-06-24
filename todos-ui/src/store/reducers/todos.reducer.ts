import { TodosSetAction, TodosFetchAction } from '../actions';
import { TodosActionTypes } from '../actions/todos.action.types';
import { initialState } from './initial-state';
import { TodosSlice } from '../models/todos-slice';

type AllowedTodosAction = TodosSetAction | TodosFetchAction;

export function TodosReducer(
  state: TodosSlice = initialState,
  action: AllowedTodosAction
): TodosSlice {
  switch (action.type) {
    case TodosActionTypes.SET_TODOS:
      return { ...state, todos: action.todos };
    default:
      return state;
  }
}
