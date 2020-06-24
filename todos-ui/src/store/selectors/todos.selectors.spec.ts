import { getAllTodos } from './todos.selectors';
import { MockState } from '../__mock-data__/mock-state';
import { mockTodos } from '../__mock-data__/mock-todos';

describe('TodosSelector', () => {
  it('should get all todos', () => {
    //Arrange

    //Act
    const actual = getAllTodos(MockState);

    //Assert
    expect(actual).toEqual(mockTodos);
  });
});
