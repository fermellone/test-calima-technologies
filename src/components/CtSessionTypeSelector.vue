<template>
  <div class="flex justify-between w-1/5 m-auto session-type min-w-min">
    <label class="flex items-center">
      <t-radio
        id="offline"
        name="session-type"
        :value="false"
        v-model="sessionTypeSelected"
      />
      <span class="ml-2 text-sm">Offline</span>
    </label>
    <label class="flex items-center ml-2">
      <t-radio
        id="online"
        name="session-type"
        :value="true"
        v-model="sessionTypeSelected"
      />
      <span class="ml-2 text-sm">Online</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CtSessionTypeSelector",
  props: {
    isOnline: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      sessionTypeSelected: false,
    };
  },
  watch: {
    sessionTypeSelected(newVal) {
      this.$emit("update:is-online", newVal);
    },
  },
};
</script>

<style lang="scss">
#app {
  .session-type {
    margin-bottom: 1.5rem;
  }
}
</style>
