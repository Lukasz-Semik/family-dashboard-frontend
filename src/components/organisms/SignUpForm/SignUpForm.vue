<template>
  <div :class="[$style['form-wrapper']]">
    <div v-if="currentStepIndex > 0" :class="[$style['previous-wrapper']]">
      <ButtonElement
        translation-path="general.previous"
        has-previous-theme
        @onClick="currentStepIndex > 0 ? currentStepIndex -= 1 : null"
      />
    </div>

    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <UserSignFieldsGroup
          v-if="currentStepIndex === 1"
          :fields="namesFields"
          @onChange="onChange"
        />

        <UserSignFieldsGroup
          v-if="currentStepIndex === 0"
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
        <div :class="[$style['button-wrapper']]">
          <ButtonElement type="submit" translation-path="forms.shared.submit" has-blue-theme/>
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script>
import { get } from 'lodash';

import { apiSignUp } from '@/api';
import { emailPasswordFields, userNamesFields, userDetailsFields } from '@/constants/forms';
import { serverMessages } from '@/constants/serverResponses';
import { SIGN_IN_ROUTE } from '@/constants/routesNames';

import FormGroup from '@/components/atoms/Form/FormGroup.vue';
import UserSignFieldsGroup from '@/components/molecules/UserSignFieldsGroup/UserSignFieldsGroup.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    FormGroup,
    UserSignFieldsGroup,
    ButtonElement,
  },
  data() {
    return {
      currentStepIndex: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: null,
      gender: '',
      errors: {},
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
      if (this.currentStepIndex < 2) {
        this.currentStepIndex += 1;
        return;
      }

      const { currentStepIndex, firstName, lastName, birthDate, gender, email, password } = this;

      try {
        const response = await apiSignUp({
          firstName,
          lastName,
          birthDate,
          gender,
          email,
          password,
        });

        if (get(response, 'data.account') === serverMessages.accountCreated) {
          this.$router.push({ name: SIGN_IN_ROUTE });
        }
      } catch (err) {
        // TODO: handel errors
        console.log(err);
      }
    },
    onChange(payload) {
      const { name, value, isValid } = payload;

      this[name] = value;
      this.errors[name] = !isValid;
    },
    generateFields(fields) {
      return fields.map(field => ({
        ...field,
        value: this[field.name],
      }));
    },
  },
};
</script>

<style lang="scss" module src="./SignUpForm.scss" />
