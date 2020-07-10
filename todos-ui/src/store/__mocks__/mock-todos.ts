import { Todo } from '../../models/todo';
import { Priority } from '../../models/priority';

export const mockTodos: Todo[] = [
  {
    id: '1',
    title: 'title 1',
    description: 'desc 1',
    priority: Priority.LOW,
    dueDate: new Date(2020, 1, 2),
    createDate: new Date(2020, 1, 2),
    updateDate: new Date(2020, 1, 2),
  },
  {
    id: '2',
    title: 'title 2',
    description: 'desc 2',
    priority: Priority.HIGH,
    dueDate: new Date(2020, 2, 2),
    createDate: new Date(2020, 2, 2),
    updateDate: new Date(2020, 2, 2),
  },
  {
    id: '3',
    title: 'title 3',
    description: 'desc 3',
    priority: Priority.MEDIUM,
    dueDate: new Date(2020, 3, 2),
    createDate: new Date(2020, 3, 2),
    updateDate: new Date(2020, 3, 2),
  },
];
