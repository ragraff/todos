import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodoRepository } from './todos.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { todosMock } from './__stubData__/todos-mock';
import { searchTodosMock } from './__stubData__/todo-search-dto-mock';
import { todoCreateMock } from './__stubData__/todo-create-dto-mock';
import { updateTodoMock } from './__stubData__/todo-update-dto-mock';

jest.mock('./todos.repository');

describe('TodosService', () => {
  let service: TodosService;
  let repo: TodoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, { provide: getRepositoryToken(Todo), useClass: TodoRepository }],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repo = module.get<TodoRepository>(TodoRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get todos', async () => {
    //Arrange
    const repositoryGetTodos = spyOn(repo, 'getTodos').and.callThrough();

    //Act
    const actual = await service.getTodos();

    //Assert
    expect(repositoryGetTodos).toHaveBeenCalledTimes(1);
    expect(repositoryGetTodos).toHaveBeenCalledWith();
    expect(actual).toBe(todosMock);
  });

  it('should create the todo', async () => {
    //Arrange
    const repositoryCreateTodo = spyOn(repo, 'createTodo').and.callThrough();

    //Act
    const actual = await service.createTodo(todoCreateMock);

    //Assert
    expect(repositoryCreateTodo).toHaveBeenCalledTimes(1);
    expect(repositoryCreateTodo).toHaveBeenCalledWith(todoCreateMock);
    expect(actual).toBe(todosMock[0]);
  });

  it('should search todos', async () => {
    //Arrange
    const repositorySearchTodos = spyOn(repo, 'searchTodos').and.callThrough();

    //Act
    const actual = await service.searchTodos(searchTodosMock);

    //Assert
    expect(repositorySearchTodos).toHaveBeenCalledTimes(1);
    expect(repositorySearchTodos).toHaveBeenCalledWith(searchTodosMock);
    expect(actual).toBe(todosMock);
  });

  it('should update the todo', async () => {
    //Arrange
    const repositoryUpdateTodo = spyOn(repo, 'updateTodo').and.callThrough();

    //Act
    const actual = await service.updateTodo(updateTodoMock);

    //Assert
    expect(repositoryUpdateTodo).toHaveBeenCalledTimes(1);
    expect(repositoryUpdateTodo).toHaveBeenCalledWith(updateTodoMock);
    expect(actual).toBe(todosMock[1]);
  });

  it('should delete the todo', async () => {
    //Arrange
    const repositoryDeleteTodo = spyOn(repo, 'deleteTodo').and.callThrough();
    const id = '1';

    //Act
    const actual = await service.deleteTodo(id);

    //Assert
    expect(repositoryDeleteTodo).toHaveBeenCalledTimes(1);
    expect(repositoryDeleteTodo).toHaveBeenCalledWith(id);
    expect(actual).toBe(todosMock);
  });
});
