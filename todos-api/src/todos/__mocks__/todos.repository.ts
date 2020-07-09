import { Injectable } from '@nestjs/common';
import { todosMock } from '../__stubData__/todos-mock';
import { Todo } from '../entities/todo.entity';

@Injectable()
export class TodoRepository {
  createTodo = async (): Promise<Todo> => {
    console.info('TodoRepository.createTodo');
    return todosMock[0];
  };
  getTodos = async (): Promise<Todo[]> => {
    console.info('TodoRepository.getTodos');
    return todosMock;
  };
  searchTodos = async (): Promise<Todo[]> => {
    console.info('TodoRepository.searchTodos');
    return todosMock;
  };
  updateTodo = async (): Promise<Todo> => {
    console.info('TodoRepository.updateTodo');
    return todosMock[1];
  };
  deleteTodo = async (): Promise<Todo[]> => {
    console.info('TodoRepository.deleteTodo');
    return todosMock;
  };
}
