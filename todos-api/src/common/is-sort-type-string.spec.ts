import { IsSortTypeString } from './is-sort-type-string';

describe('is-priority-string', () => {
  it('should be defined', () => {
    expect(new IsSortTypeString()).toBeDefined();
  });

  it.each(['title', 'priority', 'dueDate'])('should validate', (testPriority: string) => {
    //Arrange
    const isSortTypeString = new IsSortTypeString();

    //Act
    const actual = isSortTypeString.validate(testPriority);

    //Assert
    expect(actual).toBe(true);
  });

  it('should return false for a bad value', () => {
    //Arrange
    const badDatum = 'not it';
    const isPriorityString = new IsSortTypeString();

    //Act
    const actual = isPriorityString.validate(badDatum);

    //Assert
    expect(actual).toBe(false);
  });

  it('should have the correct default message', () => {
    //Arrange
    const isPriorityString = new IsSortTypeString();

    //Act
    const actual = isPriorityString.defaultMessage();

    //Assert
    expect(actual).toBe('Text ($value) must be one of (Title, Priority, DueDate)');
  });
});
