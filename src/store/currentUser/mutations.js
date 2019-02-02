export const setCurrentUser = 'setCurrentUser';
export const setIsFetchingUser = 'setIsFetchingUser';

export default {
  [setCurrentUser]: (state, { currentUser }) => {
    state.currentUser = { ...currentUser };
  },
  [setIsFetchingUser]: (state, { isFetching }) => {
    state.isFetching = isFetching;
  },
};
