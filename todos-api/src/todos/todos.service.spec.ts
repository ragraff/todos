import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';
import { CreateTodoDto } from './models/create-todo-dto';
import { SearchTodoDto } from './models/search-todo-dto';
import { UpdateTodoDto } from './models/update-todo-dto';

describe('TodosService', () => {
  let service: TodosService;

  class mockFind {
    static exec() {
      return;
    }
  }
  class mockExec {
    static remove() {
      return;
    }
  }
  class mockTodoModel {
    static create() {
      return;
    }

    static update() {
      return;
    }

    static find() {
      return;
    }

    static findOne() {
      return;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, { provide: getModelToken('Todo'), useValue: mockTodoModel }],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create', async () => {
    //Arrange
    const createSpy = spyOn(mockTodoModel, 'create');
    const createTodo: CreateTodoDto = { title: 'a', description: 'b', priority: 'C', dueDate: 'd' };

    //Act
    service.create(createTodo);

    //Assert
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(createTodo);
  });

  it('should get all', async () => {
    //Arrange
    const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
    const execSpy = spyOn(mockFind, 'exec').and.stub();

    //Act
    service.getAll();

    //Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith();

    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledWith();
  });

  it('should get by id', async () => {
    //Arrange
    const findOneSpy = spyOn(mockTodoModel, 'findOne').and.returnValue(mockFind);
    const execSpy = spyOn(mockFind, 'exec').and.stub();
    const anId = 'an id';

    //Act
    service.getById(anId);

    //Assert
    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith({ _id: anId });

    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledWith();
  });

  it('should get by priority', async () => {
    //Arrange
    const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
    const execSpy = spyOn(mockFind, 'exec').and.stub();
    const aPriority = 'aPriority';

    //Act
    service.getByPriority(aPriority);

    //Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith({ priority: aPriority.toUpperCase() });

    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledWith();
  });

  describe('search', () => {
    it('should add title only', async () => {
      //Arrange
      const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
      const execSpy = spyOn(mockFind, 'exec').and.stub();
      const searchTodo: SearchTodoDto = { title: 'A title' };
      const expected = { title: 'A title' };

      //Act
      service.search(searchTodo);

      //Assert
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(expected);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith();
    });

    it('should add priority only', async () => {
      //Arrange
      const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
      const execSpy = spyOn(mockFind, 'exec').and.stub();
      const searchTodo: SearchTodoDto = { priority: 'Apriority' };
      const expected = { priority: 'APRIORITY' };

      //Act
      service.search(searchTodo);

      //Assert
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(expected);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith();
    });

    it('should add startOfRange only', async () => {
      //Arrange
      const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
      const execSpy = spyOn(mockFind, 'exec').and.stub();
      const searchTodo: SearchTodoDto = { startOfRange: 'startOfRange' };
      const expected = { dueDate: { $gt: 'startOfRange' } };

      //Act
      service.search(searchTodo);

      //Assert
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(expected);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith();
    });

    it('should add endOfRange only', async () => {
      //Arrange
      const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
      const execSpy = spyOn(mockFind, 'exec').and.stub();
      const searchTodo: SearchTodoDto = { endOfRange: 'endOfRange' };
      const expected = { dueDate: { $lt: 'endOfRange' } };

      //Act
      service.search(searchTodo);

      //Assert
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(expected);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith();
    });

    it('should add everything', async () => {
      //Arrange
      const findSpy = spyOn(mockTodoModel, 'find').and.returnValue(mockFind);
      const execSpy = spyOn(mockFind, 'exec').and.stub();
      const searchTodo: SearchTodoDto = {
        title: 'A title',
        priority: 'Apriority',
        startOfRange: 'startOfRange',
        endOfRange: 'endOfRange',
      };
      const expected = { title: 'A title', priority: 'APRIORITY', dueDate: { $lt: 'endOfRange', $gt: 'startOfRange' } };

      //Act
      service.search(searchTodo);

      //Assert
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(expected);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith();
    });
  });

  it('should update', async () => {
    //Arrange
    const updateSpy = spyOn(mockTodoModel, 'update');
    const updateTodo: UpdateTodoDto = { _id: 'id', title: 'a', description: 'b', priority: 'C', dueDate: 'd' };

    //Act
    service.update(updateTodo);

    //Assert
    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it('should delete', async () => {
    //Arrange
    const findOneSpy = spyOn(mockTodoModel, 'findOne').and.returnValue(mockFind);
    const execSpy = spyOn(mockFind, 'exec').and.returnValue(mockExec);
    const removeSpy = spyOn(mockExec, 'remove').and.stub();

    const id = 'an id';

    //Act
    await service.delete(id);

    //Assert
    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith({ _id: id });

    expect(execSpy).toHaveBeenCalledTimes(1);
    expect(execSpy).toHaveBeenCalledWith();

    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
