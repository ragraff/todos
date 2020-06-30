import { SortType } from '../todos/models/sort-type';
import { Priority } from '../todos/models/priority';
import { SortDirection } from '../todos/models/sort-direction';

export const sortTodos = (a: string, b: string, sortType: string, sortDirection: string): number => {
  if (SortType[sortType.toUpperCase()] === SortType.PRIORITY) {
    const priorityMap = [
      { order: 0, priority: Priority.LOW },
      { order: 1, priority: Priority.MEDIUM },
      { order: 2, priority: Priority.HIGH },
      { order: 3, priority: Priority.URGENT },
    ];
    const aOrder = priorityMap.find(x => x.priority === a).order;
    const bOrder = priorityMap.find(x => x.priority === b).order;
    if (aOrder > bOrder) {
      return sortDirection === SortDirection.ASC ? 1 : -1;
    } else if (aOrder === bOrder) {
      return 0;
    } else {
      return sortDirection === SortDirection.ASC ? -1 : 1;
    }
  } else {
    if (a > b) {
      return sortDirection === SortDirection.ASC ? 1 : -1;
    } else if (a === b) {
      return 0;
    } else {
      return sortDirection === SortDirection.ASC ? -1 : 1;
    }
  }
};
