<template>
  <WithLabelFieldWrapper
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
    :is-focused="isFocused"
  >
    <DropdownElement
      v-model="value"
      :options="preparedOptions"
      :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
      @input="handleChange"
      @open="isFocused = true"
      @close="isFocused = false"
    />
  </WithLabelFieldWrapper>
</template>

<script>
import DropdownElement from 'vue-multiselect';
import { find, get } from 'lodash';

import WithLabelFieldWrapper from '@/components/atoms/Wrappers/WithLabelFieldWrapper/WithLabelFieldWrapper.vue';

export default {
  components: {
    DropdownElement,
    WithLabelFieldWrapper,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: [],
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
  },
  data() {
    return {
      value: null,
      isFocused: false,
    };
  },
  computed: {
    preparedOptions() {
      return this.options.map(item => this.$t(item.label));
    },
  },
  methods: {
    handleChange(selectedOption) {
      this.$emit('onChange', {
        value: get(
          find(this.options, option => this.$t(option.label) === selectedOption),
          'value',
          null
        ),
        name: this.name,
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
</style>
