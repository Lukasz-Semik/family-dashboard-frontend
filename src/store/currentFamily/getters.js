export const currentFamily = 'currentFamily';
export const isFetchingCurrentFamily = 'isFetchingCurrentFamily';

export default {
  [currentFamily]: state => state.currentFamily,
  [isFetchingCurrentFamily]: state => state.isFetching,
};
