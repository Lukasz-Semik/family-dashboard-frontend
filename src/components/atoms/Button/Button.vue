<template>
  <button
    :type="type"
    :class="[$style.button, classNames]"
    :onClick="handleClick"
  >
    {{ translatedText || $t(translationPath) }}
  </button>
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
    hasBlueTheme: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const { $style, hasBlueTheme } = this;

      return {
        [$style['has-blue-theme']]: hasBlueTheme,
      };
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
