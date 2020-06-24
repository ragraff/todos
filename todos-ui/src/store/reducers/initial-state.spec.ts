import { initialState } from './initial-state';

describe('initial-state', () => {
  it('should have the correct initial-state', () => {
    expect(initialState).toEqual({ todos: [] });
  });
});
