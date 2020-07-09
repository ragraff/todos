import { Priority } from './priority';
import { SortType } from './sort-type';
import { SortDirection } from './sort-direction';

export class TodoSearchDto {
  readonly id?: string;
  readonly title?: string;
  readonly priority?: Priority[] | Priority;
  readonly startOfRange?: Date;
  readonly endOfRange?: Date;
  readonly sortType?: SortType;
  readonly sortDirection?: SortDirection;
}
