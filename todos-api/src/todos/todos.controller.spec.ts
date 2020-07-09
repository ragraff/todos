import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { todosMock } from './__mocks__/__stubData__/todos-mock';
import { todoCreateMock } from './__mocks__/__stubData__/todo-create-dto-mock';
import { searchTodosMock } from './__mocks__/__stubData__/todo-search-dto-mock';
import { updateTodoMock } from './__mocks__/__stubData__/todo-update-dto-mock';

jest.mock('./todos.service');

describe('Todos Controller', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get the todos', async () => {
    //Arrange
    const serviceGetTodosSpy = spyOn(service, 'getTodos').and.callThrough();

    //Act
    const actual = await controller.getTodos();

    //Assert
    expect(serviceGetTodosSpy).toHaveBeenCalledTimes(1);
    expect(serviceGetTodosSpy).toHaveBeenCalledWith();
    expect(actual).toBe(todosMock);
  });

  it('should create the todo', async () => {
    //Arrange
    const serviceCreateTodoSpy = spyOn(service, 'createTodo').and.callThrough();

    //Act
    const actual = await controller.create(todoCreateMock);

    //Assert
    expect(serviceCreateTodoSpy).toHaveBeenCalledTimes(1);
    expect(serviceCreateTodoSpy).toHaveBeenCalledWith(todoCreateMock);
    expect(actual).toBe(todosMock[0]);
  });

  it('should search the todo', async () => {
    //Arrange
    const serviceSearchSpy = spyOn(service, 'searchTodos').and.callThrough();

    //Act
    const actual = await controller.search(searchTodosMock);

    //Assert
    expect(serviceSearchSpy).toHaveBeenCalledTimes(1);
    expect(serviceSearchSpy).toHaveBeenCalledWith(searchTodosMock);
    expect(actual).toBe(todosMock);
  });

  it('should update the todo', async () => {
    //Arrange
    const serviceUpdateSpy = spyOn(service, 'updateTodo').and.callThrough();

    //Act
    const actual = await controller.update(updateTodoMock);

    //Assert
    expect(serviceUpdateSpy).toHaveBeenCalledTimes(1);
    expect(serviceUpdateSpy).toHaveBeenCalledWith(updateTodoMock);
    expect(actual).toBe(todosMock[1]);
  });

  it('should delete the todo', async () => {
    //Arrange
    const serviceDeleteSpy = spyOn(service, 'deleteTodo').and.callThrough();
    const id = '1';

    //Act
    const actual = await controller.deleteTodo(id);

    //Assert
    expect(serviceDeleteSpy).toHaveBeenCalledTimes(1);
    expect(serviceDeleteSpy).toHaveBeenCalledWith(id);
    expect(actual).toBe(todosMock);
  });
});
