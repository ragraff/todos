import React, { useEffect, FC, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Todo } from '../../models/todo';
import TodoCard from './todo-card';
import { ApplicationState } from '../../store/models/application-state';
import { getAllTodos, createTodosFetchAction } from '../../store';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Tooltip, IconButton, Dialog, DialogTitle } from '@material-ui/core';
import styled from 'styled-components';
import { Priority } from '../../models/priority';
import TodoFilterForm from './todo-filter-form';

interface TodosListProps {
  todos: Todo[];
  fetchTodos: () => void;
}

const TodosContainer = styled.div`
  display: flex;
  flex-direction: column;

  .todo-header {
    display: flex;
    flex-direction: column;
  }

  .todo-header-head {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }

  .todo-body {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }
`;

const TodosListComponent: FC<TodosListProps> = ({
  todos,
  fetchTodos,
}: TodosListProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);
  const handleCreateClickOpen = () => {
    setOpen(true);
  };
  const handleCreateClickClose = () => {
    setOpen(false);
  };

  return (
    <TodosContainer>
      <div className="todo-header">
        <div className="todo-header-head">
          <h2>Todos</h2>
          <Tooltip title="Create">
            <IconButton
              aria-label="create"
              type="button"
              onClick={handleCreateClickOpen}
            >
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="todo-header-filters">
          <TodoFilterForm></TodoFilterForm>
        </div>
      </div>
      <div className="todo-body">
        {todos && todos.map(todo => <TodoCard key={todo._id} todo={todo} />)}
      </div>
      <Dialog
        open={open}
        onClose={handleCreateClickClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a todo</DialogTitle>
        <TodoCard
          isCreateCard={true}
          todo={{
            _id: '',
            title: '',
            description: '',
            priority: Priority.LOW,
            dueDate: new Date(),
          }}
        />
      </Dialog>
    </TodosContainer>
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

const TodosList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosListComponent);

export default TodosList;
