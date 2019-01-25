export const setToastData = 'setToastData';

export default {
  [setToastData]: (state, { translatedText, translationPath, type }) => {
    state.translatedText = translatedText;
    state.translationPath = translationPath;
    state.type = type;
    state.isMessageVisible = true;
  },
};
