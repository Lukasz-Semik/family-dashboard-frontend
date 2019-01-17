<template>
  <div :class="[$style['form-wrapper']]">
    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <UserSignFieldsGroup
          v-if="currentStepIndex === 0"
          :fields="namesFields"
          @onChange="onChange"
        />

        <UserSignFieldsGroup
          v-if="currentStepIndex === 1"
          :fields="userDetails"
          @onChange="onChange"
        />

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
import { emailPasswordFields, userNamesFields, userDetailsFields } from '@/constants/forms';
import { signIn } from '@/store/currentUser/actions';

import FormGroup from '@/components/atoms/Form/FormGroup.vue';
import UserSignFieldsGroup from '@/components/molecules/UserSignFieldsGroup/UserSignFieldsGroup.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import DropdownElement from '@/components/atoms/DropdownElement/DropdownElement.vue';

export default {
  components: {
    FormGroup,
    UserSignFieldsGroup,
    ButtonElement,
    DatePicker,
    DropdownElement,
  },
  data() {
    return {
      currentStepIndex: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: '',
      gender: '',
    };
  },
  computed: {
    namesFields() {
      return this.generateFields(userNamesFields);
    },
    accountFields() {
      return this.generateFields(emailPasswordFields);
    },
    userDetails() {
      return this.generateFields(userDetailsFields);
    },
  },
  methods: {
    async handleSubmit() {
      const { currentStepIndex, firstName, lastName, birthDate, gender, email, password } = this;

      if (currentStepIndex < 2) {
        this.currentStepIndex += 1;
        return;
      }

      console.log({
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        password,
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
