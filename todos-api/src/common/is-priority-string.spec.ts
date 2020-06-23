import { IsPriorityString } from './is-priority-string';

describe('is-priority-string', () => {
  it('should be defined', () => {
    expect(new IsPriorityString()).toBeDefined();
  });

  it.each(['low', 'medium', 'high', 'urgent'])('should validate', (testPriority: string) => {
    //Arrange
    const isPriorityString = new IsPriorityString();

    //Act
    const actual = isPriorityString.validate(testPriority);

    //Assert
    expect(actual).toBe(true);
  });

  it('should return false for a bad value', () => {
    //Arrange
    const badDatum = 'not it';
    const isPriorityString = new IsPriorityString();

    //Act
    const actual = isPriorityString.validate(badDatum);

    //Assert
    expect(actual).toBe(false);
  });

  it('should have the correct default message', () => {
    //Arrange
    const isPriorityString = new IsPriorityString();

    //Act
    const actual = isPriorityString.defaultMessage();

    //Assert
    expect(actual).toBe('Text ($value) must be one of (Low, Medium, High, Urgent).');
  });
});
