import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './models/create-todo-dto';
import { v4 as uuid } from 'uuid';
import { SearchTodoDto } from './models/search-todo-dto';
import { UpdateTodoDto } from './models/update-todo-dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    createdTodo.id = uuid();
    return createdTodo.save();
  }

  async getAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async getById(id: string): Promise<Todo> {
    return this.todoModel.findOne({ _id: id }).exec();
  }

  async getByPriority(priority: string): Promise<Todo[]> {
    return this.todoModel.find({ priority: priority.toUpperCase() }).exec();
  }

  async search(searchTodoDto: SearchTodoDto): Promise<Todo[]> {
    const criteria = {};
    const { title, priority, startOfRange, endOfRange } = searchTodoDto;

    if (title != null && title != '') {
      criteria['title'] = title;
    }

    if (priority != null && priority != '') {
      criteria['priority'] = priority.toUpperCase();
    }

    const dueDateCriteria = {};
    if (startOfRange != null) {
      dueDateCriteria['$gt'] = startOfRange;
    }

    if (endOfRange != null) {
      dueDateCriteria['$lt'] = endOfRange;
    }

    if (Object.keys(dueDateCriteria).length !== 0) {
      criteria['dueDate'] = { ...dueDateCriteria };
    }

    return this.todoModel.find(criteria).exec();
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // const updatedTodo = new this.todoModel(updateTodoDto);
    return this.todoModel.update({ _id: updateTodoDto._id }, { ...updateTodoDto });
  }

  async delete(id: string): Promise<Todo> {
    const theTodo = await this.todoModel.findOne({ _id: id }).exec();
    return theTodo.remove();
  }
}
