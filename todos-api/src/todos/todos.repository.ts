import { EntityRepository, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './models/create-todo-dto';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  createTodo = async (createTodo: CreateTodoDto): Promise<Todo> => await this.save(createTodo);
}
