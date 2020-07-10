import { TodoUpdateDto } from '../todos/interfaces/todos-update.dto';
import { Priority } from '../todos/interfaces/priority';

export const updateTodoMock: TodoUpdateDto = {
  id: '1',
  title: 'Title',
  description: 'Desc',
  priority: Priority.LOW,
  dueDate: new Date('2020-08-08'),
};
