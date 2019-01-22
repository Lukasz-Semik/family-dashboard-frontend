<template>
  <p :class="[$style['error-msg']]">{{ translatedText || $t(translationPath) }}</p>
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
  },
};
</script>


<style lang="scss" module src="./ErrorMsg.scss" />
