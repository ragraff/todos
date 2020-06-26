import { Todo } from '../todos/schemas/todo.schema';
import { SortType } from '../todos/models/sort-type';
import { Priority } from '../todos/models/priority';
import { SortDirection } from '../todos/models/sort-direction';

export const sortTodos = (a: Todo, b: Todo, sortType: string, sortDirection: string): number => {
  if (SortType[sortType] === SortType.PRIORITY) {
    const priorityMap = Object.keys(Priority).map((key, index) => ({ order: index, priority: key }));
    const aOrder = priorityMap.find(x => x.priority === a.priority).order;
    const bOrder = priorityMap.find(x => x.priority === b.priority).order;
    if (aOrder > bOrder) {
      return sortDirection === SortDirection.ASC ? 1 : -1;
    } else if (aOrder === bOrder) {
      return 0;
    } else {
      return sortDirection === SortDirection.ASC ? -1 : 1;
    }
  } else {
    if (a[SortType[sortType]] > b[SortType[sortType]]) {
      return sortDirection === SortDirection.ASC ? 1 : -1;
    } else if (a[SortType[sortType]] === b[SortType[sortType]]) {
      return 0;
    } else {
      return sortDirection === SortDirection.ASC ? -1 : 1;
    }
  }
};
