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
          v-if="currentStepIndex === 0"
          :fields="namesFields"
          :is-submission-failed="isSubmissionFailed"
          @onChange="onChange"
        />

        <UserSignFieldsGroup
          v-if="currentStepIndex === 1"
          :fields="userDetails"
          :is-submission-failed="isSubmissionFailed"
          @onChange="onChange"
        />

        <UserSignFieldsGroup
          v-if="currentStepIndex === 2"
          :fields="accountFields"
          :is-submission-failed="isSubmissionFailed"
          @onChange="onChange"
        />

        <template v-if="currentStepIndex === 3">
          <TextElement
            translation-path="general.successfulRegister"
            :translation-values="{ email }"
            has-centered-text
          />
        </template>
      </template>

      <template slot="button-group">
        <div :class="[$style['button-wrapper']]">
          <ButtonElement type="submit" :translation-path="buttonTranslationPath" has-blue-theme/>
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script>
import { get } from 'lodash';
import { mapActions } from 'vuex';

import { apiSignUp } from '@/api';
import { showToast } from '@/store/toast/actions';
import { checkIsFormValid } from '@/helpers/validators';
import { emailPasswordFields, userNamesFields, userDetailsFields } from '@/constants/forms';
import { serverMessages } from '@/constants/serverResponses';
import { SIGN_IN_ROUTE } from '@/constants/routesNames';

import TextElement from '@/components/atoms/TextElement/TextElement.vue';
import FormGroup from '@/components/atoms/Form/FormGroup.vue';
import UserSignFieldsGroup from '@/components/molecules/UserSignFieldsGroup/UserSignFieldsGroup.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';

export default {
  components: {
    FormGroup,
    UserSignFieldsGroup,
    ButtonElement,
    TextElement,
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
      isSubmissionFailed: false,
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
    buttonTranslationPath() {
      if (this.currentStepIndex === 3) return 'general.gotIt';
      if (this.currentStepIndex === 2) return 'forms.shared.submit';

      return 'general.next';
    },
  },
  methods: {
    async handleSubmit() {
      this.isSubmissionFailed = false;
      let fieldsToValidate = ['firstName', 'lastName'];

      if (this.currentStepIndex > 0) {
        fieldsToValidate = [...fieldsToValidate, 'birthDate', 'gender'];
      }

      if (this.currentStepIndex > 1) {
        fieldsToValidate = [...fieldsToValidate, 'email', 'password'];
      }

      const isFormValid = checkIsFormValid(this.errors, fieldsToValidate);

      if (!isFormValid) {
        this.isSubmissionFailed = true;
        return;
      }

      if (this.currentStepIndex < 2) {
        this.currentStepIndex += 1;
        return;
      }

      const { firstName, lastName, birthDate, gender, email, password } = this;

      if (this.currentStepIndex === 2) {
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
            this.showToast({ text: 'forms.userSign.registered' });
            this.currentStepIndex = 3;
            return;
          }
        } catch (err) {
          // TODO: handel errors
          console.log(err);
        }
      }

      if (this.currentStepIndex === 3) {
        this.$router.push({ name: SIGN_IN_ROUTE });
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
    ...mapActions({
      showToast,
    }),
  },
};
</script>

<style lang="scss" module src="./SignUpForm.scss" />
