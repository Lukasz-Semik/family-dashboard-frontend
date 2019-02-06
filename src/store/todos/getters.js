export const todos = 'todos';
export const isFetchingTodos = 'isFetchingTodos';

export default {
  [todos]: state => state.todos,
  [isFetchingTodos]: state => state.isFetchingTodos,
};
