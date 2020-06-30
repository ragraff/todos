import { initialState } from './initial-state';
import { MockState } from '../__mock-data__/mock-state';
import { mockDefaultTodosSlice } from '../__mock-data__/mock-todos-slice';

describe('initial-state', () => {
  it('should have the correct initial-state', () => {
    expect(initialState).toEqual(mockDefaultTodosSlice);
  });
});
