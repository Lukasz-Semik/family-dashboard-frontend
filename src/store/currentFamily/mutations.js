export const setCurrentFamily = 'setCurrentFamily';
export const setIsFetchingFamily = 'setIsFetchingFamily';

export default {
  [setCurrentFamily]: (state, { currentFamily }) => {
    state.currentFamily = { ...currentFamily };
  },
  [setIsFetchingFamily]: (state, { isFetching }) => {
    state.isFetching = isFetching;
  },
};
