<template>
  <button
    data-test="button"
    :type="type"
    :class="[$style.button, classNames]"
    @click="handleClick"
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
    hasBlueTheme: {
      type: Boolean,
      default: false,
    },
    hasGrayTheme: {
      type: Boolean,
      default: false,
    },
    hasPreviousTheme: {
      type: Boolean,
      default: false,
    },
    isInline: {
      type: Boolean,
      default: false,
    },
    isHoveredRed: {
      type: Boolean,
      default: false,
    },
    isHoveredGreen: {
      type: Boolean,
      default: false,
    },
    isSmall: {
      type: Boolean,
      default: false,
    },
    isArrowHidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const {
        $style,
        hasBlueTheme,
        hasPreviousTheme,
        hasGrayTheme,
        isInline,
        isHoveredRed,
        isHoveredGreen,
        isSmall,
        isArrowHidden,
      } = this;

      return {
        [$style['has-blue-theme']]: hasBlueTheme,
        [$style['has-previous-theme']]: hasPreviousTheme,
        [$style['has-gray-theme']]: hasGrayTheme,
        [$style['is-inline']]: isInline,
        [$style['is-hovered-red']]: isHoveredRed,
        [$style['is-hovered-green']]: isHoveredGreen,
        [$style['is-small']]: isSmall,
        [$style['is-arrow-hidden']]: isArrowHidden,
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

<style lang="scss" module src="./ButtonElement.scss" />
