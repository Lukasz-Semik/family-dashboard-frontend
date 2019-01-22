<template>
  <div>
    <FormRow v-for="field in fields" :key="field.name">
      <InputElement
        v-if="field.fieldType === 'input'"
        :name="field.name"
        :type="field.type || 'text'"
        :value="field.value"
        :label-translation-path="field.labelTranslationPath"
        :placeholder-translation-path="field.placeholderTranslationPath"
        @onChange="onChange"
        has-centered-text
      />

      <DatePicker
        v-if="field.fieldType === 'datePicker'"
        :name="field.name"
        :value="field.value"
        :label-translation-path="field.labelTranslationPath"
        :placeholder-translation-path="field.placeholderTranslationPath"
        @onChange="onChange"
        has-centered-text
      />

      <DropdownElement
        v-if="field.fieldType === 'dropdown'"
        :value="field.value"
        :name="field.name"
        :label-translation-path="field.labelTranslationPath"
        :placeholder-translation-path="field.placeholderTranslationPath"
        :options="field.options"
        @onChange="onChange"
        has-centered-text
      />
    </FormRow>
  </div>
</template>

<script>
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import FormRow from '@/components/atoms/Form/FormRow.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import DropdownElement from '@/components/atoms/DropdownElement/DropdownElement.vue';

export default {
  components: {
    InputElement,
    FormRow,
    DatePicker,
    DropdownElement,
  },
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(payload) {
      this.$emit('onChange', payload);
    },
  },
};
</script>
