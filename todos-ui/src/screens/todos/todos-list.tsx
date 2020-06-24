import React, { useEffect, FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Todo } from '../../models/todo';
import { TodoCard } from './todo-card';
import { ApplicationState } from '../../store/models/application-state';
import { getAllTodos, createTodosFetchAction } from '../../store';

export interface TodosListProps {
  todos: Todo[];
  fetchTodos: () => void;
}

const TodosList: FC<TodosListProps> = ({
  todos,
  fetchTodos,
}: TodosListProps) => {
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <>{todos && todos.map(todo => <TodoCard key={todo._id} todo={todo} />)}</>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    todos: getAllTodos(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchTodos: () => {
      dispatch(createTodosFetchAction());
    },
  };
};

const TodosListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosList);

export default TodosListConnected;
