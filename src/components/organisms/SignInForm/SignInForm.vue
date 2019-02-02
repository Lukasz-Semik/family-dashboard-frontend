<template>
  <div :class="[$style['form-wrapper']]">
    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <UserSignFieldsGroup
          :fields="fields"
          :is-submission-failed="isSubmissionFailed"
          @onChange="onChange"
        />
      </template>

      <template slot="button-group">
        <div :class="[$style['button-container']]">
          <ButtonElement
            type="submit"
            translation-path="forms.shared.submit"
            has-blue-theme
          />
        </div>
      </template>
    </FormGroup>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import { checkIsFormValid } from '@/helpers/validators';
import { DASHBOARD_ROUTE } from '@/constants/routesNames';
import { emailPasswordFields } from '@/constants/forms';
import { signIn } from '@/helpers/currentUser';
import { showToast } from '@/store/toast/actions';

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
      email: '',
      password: '',
      isSubmissionFailed: false,
      errors: {},
    };
  },
  computed: {
    fields() {
      return emailPasswordFields.map(field => ({
        ...field,
        value: this[field.name],
      }));
    },
  },
  methods: {
    async handleSubmit() {
      this.isSubmissionFailed = false;

      const { email, password } = this;

      const isFormValid = checkIsFormValid(this.errors, ['email', 'password']);

      if (!isFormValid) {
        this.isSubmissionFailed = true;
        return;
      }

      try {
        const { isAuthorized } = await this.signIn(email, password);

        if (isAuthorized) return this.$router.push({ name: DASHBOARD_ROUTE });

        this.showToast({ toastType: 'error', text: 'errors.wrongEmailPass' });
      } catch (err) {
        this.showToast({ toastType: 'error', text: 'errors.sthWrong' });
      }
    },
    onChange(payload) {
      const { name, value, isValid } = payload;

      this[name] = value;
      this.errors[name] = !isValid;
    },
    signIn,
    ...mapActions({
      showToast,
    }),
  },
};
</script>

<style lang="scss" module src="./SignInForm.scss" />
