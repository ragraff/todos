import { IsDateString, IsOptional, Validate, IsNotEmpty } from 'class-validator';
import { IsPriorityString } from '../../common/is-priority-string';
import { Optional } from '@nestjs/common';

export class UpdateTodoDto {
  @IsNotEmpty()
  _id: string;

  @Optional()
  title?: string;

  @Optional()
  description?: string;

  @IsOptional()
  @Validate(IsPriorityString)
  priority?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
