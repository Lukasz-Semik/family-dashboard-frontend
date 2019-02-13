import getters from './getters';

describe('todos getters', () => {
  const state = {
    todos: [
      {
        id: 1,
        title: 'todo-1',
        deadline: null,
        isDone: false,
      },
      {
        id: 2,
        title: 'todo-2',
        deadline: null,
        isDone: true,
      },
      {
        id: 3,
        title: 'todo-3',
        deadline: '2019-02-11T07:36:42.721Z',
        isDone: false,
      },
      {
        id: 4,
        title: 'todo-4',
        deadline: '2019-01-11T07:36:42.721Z',
        isDone: false,
      },
    ],
    isFetching: false,
  };

  it('should return todos', () => {
    expect(getters.todos(state)).toEqual(state.todos);
  });

  it('should return specific todo', () => {
    expect(getters.todoById(state)(2)).toEqual({
      id: 2,
      title: 'todo-2',
      deadline: null,
      isDone: true,
    });
  });

  it('should return sorted todos', () => {
    expect(getters.sortedTodos(state).map(todo => todo.id)).toEqual([4, 3, 1, 2]);
  });

  it('should return isFetching todos', () => {
    expect(getters.isFetchingTodos(state)).toBe(false);
  });
});
