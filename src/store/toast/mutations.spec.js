import { state } from '.';
import mutations, { setToastData, resetToastData } from './mutations';

describe('toast mutations', () => {
  describe(`${setToastData}`, () => {
    it('should properly change state with provided value', () => {
      mutations[setToastData](state, {
        translationPath: 'translation.path',
        toastType: 'success',
      });

      expect(state).toEqual({
        translatedText: '',
        translationPath: 'translation.path',
        toastType: 'success',
        isMessageVisible: true,
      });
    });
  });

  describe(`${resetToastData}`, () => {
    it('should properly change state with provided value', () => {
      mutations[resetToastData](state);

      expect(state).toEqual({
        translatedText: '',
        translationPath: '',
        toastType: '',
        isMessageVisible: false,
      });
    });
  });
});
