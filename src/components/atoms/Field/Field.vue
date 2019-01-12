<template>
  <div
    :class="[$style['date-picker-wrapper']]"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <label
      data-test="label"
      :for="name"
      :class="[$style['label'], innerStateClassNames]"
    >{{ labelTranslatedText || $t(labelTranslationPath) }}</label>
    
    <input
      v-if="fieldType === 'input'"
      :id="name"
      data-test="input"
      :class="[$style['input'], inputClassNames]"
      :name="name"
      :value="value"
      :type="type"
      :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
      @input="handleChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >

    <Datepicker
      v-else-if="fieldType === 'datePicker'"
      :id="name"
      :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
      :input-class="[$style['input'], inputClassNames]"
      :calendar-class="[$style['calendar']]"
      ref="datepicker"
      @selected="onSelectDate"
    ></Datepicker>

    <div :class="[$style['input-border']]"/>
    <!-- eslint-disable max-len -->
    <div
      :class="[$style['input-border'], $style['input-border-focus-indicator'], innerStateClassNames]"
    />
    <!-- esling-enalbe -->
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

import InputElement from '@/components/atoms/InputElement/InputElement.vue';

export default {
  components: {
    Datepicker,
    InputElement,
  },
  props: {
    fieldType: {
      type: String,
      default: 'input',
    },
    name: {
      type: String,
      required: true,
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
      default: '',
    },
  },
  data() {
    return {
      selectedDate: '1',
      isOpen: false,
      isHovered: false,
    };
  },
  computed: {
    innerStateClassNames() {
      const { $style, isHovered, isFocused } = this;

      return {
        [$style['is-focused']]: isHovered || isFocused,
      };
    },
    inputClassNames() {
      const { $style, hasCenteredText } = this;

      return {
        [$style['is-centered']]: hasCenteredText,
      };
    },
  },
  methods: {
    onSelectDate(value) {
      this.$emit('onChange', {
        value,
        name: this.name,
      });
    },
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

<style lang="scss">
.cell.selected {
  &.day,
  &.month,
  &.year {
    background-color: $main-orange;
    color: $white;
    transition: background-color 0.3s ease-in-out;

    &:hover,
    &:focus {
      background-color: $main-orange;
    }
  }
}

.cell:not(.blank):not(.disabled) {
  &.day,
  &.month,
  &.year {
    transition: border-color 0.3s ease-in-out;

    &:hover {
      border-color: $main-orange !important;
    }
  }
}
</style>

<style lang="scss" module src="./Field.scss" />
