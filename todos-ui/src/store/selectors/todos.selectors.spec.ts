import { getAllTodos } from './todos.selectors';
import { MockState } from '../__mocks__/mock-state';
import { mockTodos } from '../__mocks__/mock-todos';

describe('TodosSelector', () => {
  it('should get all todos', () => {
    //Arrange

    //Act
    const actual = getAllTodos(MockState);

    //Assert
    expect(actual).toEqual(mockTodos);
  });
});
