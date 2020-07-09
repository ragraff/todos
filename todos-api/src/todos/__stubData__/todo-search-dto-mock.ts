import { TodoSearchDto } from '../interfaces/todo-search-dto';
import { Priority } from '../interfaces/priority';
import { SortDirection } from '../interfaces/sort-direction';
import { SortType } from '../interfaces/sort-type';

export const searchTodosMock: TodoSearchDto = {
  id: '1',
  title: 'Title',
  priority: [Priority.HIGH, Priority.LOW],
  startOfRange: new Date('2020-06=06'),
  endOfRange: new Date('2020-07-07'),
  sortDirection: SortDirection.Asc,
  sortType: SortType.Title,
};
