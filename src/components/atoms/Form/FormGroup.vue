<template>
  <form
    :class="[$style['form']]"
    @submit.prevent="onSubmit"
  >
    <slot name="form-group" />

    <slot name="button-group" />
  </form>
</template>

<style lang="scss" module src="./Form.scss" />
