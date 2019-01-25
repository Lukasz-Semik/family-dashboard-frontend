<template>
  <p :class="[$style['error-msg']]">
    {{ translatedText || $t(translationPath, msgValues) }}
  </p>
</template>

<script>
export default {
  props: {
    translationPath: {
      type: String,
      default: '',
    },
    translatedText: {
      type: String,
      default: '',
    },
    msgValues: {
      type: Object,
      default: () => {},
    },
  },
};
</script>


<style lang="scss" module src="./ErrorMsg.scss" />
