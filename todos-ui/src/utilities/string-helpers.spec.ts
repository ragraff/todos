import { toTitleCase } from './string-helpers';

describe('StringHelpers', () => {
  describe('Title Case', () => {
    type TitleCaseTestCase = { input: string; output: string };
    const testCases: TitleCaseTestCase[] = [
      { input: 'TITLE_CASE', output: 'Title Case' },
      { input: 'title_case', output: 'Title Case' },
      { input: 'title_CASE', output: 'Title Case' },
      { input: 'TITLE_case', output: 'Title Case' },
      { input: 'TITLECASE', output: 'Titlecase' },
      { input: 'Titlecase', output: 'Titlecase' },
    ];

    it.each(testCases)(
      'should set the title case',
      (testCase: TitleCaseTestCase) => {
        expect(toTitleCase(testCase.input)).toBe(testCase.output);
      }
    );
  });
});
