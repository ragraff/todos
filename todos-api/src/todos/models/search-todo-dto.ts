import { IsDateString, IsOptional, Validate, IsNotEmpty } from 'class-validator';
import { IsPriorityString } from '../../common/is-priority-string';
import { IsSortDirectionString } from '../../common/is-sort-direction-string';
import { IsSortTypeString } from '../../common/is-sort-type-string';

export class SearchTodoDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  @Validate(IsPriorityString)
  priorities?: string[];

  @IsOptional()
  @IsDateString()
  startOfRange?: string;

  @IsOptional()
  @IsDateString()
  endOfRange?: string;

  @IsNotEmpty()
  @Validate(IsSortTypeString)
  sortType: string;

  @IsNotEmpty()
  @Validate(IsSortDirectionString)
  sortDirection: string;
}
