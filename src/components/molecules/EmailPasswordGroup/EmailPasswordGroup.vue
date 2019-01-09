<template>
  <div>
    <div :class="[$style['form-row']]">
      <InputElement
        name="email"
        type="email"
        label-translation-path="forms.shared.email.label"
        placeholder-translation-path="forms.shared.email.placeholder"
        :value="email"
        has-centered-text
        @onChange="onChange"
      />
    </div>

    <div :class="[$style['form-row']]">
      <InputElement
        name="password"
        type="password"
        label-translation-path="forms.shared.password.label"
        placeholder-translation-path="forms.shared.password.placeholder"
        :value="password"
        has-centered-text
        @onChange="onChange"
      />
    </div>
  </div>
</template>

<script>
import InputElement from '@/components/atoms/InputElement/InputElement.vue';

export default {
  components: {
    InputElement,
  },
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    onChange: {
      type: Function,
      default: null,
    },
  },
};
</script>

<style lang="scss" module src="./EmailPasswordGroup.scss" />
