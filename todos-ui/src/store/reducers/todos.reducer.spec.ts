import { TodosReducer } from './todos.reducer';
import { createTodosFetchAction, createTodosSetAction } from '../actions';
import { mockDefaultTodosSlice } from '../__mocks__/mock-todos-slice';
import { mockTodos } from '../__mocks__/mock-todos';

describe('TodosReducer', () => {
  it('should return the default state for an un-cased action type', () => {
    //Arrange
    const action = createTodosFetchAction();

    //Act
    const actual = TodosReducer(mockDefaultTodosSlice, action);

    //Assert
    expect(actual).toEqual(mockDefaultTodosSlice);
  });

  it('should update the state for a set todos action', () => {
    //Arrange
    const action = createTodosSetAction(mockTodos);

    //Act
    const actual = TodosReducer(mockDefaultTodosSlice, action);

    //Assert
    expect(actual).toEqual({ ...mockDefaultTodosSlice, todos: mockTodos });
  });
});
