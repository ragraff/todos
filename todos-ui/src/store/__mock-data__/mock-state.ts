import { mockTodos } from './mock-todos';
import { ApplicationState } from '../models/application-state';

export const MockState: ApplicationState = {
  TodosReducer: {
    todos: mockTodos,
  },
};
