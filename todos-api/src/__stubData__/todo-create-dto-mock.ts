import { TodoCreateDto } from '../todos/interfaces/todos-create.dto';
import { Priority } from '../todos/interfaces/priority';

export const todoCreateMock: TodoCreateDto = {
  title: 'Title',
  description: 'Description',
  priority: Priority.HIGH,
  dueDate: new Date('2020-05-05'),
};
