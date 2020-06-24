import React, { FC } from 'react';
import { Card } from '@material-ui/core';
import { Todo } from '../../models/todo';

interface TodoCardProps {
  todo: Todo;
}

export const TodoCard: FC<TodoCardProps> = ({ todo }: TodoCardProps) => {
  return (
    <Card key={todo._id}>
      <div data-id={todo._id}>
        <div>{todo.title}</div>
        <div>{todo.description}</div>
        <div>{todo.priority}</div>
        <div>{todo.dueDate.toISOString()}</div>
      </div>
    </Card>
  );
};
