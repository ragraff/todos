import { Todo } from '../../models/todo';
import { Priority } from '../../models/priority';

export const mockTodos: Todo[] = [
  {
    _id: '1',
    title: 'title 1',
    description: 'desc 1',
    priority: Priority.LOW,
    dueDate: new Date(2020, 1, 2),
  },
  {
    _id: '2',
    title: 'title 2',
    description: 'desc 2',
    priority: Priority.HIGH,
    dueDate: new Date(2020, 2, 2),
  },
  {
    _id: '3',
    title: 'title 3',
    description: 'desc 3',
    priority: Priority.MEDIUM,
    dueDate: new Date(2020, 3, 2),
  },
];
