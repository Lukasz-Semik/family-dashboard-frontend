<template>
  <Form @onSubmit="onSubmit">
    <FormRow>
      <Input
        name="email"
        type="email"
        labelTranslationPath="forms.shared.email.label"
        placeholderTranslationPath="forms.shared.email.placeholder"
        :value="email"
        @onChange="onChange"
        hasCenteredText
      />
    </FormRow>

    <FormRow>
      <Input
        name="password"
        type="password"
        labelTranslationPath="forms.shared.password.label"
        placeholderTranslationPath="forms.shared.password.placeholder"
        :value="password"
        @onChange="onChange"
        hasCenteredText
      />
    </FormRow>

    <button>Sign In</button>
  </Form>
</template>

<script>
import Input from '@/components/atoms/Input/Input.vue';
import Form from '@/components/atoms/Form/Form.vue';
import FormRow from '@/components/atoms/Form/FormRow.vue';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit(event) {
      console.log(event);
      console.log(this.email);
    },
    onChange(payload) {
      const { name, value } = payload;

      this[name] = value;
    },
  },
  components: {
    Input,
    Form,
    FormRow,
  },
};
</script>
