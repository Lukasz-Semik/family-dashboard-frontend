export const setToastData = 'setToastData';
export const resetToastData = 'resetToastData';

export default {
  [setToastData]: (state, { translatedText, translationPath, type }) => {
    state.translatedText = translatedText;
    state.translationPath = translationPath;
    state.type = type;
    state.isMessageVisible = true;
  },
  [resetToastData]: state => {
    state.isMessageVisible = false;
    state.translationPath = '';
    state.translatedText = '';
    state.type = '';
  },
};
