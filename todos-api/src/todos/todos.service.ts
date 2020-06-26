import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/todo.schema';
import { Model } from 'mongoose';
import { CreateTodoDto } from './models/create-todo-dto';
import { SearchTodoDto } from './models/search-todo-dto';
import { UpdateTodoDto } from './models/update-todo-dto';
import { sortTodos } from '../utilities/sort-helper';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo[]> {
    await this.todoModel.create(createTodoDto);
    return this.getAll();
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
    const { title, priorities, startOfRange, endOfRange, sortDirection, sortType } = searchTodoDto;

    if (title != null && title != '') {
      criteria['title'] = { $regex: `.*${title}.*` };
    }

    if (priorities != null && priorities != []) {
      criteria['priority'] = { $in: Array.isArray(priorities) ? [...priorities] : [priorities] };
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

    const results = await this.todoModel.find(criteria).exec();
    const sortedResults = results.sort((a, b) => sortTodos(a, b, sortType, sortDirection));
    return sortedResults;
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<Todo[]> {
    await this.todoModel.update({ _id: updateTodoDto._id }, { ...updateTodoDto });
    return this.getAll();
  }

  async delete(_id: string): Promise<Todo[]> {
    const theTodo = await this.todoModel.findOne({ _id: _id }).exec();
    await theTodo.remove();
    return this.getAll();
  }
}
