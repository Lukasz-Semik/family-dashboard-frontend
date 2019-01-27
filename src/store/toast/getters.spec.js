import getters, { isMessageVisible, translationPath, translatedText, toastType } from './getters';

/* eslint-disable import/no-named-as-default-member */
describe('toast getters', () => {
  const state = {
    isMessageVisible: true,
    translationPath: 'translation.path',
    translatedText: '',
    toastType: 'error',
  };

  it('should return isMessageVisible', () => {
    expect(getters[isMessageVisible](state)).toBe(true);
  });

  it('should return translationPath', () => {
    expect(getters[translationPath](state)).toBe('translation.path');
  });

  it('should return translatedText', () => {
    expect(getters[translatedText](state)).toBe('');
  });

  it('should return toastType', () => {
    expect(getters[toastType](state)).toBe('error');
  });
});

/* eslint-enable */
