import { state } from '.';
import mutations from './mutations';

describe('toast mutations', () => {
  describe('setToastData mutation', () => {
    it('should properly change state with provided value', () => {
      mutations.setToastData(state, {
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

  describe('resetToastData mutation', () => {
    it('should properly change state with provided value', () => {
      mutations.resetToastData(state);

      expect(state).toEqual({
        translatedText: '',
        translationPath: '',
        toastType: '',
        isMessageVisible: false,
      });
    });
  });
});
