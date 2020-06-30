import { sortTodos } from './sort-helper';
import { testCases, TestCaseType } from './__mocks__/sort-todos-test-cases';

describe('sortTodos', () => {
  it.each(testCases)('should sort by priority', (testCase: TestCaseType) => {
    //Arrange
    const { a, b, sortType, sortDirection, expectedValue } = testCase;

    //Act
    const actual = sortTodos(a, b, sortType, sortDirection);

    //Assert
    expect(actual).toBe(expectedValue);
  });
});
