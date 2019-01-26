export const isMessageVisible = 'isMessageVisible';
export const translationPath = 'translationPath';
export const translatedText = 'translatedText';
export const toastType = 'toastType';

export default {
  [isMessageVisible]: state => state.isMessageVisible,
  [translationPath]: state => state.translationPath,
  [translatedText]: state => state.translatedText,
  [toastType]: state => state.toastType,
};
