<template>
  <div>
    <div
      :class="[$style['field-wrapper']]"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <label
        data-test="label"
        :for="name"
        :class="[$style['label'], stateClassNames]"
      >
        {{ labelTranslatedText || $t(labelTranslationPath) }}
      </label>

      <slot />

      <div :class="[$style['border']]" />
      <!-- eslint-disable max-len -->
      <div :class="[$style['border'], $style['border-hover-focus-indicator'], stateClassNames]" />
      <!-- esling-enalbe -->
    </div>

    <ErrorMsg
      v-if="Boolean(errorMsg)"
      :translation-path="errorMsg"
      :msg-values="errorMsgValues"
    />
  </div>
</template>

<script>
import ErrorMsg from '@/components/atoms/ErrorMsg/ErrorMsg.vue';

export default {
  components: {
    ErrorMsg,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    isFocused: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: '',
    },
    errorMsgValues: {
      type: Object,
      default: () => {},
    },
    labelTranslatedText: {
      type: String,
      default: '',
    },
    labelTranslationPath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  computed: {
    stateClassNames() {
      const {
        $style, isFocused, isHovered, errorMsg
      } = this;

      return {
        [$style['is-hovered-focused']]: isFocused || isHovered,
        [$style['has-error']]: Boolean(errorMsg),
      };
    },
  },
};
</script>

<style lang="scss" module src="./FieldControl.scss" />
