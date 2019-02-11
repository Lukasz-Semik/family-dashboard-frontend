<template>
  <transition
    name="modal"
    :leave-active-class="$style['modal-leave-active']"
    :enter-class="$style['modal-enter']"
  >
    <div :class="[$style['modal-mask']]">
      <div :class="[$style['modal-wrapper']]">
        <div :class="[$style['modal-inner-wrapper']]">
          <div :class="[$style['modal-header']]">
            <TitleElement
              :translationPath="titleTranslationPath"
              :translatedText="titleTranslatedText"
              is-orange
            />
          </div>

          <div :class="[$style['modal-body']]">
            <slot name="body"></slot>
          </div>

          <div v-if="!isButtonHidden" :class="[$style['modal-footer']]">
            <ButtonElement
              @onClick="$emit('onClose')"
              :translationPath="buttonTranslationPath"
              :translatedText="buttonTranslatedText"
              has-blue-theme
            />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TitleElement from '@/components/atoms/TitleElement/TitleElement.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    TitleElement,
    ButtonElement,
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
};
</script>

<style lang="scss" module src="./ModalElement.scss" />
