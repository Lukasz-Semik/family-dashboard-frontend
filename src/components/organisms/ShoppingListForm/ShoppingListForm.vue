<template>
  <div>
    <ButtonElement
      translation-path="general.save"
      has-blue-theme
      @onClick="onSubmit"
    />

    <ShoppingListFieldsGroup
      :title="title"
      :deadline="deadline"
      :items="items"
      :item="item"
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
import { mapActions } from 'vuex';
import uuid from 'uuid/v1';
import { isEmpty, find } from 'lodash';

import { apiCreteShoppingList, apiPatchShoppingList } from '@/api';
import { showToast } from '@/store/toast/actions';
import { getShoppingLists } from '@/store/shoppingLists/actions';
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
  methods: {
    ...mapActions({ showToast, getShoppingLists }),
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
    onRemove(id) {
      const filteredItems = this.items.filter(item => item.id !== id);
      this.items = filteredItems;
    },
    async onSubmit() {
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

      if (isEmpty(this.currentShoppingList)) {
        const response = await apiCreteShoppingList({ title, deadline, items });

        if (response.status === 200) {
          Object.assign(this, {
            title: '',
            item: '',
            deadline: null,
            items: [],
            hasEmptyListError: false,
            isSubmissionFailed: false,
          });
        }
      } else {
        const payload = {};

        if (!isEmpty(title)) payload.title = title;
        if (!isEmpty(deadline)) payload.deadline = deadline;
        if (!isEmpty(items)) payload.items = items;

        const response = await apiPatchShoppingList(this.currentShoppingList.id, payload);

        if (response.status === 200) {
          await this.getShoppingLists();
          this.showToast({ text: 'shoppingLists.saved' });
        }
      }

      this.$emit('finishCreating');
    },
  },
};
</script>
