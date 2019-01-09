<template>
  <form :class="[$style['form']]" @submit.prevent="onSubmit">
    <slot name="form-group"></slot>

    <slot name="button-group"></slot>
  </form>
</template>

<style lang="scss" module src="./Form.scss" />
