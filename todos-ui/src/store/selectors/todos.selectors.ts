import { ApplicationState } from '../models/application-state';
import { Todo } from '../../models/todo';

export function getAllTodos(state: ApplicationState): Todo[] {
  return state?.TodosReducer?.todos;
}
