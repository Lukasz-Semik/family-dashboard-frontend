import { get, isEmpty } from 'lodash';

import { api } from '@/api';
import { API_SIGN_IN, API_CHECK_IS_SIGNED_IN } from '@/constants/api';
import { setLocalStorageItem, getLocalStorageItem } from '@/utils/localStorage';

import { setIsSignedIn } from './mutations';

export const signIn = 'signIn';
export const checkIsSignedIn = 'checkIsSignedIn';

export default {
  [signIn]: async ({ commit }, { email, password }) => {
    try {
      const response = await api.post(API_SIGN_IN, {
        email,
        password,
      });

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
  [checkIsSignedIn]: async ({ commit }) => {
    const token = getLocalStorageItem('_token');

    if (isEmpty(token)) {
      commit(setIsSignedIn, { isAuthorized: false });

      return false;
    }

    try {
      const response = await api.get(API_CHECK_IS_SIGNED_IN, {
        headers: {
          authorization: token,
        },
      });

      if (get(response, 'status') === 200 && get(response, 'data.isAuthorized')) {
        commit(setIsSignedIn, { isAuthorized: true });
        return true;
      }
    } catch (error) {
      commit(setIsSignedIn, { isAuthorized: false });
      return false;
    }

    return false;
  },
};
