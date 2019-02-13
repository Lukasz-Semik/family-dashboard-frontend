<template>
  <FormGroup>
    <template slot="fields-group">
      <div :class="[$style['wrapper']]">
        <FormRow>
          <InputElement
            name="todoTitle"
            :value="titleValue"
            label-translation-path="todos.todoTitle"
            placeholder-translation-path="todos.todoTitlePlaceholder"
            :is-submission-failed="isSubmissionFailed"
            is-required
            has-centered-text
            @onChange="onChange"
          />
        </FormRow>

        <FormRow>
          <InputElement
            name="todoDescription"
            :value="descriptionValue"
            label-translation-path="todos.todoDescription"
            placeholder-translation-path="todos.todoDescriptionPlaceholder"
            :is-submission-failed="isSubmissionFailed"
            has-centered-text
            @onChange="onChange"
          />
        </FormRow>

        <FormRow>
          <DatePicker
            name="todoDeadline"
            :value="deadlineValue"
            label-translation-path="todos.todoDeadline"
            placeholder-translation-path="todos.todoDeadlinePlaceholder"
            :is-submission-failed="isSubmissionFailed"
            has-centered-text
            @onChange="onChange"
          />
        </FormRow>
      </div>
    </template>
  </FormGroup>
</template>

<script>
import FormGroup from '@/components/atoms/Form/FormGroup.vue';
import FormRow from '@/components/atoms/Form/FormRow.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';

export default {
  components: {
    FormGroup,
    FormRow,
    InputElement,
    DatePicker,
  },
  props: {
    titleValue: {
      type: String,
      default: '',
    },
    descriptionValue: {
      type: String,
      default: '',
    },
    deadlineValue: {
      type: Date,
      default: null,
    },
    isSubmissionFailed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(payload) {
      this.$emit('onChange', payload);
    },
  },
};
</script>

<style lang="scss" module src="./TodoForm.scss" />
