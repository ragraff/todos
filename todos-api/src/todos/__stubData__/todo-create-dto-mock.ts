import { TodoCreateDto } from '../interfaces/todos-create.dto';
import { Priority } from '../interfaces/priority';

export const todoCreateMock: TodoCreateDto = {
  title: 'Title',
  description: 'Description',
  priority: Priority.HIGH,
  dueDate: new Date('2020-05-05'),
};
