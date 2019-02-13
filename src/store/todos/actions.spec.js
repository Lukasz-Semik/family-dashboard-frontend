import moxios from 'moxios';

import { state as defaultState } from '.';
import { setTodos, setIsFetchingTodos } from './mutations';
import actions from './actions';

describe('toast actions', () => {
  const commit = jest.fn();
  const state = {
    ...defaultState,
  };

  describe('showToast action', () => {
    it(`should commit ${setTodos} mutation properly with only text provided`, async () => {
      moxios.stubRequest('/say/hello', {
        status: 200,
        data: { firstName: 'John' },
      });

      await actions.getTodos({ commit, state });

      expect(commit).toHaveBeenCalledWith(setIsFetchingTodos, {
        isFetching: false,
      });
    });
  });
});
