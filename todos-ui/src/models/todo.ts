import { Priority } from './priority';

export interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date;
}
