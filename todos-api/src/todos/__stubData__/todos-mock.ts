import { Priority } from '../interfaces/priority';
import { TodoSearchDto } from '../interfaces/todo-search-dto';
import { SortDirection } from '../interfaces/sort-direction';
import { SortType } from '../interfaces/sort-type';

export const todosMock = [
  {
    id: '1',
    title: 'Title 1',
    description: 'Desc 1',
    priority: Priority.HIGH,
    dueDate: new Date('2020-01-01'),
    createDate: new Date('2020-01-01'),
    updateDate: new Date('2020-01-01'),
  },
  {
    id: '2',
    title: 'Title 2',
    description: 'Desc 2',
    priority: Priority.LOW,
    dueDate: new Date('2020-02-02'),
    createDate: new Date('2020-02-02'),
    updateDate: new Date('2020-02-02'),
  },
  {
    id: '3',
    title: 'Title 3',
    description: 'Desc 3',
    priority: Priority.MEDIUM,
    dueDate: new Date('2020-03-03'),
    createDate: new Date('2020-03-03'),
    updateDate: new Date('2020-03-03'),
  },
  {
    id: '4',
    title: 'Title 4',
    description: 'Desc 4',
    priority: Priority.URGENT,
    dueDate: new Date('2020-04-04'),
    createDate: new Date('2020-04-04'),
    updateDate: new Date('2020-04-04'),
  },
];
