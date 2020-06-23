import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getModelToken } from '@nestjs/mongoose';

describe('TodosService', () => {
  let service: TodosService;

  const mockTodoModel = (dto: any) => {
    this.save = () => {
      return dto;
    };
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService, { provide: getModelToken('Todo'), useValue: mockTodoModel }],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
