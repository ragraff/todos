import { TodoUpdateDto } from '../../interfaces/todos-update.dto';
import { Priority } from '../../interfaces/priority';

export const updateTodoMock: TodoUpdateDto = {
  id: '1',
  title: 'Title',
  description: 'Desc',
  priority: Priority.LOW,
  dueDate: new Date('2020-08-08'),
};
