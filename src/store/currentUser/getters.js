export const currentUser = 'currentUser';
export const isFetchingCurrentUser = 'isFetchingCurrentUser';

export default {
  [currentUser]: state => state.currentUser,
  [isFetchingCurrentUser]: state => state.isFetching,
};
