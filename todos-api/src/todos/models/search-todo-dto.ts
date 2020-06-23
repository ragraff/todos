import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsPriorityString } from '../../common/is-priority-string';

export class SearchTodoDto {
  @IsOptional()
  title: string;

  @IsOptional()
  @Validate(IsPriorityString)
  priority: string;

  @IsOptional()
  @IsDateString()
  startOfRange: string;

  @IsOptional()
  @IsDateString()
  endOfRange: string;
}
