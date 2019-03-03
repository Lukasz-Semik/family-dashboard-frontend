<template>
  <div>
    <div :class="[$style['wrapper']]">
      <div :class="[$style['field']]">
        <InputElement
          name="title"
          :value="title"
          label-translation-path="shoppingLists.shoppingListTitle"
          placeholder-translation-path="shoppingLists.shoppingListTitlePlaceholder"
          :is-submission-failed="isSubmissionFailed"
          is-transparent
          is-required
          @onChange="onChange"
        />
      </div>

      <div :class="[$style['field']]">
        <DatePicker
          name="deadline"
          :value="deadline"
          label-translation-path="shoppingLists.shoppingListDeadline"
          placeholder-translation-path="shoppingLists.shoppingListDeadlinePlaceholder"
          :is-submission-failed="isSubmissionFailed"
          is-transparent
          @onChange="onChange"
        />
      </div>
    </div>

    <div :class="[$style['wrapper']]">
      <div :class="[$style['field']]">
        <InputElement
          name="item"
          :value="item"
          label-translation-path="shoppingLists.item"
          placeholder-translation-path="shoppingLists.itemPlaceholder"
          :is-submission-failed="isSubmissionFailed"
          is-transparent
          @onChange="onChange"
        />
      </div>

      <div :class="[$style['field']]">
        <ButtonElement
          translation-path="shoppingLists.addItem"
          has-gray-theme
          @onClick="$emit('onAddItem')"
        />
      </div>
    </div>

    <ul>
      <ErrorMsg v-if="hasEmptyListError || hasExistingItemError" :translation-path="itemsError"/>

      <li v-for="shoppingItem in items" :key="shoppingItem.id" :class="[$style['item']]">
        <TextElement :translated-text="shoppingItem.name" is-black is-medium/>
        <ButtonElement
          translation-path="general.remove"
          has-gray-theme
          is-small
          is-inline
          is-hovered-red
          @onClick="onRemove(shoppingItem.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ErrorMsg from '@/components/atoms/ErrorMsg/ErrorMsg.vue';
import InputElement from '@/components/atoms/InputElement/InputElement.vue';
import DatePicker from '@/components/atoms/DatePicker/DatePicker.vue';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import TextElement from '@/components/atoms/TextElement/TextElement.vue';

export default {
  components: {
    ErrorMsg,
    InputElement,
    DatePicker,
    ButtonElement,
    TextElement,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    deadline: {
      type: Date,
      default: null,
    },
    item: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: () => [],
    },
    isSubmissionFailed: {
      type: Boolean,
      default: false,
    },
    hasEmptyListError: {
      type: Boolean,
      default: false,
    },
    hasExistingItemError: {
      type: Boolean,
      default: false,
    },
    itemsError: {
      type: String,
      default: false,
    },
  },
  methods: {
    onChange(payload) {
      this.$emit('onChange', payload);
    },
    onRemove(id) {
      this.$emit('onRemove', id);
    },
  },
};
</script>

<style lang="scss" module src="./ShoppingListFieldsGroup.scss" />
