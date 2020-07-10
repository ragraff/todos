import { Todo } from '../models/todo';
import { AppConfig } from '../config';
import { SortOptions } from '../models/sort';
import { TodoFilter } from '../models/todo-filter';
import { HttpVerb } from '../models/http-verb';
import { sortTypeMapper } from './mapper/todos.mapper';

export const xWwwFormUrlEncoded =
  'application/x-www-form-urlencoded; charset=UTF-8';

export async function getTodos(
  todoFilter: TodoFilter,
  sortOptions: SortOptions
): Promise<Todo[]> {
  const formBody = getSearchOptionsFormBody(todoFilter, sortOptions);
  const formData = formBody.join('&');

  const response = await fetch(AppConfig.todo.search, {
    method: HttpVerb.POST,
    headers: {
      'Content-Type': xWwwFormUrlEncoded,
    },
    body: formData,
  });
  const json = await response.json();
  return json as Todo[];
}

export async function updateTodo(todo: Todo): Promise<Todo[]> {
  const formBody = getTodoFormBody(todo);
  const formData = formBody.join('&');

  const response = await fetch(AppConfig.todo.base, {
    method: HttpVerb.PUT,
    headers: {
      'Content-Type': xWwwFormUrlEncoded,
    },
    body: formData,
  });
  const json = await response.json();
  return json as Todo[];
}

export async function deleteTodo(todo: Todo): Promise<Todo[]> {
  const response = await fetch(`${AppConfig.todo.base}/${todo.id}`, {
    method: HttpVerb.DELETE,
  });
  const json = await response.json();
  return json as Todo[];
}

export async function createTodo(todo: Todo): Promise<Todo[]> {
  const formBody = getTodoFormBody(todo, true);
  const formData = formBody.join('&');

  const response = await fetch(AppConfig.todo.base, {
    method: HttpVerb.POST,
    headers: {
      'Content-Type': xWwwFormUrlEncoded,
    },
    body: formData,
  });
  const json = await response.json();
  return json as Todo[];
}

const getTodoFormBody = (todo: Todo, isCreate = false) => {
  const { id, title, description, priority, dueDate } = todo;

  const formBody = [];
  if (!isCreate) {
    formBody.push(getFormBodyItem('id', id));
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

  formBody.push(getFormBodyItem('sortType', sortTypeMapper(sortType)));
  formBody.push(getFormBodyItem('sortDirection', sortDirection));
  return formBody;
};

const getFormBodyItem = (key: string, value: string) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  return encodedKey + '=' + encodedValue;
};
