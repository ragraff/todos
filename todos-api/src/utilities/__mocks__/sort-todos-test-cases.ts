import { SortType } from '../../todos/models/sort-type';
import { SortDirection } from '../../todos/models/sort-direction';
import { Priority } from '../../todos/models/priority';

export type TestCaseType = { sortType: string; sortDirection: string; a: string; b: string; expectedValue: number };
/* prettier-ignore */
export const testCases: TestCaseType[] = [
  { sortType: SortType.TITLE, sortDirection: SortDirection.ASC, a: 'A', b: 'B', expectedValue: -1 },
  { sortType: SortType.TITLE, sortDirection: SortDirection.ASC, a: 'A', b: 'A', expectedValue: 0 },
  { sortType: SortType.TITLE, sortDirection: SortDirection.ASC, a: 'B', b: 'A', expectedValue: 1 },
  { sortType: SortType.TITLE, sortDirection: SortDirection.DESC, a: 'A', b: 'B', expectedValue: 1 },
  { sortType: SortType.TITLE, sortDirection: SortDirection.DESC, a: 'A', b: 'A', expectedValue: 0 },
  { sortType: SortType.TITLE, sortDirection: SortDirection.DESC, a: 'B', b: 'A', expectedValue: -1 },

  { sortType: SortType.DUEDATE, sortDirection: SortDirection.ASC, a: '2020-05-05', b: '2020-08-05', expectedValue: -1, },
  { sortType: SortType.DUEDATE, sortDirection: SortDirection.ASC, a: '2020-05-05', b: '2020-05-05', expectedValue: 0 },
  { sortType: SortType.DUEDATE, sortDirection: SortDirection.ASC, a: '2020-08-05', b: '2020-05-05', expectedValue: 1 },
  { sortType: SortType.DUEDATE, sortDirection: SortDirection.DESC, a: '2020-05-05', b: '2020-08-05', expectedValue: 1 },
  { sortType: SortType.DUEDATE, sortDirection: SortDirection.DESC, a: '2020-05-05', b: '2020-05-05', expectedValue: 0 },
  { sortType: SortType.DUEDATE, sortDirection: SortDirection.DESC, a: '2020-08-05', b: '2020-05-05', expectedValue: -1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.LOW, b: Priority.LOW, expectedValue: 0 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.LOW, b: Priority.MEDIUM, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.LOW, b: Priority.HIGH, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.LOW, b: Priority.URGENT, expectedValue: -1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.MEDIUM, b: Priority.LOW, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.MEDIUM, b: Priority.MEDIUM, expectedValue: 0 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.MEDIUM, b: Priority.HIGH, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.MEDIUM, b: Priority.URGENT, expectedValue: -1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.HIGH, b: Priority.LOW, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.HIGH, b: Priority.MEDIUM, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.HIGH, b: Priority.HIGH, expectedValue: 0 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.HIGH, b: Priority.URGENT, expectedValue: -1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.URGENT, b: Priority.LOW, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.URGENT, b: Priority.MEDIUM, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.URGENT, b: Priority.HIGH, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.ASC, a: Priority.URGENT, b: Priority.URGENT, expectedValue: 0 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.LOW, b: Priority.LOW, expectedValue: 0 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.LOW, b: Priority.MEDIUM, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.LOW, b: Priority.HIGH, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.LOW, b: Priority.URGENT, expectedValue: 1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.MEDIUM, b: Priority.LOW, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.MEDIUM, b: Priority.MEDIUM, expectedValue: 0 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.MEDIUM, b: Priority.HIGH, expectedValue: 1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.MEDIUM, b: Priority.URGENT, expectedValue: 1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.HIGH, b: Priority.LOW, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.HIGH, b: Priority.MEDIUM, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.HIGH, b: Priority.HIGH, expectedValue: 0 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.HIGH, b: Priority.URGENT, expectedValue: 1 },

  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.URGENT, b: Priority.LOW, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.URGENT, b: Priority.MEDIUM, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.URGENT, b: Priority.HIGH, expectedValue: -1 },
  { sortType: SortType.PRIORITY, sortDirection: SortDirection.DESC, a: Priority.URGENT, b: Priority.URGENT, expectedValue: 0 },
];
/* prettier-ignore */
