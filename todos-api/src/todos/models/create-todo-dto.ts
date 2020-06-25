import { IsNotEmpty, IsDateString, IsOptional, Validate } from 'class-validator';
import { IsPriorityString } from '../../common/is-priority-string';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @Validate(IsPriorityString)
  priority?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
