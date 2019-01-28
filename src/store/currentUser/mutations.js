export const setCurrentUser = 'setCurrentUser';
export const setIsFetching = 'setIsFetching';

export default {
  [setCurrentUser]: (state, { currentUser }) => {
    state.currentUser = { ...currentUser };
  },
  [setIsFetching]: (state, { isFetching }) => {
    state.isFetching = isFetching;
  },
};
