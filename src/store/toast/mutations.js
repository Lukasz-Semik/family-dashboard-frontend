export const setToastData = 'setToastData';
export const resetToastData = 'resetToastData';

export default {
  [setToastData]: (state, { translatedText, translationPath, toastType }) => {
    state.translatedText = translatedText || '';
    state.translationPath = translationPath || '';
    state.toastType = toastType;
    state.isMessageVisible = true;
  },
  [resetToastData]: state => {
    state.isMessageVisible = false;
    state.translationPath = '';
    state.translatedText = '';
    state.toastType = '';
  },
};
