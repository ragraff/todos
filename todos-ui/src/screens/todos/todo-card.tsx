import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  Card,
  Select,
  MenuItem,
  makeStyles,
  createStyles,
  TextField,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { Todo } from '../../models/todo';
import { Priority } from '../../models/priority';
import {
  createTodoUpdateAction,
  createTodoDeleteAction,
  createTodoCreateAction,
} from '../../store';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { createTodo } from '../../services/todos.service';

interface TodoCardProps {
  todo: Todo;
  isCreateCard?: boolean;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '10px',
      width: '250px',
      margin: '10px',
      backgroundColor: '#035e7b',

      '& .MuiTextField-root': {
        margin: '8px',
        alignItems: 'baseline',
        alignContent: 'flex-start',
        display: 'flex',
      },
    },
    selectEmpty: {
      marginTop: '12px',
    },
    priorityContainer: {
      margin: '8px',
      alignItems: 'baseline',
      alignContent: 'flex-start',
      display: 'flex',
    },
  })
);

const TodoCardComponent: FC<TodoCardProps> = ({
  todo,
  isCreateCard = false,
  updateTodo,
  deleteTodo,
}: TodoCardProps) => {
  const { title, description, priority, dueDate } = todo;
  const initialState: Todo = { ...todo };
  const [selectedTitle, setTitle] = useState(title);
  const [selectedDescription, setDescription] = useState(description);
  const [selectedPriority, setPriority] = useState(priority);
  const [selectedDate, setDueDate] = useState<Date>(dueDate);
  const [isDirty, setIsDirty] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const {
      title: initialTitle,
      description: initialDescription,
      priority: initialPriority,
      dueDate: initialDueDate,
    } = initialState;
    if (
      selectedTitle !== initialTitle ||
      selectedDescription !== initialDescription ||
      selectedPriority !== initialPriority ||
      selectedDate !== initialDueDate
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [
    selectedTitle,
    selectedDescription,
    selectedPriority,
    selectedDate,
    initialState,
  ]);

  const handleReset = () => {
    const {
      title: initialTitle,
      description: initialDescription,
      priority: initialPriority,
      dueDate: initialDueDate,
    } = initialState;
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setDueDate(initialDueDate);
  };

  const handleDelete = () => {
    deleteTodo(getCurrentTodo());
  };

  const handleDateTimeChange = (date: Date | null) => {
    setDueDate(date as Date);
  };

  const handlePriorityChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as keyof typeof Priority;
    setPriority(Priority[value]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const renderPriorityItems = () => {
    return Object.keys(Priority).map((key, index) => {
      return (
        <MenuItem key={index} value={key}>
          {key}
        </MenuItem>
      );
    });
  };

  const renderDateTimePicker = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <DateTimePicker
            margin="normal"
            id="date-time-picker"
            label="Due"
            value={selectedDate}
            onChange={handleDateTimeChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    );
  };

  const renderPriority = () => {
    return (
      <>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          value={selectedPriority}
          onChange={handlePriorityChange}
        >
          {renderPriorityItems()}
        </Select>
      </>
    );
  };

  const handleSubmit = () => {
    if (isCreateCard) {
      createTodo(getCurrentTodo());
    } else {
      updateTodo(getCurrentTodo());
    }
  };

  const getCurrentTodo = (): Todo => {
    return {
      ...initialState,
      title: selectedTitle,
      description: selectedDescription,
      priority: selectedPriority,
      dueDate: selectedDate,
    };
  };

  return (
    <Card className={classes.root}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          id="title-input"
          value={selectedTitle}
          onChange={handleTitleChange}
          placeholder={isCreateCard ? 'Title' : undefined}
        />
        <TextField
          id="title-description"
          value={selectedDescription}
          onChange={handleDescriptionChange}
          placeholder={isCreateCard ? 'Description' : undefined}
          multiline
        />
        <div className={classes.priorityContainer}>{renderPriority()}</div>
        <div>{renderDateTimePicker()}</div>
        <Tooltip title="Save">
          <IconButton aria-label="save" type="submit" disabled={!isDirty}>
            <SaveIcon />
          </IconButton>
        </Tooltip>
        {!isCreateCard && (
          <Tooltip title="Reset">
            <IconButton
              aria-label="cancel"
              disabled={!isDirty}
              type="button"
              onClick={handleReset}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        )}
        {!isCreateCard && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={handleDelete}
              type="button"
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>
        )}
      </form>
    </Card>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createTodo: (todo: Todo) => {
      dispatch(createTodoCreateAction(todo));
    },
    updateTodo: (todo: Todo) => {
      dispatch(createTodoUpdateAction(todo));
    },
    deleteTodo: (todo: Todo) => {
      dispatch(createTodoDeleteAction(todo));
    },
  };
};

const TodoCard = connect(null, mapDispatchToProps)(TodoCardComponent);

export default TodoCard;
