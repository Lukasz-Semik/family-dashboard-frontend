<template>
  <Component
    :is="tag"
    :class="[$style['title'], classNames]"
  >
    {{ translatedText || $t(translationPath) }}
  </Component>
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
    isOrange: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isUppercased: {
      type: Boolean,
      default: false,
    },
    isCentered: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const {
        $style, isOrange, isSmall, isUppercased, isCentered,
      } = this;

      return {
        [$style['is-orange']]: isOrange,
        [$style['is-small']]: isSmall,
        [$style['is-uppercased']]: isUppercased,
        [$style['is-centered']]: isCentered,
      };
    },
  },
};
</script>

<style lang="scss" module src="./Title.scss" />
