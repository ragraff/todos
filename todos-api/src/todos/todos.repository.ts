import { EntityRepository, Repository, Like, In, Between, MoreThan, LessThan } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { TodoCreateDto } from './interfaces/todos-create.dto';
import { TodoSearchDto } from './interfaces/todo-search-dto';
import { SortDirection } from './interfaces/sort-direction';
import { SortType } from './interfaces/sort-type';
import { TodoUpdateDto } from './interfaces/todos-update.dto';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  createTodo = async (todoCreate: TodoCreateDto): Promise<Todo> => await this.save(todoCreate);
  getTodos = async (): Promise<Todo[]> => await this.find();
  searchTodos = async (todoSearch: TodoSearchDto): Promise<Todo[]> => {
    const { sortType, sortDirection } = todoSearch;
    const whereCriteria = this.getWhereCriteria(todoSearch);
    const orderCriteria = {};
    orderCriteria[sortType || SortType.Title] = sortDirection || SortDirection.Asc;
    const criteria = { where: { ...whereCriteria }, order: { ...orderCriteria } };

    return await this.find(criteria);
  };
  updateTodo = async (todoUpdate: TodoUpdateDto): Promise<Todo> => await this.save(todoUpdate);
  deleteTodo = async (id: string): Promise<Todo[]> => {
    await this.delete(id);
    return this.getTodos();
  };

  private getWhereCriteria({ id, title, priority, startOfRange, endOfRange }: TodoSearchDto): any {
    if (id != null) {
      return { id: id };
    }

    const criteria = {};

    if (title != null) {
      criteria['title'] = Like(`%${title}%`);
    }

    if (priority != null && priority != []) {
      const inCriteria = Array.isArray(priority)
        ? priority.map(x => x.toUpperCase())
        : [(priority as string).toUpperCase()];
      criteria['priority'] = In(inCriteria);
    }

    if (startOfRange != null && endOfRange != null) {
      criteria['dueDate'] = Between(startOfRange, endOfRange);
    } else if (startOfRange != null) {
      criteria['dueDate'] = MoreThan(startOfRange);
    } else if (endOfRange != null) {
      criteria['dueDate'] = LessThan(endOfRange);
    }

    return criteria;
  }
}
