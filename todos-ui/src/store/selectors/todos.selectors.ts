import { ApplicationState } from '../models/application-state';
import { Todo } from '../../models/todo';
import { TodoFilter } from '../../models/todo-filter';
import { SortOptions } from '../../models/sort';

export function getAllTodos(state: ApplicationState): Todo[] {
  return state.TodosReducer.todos;
}

export function getTodoFilter(state: ApplicationState): TodoFilter {
  return state.TodosReducer.todoFilter;
}

export function getSortOptions(state: ApplicationState): SortOptions {
  return state.TodosReducer.sortOptions;
}
