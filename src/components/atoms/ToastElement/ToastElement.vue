<template>
  <transition
    mode="out-in"
    :leave-active-class="$style['fade-leave-active']"
    :leave-to-class="$style['fade-leave-to']"
    :enter-active-class="$style['fade-enter-active']"
    :enter-class="$style['fade-enter']"
  >
    <button
      v-if="isMessageVisible"
      :class="[$style['toast'], classNames]"
    >{{ translatedText || $t(translationPath) }}</button>
  </transition>
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
      const { $style, toastType } = this;

      return {
        [$style['is-success']]: toastType === 'success',
        [$style['is-error']]: toastType === 'error',
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
