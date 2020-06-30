import { TodosSlice } from '../models/todos-slice';
import {
  defaultTodoFilter,
  defaultSortOptions,
} from '../reducers/initial-state';

export const mockDefaultTodosSlice: TodosSlice = {
  todos: [],
  todoFilter: defaultTodoFilter,
  sortOptions: defaultSortOptions,
};
