<template>
  <router-link :to="to" :class="[$style['link']]">{{ translatedText || $t(translationPath)}}</router-link>
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
};
</script>

<style lang="scss" module src="./Link.scss" />
