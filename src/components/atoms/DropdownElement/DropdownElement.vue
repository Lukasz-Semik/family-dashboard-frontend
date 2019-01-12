<template>
  <div :class="[$style['dropdown-element-wrapper']]">
    <DropdownElement v-model="value" :options="['1', '2', '3']"/>

    <div :class="[$style['input-border']]"/>
    <!-- eslint-disable max-len -->
    <div
      :class="[$style['input-border'], $style['input-border-focus-indicator'], innerStateClassNames]"
    />
    <!-- esling-enalbe -->
  </div>
</template>

<script>
import DropdownElement from 'vue-multiselect';

export default {
  components: {
    DropdownElement,
  },
  data() {
    return {
      value: null,
    };
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">
.multiselect__tags {
  border: 0;
}

.multiselect__content-wrapper {
  border-top: 1px solid #e8e8e8;
  border-radius: 5px;
}

.multiselect__option,
.multiselect__element {
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: $main-orange;
  }
}

.multiselect__option--highlight,
.multiselect__option--highlight.multiselect__option--selected {
  background-color: $main-orange;
  transition: background-color 0.3s ease-in-out;

  &::after {
    display: none;
  }
}
</style>

<style lang="scss" module src="./DropdownElement.scss" />
