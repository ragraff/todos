import { TodosActionTypes } from './todos.action.types';
import { Todo } from '../../models/todo';
import { TodoFilter } from '../../models/todo-filter';

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

export interface TodoUpdateAction {
  type: TodosActionTypes.UPDATE_TODO;
  todo: Todo;
}

export function createTodoUpdateAction(todo: Todo): TodoUpdateAction {
  return {
    type: TodosActionTypes.UPDATE_TODO,
    todo: todo,
  };
}

export interface TodoDeleteAction {
  type: TodosActionTypes.DELETE_TODO;
  todo: Todo;
}

export function createTodoDeleteAction(todo: Todo): TodoDeleteAction {
  return {
    type: TodosActionTypes.DELETE_TODO,
    todo: todo,
  };
}

export interface TodoCreateAction {
  type: TodosActionTypes.CREATE_TODO;
  todo: Todo;
}

export function createTodoCreateAction(todo: Todo): TodoCreateAction {
  return {
    type: TodosActionTypes.CREATE_TODO,
    todo: todo,
  };
}

export interface SetTodoFilterAction {
  type: TodosActionTypes.SET_TODO_FILTER;
  todoFilter: TodoFilter;
}

export function createSetTodoFilterAction(
  todoFilter: TodoFilter
): SetTodoFilterAction {
  return {
    type: TodosActionTypes.SET_TODO_FILTER,
    todoFilter: todoFilter,
  };
}
