<template>
  <table>
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="'table-header' + index">
          {{ header }}
        </th>
        <th
          v-for="(action, index) in actions"
          :key="`action-header-${index}`"
        ></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in items"
        :key="`user-${item.fullname}-${index}`"
      >
        <td>{{ item.fullname }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.country }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.phonePrefix }} {{ item.phoneNumber }}</td>
        <td v-for="action in actions" :key="`action-${action}`">
          <button type="button" @click="$emit(action, index)">
            {{ action.toUpperCase() }}
          </button>
        </td>
      </tr>
      <tr>
        <td :colspan="headers.length + actions.length">
          <ct-message
            v-if="!items.length"
            message="La lista está vacía."
          ></ct-message>
        </td>
      </tr>
    </tbody>
  </table>
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
