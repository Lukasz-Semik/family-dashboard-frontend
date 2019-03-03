<template>
  <div>
    <ButtonElement translation-path="general.save" has-blue-theme @onClick="onSubmit"/>

    <ShoppingListFieldsGroup
      :title="title"
      :deadline="deadline"
      :items="items"
      :is-submission-failed="isSubmissionFailed"
      :has-empty-list-error="hasEmptyListError"
      :has-existing-item-error="hasExistingItemError"
      :items-error="itemsError"
      @onRemove="onRemove"
      @onChange="onChange"
      @onAddItem="onAddItem"
    />
  </div>
</template>

<script>
import uuid from 'uuid/v1';
import { isEmpty, find } from 'lodash';

import { apiCreteShoppingList } from '@/api';
import ButtonElement from '@/components/atoms/ButtonElement/ButtonElement.vue';
import ShoppingListFieldsGroup from '@/components/molecules/ShoppingListFieldsGroup/ShoppingListFieldsGroup.vue';

export default {
  components: {
    ButtonElement,
    ShoppingListFieldsGroup,
  },
  props: {
    currentShoppingList: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: '',
      item: '',
      deadline: null,
      items: [],
      hasEmptyListError: false,
      hasExistingItemError: false,
      isSubmissionFailed: false,
    };
  },
  created() {
    if (isEmpty(this.currentShoppingList)) return;

    const { title, item, deadline, items } = this.currentShoppingList;

    Object.assign(this, {
      title,
      item,
      deadline: new Date(deadline),
      items,
    });
  },
  computed: {
    itemsError() {
      if (this.hasExistingItemError) {
        return 'errors.itemExist';
      }

      if (this.hasEmptyListError) {
        return 'errors.emptyList';
      }

      return '';
    },
  },
  methods: {
    onRemove(id) {
      const filteredItems = this.items.filter(item => id !== item.id);

      this.items = filteredItems;
    },
    onChange(payload) {
      const { value, name } = payload;

      this[name] = value;
    },
    onAddItem() {
      this.hasExistingItemError = false;

      if (isEmpty(this.item)) return;

      if (!isEmpty(find(this.items, item => item.name === this.item))) {
        this.hasExistingItemError = true;
        return;
      }

      this.items.push({
        name: this.item,
        isDone: false,
        deadline: this.deadline,
        id: uuid(),
      });

      this.hasEmptyListError = false;

      this.item = '';
    },
    onSubmit() {
      this.isSubmissionFailed = false;

      const { title, deadline, items } = this;
      let isValid = true;

      if (isEmpty(title)) {
        this.isSubmissionFailed = true;
        isValid = false;
      }

      if (isEmpty(items)) {
        this.hasEmptyListError = true;
        isValid = false;
      }

      if (!isValid) return;
    },
  },
};
</script>

