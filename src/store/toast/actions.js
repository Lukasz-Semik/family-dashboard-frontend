import { setToastData, resetToastData } from './mutations';

export const showToast = 'showToast';
export const hideToast = 'hideToast';

export default {
  [showToast]: (
    { commit },
    { isTranslated = false, toastType = 'success', text = 'general.success' } = {}
  ) => {
    const commitPayload = {};

    if (isTranslated) commitPayload.translatedText = text;
    else commitPayload.translationPath = text;
    console.log(toastType);
    commit(setToastData, { ...commitPayload, toastType });

    setTimeout(() => commit(resetToastData), 5000);
  },
};
