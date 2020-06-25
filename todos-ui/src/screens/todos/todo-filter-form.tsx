import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { createSetTodoFilterAction } from '../../store';
import { TodoFilter } from '../../models/todo-filter';
import { connect } from 'react-redux';

interface TodoFilterFormProps {
  setTodoFilter: (todoFilter: TodoFilter) => void;
}

const TodoFilterFormComponent: FC<TodoFilterFormProps> = ({
  setTodoFilter,
}: TodoFilterFormProps) => {
  console.log(setTodoFilter);
  return <>Hello</>;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setTodoFilter: (todoFilter: TodoFilter) => {
      dispatch(createSetTodoFilterAction(todoFilter));
    },
  };
};

const TodoFilterForm = connect(
  null,
  mapDispatchToProps
)(TodoFilterFormComponent);

export default TodoFilterForm;
