import { TestingModule, Test } from '@nestjs/testing';
import { TodoRepository } from './todos.repository';
import { todoCreateMock } from './__mocks__/__stubData__/todo-create-dto-mock';
import { Like, In, MoreThan, LessThan, Between } from 'typeorm';
import { todosMock } from './__mocks__/__stubData__/todos-mock';
import {
  searchTodosMockById,
  searchTodosMockByTitle,
  searchTodosMockByPriority,
  searchTodosMockByStartOfRange,
  searchTodosMockByPriorities,
  searchTodosMockByEndOfRange,
  searchTodosMockByStartOfRangeAndEndOfRange,
} from './__mocks__/__stubData__/todo-search-dto-mock';
import { SortDirection } from './interfaces/sort-direction';
import { TodoSearchDto } from './interfaces/todo-search-dto';
import { Priority } from './interfaces/priority';
import { updateTodoMock } from './__mocks__/__stubData__/todo-update-dto-mock';

describe('TodoRepository', () => {
  let repo: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoRepository],
    }).compile();

    repo = module.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(repo).toBeDefined();
  });

  it('should create the todo', async () => {
    //Arrange
    const saveSpy = spyOn(repo, 'save').and.returnValue(todosMock[0]);

    //Act
    const actual = await repo.createTodo(todoCreateMock);

    //Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(todoCreateMock);
    expect(actual).toBe(todosMock[0]);
  });

  it('should get the todos', async () => {
    //Arrange
    const findSpy = spyOn(repo, 'find').and.returnValue(todosMock);

    //Act
    const actual = await repo.getTodos();

    //Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith();
    expect(actual).toBe(todosMock);
  });

  describe('search', () => {
    type OrderCriteria = { title?: string; priority?: string; dueDate?: string; created_date?: string };
    type WhereCriteria = { id?: string; title?: any; priority?: any; dueDate?: any };
    type SearchTodosTestCaseType = { dto: TodoSearchDto; orderCriteria: OrderCriteria; whereCriteria: WhereCriteria };

    const testCases: SearchTodosTestCaseType[] = [
      { dto: searchTodosMockById, orderCriteria: { title: SortDirection.Asc }, whereCriteria: { id: '1' } },
      {
        dto: searchTodosMockByTitle,
        orderCriteria: { title: SortDirection.Desc },
        whereCriteria: { title: Like(`%Title%`) },
      },
      {
        dto: searchTodosMockByPriority,
        orderCriteria: { dueDate: SortDirection.Asc },
        whereCriteria: { priority: In([Priority.MEDIUM]) },
      },
      {
        dto: searchTodosMockByPriorities,
        orderCriteria: { dueDate: SortDirection.Asc },
        whereCriteria: { priority: In([Priority.MEDIUM, Priority.HIGH]) },
      },
      {
        dto: searchTodosMockByStartOfRange,
        orderCriteria: { dueDate: SortDirection.Desc },
        whereCriteria: { dueDate: MoreThan(new Date('2020-05-05')) },
      },
      {
        dto: searchTodosMockByEndOfRange,
        orderCriteria: { dueDate: SortDirection.Desc },
        whereCriteria: { dueDate: LessThan(new Date('2020-05-05')) },
      },
      {
        dto: searchTodosMockByStartOfRangeAndEndOfRange,
        orderCriteria: { dueDate: SortDirection.Desc },
        whereCriteria: { dueDate: Between(new Date('2020-04-05'), new Date('2020-05-05')) },
      },
    ];

    it.each(testCases)('should search the todos', async (testCase: SearchTodosTestCaseType) => {
      //Arrange
      const findSpy = spyOn(repo, 'find').and.returnValue(todosMock);

      const criteria = { where: testCase.whereCriteria, order: testCase.orderCriteria };

      //Act
      const actual = await repo.searchTodos(testCase.dto);

      //Assert
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(criteria);
      expect(actual).toBe(todosMock);
    });
  });

  it('should update the todo', async () => {
    //Arrange
    const saveSpy = spyOn(repo, 'save').and.returnValue(todosMock[1]);

    //Act
    const actual = await repo.updateTodo(updateTodoMock);

    //Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(updateTodoMock);
    expect(actual).toBe(todosMock[1]);
  });

  it('should delete the todo', async () => {
    //Arrange
    const deleteSpy = spyOn(repo, 'delete').and.stub();
    const getTodosSpy = spyOn(repo, 'getTodos').and.returnValue(todosMock);
    const id = '1';

    //Act
    const actual = await repo.deleteTodo(id);

    //Assert
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(id);
    expect(getTodosSpy).toHaveBeenCalledTimes(1);
    expect(getTodosSpy).toHaveBeenCalledWith();
    expect(actual).toBe(todosMock);
  });
});
