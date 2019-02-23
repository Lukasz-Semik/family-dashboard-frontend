import { isEmpty, find, sortBy } from 'lodash';

export const shoppingLists = 'shoppingLists';
export const sortedShoppingLists = 'sortedShoppingLists';
export const isFetchingShoppingLists = 'isFetchingShoppingLists';
export const shoppingListById = 'shoppingListById';

export default {
  [shoppingLists]: state => state.shoppingLists,
  [shoppingListById]: state => id =>
    find(state.shoppingLists, shoppingList => shoppingList.id === id),
  [sortedShoppingLists]: state => [
    ...sortBy(
      state.shoppingLists.filter(todo => !isEmpty(todo.deadline) && !todo.isDone),
      todo => todo.deadline
    ),
    ...state.shoppingLists.filter(todo => isEmpty(todo.deadline) && !todo.isDone),
    ...state.shoppingLists.filter(todo => todo.isDone),
  ],
  [isFetchingShoppingLists]: state => state.isFetching,
};
