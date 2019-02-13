import { isEmpty, find, sortBy } from 'lodash';

export const todos = 'todos';
export const sortedTodos = 'sortedTodos';
export const isFetchingTodos = 'isFetchingTodos';
export const todoById = 'todoById';

export default {
  [todos]: state => state.todos,
  [todoById]: state => id => find(state.todos, todoItem => todoItem.id === id),
  [sortedTodos]: state => [
    ...sortBy(
      state.todos.filter(todo => !isEmpty(todo.deadline) && !todo.isDone),
      todo => todo.deadline
    ),
    ...state.todos.filter(todo => isEmpty(todo.deadline)),
    ...state.todos.filter(todo => todo.isDone),
  ],
  [isFetchingTodos]: state => state.isFetchingTodos,
};
