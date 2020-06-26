import { Todo } from '../../models/todo';
import { TodoFilter } from '../../models/todo-filter';
import { SortOptions } from '../../models/sort';

export interface TodosSlice {
  todos: Todo[];
  todoFilter: TodoFilter;
  sortOptions: SortOptions;
}
