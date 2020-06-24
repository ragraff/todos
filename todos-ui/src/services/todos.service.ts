import { Todo } from '../models/todo';

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch('http://localhost:3001/todos');
  const json = await response.json();
  return json as Todo[];
}
