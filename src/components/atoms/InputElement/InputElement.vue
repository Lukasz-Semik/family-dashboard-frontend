<template>
  <WithLabelFieldWrapper
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
    :is-focused="isFocused"
  >
    <input
      :id="name"
      data-test="input"
      :class="[$style['input'], inputClassNames]"
      :name="name"
      :type="type"
      :value="value"
      :placeholder="placeholderTranslatedText || this.$t(placeholderTranslationPath)"
      @input="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
  </WithLabelFieldWrapper>
</template>

<script>
import WithLabelFieldWrapper from '@/components/atoms/Wrappers/WithLabelFieldWrapper/WithLabelFieldWrapper.vue';

export default {
  components: {
    WithLabelFieldWrapper,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholderTranslatedText: {
      type: String,
      default: '',
    },
    placeholderTranslationPath: {
      type: String,
      default: '',
    },
    labelTranslatedText: {
      type: String,
      default: '',
    },
    labelTranslationPath: {
      type: String,
      default: '',
    },
    hasCenteredText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    inputClassNames() {
      const { $style, hasCenteredText } = this;

      return {
        [$style['is-centered']]: hasCenteredText,
      };
    },
  },
  methods: {
    handleChange(event) {
      const { value } = event.target;

      this.$emit('onChange', {
        value,
        name: this.name,
      });
    },
  },
};
</script>

<style lang="scss" module src="./InputElement.scss" />
