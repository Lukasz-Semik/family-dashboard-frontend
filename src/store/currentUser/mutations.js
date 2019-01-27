export const setCurrentUser = 'setCurrentUser';

export default {
  [setCurrentUser]: (state, { currentUser }) => {
    state.currentUser = { ...currentUser };
  },
};
