import React from 'react';
import { Priority } from '../models/priority';
import { TodoCard } from '../screens/todos/todo-card';

export default {
  title: 'TodoCard',
  component: TodoCard,
};
const todo = {
  id: '1',
  title: 'Title',
  description: 'desc',
  priority: Priority.LOW,
  dueDate: new Date(2020, 1, 23, 13, 23, 0, 0),
};
export const Todo_Card = () => <TodoCard todo={todo} />;
