import { state } from '.';
import mutations from './mutations';

describe('todos mutations', () => {
  describe('setTodos mutation', () => {
    it('should properly change state with provided value', () => {
      mutations.setTodos(state, {
        todos: [{ title: 'todo-example' }],
      });

      expect(state).toEqual({
        todos: [{ title: 'todo-example' }],
        isFetching: false,
      });
    });
  });

  describe('setIsFetchingTodos mutation', () => {
    it('should properly change state with provided value', () => {
      mutations.setIsFetchingTodos(state, { isFetching: true });

      expect(state).toEqual({
        todos: [{ title: 'todo-example' }],
        isFetching: true,
      });
    });
  });
});
