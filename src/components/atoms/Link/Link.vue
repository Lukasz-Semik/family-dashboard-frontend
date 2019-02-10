<template>
  <RouterLink
    :to="to"
    :class="[$style['link'], classNames]"
    :exact-active-class="$style['is-active']"
  >{{ translatedText || $t(translationPath) }}</RouterLink>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      required: true,
    },
    translatedText: {
      type: String,
      default: '',
    },
    translationPath: {
      type: String,
      default: '',
    },
    isGray: {
      type: Boolean,
      default: false,
    },
    isBlack: {
      type: Boolean,
      default: false,
    },
    isXBig: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocused: false,
      isHovered: false,
    };
  },
  computed: {
    classNames() {
      const { $style, isGray, isBlack, isXBig } = this;

      return {
        [$style['is-gray']]: isGray,
        [$style['is-black']]: isBlack,
        [$style['is-x-big']]: isXBig,
      };
    },
  },
};
</script>

<style lang="scss" module src="./Link.scss" />
