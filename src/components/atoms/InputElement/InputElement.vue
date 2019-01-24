<template>
  <FieldControl
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
    :is-focused="isFocused"
    :error-msg="errorMsg"
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
      @blur="onBlur"
    >
  </FieldControl>
</template>

<script>
import { isEmpty } from 'lodash';

import { validate } from '@/helpers/validators';
import FieldControl from '@/components/molecules/FieldControl/FieldControl.vue';

export default {
  components: {
    FieldControl,
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
      isValid: true,
      errorMsg: '',
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
  created() {
    const { isValid } = validate(this.value, { isRequired: true });
    this.isValid = isValid;

    this.emitOnChange(this.value);
  },
  methods: {
    handleChange(event) {
      const { value } = event.target;

      const { isValid, errorMsg } = validate(value, { isRequired: true });

      this.isValid = isValid;
      this.errorMsg = errorMsg;

      this.emitOnChange(value);
    },
    onBlur(event) {
      this.isFocused = false;
      this.handleChange(event);
    },
    emitOnChange(value) {
      this.$emit('onChange', {
        value,
        name: this.name,
        isValid: this.isValid,
      });
    },
  },
};
</script>

<style lang="scss" module src="./InputElement.scss" />
