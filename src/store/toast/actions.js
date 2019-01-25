import { setToastData } from './mutations';

export const showToast = 'showToast';

export default {
  [showToast]: (
    { commit },
    // eslint-disable-next-line comma-dangle
    { isTranslated = false, type = 'success', text = 'notifications.success' }
  ) => {
    const commitPayload = {};

    if (isTranslated) commitPayload.translatedText = text;
    else commitPayload.translationPath = text;

    commit(setToastData, { ...commitPayload, type });
  },
};

// async ({ commit }, { email, password }) => {
