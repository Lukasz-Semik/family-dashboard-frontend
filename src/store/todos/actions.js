import { get } from 'lodash';

import { apiGetTodos } from '@/api';

import { setTodos, setIsFetchingTodos } from './mutations';

export const getTodos = 'getTodos';

export default {
  [getTodos]: async ({ commit }) => {
    commit(setIsFetchingTodos, { isFetching: true });
    const response = await apiGetTodos();
    commit(setTodos, { todos: get(response, 'data.todos', []) });
    commit(setIsFetchingTodos, { isFetching: false });

    return response;
  },
};
