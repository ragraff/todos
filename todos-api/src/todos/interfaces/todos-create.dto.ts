import { Priority } from './priority';

export class TodoCreateDto {
  readonly title: string;
  readonly description?: string;
  readonly priority?: Priority;
  readonly dueDate?: Date;
}
