import { get } from 'lodash';

import { api } from '@/api';
import { API_SIGN_IN } from '@/constants/api';

import { setIsSignedIn } from './mutations';

export const signIn = 'signIn';

export default {
  [signIn]: async ({ commit }, { email, password }) => {
    try {
      const response = await api.post(API_SIGN_IN, {
        email,
        password,
      });

      const isAuthorized = get(response, 'status') === 200;

      if (isAuthorized) commit(setIsSignedIn, { isAuthorized });

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
};
