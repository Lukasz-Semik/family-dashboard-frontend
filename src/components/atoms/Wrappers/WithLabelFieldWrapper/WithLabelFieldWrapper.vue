<template>
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
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    isFocused: {
      type: Boolean,
      default: false,
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
      const { $style, isFocused, isHovered } = this;

      return {
        [$style['is-hovered-focused']]: isFocused || isHovered,
      };
    },
  },
};
</script>

<style lang="scss" module src="./WithLabelFieldWrapper.scss" />
