import { Priority } from './priority';

export interface Todo {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
}
