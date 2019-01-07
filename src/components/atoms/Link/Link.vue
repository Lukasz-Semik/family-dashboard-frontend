<template>
  <RouterLink
    :to="to"
    :class="[$style['link']]"
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
  },
  data() {
    return {
      isFocused: false,
      isHovered: false,
    };
  },
};
</script>

<style lang="scss" module src="./Link.scss" />
