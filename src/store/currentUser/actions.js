import { get, isEmpty } from 'lodash';

import { apiGetCurrentUser } from '@/api';

import { setCurrentUser } from './mutations';

export const getCurrentUser = 'getCurrentUser';

export default {
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
