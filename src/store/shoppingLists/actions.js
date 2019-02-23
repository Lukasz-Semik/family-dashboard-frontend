import { get } from 'lodash';

import { apiGetShoppingLists } from '@/api';

import { setShoppingLists } from './mutations';

export const getShoppingLists = 'getShoppingLists';

export default {
  [getShoppingLists]: async ({ commit }) => {
    const response = await apiGetShoppingLists();
    console.log({ response });
    commit(setShoppingLists, { shoppingLists: get(response, 'data.shoppingLists', []) });

    return response;
  },
};
