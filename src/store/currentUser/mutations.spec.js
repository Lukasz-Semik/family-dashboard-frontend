import { state } from '.';
import mutations from './mutations';

describe('currentUser mutations', () => {
  describe('setToastData mutation', () => {
    it('should properly change state with provided value', () => {
      mutations.setCurrentUser(state, {
        currentUser: { firstName: 'Lukasz' },
      });

      expect(state).toEqual({
        currentUser: { firstName: 'Lukasz' },
        isFetching: false,
      });
    });
  });

  describe('setIsFetchingUser mutation', () => {
    it('should properly change state with provided value', () => {
      mutations.setIsFetchingUser(state, { isFetching: true });

      expect(state).toEqual({
        currentUser: { firstName: 'Lukasz' },
        isFetching: true,
      });
    });
  });
});
