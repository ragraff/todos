import { Todo } from '../models/todo';
import { SortOptions } from '../models/sort';
import { TodoFilter } from '../models/todo-filter';

export async function getTodos(
  todoFilter: TodoFilter,
  sortOptions: SortOptions
): Promise<Todo[]> {
  const formBody = getSearchOptionsFormBody(todoFilter, sortOptions);
  const formData = formBody.join('&');

  const response = await fetch('http://localhost:3001/todos/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formData,
  });
  const json = await response.json();
  return json as Todo[];
}

export async function updateTodo(todo: Todo): Promise<Todo[]> {
  const formBody = getTodoFormBody(todo);
  const formData = formBody.join('&');

  const response = await fetch('http://localhost:3001/todos', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formData,
  });
  const json = await response.json();
  return json as Todo[];
}

export async function deleteTodo(todo: Todo): Promise<Todo[]> {
  const response = await fetch(`http://localhost:3001/todos/${todo._id}`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json as Todo[];
}

export async function createTodo(todo: Todo): Promise<Todo[]> {
  const formBody = getTodoFormBody(todo, true);
  const formData = formBody.join('&');

  const response = await fetch('http://localhost:3001/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: formData,
  });
  const json = await response.json();
  return json as Todo[];
}

const getTodoFormBody = (todo: Todo, isCreate = false) => {
  const { _id, title, description, priority, dueDate } = todo;

  const formBody = [];
  if (!isCreate) {
    formBody.push(getFormBodyItem('_id', _id));
  }
  formBody.push(getFormBodyItem('title', title));
  formBody.push(getFormBodyItem('description', description));
  formBody.push(getFormBodyItem('priority', priority));
  formBody.push(getFormBodyItem('dueDate', new Date(dueDate).toISOString()));

  return formBody;
};

const getSearchOptionsFormBody = (
  todoFilter: TodoFilter,
  sortOptions: SortOptions
) => {
  const { title, priorities, startOfRange, endOfRange } = todoFilter;
  const { sortType, sortDirection } = sortOptions;

  const formBody = [];

  if (title !== '') {
    formBody.push(getFormBodyItem('title', title as string));
  }
  if (priorities !== []) {
    priorities?.forEach(priority =>
      formBody.push(getFormBodyItem('priorities', priority.toUpperCase()))
    );
  }
  if (startOfRange != null) {
    formBody.push(
      getFormBodyItem(
        'startOfRange',
        new Date(startOfRange as Date).toISOString()
      )
    );
  }
  if (endOfRange != null) {
    formBody.push(
      getFormBodyItem('endOfRange', new Date(endOfRange as Date).toISOString())
    );
  }

  formBody.push(getFormBodyItem('sortType', sortType));
  formBody.push(getFormBodyItem('sortDirection', sortDirection));
  return formBody;
};

const getFormBodyItem = (key: string, value: string) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  return encodedKey + '=' + encodedValue;
};
