import { get } from 'lodash';

import { apiCreateFamily } from '@/api';

import { setCurrentFamily, setIsFetchingFamily } from './mutations';

export const createFamily = 'createFamily';

export default {
  [createFamily]: async ({ commit }, { currentFamilyName }) => {
    commit(setIsFetchingFamily, { isFetching: true });

    const response = await apiCreateFamily(currentFamilyName);

    if (get(response, 'status') === 200) {
      commit(setCurrentFamily, { currentFamily: get(response, 'data.family', {}) });
    }

    commit(setIsFetchingFamily, { isFetching: true });
  },
};
