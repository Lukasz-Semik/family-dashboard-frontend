import { isEmpty, find, sortBy } from 'lodash';

export const shoppingLists = 'shoppingLists';
export const sortedShoppingLists = 'sortedShoppingLists';
export const isFetchingShoppingLists = 'isFetchingShoppingLists';
export const shoppingListById = 'shoppingListById';
export const shoppingListItems = 'shoppingListItems';

export default {
  [shoppingLists]: state => state.shoppingLists,
  [shoppingListById]: state => id =>
    find(state.shoppingLists, shoppingList => shoppingList.id === id),
  [sortedShoppingLists]: state => [
    ...sortBy(
      state.shoppingLists.filter(
        shoppingList => !isEmpty(shoppingList.deadline) && !shoppingList.isDone
      ),
      shoppingList => shoppingList.deadline
    ),
    ...state.shoppingLists.filter(
      shoppingList => isEmpty(shoppingList.deadline) && !shoppingList.isDone
    ),
    ...state.shoppingLists.filter(shoppingList => shoppingList.isDone),
  ],
  [isFetchingShoppingLists]: state => state.isFetching,
};
