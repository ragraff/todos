import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodoCreateDto } from './interfaces/todos-create.dto';
import { TodoRepository } from './todos.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoSearchDto } from './interfaces/todo-search-dto';
import { TodoUpdateDto } from './interfaces/todos-update.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: TodoRepository,
  ) {}

  async getTodos(): Promise<Todo[]> {
    return this.todosRepository.getTodos();
  }

  async createTodo(todoCreate: TodoCreateDto): Promise<Todo> {
    return this.todosRepository.createTodo(todoCreate);
  }

  async searchTodos(todoSearch: TodoSearchDto): Promise<Todo[]> {
    return this.todosRepository.searchTodos(todoSearch);
  }

  async updateTodo(todoUpdate: TodoUpdateDto): Promise<Todo> {
    return this.todosRepository.updateTodo(todoUpdate);
  }

  async deleteTodo(id: string): Promise<Todo[]> {
    return this.todosRepository.deleteTodo(id);
  }
}
