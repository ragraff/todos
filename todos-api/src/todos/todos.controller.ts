import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { CreateTodoDto } from './models/create-todo-dto';
import { UpdateTodoDto } from './models/update-todo-dto';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';
import { ParsePriorityStringPipe } from '../common/parse-priority-string';
import { SearchTodoDto } from './models/search-todo-dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}
  @Get()
  async getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get('search')
  async search(@Query() searchTodoDto: SearchTodoDto): Promise<Todo[]> {
    return this.todoService.search(searchTodoDto);
  }

  @Get('id/:id')
  async getById(@Param('id') id: string): Promise<Todo> {
    return this.todoService.getById(id);
  }

  @Get('priority/:priority')
  async getByPriority(@Param('priority', ParsePriorityStringPipe) priority: string): Promise<Todo[]> {
    return this.todoService.getByPriority(priority);
  }

  @Post()
  async create(@Body() createTodo: CreateTodoDto): Promise<Todo[]> {
    return this.todoService.create({ ...createTodo, priority: createTodo.priority.toUpperCase() });
  }

  @Put()
  async update(@Body() updateTodo: UpdateTodoDto): Promise<Todo[]> {
    return this.todoService.update({ ...updateTodo, priority: updateTodo.priority.toUpperCase() });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo[]> {
    return this.todoService.delete(id);
  }
}
