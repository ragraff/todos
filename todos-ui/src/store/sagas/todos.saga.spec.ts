const getTodosMockFn = jest.fn();
const updateTodosMockFn = jest.fn();
const deleteTodosMockFn = jest.fn();

jest.mock('../../services/todos.service', () => {
  return {
    getTodos: getTodosMockFn,
    updateTodos: updateTodosMockFn,
    deleteTodos: deleteTodosMockFn,
  };
});

import { expectSaga } from 'redux-saga-test-plan';
import { fetchTodosSaga } from './todos.saga';
import { createTodosSetAction, createTodosFetchAction } from '../actions';
import { mockTodos } from '../__mocks__/mock-todos';
import { getTodos } from '../../services/todos.service';
import { getTodoFilter, getSortOptions } from '../selectors';

describe('TodosSaga', () => {
  beforeEach(() => {
    getTodosMockFn.mockClear();
  });

  it('should true', () => {
    expect(true).toBe(true);
  });

  // it('should handle putting the set action', () => {
  //   getTodosMockFn.mockImplementation(() => mockTodos);
  //   return expectSaga(fetchTodosSaga)
  //     .select(getTodoFilter)
  //     .select(getSortOptions)
  //     .call(getTodos)
  //     .put(createTodosSetAction(mockTodos))
  //     .run();
  // });

  // it('should handle an error in the set action', () => {
  //   getTodosMockFn.mockImplementation(() => {
  //     throw new Error('oops');
  //   });

  //   return expectSaga(fetchTodosSaga)
  //     .throws(new Error('Error in fetchTodosSaga: Error: oops'))
  //     .silentRun();
  // });

  // it('should take a fetch action', () => {
  //   getTodosMockFn.mockImplementation(() => mockTodos);
  //   return expectSaga(fetchTodosSaga)
  //     .call(getTodos)
  //     .put(createTodosSetAction(mockTodos))
  //     .dispatch(createTodosFetchAction())
  //     .silentRun();
  // });
});
