<template>
  <div :class="[$style['form-wrapper']]">
    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <UserSignFieldsGroup
          v-if="currentStepIndex === 0"
          :fields="this.namesFields"
          @onChange="onChange"
        />

        <UserSignFieldsGroup
          v-if="currentStepIndex === 2"
          :fields="this.accountFields"
          @onChange="onChange"
        />

        <div v-if="currentStepIndex === 1">
          <Field
            fieldType="datePicker"
            name="birthDate"
            labelTranslationPath="forms.userSign.birthDate.label"
            placeholderTranslationPath="forms.userSign.birthDate.placeholder"
            @onChange="onChange"
            hasCenteredText
          />
        </div>
      </template>

      <template slot="button-group">
        <div :class="[$style['button-container']]">
          <ButtonElement type="submit" translation-path="forms.shared.submit" has-blue-theme/>
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { DASHBOARD_ROUTE } from '@/constants/routesNames';
import { emailPasswordFields, userNamesFields } from '@/constants/forms';
import { signIn } from '@/store/currentUser/actions';
import FormGroup from '@/components/atoms/Form/FormGroup.vue';
import UserSignFieldsGroup from '@/components/molecules/UserSignFieldsGroup/UserSignFieldsGroup.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import Field from '@/components/atoms/Field/Field.vue';

export default {
  components: {
    FormGroup,
    UserSignFieldsGroup,
    ButtonElement,
    DatePicker,
    Field,
  },
  data() {
    return {
      currentStepIndex: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: '',
    };
  },
  computed: {
    namesFields() {
      return this.generateFields(userNamesFields);
    },
    accountFields() {
      return this.generateFields(emailPasswordFields);
    },
  },
  methods: {
    async handleSubmit() {
      const { currentStepIndex, firstName, lastName, email, password, birthDate } = this;

      if (currentStepIndex < 2) {
        this.currentStepIndex += 1;
        return;
      }

      console.log({ firstName, lastName, email, password, birthDate });
    },
    onChange(payload) {
      const { name, value } = payload;

      this[name] = value;
    },
    generateFields(fields) {
      return fields.map(field => ({
        ...field,
        value: this[name],
      }));
    },
    ...mapActions({
      signIn,
    }),
  },
};
</script>

<style lang="scss" module src="./SignUpForm.scss" />
