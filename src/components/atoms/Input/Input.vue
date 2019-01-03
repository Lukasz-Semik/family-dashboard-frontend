<template>
  <div :class="[$style['input-wrapper']]">
    <label
      :for="name"
      :class="[$style['label'], innerStateClassNames]"
    >{{ labelTranslatedText || $t(labelTranslationPath) }}</label>
    <input
      :class="[$style['input'], inputClassNames]"
      :name="name"
      :id="name"
      :value="value"
      :type="type"
      :placeholder="translatedPlaceholder"
      @input="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
    <div :class="[$style['input-border']]"/>
    <div
      :class="[$style['input-border'], $style['input-border-focus-indicator'], innerStateClassNames]"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFocused: false,
      isHovered: false,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholderTranslatedText: {
      type: String,
      default: '',
    },
    placeholderTranslationPath: {
      type: String,
      default: '',
    },
    labelTranslatedText: {
      type: String,
      default: '',
    },
    labelTranslationPath: {
      type: String,
      default: '',
    },
    hasCenteredText: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange(event) {
      const { value } = event.target;

      this.$emit('onChange', {
        value,
        name: this.name,
      });
    },
  },
  computed: {
    innerStateClassNames() {
      const { $style, isFocused, isHovered } = this;

      return {
        [$style['is-focused']]: isFocused || isHovered,
      };
    },
    inputClassNames() {
      const { $style, hasCenteredText } = this;

      return {
        [$style['is-centered']]: hasCenteredText,
      };
    },
    translatedPlaceholder() {
      const { placeholderTranslatedText, placeholderTranslationPath } = this;

      return placeholderTranslatedText || this.$t(placeholderTranslationPath);
    },
  },
};
</script>

<style lang="scss" module src="./Input.scss" />
