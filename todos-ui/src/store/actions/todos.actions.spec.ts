import { TodosActionTypes } from './todos.action.types';
import { createTodosFetchAction, createTodosSetAction } from './todos.actions';
import { mockTodos } from '../__mocks__/mock-todos';

describe('actions', () => {
  it('should create the TodosFetchAction', () => {
    expect(createTodosFetchAction()).toEqual({
      type: TodosActionTypes.FETCH_TODOS,
    });
  });

  it('should create the TodosSetAction', () => {
    expect(createTodosSetAction(mockTodos)).toEqual({
      type: TodosActionTypes.SET_TODOS,
      todos: mockTodos,
    });
  });
});
