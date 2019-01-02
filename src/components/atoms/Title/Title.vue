<template>
  <h1 :class="[$style.title]">{{ translatedText || $t(translationPath) }}</h1>
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
  },
};
</script>

<style lang="scss" module src="./Title.scss" />
