<template>
  <WithLabelFieldWrapper
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
    :is-focused="isFocused"
  >
    <DropdownElement
      v-model="value"
      :options="options"
      :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
      @input="handleChange"
      @open="isFocused = true"
      @close="isFocused = false"
    />
  </WithLabelFieldWrapper>
</template>

<script>
import DropdownElement from 'vue-multiselect';

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
  methods: {
    handleChange(e) {
      console.log('changed', e);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.multiselect__single {
  padding-left: 0;
  margin-bottom: 0;
  min-height: 0;
  font-size: 2rem;
  line-height: 1;
  vertical-align: middle;
  color: $medium-gray;
  transform: color 0.3s ease-in-out;
}

.multiselect {
  min-height: 0;
  font-size: 2rem;

  &:hover .multiselect__single {
    color: $black;
  }
}

.multiselect__select {
  top: 8px;
}

.multiselect__tags {
  margin-top: 0;
  padding-left: 0;
  padding-top: 2px;
  min-height: 0;
  font-size: 2rem;
  border: 0;
}

.multiselect__input {
  margin-bottom: 0;
  line-height: 1;
}

.multiselect__placeholder {
  margin-bottom: 2px;
  font-size: 1.8rem;
  font-weight: 300;
  color: $light-gray;
}

.multiselect__content-wrapper,
.multiselect--above .multiselect__content-wrapper {
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 5px;
}

.multiselect__option,
.multiselect__element {
  font-size: 1.8rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: $main-orange;
  }
}

.multiselect__option--highlight,
.multiselect__option--highlight.multiselect__option--selected {
  background-color: $main-orange;
  transition: background-color 0.3s ease-in-out;

  &::after {
    display: none;
  }
}
</style>
