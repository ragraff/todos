import { TodoSearchDto } from '../../interfaces/todo-search-dto';
import { SortDirection } from '../../interfaces/sort-direction';
import { SortType } from '../../interfaces/sort-type';
import { Priority } from '../../interfaces/priority';

export const searchTodosMockById: TodoSearchDto = {
  id: '1',
  sortDirection: SortDirection.Asc,
  sortType: SortType.Title,
};

export const searchTodosMockByTitle: TodoSearchDto = {
  title: 'Title',
  sortDirection: SortDirection.Desc,
};

export const searchTodosMockByPriority: TodoSearchDto = {
  priority: Priority.MEDIUM,
  sortType: SortType.DueDate,
};

export const searchTodosMockByPriorities: TodoSearchDto = {
  priority: [Priority.MEDIUM, Priority.HIGH],
  sortType: SortType.DueDate,
};

export const searchTodosMockByStartOfRange: TodoSearchDto = {
  startOfRange: new Date('2020-05-05'),
  sortDirection: SortDirection.Desc,
  sortType: SortType.DueDate,
};

export const searchTodosMockByEndOfRange: TodoSearchDto = {
  endOfRange: new Date('2020-05-05'),
  sortDirection: SortDirection.Desc,
  sortType: SortType.DueDate,
};

export const searchTodosMockByStartOfRangeAndEndOfRange: TodoSearchDto = {
  startOfRange: new Date('2020-04-05'),
  endOfRange: new Date('2020-05-05'),
  sortDirection: SortDirection.Desc,
  sortType: SortType.DueDate,
};
