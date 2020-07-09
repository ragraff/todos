import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { todosMock } from './__stubData__/todos-mock';
import { TodoSearchDto } from './interfaces/todo-search-dto';
import { TodoCreateDto } from './interfaces/todos-create.dto';
import { Priority } from './interfaces/priority';
import { SortDirection } from './interfaces/sort-direction';
import { SortType } from './interfaces/sort-type';
import { TodoUpdateDto } from './interfaces/todos-update.dto';

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
    expect(actual).toBe(todosMock);
  });

  it('should create the todo', async () => {
    //Arrange
    const serviceCreateTodoSpy = spyOn(service, 'createTodo').and.callThrough();
    const todoCreate: TodoCreateDto = {
      title: 'Title',
      description: 'Description',
      priority: Priority.HIGH,
      dueDate: new Date('2020-05-05'),
    };

    //Act
    const actual = await controller.create(todoCreate);

    //Assert
    expect(serviceCreateTodoSpy).toHaveBeenCalledTimes(1);
    expect(serviceCreateTodoSpy).toHaveBeenCalledWith(todoCreate);
    expect(actual).toBe(todosMock[0]);
  });

  it('should search the todo', async () => {
    //Arrange
    const serviceSearchSpy = spyOn(service, 'searchTodos').and.callThrough();
    const searchTodos: TodoSearchDto = {
      id: '1',
      title: 'Title',
      priority: [Priority.HIGH, Priority.LOW],
      startOfRange: new Date('2020-06=06'),
      endOfRange: new Date('2020-07-07'),
      sortDirection: SortDirection.Asc,
      sortType: SortType.Title,
    };

    //Act
    const actual = await controller.search(searchTodos);

    //Assert
    expect(serviceSearchSpy).toHaveBeenCalledTimes(1);
    expect(serviceSearchSpy).toHaveBeenCalledWith(searchTodos);
    expect(actual).toBe(todosMock);
  });

  it('should update the todo', async () => {
    //Arrange
    const serviceUpdateSpy = spyOn(service, 'updateTodo').and.callThrough();
    const updateTodo: TodoUpdateDto = {
      id: '1',
      title: 'Title',
      description: 'Desc',
      priority: Priority.LOW,
      dueDate: new Date('2020-08-08'),
    };

    //Act
    const actual = await controller.update(updateTodo);

    //Assert
    expect(serviceUpdateSpy).toHaveBeenCalledTimes(1);
    expect(serviceUpdateSpy).toHaveBeenCalledWith(updateTodo);
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
