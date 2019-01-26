export const isMessageVisible = 'isMessageVisible';
export const translationPath = 'translationPath';
export const translatedText = 'translatedText';
export const type = 'type';

export default {
  [isMessageVisible]: state => state.isMessageVisible,
  [translationPath]: state => state.translationPath,
  [translatedText]: state => state.translatedText,
  [type]: state => state.type,
};
