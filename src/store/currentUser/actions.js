import { get, isEmpty } from 'lodash';

import { apiSignIn, apiGetCurrentUser } from '@/api';
import { setLocalStorageItem } from '@/utils/localStorage';

import { setIsSignedIn, setCurrentUser } from './mutations';

export const signIn = 'signIn';
export const checkIsSignedIn = 'checkIsSignedIn';
export const getCurrentUser = 'getCurrentUser';

export default {
  [signIn]: async ({ commit }, { email, password }) => {
    try {
      const response = await apiSignIn(email, password);

      const isAuthorized = get(response, 'status') === 200;

      if (isAuthorized) {
        commit(setIsSignedIn, { isAuthorized });
        setLocalStorageItem('_token', get(response.data, 'token'));
      }

      return {
        isAuthorized,
      };
    } catch (error) {
      return {
        isAuthorized: false,
        error,
      };
    }
  },
  [getCurrentUser]: async ({ commit }) => {
    const response = await apiGetCurrentUser();
    const currentUser = get(response, 'data.currentUser');

    if (!isEmpty(currentUser)) {
      commit(setCurrentUser, { currentUser });
    } else {
      commit(setCurrentUser, { currentUser: {} });
    }
  },
};
