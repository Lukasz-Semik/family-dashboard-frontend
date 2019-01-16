<template>
  <WithLabelFieldWrapper
    :name="name"
    :label-translated-text="labelTranslatedText"
    :label-translation-path="labelTranslationPath"
  >
    <Datepicker
      :id="name"
      ref="datepicker"
      :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
      :input-class="[$style['input'], inputClassNames]"
      :calendar-class="[$style['calendar']]"
      @selected="onSelectDate"
    />
  </WithLabelFieldWrapper>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import WithLabelFieldWrapper from '@/components/atoms/Wrappers/WithLabelFieldWrapper/WithLabelFieldWrapper.vue';

export default {
  components: {
    Datepicker,
    InputElement,
    WithLabelFieldWrapper,
  },
  props: {
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
      default: false,
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

<style lang="scss" module src="./DatePicker.scss" />
