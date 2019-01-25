<template>
  <div
    v-click-outside="onClose"
    @click="isOpen = true"
  >
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

import { validate } from '@/helpers/validators';
import FieldControl from '@/components/molecules/FieldControl/FieldControl.vue';

export default {
  components: {
    Datepicker,
    FieldControl,
  },
  directives: {
    ClickOutside,
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
    isRequired: {
      type: Boolean,
      default: false,
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
  watch: {
    isSubmissionFailed(newVal, oldVal) {
      if (newVal && !oldVal) {
        this.handleValidate(this.value);
      }
    },
  },
  mounted() {
    const { isValid } = validate(this.convertDateToString(this.value), {
      isRequired: this.isRequired,
    });
    this.isValid = isValid;

    this.emitOnChange(this.value);
  },
  methods: {
    convertDateToString: date => moment(date).toISOString(),
    handleValidate(value) {
      const { isValid, errorMsg } = validate(this.convertDateToString(value), {
        isRequired: this.isRequired,
      });

      this.isValid = isValid;
      this.errorMsg = errorMsg;
    },
    onSelectDate(value) {
      this.selectedControl = value;

      this.handleValidate(value);

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
