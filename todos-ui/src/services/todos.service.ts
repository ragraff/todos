import { Todo } from '../models/todo';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch('http://localhost:3001/todos');
  const json = await response.json();
  return json as Todo[];
}

export async function updateTodo(todo: Todo): Promise<Todo[]> {
  const formBody = getFormBody(todo);
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
  const formBody = getFormBody(todo, true);
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

const getFormBody = (todo: Todo, isCreate = false) => {
  const { _id, title, description, priority, dueDate } = todo;

  const formBody = [];
  if (!isCreate) {
    formBody.push(getFormBodyItem('_id', _id));
  }
  formBody.push(getFormBodyItem('title', title));
  formBody.push(getFormBodyItem('description', description));
  formBody.push(getFormBodyItem('priority', priority.toString()));
  formBody.push(getFormBodyItem('dueDate', new Date(dueDate).toISOString()));

  return formBody;
};

const getFormBodyItem = (key: string, value: string) => {
  const encodedKey = encodeURIComponent(key);
  const encodedValue = encodeURIComponent(value);
  return encodedKey + '=' + encodedValue;
};
