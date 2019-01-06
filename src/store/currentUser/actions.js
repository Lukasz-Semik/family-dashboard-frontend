import { get } from 'lodash';

import { api } from '@/api';
import { API_SIGN_IN } from '@/constants/api';

export const signIn = 'signIn';

export default {
  [signIn]: async ({ commit }, { email, password }) => {
    try {
      const response = await api.post(API_SIGN_IN, {
        email,
        password,
      });

      if (get(response, 'status') === 200) {
        return {
          isAuthorized: true,
        };
      }
    } catch (error) {
      return {
        isAuthorized: false,
        error,
      };
    }
  },
};
