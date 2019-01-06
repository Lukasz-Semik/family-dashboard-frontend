export const setIsSignedIn = 'setIsSignedIn';

export default {
  [setIsSignedIn]: (state, { isAuthorized }) => {
    state.isSignedIn = isAuthorized;
  },
};
