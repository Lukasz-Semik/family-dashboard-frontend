import { get } from 'lodash';

import { apiGetFamily } from '@/api';

import { setCurrentFamily, setIsFetchingFamily } from './mutations';

export const getFamily = 'getFamily';

export default {
  [getFamily]: async ({ commit }) => {
    commit(setIsFetchingFamily, { isFetching: true });

    const response = await apiGetFamily();

    commit(setCurrentFamily, { currentFamily: get(response, 'data.family', {}) });
    commit(setIsFetchingFamily, { isFetching: true });

    return response;
  },
};
