import { TodosSlice } from '../models/todos-slice';

export const mockDefaultTodosSlice: TodosSlice = {
  todos: [],
  todoFilter: {},
  sortOptions: { sortDirection: 'ASC', sortType: 'TITLE' },
};
