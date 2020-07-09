import { Controller, Post, Body, Inject, Get, Put, Delete, Param } from '@nestjs/common';
import { TodoCreateDto } from './interfaces/todos-create.dto';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { TodoSearchDto } from './interfaces/todo-search-dto';
import { TodoUpdateDto } from './interfaces/todos-update.dto';

@Controller('todos')
export class TodosController {
  constructor(@Inject(TodosService) private todosService: TodosService) {}

  @Get()
  async getTodos(): Promise<Todo[]> {
    return this.todosService.getTodos();
  }

  @Post()
  async create(@Body() todoCreate: TodoCreateDto): Promise<Todo> {
    return this.todosService.createTodo(todoCreate);
  }

  @Post('search')
  async search(@Body() todoSearch: TodoSearchDto): Promise<Todo[]> {
    return this.todosService.searchTodos(todoSearch);
  }

  @Put()
  async update(@Body() todoUpdate: TodoUpdateDto): Promise<Todo> {
    return this.todosService.updateTodo(todoUpdate);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<Todo[]> {
    return this.todosService.deleteTodo(id);
  }
}
