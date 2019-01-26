<template>
  <Transition
    mode="out-in"
    :leave-active-class="$style['fade-leave-active']"
    :leave-to-class="$style['fade-leave-to']"
    :enter-active-class="$style['fade-enter-active']"
    :enter-class="$style['fade-enter']"
  >
    <button
      data-test="toast-element"
      v-if="isMessageVisible"
      :class="[$style['toast'], classNames]"
    >{{ translatedText || $t(translationPath) }}</button>
  </Transition>
</template>

<script>
import { mapGetters } from 'vuex';

import {
  isMessageVisible,
  translationPath,
  translatedText,
  toastType,
} from '@/store/toast/getters';

export default {
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    classNames() {
      const { $style, toastType: toast } = this;

      return {
        [$style['is-success']]: toast === 'success',
        [$style['is-error']]: toast === 'error',
      };
    },
    ...mapGetters({
      isMessageVisible,
      translationPath,
      translatedText,
      toastType,
    }),
  },
};
</script>

<style lang="scss" module src="./ToastElement.scss" />
