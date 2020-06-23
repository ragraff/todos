import { ParsePriorityStringPipe } from './parse-priority-string';
import { BadRequestException } from '@nestjs/common';

describe('parse-priority-string', () => {
  it('should be defined', () => {
    expect(new ParsePriorityStringPipe()).toBeDefined();
  });

  it.each(['low', 'medium', 'high', 'urgent'])('should validate', (testPriority: string) => {
    //Arrange
    const parsePriorityStringPipe = new ParsePriorityStringPipe();

    //Act
    const actual = parsePriorityStringPipe.transform(testPriority);

    //Assert
    expect(actual).toBe(testPriority.toUpperCase());
  });

  it('should return a bad request exception for a bad value', () => {
    //Arrange
    const parsePriorityStringPipe = new ParsePriorityStringPipe();
    const badDatum = 'not it';

    //Act
    const actual = () => parsePriorityStringPipe.transform(badDatum);

    //Assert
    expect(actual).toThrow(BadRequestException);
    expect(actual).toThrowError('Text (not it) must be one of (Low, Medium, High, Urgent).');
  });
});
