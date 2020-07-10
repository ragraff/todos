import { ArrayHelpers } from './array-helpers';

describe('ArrayHelpers', () => {
  type ArrayHelpersTestCase = {
    array1: any[];
    array2: any[];
    areEqual: boolean;
  };

  const testCases: ArrayHelpersTestCase[] = [
    { array1: ['1', '2'], array2: ['1', '2'], areEqual: true },
    { array1: ['1', '2'], array2: ['2', '1'], areEqual: true },
    { array1: ['1', '2'], array2: ['1', '1'], areEqual: false },
    { array1: ['2', '2'], array2: ['1', '2'], areEqual: false },
    { array1: ['1', '2', '2'], array2: ['1', '2'], areEqual: false },
    { array1: ['2', '2'], array2: ['1', '1', '2'], areEqual: false },
    { array1: [1, 2], array2: [1, 2], areEqual: true },
    { array1: [1, 2], array2: [2, 1], areEqual: true },
    { array1: [1, 2], array2: [1, 1], areEqual: false },
    { array1: [2, 2], array2: [1, 2], areEqual: false },
    { array1: [1, 2, 2], array2: [1, 2], areEqual: false },
    { array1: [2, 2], array2: [1, 1, 2], areEqual: false },
    { array1: ['1', '2'], array2: [1, 2], areEqual: false },
    { array1: [1, '2'], array2: [1, '2'], areEqual: true },
    { array1: [1, '2'], array2: ['1', 2], areEqual: false },
  ];

  it.each(testCases)(
    'should correctly equate arrays',
    (testCase: ArrayHelpersTestCase) => {
      //Arrange

      //Act
      const actual = ArrayHelpers.equals<string>(
        testCase.array1,
        testCase.array2
      );

      //Assert
      expect(actual).toBe(testCase.areEqual);
    }
  );
});
