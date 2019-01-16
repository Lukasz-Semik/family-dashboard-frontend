<template>
  <div :class="[$style['form-wrapper']]">
    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <UserSignFieldsGroup
          v-if="currentStepIndex === 0"
          :fields="namesFields"
          @onChange="onChange"
        />

        <div v-if="currentStepIndex === 1">
          <DatePicker
            name="birthDate"
            label-translation-path="forms.userSign.birthDate.label"
            placeholder-translation-path="forms.userSign.birthDate.placeholder"
            @onChange="onChange"
          />
          <DropdownElement
            label-translation-path="forms.userSign.gender.label"
            name="birthDate"
            placeholder-translation-path="forms.userSign.gender.placeholder"
            :options="['Male', 'Female', 'Other']"
          />
        </div>

        <UserSignFieldsGroup
          v-if="currentStepIndex === 2"
          :fields="accountFields"
          @onChange="onChange"
        />
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
import DropdownElement from '@/components/atoms/DropdownElement/DropdownElement';
// import Field from '@/components/atoms/Field/Field.vue';

export default {
  components: {
    FormGroup,
    UserSignFieldsGroup,
    ButtonElement,
    DatePicker,
    DropdownElement,
    // Field,
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

      console.log({
        firstName,
        lastName,
        email,
        password,
        birthDate,
      });
    },
    onChange(payload) {
      const { name, value } = payload;

      this[name] = value;
    },
    generateFields(fields) {
      return fields.map(field => ({
        ...field,
        value: this[field.name],
      }));
    },
    ...mapActions({
      signIn,
    }),
  },
};
</script>

<style lang="scss" module src="./SignUpForm.scss" />
