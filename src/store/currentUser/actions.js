import { get } from 'lodash';

import { apiGetCurrentUser } from '@/api';

import { setCurrentUser, setIsFetchingUser } from './mutations';

export const getCurrentUser = 'getCurrentUser';

export default {
  [getCurrentUser]: async ({ commit }) => {
    commit(setIsFetchingUser, { isFetching: true });
    const response = await apiGetCurrentUser();
    const currentUser = get(response, 'data.currentUser', {});

    commit(setCurrentUser, { currentUser });
    commit(setIsFetchingUser, { isFetching: false });

    return currentUser;
  },
};
