import { IsSortDirectionString } from './is-sort-direction-string';

describe('is-sort-direction-string', () => {
  it('should be defined', () => {
    expect(new IsSortDirectionString()).toBeDefined();
  });

  it.each(['asc', 'desc'])('should validate', (sortDirection: string) => {
    //Arrange
    const isSortDirectionString = new IsSortDirectionString();

    //Act
    const actual = isSortDirectionString.validate(sortDirection);

    //Assert
    expect(actual).toBe(true);
  });

  it('should return false for a bad value', () => {
    //Arrange
    const badDatum = 'not it';
    const isSortDirectionString = new IsSortDirectionString();

    //Act
    const actual = isSortDirectionString.validate(badDatum);

    //Assert
    expect(actual).toBe(false);
  });

  it('should have the correct default message', () => {
    //Arrange
    const isSortDirectionString = new IsSortDirectionString();

    //Act
    const actual = isSortDirectionString.defaultMessage();

    //Assert
    expect(actual).toBe('Text ($value) must be one of (Asc, Desc)');
  });
});
