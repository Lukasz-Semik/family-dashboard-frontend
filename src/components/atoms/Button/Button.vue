<template>
  <button
    :type="type"
    :class="[$style.button]"
    :onClick="handleClick"
  >{{ translatedText || $t(translationPath) }}</button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
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
  methods: {
    handleClick(event) {
      this.$emit('onClick', event);
    },
  },
};
</script>

<style lang="scss" module src="./Button.scss" />
