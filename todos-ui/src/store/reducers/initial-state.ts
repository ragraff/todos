import { TodosSlice } from '../models/todos-slice';
import { SortType } from '../../models/sort-type';
import { SortDirection } from '../../models/sort-direction';

export const defaultTodoFilter = {
  title: '',
  priorities: [],
  startOfRange: null,
  endOfRange: null,
};
export const defaultSortOptions = {
  sortType: SortType.TITLE,
  sortDirection: SortDirection.ASC,
};

export const initialState: TodosSlice = {
  todos: [],
  todoFilter: defaultTodoFilter,
  sortOptions: defaultSortOptions,
};
