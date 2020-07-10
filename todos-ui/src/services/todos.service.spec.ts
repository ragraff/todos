import { getTodos, xWwwFormUrlEncoded } from './todos.service';
import { TodoFilter } from '../models/todo-filter';
import { Priority } from '../models/priority';
import { SortType } from '../models/sort-type';
import { SortDirection } from '../models/sort-direction';
import { SortOptions } from '../models/sort';
import { Todo } from '../models/todo';
import fetchMock from 'jest-fetch-mock';
import { AppConfig } from '../config';
import { HttpVerb } from '../models/http-verb';
import { todosMock } from '../__mocks__/__stub-data__/todos-mock';

describe('Todo Service', () => {
  beforeEach(() => {
    fetchMock.enableMocks();
  });

  describe('getTodos', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
    });

    it('should get the data', async () => {
      //Arrange
      const expectedBody =
        'title=Hello&priorities=LOW&sortType=title&sortDirection=ASC';
      fetchMock.mockResponseOnce(JSON.stringify(todosMock));
      const todoFilter: TodoFilter = {
        title: 'Hello',
        priorities: [Priority.LOW],
      };
      const sortOptions: SortOptions = {
        sortType: SortType.TITLE,
        sortDirection: SortDirection.ASC,
      };

      //Act
      const actual: Todo[] = await getTodos(todoFilter, sortOptions);

      //Assert
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(AppConfig.todo.search, {
        method: HttpVerb.POST,
        headers: { 'Content-Type': xWwwFormUrlEncoded },
        body: expectedBody,
      });

      for (let i = 0; i < todosMock.length; i++) {
        const actualItem = actual[i];
        const expectedItem = todosMock[i];

        expect(actualItem.id).toBe(expectedItem.id);
        expect(actualItem.title).toBe(expectedItem.title);
        expect(actualItem.description).toBe(expectedItem.description);
        expect(actualItem.priority).toBe(expectedItem.priority);
        expect(actualItem.dueDate).toBe(expectedItem.dueDate.toISOString());
        expect(actualItem.createDate).toBe(
          expectedItem.createDate.toISOString()
        );
        expect(actualItem.updateDate).toBe(
          expectedItem.updateDate.toISOString()
        );
      }
    });
  });
});
