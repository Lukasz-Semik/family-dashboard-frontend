<template>
  <div :class="[$style['form-wrapper']]">
    <FormGroup @onSubmit="handleSubmit">
      <template slot="fields-group">
        <UserSignFieldsGroup
          v-if="currentStepIndex === 0"
          :fields="this.namesFields"
          :on-change="onChange"
        />

        <UserSignFieldsGroup
          v-if="currentStepIndex === 1"
          :fields="this.accountFields"
          :on-change="onChange"
        />

        <div v-if="currentStepIndex === 2">
          <DatePicker
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

export default {
  components: {
    FormGroup,
    UserSignFieldsGroup,
    ButtonElement,
    DatePicker,
  },
  data() {
    return {
      currentStepIndex: 2,
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
      const { currentStepIndex, email, password } = this;

      if (currentStepIndex < 2) {
        return (this.currentStepIndex = +1);
      }

      const { isAuthorized } = await this.signIn({ email, password });

      if (isAuthorized) return this.$router.push({ name: DASHBOARD_ROUTE });
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
