import { state as defaultState } from '.';
import { setToastData } from './mutations';
import actions from './actions';

describe('toast actions', () => {
  const commit = jest.fn();
  const state = {
    ...defaultState,
  };

  describe('showToast action', () => {
    it(`should commit ${setToastData} mutation properly with only text provided`, () => {
      actions.showToast({ commit, state }, { text: 'translation.path' });

      expect(commit).toHaveBeenCalledWith(setToastData, {
        translationPath: 'translation.path',
        toastType: 'success',
      });
    });

    it(`should commit ${setToastData} mutation properly with provided args`, () => {
      actions.showToast(
        { commit, state },
        { text: 'translated-text', isTranslated: true, toastType: 'error' }
      );

      expect(commit).toHaveBeenCalledWith(setToastData, {
        translatedText: 'translated-text',
        toastType: 'error',
      });
    });
  });
});
