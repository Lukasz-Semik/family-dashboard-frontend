<template>
  <RouterLink
    :to="to"
    :class="[$style['link'], classNames]"
    :exact-active-class="$style['is-active']"
  >
    {{ translatedText || $t(translationPath) }}
  </RouterLink>
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
    isBlack: {
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
      const { $style, isBlack } = this;

      return {
        [$style['is-black']]: isBlack,
      };
    },
  },
};
</script>

<style lang="scss" module src="./Link.scss" />
