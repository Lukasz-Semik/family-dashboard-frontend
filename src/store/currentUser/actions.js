import { get } from 'lodash';

import { apiGetCurrentUser } from '@/api';

import { setCurrentUser, setIsFetching } from './mutations';

export const getCurrentUser = 'getCurrentUser';

export default {
  [getCurrentUser]: async ({ commit }) => {
    commit(setIsFetching, { isFetching: true });
    const response = await apiGetCurrentUser();
    const currentUser = get(response, 'data.currentUser', {});

    commit(setCurrentUser, { currentUser });
    commit(setIsFetching, { isFetching: false });
  },
};
