import { Priority } from './priority';

export class TodoUpdateDto {
  readonly id: string;
  readonly title?: string;
  readonly description?: string;
  readonly priority?: Priority;
  readonly dueDate?: Date;
}
