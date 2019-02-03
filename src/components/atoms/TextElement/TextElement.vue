<template>
  <p
    data-test="text-element"
    :class="[$style['text'], classNames]"
  >
    {{ translatedText || $t(translationPath, translationValues) }}
  </p>
</template>

<script>
export default {
  props: {
    translatedText: {
      type: String,
      default: '',
    },
    translationPath: {
      type: String,
      default: '',
    },
    translationValues: {
      type: Object,
      default: () => {},
    },
    hasCenteredText: {
      type: Boolean,
      default: false,
    },
    isMedium: {
      type: Boolean,
      default: false,
    },
    isBold: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const { $style, hasCenteredText, isMedium, isBold } = this;

      return {
        [$style['has-centered-text']]: hasCenteredText,
        [$style['is-medium']]: isMedium,
        [$style['is-bold']]: isBold,
      };
    },
  },
};
</script>

<style lang="scss" module src="./TextElement.scss" />
