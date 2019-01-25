<template>
  <button
    v-if="isMessageVisible"
    :class="[$style['toast'], classNames]"
  >{{ translatedText || $t(translationPath) }}</button>
</template>

<script>
import { mapGetters } from 'vuex';

import { isMessageVisible, translationPath, translatedText, type } from '@/store/toast/getters';

export default {
  updated() {
    console.log(this.isMessageVisible, this.translationPath);
  },
  watch: {
    isMessageVisible(newVal, oldVal) {
      if (newVal && !oldVal) {
        setTimeout(() => (this.isVisible = true), 1000);
      }
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      isMessageVisible,
      translationPath,
      translatedText,
      type,
    }),
    classNames() {
      const { $style, isVisible } = this;

      return {
        [$style['is-visible']]: isVisible,
      };
    },
  },
};
</script>

<style lang="scss" module src="./ToastElement.scss" />
