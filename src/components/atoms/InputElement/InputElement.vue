<template>
  <FieldControl
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
    :is-focused="isFocused"
    :error-msg="errorMsg"
    :error-msg-values="{msg : errorTranslationValues}"
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
    isRequired: {
      type: Boolean,
      default: false,
    },
    isEmailRequired: {
      type: Boolean,
      default: false,
    },
    minLengthRequired: {
      type: Number,
    },
    maxLengthRequired: {
      type: Number,
    },
    isSubmissionFailed: {
      type: Boolean,
      default: false,
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
  created() {
    const { isValid } = validate(this.value, this.validationOptions);
    this.isValid = isValid;

    this.emitOnChange(this.value);
  },
  data() {
    return {
      isFocused: false,
      isValid: true,
      errorMsg: '',
      errorTranslationValues: '',
    };
  },
  computed: {
    inputClassNames() {
      const { $style, hasCenteredText } = this;

      return {
        [$style['is-centered']]: hasCenteredText,
      };
    },
    validationOptions() {
      return {
        isRequired: this.isRequired,
        isEmailRequired: this.isEmailRequired,
        minLengthRequired: this.minLengthRequired,
        maxLengthRequired: this.maxLengthRequired,
      };
    },
  },
  watch: {
    isSubmissionFailed(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.handleValidate(this.value);
      }
    },
  },
  methods: {
    handleValidate(value) {
      const { isValid, errorMsg, errorTranslationValues } = validate(value, this.validationOptions);

      this.isValid = isValid;
      this.errorMsg = errorMsg;
      this.errorTranslationValues = errorTranslationValues;
    },
    handleChange(event) {
      const { value } = event.target;
      this.handleValidate(value);
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
