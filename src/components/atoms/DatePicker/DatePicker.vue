<template>
  <div v-click-outside="onClose" @click="isOpen = true">
    <FieldControl
      :name="name"
      :is-focused="isOpen"
      :label-translated-text="labelTranslatedText"
      :label-translation-path="labelTranslationPath"
      :error-msg="errorMsg"
    >
      <Datepicker
        :id="name"
        ref="datepicker"
        :value="value"
        :placeholder="placeholderTranslatedText || $t(placeholderTranslationPath)"
        :input-class="[$style['input'], inputClassNames]"
        :calendar-class="[$style['calendar']]"
        @selected="onSelectDate"
      />
    </FieldControl>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import ClickOutside from 'vue-click-outside';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { validate } from '@/helpers/validators';
import FieldControl from '@/components/molecules/FieldControl/FieldControl.vue';

export default {
  components: {
    Datepicker,
    FieldControl,
  },
  props: {
    value: {
      type: Date,
      default: null,
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
      default: false,
    },
  },
  data() {
    return {
      isOpen: false,
      isHovered: false,
      isValid: false,
      errorMsg: '',
      selectedControl: null,
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
    convertDateToString: date => moment(date).toISOString(),
    onSelectDate(value) {
      const { isValid, errorMsg } = validate(this.convertDateToString(value), { isRequired: true });

      this.selectedControl = value;
      this.isValid = isValid;
      this.errorMsg = errorMsg;

      this.emitOnChange(value);
    },
    onClose() {
      if (this.isOpen) {
        this.isOpen = false;

        this.onSelectDate(this.value);
      }
    },
    emitOnChange(value) {
      this.$emit('onChange', {
        value,
        name: this.name,
        isValid: this.isValid,
      });
    },
  },
  directives: {
    ClickOutside,
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
