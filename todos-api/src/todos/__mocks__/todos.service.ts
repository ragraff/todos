import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { TodoCreateDto } from '../interfaces/todos-create.dto';
import { TodoSearchDto } from '../interfaces/todo-search-dto';
import { TodoUpdateDto } from '../interfaces/todos-update.dto';
import { todosMock } from '../__stubData__/todos-mock';

@Injectable()
export class TodosService {
  async getTodos(): Promise<Todo[]> {
    console.info('TodoService.getTodos');
    return todosMock;
  }

  async createTodo(todoCreate: TodoCreateDto): Promise<Todo> {
    console.info('TodoService.createTodo');
    return todosMock[0];
  }

  async searchTodos(todoSearch: TodoSearchDto): Promise<Todo[]> {
    console.info('TodoService.searchTodos');
    return todosMock;
  }

  async updateTodo(todoUpdate: TodoUpdateDto): Promise<Todo> {
    console.info('TodoService.todoUpdate');
    return todosMock[1];
  }

  async deleteTodo(id: string): Promise<Todo[]> {
    console.info('TodoService.deleteTodo');
    return todosMock;
  }
}
