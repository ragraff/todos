import { SortType } from '../../models/sort-type';
import { ServerSortType } from '../models/server-sort-type';

export const sortTypeMapper = (sortType: string) => {
  switch (sortType) {
    case SortType.PRIORITY:
      return ServerSortType.Priority;
    case SortType.DUE_DATE:
      return ServerSortType.DueDate;
    case SortType.CREATED_DATE:
      return ServerSortType.CreatedDate;
    default:
      return ServerSortType.Title;
  }
};
