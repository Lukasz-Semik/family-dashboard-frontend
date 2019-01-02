<template>
  <div :class="[$style['form-row']]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormRow',
};
</script>


<style lang="scss" module src="./Form.scss" />
