import { find } from 'lodash';

export const todos = 'todos';
export const isFetchingTodos = 'isFetchingTodos';
export const todoById = 'todoById';

export default {
  [todos]: state => state.todos,
  [todoById]: state => id => find(state.todos, todoItem => todoItem.id === id),
  [isFetchingTodos]: state => state.isFetchingTodos,
};
