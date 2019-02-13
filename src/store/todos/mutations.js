export const setTodos = 'setTodos';
export const setIsFetchingTodos = 'setIsFetchingTodos';

export default {
  [setTodos]: (state, { todos }) => {
    state.todos = todos;
  },
  [setIsFetchingTodos]: (state, { isFetching }) => {
    state.isFetching = isFetching;
  },
};
