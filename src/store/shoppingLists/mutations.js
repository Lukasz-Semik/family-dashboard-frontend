export const setShoppingLists = 'setShoppingLists';

export default {
  [setShoppingLists]: (state, { shoppingLists }) => {
    state.shoppingLists = shoppingLists;
  },
};
