import { setToastData, resetToastData } from './mutations';

export const showToast = 'showToast';

export default {
  [showToast]: (
    { commit },
    { isTranslated = false, toastType = 'success', text = 'general.success' } = {}
  ) => {
    const commitPayload = {};

    if (isTranslated) commitPayload.translatedText = text;
    else commitPayload.translationPath = text;

    commit(setToastData, { ...commitPayload, toastType });

    setTimeout(() => commit(resetToastData), 3000);
  },
};
