<template>
  <Transition
    name="modal"
    :leave-active-class="$style['modal-leave-active']"
    :enter-class="$style['modal-enter']"
  >
    <div :class="[$style['modal-mask']]">
      <div :class="[$style['modal-wrapper']]">
        <div v-click-outside="onClose" :class="[$style['modal-inner-wrapper']]">
          <button :class="[$style['close-modal-button']]" @click="onClose">
            <img :src="closeIcon">
          </button>

          <div :class="[$style['modal-header']]">
            <TitleElement
              :translation-path="titleTranslationPath"
              :translated-text="titleTranslatedText"
              is-orange
            />
          </div>

          <div :class="[$style['modal-body']]">
            <slot name="body"/>
          </div>

          <div v-if="!isButtonHidden" :class="[$style['modal-footer']]">
            <ButtonElement
              :translation-path="buttonTranslationPath"
              :translated-text="buttonTranslatedText"
              has-blue-theme
              @onClick="handleMainButtonClick"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import ClickOutside from 'vue-click-outside';

import closeIconSrc from '@/assets/close.png';
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    TitleElement,
    ButtonElement,
  },
  directives: {
    ClickOutside,
  },
  props: {
    titleTranslationPath: {
      type: String,
      default: '',
    },
    titleTranslatedText: {
      type: String,
      default: '',
    },
    buttonTranslationPath: {
      type: String,
      default: '',
    },
    buttonTranslatedText: {
      type: String,
      default: '',
    },
    isButtonHidden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      closeIcon: closeIconSrc,
    };
  },
  created() {
    document.addEventListener('keyup', this.onKeyUp);
  },
  methods: {
    onClose() {
      this.$emit('onClose');
    },
    handleMainButtonClick() {
      this.$emit('onMainButtonClick');
      this.onClose();
    },
    onKeyUp(e) {
      if (e.key === 'Escape') {
        this.onClose();
      }
    },
  },
};
</script>

<style lang="scss" module src="./ModalElement.scss" />
