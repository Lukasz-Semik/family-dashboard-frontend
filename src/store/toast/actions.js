import { setToastData, resetToastData } from './mutations';

export const showToast = 'showToast';
export const hideToast = 'hideToast';

export default {
  [showToast]: (
    { commit },
    { isTranslated = false, type = 'success', text = 'general.success' } = {}
  ) => {
    const commitPayload = {};

    if (isTranslated) commitPayload.translatedText = text;
    else commitPayload.translationPath = text;

    commit(setToastData, { ...commitPayload, type });

    setTimeout(() => commit(resetToastData), 6000);
  },
};
