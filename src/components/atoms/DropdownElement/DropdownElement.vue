<template>
  <FieldControl
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
    :is-focused="isFocused"
    :error-msg="isPristine ? '' : errorMsg"
  >
    <div :class="inputClassNames">
      <DropdownElement
        v-model="selected"
        :options="preparedOptions"
        :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
        @input="handleChange"
        @open="isFocused = true"
        @close="onClose"
      />
    </div>
  </FieldControl>
</template>

<script>
import DropdownElement from 'vue-multiselect';
import { find, get, isEmpty } from 'lodash';

import { validate } from '@/helpers/validators';
import FieldControl from '@/components/molecules/FieldControl/FieldControl.vue';

export default {
  components: {
    DropdownElement,
    FieldControl,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    isSubmissionFailed: {
      type: Boolean,
      default: false,
    },
    labelTranslatedText: {
      type: String,
      default: '',
    },
    labelTranslationPath: {
      type: String,
      default: '',
    },
    placeholderTranslatedText: {
      type: String,
      default: '',
    },
    placeholderTranslationPath: {
      type: String,
      default: '',
    },
    hasCenteredText: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: null,
      isFocused: false,
      isValid: false,
      errorMsg: '',
      isPristine: true,
    };
  },
  computed: {
    preparedOptions() {
      return this.options.map(item => this.$t(item.label));
    },
    inputClassNames() {
      return this.hasCenteredText ? 'has-centered-text' : '';
    },
  },
  watch: {
    isSubmissionFailed(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.isPristine = false;
        this.handleValidate(this.value);
      }
    },
  },
  mounted() {
    const foundValue = find(this.options, option => option.value === this.value);

    if (!isEmpty(foundValue)) {
      this.selected = this.$t(foundValue.label);
    }

    const { isValid } = validate(foundValue, { isRequired: this.isRequired });
    this.isValid = isValid;

    this.emitOnChange(this.$t(foundValue && foundValue.label));
  },
  methods: {
    onClose() {
      this.isFocused = false;
      this.isPristine = false;

      this.handleChange(this.selected);
    },
    handleValidate(selectedOption) {
      const { isValid, errorMsg } = validate(selectedOption, { isRequired: this.isRequired });

      this.isValid = isValid;
      this.errorMsg = errorMsg;
    },
    handleChange(selectedOption) {
      this.handleValidate(selectedOption);
      this.emitOnChange(selectedOption);
    },
    emitOnChange(selectedOption) {
      this.$emit('onChange', {
        value: get(
          find(this.options, option => this.$t(option.label) === selectedOption),
          'value',
          null
        ),
        name: this.name,
        isValid: this.isValid,
      });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.multiselect {
  min-height: 0;
  font-size: 2rem;

  &__single {
    padding-left: 0;
    margin-bottom: 0;
    min-height: 0;
    font-size: 2rem;
    line-height: 1;
    vertical-align: middle;
    color: $medium-gray;
    transform: color 0.3s ease-in-out;
  }

  &:hover &__single {
    color: $black;
  }

  &__select {
    top: 8px;
  }

  &__tags {
    margin-top: 0;
    padding-left: 0;
    padding-top: 2px;
    min-height: 0;
    font-size: 2rem;
    border: 0;
  }

  &__input {
    margin-bottom: 0;
    line-height: 1;
  }

  &__placeholder {
    margin-bottom: 2px;
    font-size: 1.8rem;
    font-weight: 300;
    color: $light-gray;
  }

  &__content-wrapper,
  &--above &__content-wrapper {
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 5px;
  }

  &__option,
  &__element {
    font-size: 1.8rem;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: $main-orange;
    }
  }

  &__option--highlight,
  &__option--highlight.multiselect__option--selected {
    background-color: $main-orange;
    transition: background-color 0.3s ease-in-out;

    &::after {
      display: none;
    }
  }
}
/* stylelint-disable no-descending-specificity */
.has-centered-text {
  .multiselect__placeholder,
  .multiselect__single {
    width: 100%;
    text-align: center;
  }
}
/* stylelint-enable */
</style>
