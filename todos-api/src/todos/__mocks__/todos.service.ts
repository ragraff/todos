import { Injectable } from '@nestjs/common';
import { Todo } from '../entities/todo.entity';
import { todosMock } from './__stubData__/todos-mock';

@Injectable()
export class TodosService {
  async getTodos(): Promise<Todo[]> {
    console.info('TodoService.getTodos');
    return todosMock;
  }

  async createTodo(): Promise<Todo> {
    console.info('TodoService.createTodo');
    return todosMock[0];
  }

  async searchTodos(): Promise<Todo[]> {
    console.info('TodoService.searchTodos');
    return todosMock;
  }

  async updateTodo(): Promise<Todo> {
    console.info('TodoService.todoUpdate');
    return todosMock[1];
  }

  async deleteTodo(): Promise<Todo[]> {
    console.info('TodoService.deleteTodo');
    return todosMock;
  }
}
