import { mockTodos } from './mock-todos';
import { ApplicationState } from '../models/application-state';

export const MockState: ApplicationState = {
  TodosReducer: {
    todos: mockTodos,
    todoFilter: {},
    sortOptions: { sortDirection: 'ASC', sortType: 'TITLE' },
  },
};
