import { IsNotEmpty, IsDateString, IsOptional, Validate } from 'class-validator';
import { IsPriorityString } from '../../common/is-priority-string';

export class CreateTodoDto {
  readonly title: string;
  readonly description?: string;
  readonly priority?: string;
  readonly dueDate?: string;
}
