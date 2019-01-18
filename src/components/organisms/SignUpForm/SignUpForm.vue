<template>
  <div :class="[$style['form-wrapper']]">
    <div v-if="currentStepIndex > 0" :class="[$style['previous-wrapper']]">
      <ButtonElement
        @onClick="currentStepIndex > 0 ? currentStepIndex -= 1 : null"
        translationPath="general.previous"
        hasPreviousTheme
      />
    </div>

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
        <div :class="[$style['button-wrapper']]">
          <ButtonElement type="submit" translation-path="forms.shared.submit" has-blue-theme/>
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script>
import { apiSignUp } from '@/api';
import { emailPasswordFields, userNamesFields, userDetailsFields } from '@/constants/forms';

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

      try {
        const response = await apiSignUp({
          currentStepIndex,
          firstName,
          lastName,
          birthDate,
          gender,
          email,
          password,
        });
      } catch (err) {
        // TODO: handel errors
        console.log(err);
      }
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
  },
};
</script>

<style lang="scss" module src="./SignUpForm.scss" />
