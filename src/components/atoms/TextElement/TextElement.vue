<template>
  <p
    :class="[$style['text'], classNames]"
  >{{ translatedText || $t(translationPath, translationValues) }}</p>
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
    translationValues: {
      type: Object,
      default: () => {},
    },
    hasCenteredText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classNames() {
      const { $style, hasCenteredText } = this;
      console.log(hasCenteredText);
      return {
        [$style['has-centered-text']]: hasCenteredText,
      };
    },
  },
};
</script>

<style lang="scss" module src="./TextElement.scss" />
