import { combineReducers } from 'redux';
import { TodosReducer } from './todos.reducer';

export const rootReducer = combineReducers({ TodosReducer });
