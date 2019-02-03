<template>
  <Component
    :is="tag"
    :class="[$style['title'], classNames]"
  >{{ translatedText || $t(translationPath, translationValues) }}</Component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'h1',
    },
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
    isOrange: {
      type: Boolean,
      default: false,
    },
    isBlack: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isBig: {
      type: Boolean,
      default: false,
    },
    isUppercased: {
      type: Boolean,
      default: false,
    },
    hasCenteredText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const { $style, isOrange, isBlack, isSmall, isBig, isUppercased, hasCenteredText } = this;

      return {
        [$style['is-black']]: isBlack,
        [$style['is-orange']]: isOrange,
        [$style['is-small']]: isSmall,
        [$style['is-big']]: isBig,
        [$style['is-uppercased']]: isUppercased,
        [$style['has-centered-text']]: hasCenteredText,
      };
    },
  },
};
</script>

<style lang="scss" module src="./TitleElement.scss" />
