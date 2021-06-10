<template>
  <t-table :headers="headers" :data="items">
    <template slot="thead" slot-scope="props">
      <thead :class="props.theadClass">
        <tr :class="props.trClass">
          <th
            v-for="(item, index) in props.data"
            :key="'th' + index"
            :class="props.thClass"
          >
            {{ item.text }}
          </th>
          <th :class="props.thClass" :colspan="tableColsQty"></th>
        </tr>
      </thead>
    </template>
    <template slot="tbody" slot-scope="props">
      <tbody v-show="items.length" :class="props.tbodyClass">
        <tr
          v-for="(item, index) in items"
          :key="`user-${item.fullname}-${index}`"
          :class="props.trClass"
        >
          <td :class="props.tdClass">{{ item.fullname }}</td>
          <td :class="props.tdClass">{{ item.country }}</td>
          <td :class="props.tdClass">{{ item.city }}</td>
          <td :class="props.tdClass">{{ item.email }}</td>
          <td :class="props.tdClass">
            {{ item.phonePrefix }} {{ item.phoneNumber }}
          </td>
          <td
            v-for="action in actions"
            :key="`action-${action}`"
            :class="props.tdClass"
          >
            <t-table-action-button type="button" @click="$emit(action, index)">
              {{ action.toUpperCase() }}
            </t-table-action-button>
          </td>
        </tr>
        <tr :class="props.trClass">
          <td :colspan="headers.length + actions.length" :class="props.tdClass">
            <ct-message
              v-if="!items.length"
              message="La lista está vacía."
            ></ct-message>
          </td>
        </tr>
      </tbody>
      <tbody v-show="!items.length" :class="props.tbodyClass">
        <tr :class="[props.trClass, 'text-center']">
          <td :class="props.tdClass" :colspan="tableColsQty">
            <t-alert show :dismissible="false" variant="danger">
              La tabla está vacía
            </t-alert>
          </td>
        </tr>
      </tbody>
    </template>
  </t-table>
</template>

<script>
import CtMessage from "@/components/CtMessage";

export default {
  name: "CtTable",
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CtMessage,
  },
  computed: {
    tableColsQty() {
      return this.headers.length + this.actions.length;
    },
  },
};
</script>

<style lang="scss">
table {
  width: 100%;
  .message-container {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
