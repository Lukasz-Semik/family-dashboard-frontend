import getters from './getters';

describe('currentUser getters', () => {
  const state = {
    currentUser: { firstName: 'John' },
    isFetching: false,
  };

  it('should return isMessageVisible', () => {
    expect(getters.currentUser(state)).toEqual({ firstName: 'John' });
  });

  it('should return translationPath', () => {
    expect(getters.isFetchingCurrentUser(state)).toBe(false);
  });
});
