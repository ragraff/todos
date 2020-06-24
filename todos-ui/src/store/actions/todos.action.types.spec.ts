import { TodosActionTypes } from './todos.action.types';

describe('action types', () => {
  it('contains all the action types', () => {
    expect(TodosActionTypes.FETCH_TODOS).toBe('FETCH_TODOS');
    expect(TodosActionTypes.SET_TODOS).toBe('SET_TODOS');
  });
});
