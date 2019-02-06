import moxios from 'moxios';

import { state as defaultState } from '.';
import { setIsFetchingUser, setCurrentUser } from './mutations';
import actions from './actions';

describe('toast actions', () => {
  const commit = jest.fn();
  const state = {
    ...defaultState,
  };

  describe('showToast action', () => {
    it(`should commit ${setCurrentUser} mutation properly with only text provided`, async () => {
      moxios.stubRequest('/say/hello', {
        status: 200,
        data: { firstName: 'John' },
      });

      await actions.getCurrentUser({ commit, state });

      expect(commit).toHaveBeenCalledWith(setIsFetchingUser, {
        isFetching: false,
      });
    });
  });
});
