import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { SearchTodoDto } from './models/search-todo-dto';
import { CreateTodoDto } from './models/create-todo-dto';
import { UpdateTodoDto } from './models/update-todo-dto';

describe('Todos Controller', () => {
  let controller: TodosController;
  const service = new TodosService(null);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [{ provide: TodosService, useValue: service }],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all', async () => {
    //Arrange
    const getAllSpy = spyOn(service, 'getAll').and.stub();

    //Act
    controller.getAll();

    //Assert
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith();
  });

  it('should search', async () => {
    //Arrange
    const searchSpy = spyOn(service, 'search').and.stub();
    const searchTodo: SearchTodoDto = {
      title: 'A title',
      priorities: ['MEDIUM'],
      startOfRange: '2022-05-08T17:25:12.170Z',
      endOfRange: '2022-05-18T17:25:12.170Z',
      sortType: 'TITLE',
      sortDirection: 'ASC',
    };

    //Act
    controller.search(searchTodo);

    //Assert
    expect(searchSpy).toHaveBeenCalledTimes(1);
    expect(searchSpy).toHaveBeenCalledWith(searchTodo);
  });

  it('should get by id', async () => {
    //Arrange
    const getByIdSpy = spyOn(service, 'getById').and.stub();

    //Act
    controller.getById('Hello');

    //Assert
    expect(getByIdSpy).toHaveBeenCalledTimes(1);
    expect(getByIdSpy).toHaveBeenCalledWith('Hello');
  });

  it('should get by priority', async () => {
    //Arrange
    const getByPrioritySpy = spyOn(service, 'getByPriority').and.stub();

    //Act
    controller.getByPriority('Hello');

    //Assert
    expect(getByPrioritySpy).toHaveBeenCalledTimes(1);
    expect(getByPrioritySpy).toHaveBeenCalledWith('Hello');
  });

  it('should create', async () => {
    //Arrange
    const createSpy = spyOn(service, 'create').and.stub();
    const createTodo: CreateTodoDto = { title: 'a', description: 'b', priority: 'C', dueDate: 'd' };

    //Act
    controller.create(createTodo);

    //Assert
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(createTodo);
  });

  it('should update', async () => {
    //Arrange
    const updateSpy = spyOn(service, 'update').and.stub();
    const updateTodo: UpdateTodoDto = { _id: '_a', title: 'a', description: 'b', priority: 'C', dueDate: 'd' };

    //Act
    controller.update(updateTodo);

    //Assert
    expect(updateSpy).toHaveBeenCalledTimes(1);
    expect(updateSpy).toHaveBeenCalledWith(updateTodo);
  });

  it('should delete', async () => {
    //Arrange
    const deleteSpy = spyOn(service, 'delete').and.stub();

    //Act
    controller.delete('Hello');

    //Assert
    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith('Hello');
  });
});
