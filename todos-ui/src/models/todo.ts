import { Priority } from './priority';

export interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
}
