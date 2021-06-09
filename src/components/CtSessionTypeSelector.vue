<template>
  <div class="session-type">
    <label for="offline">Offline</label>
    <input
      type="radio"
      name="offline"
      id="offline"
      v-model="sessionTypeSelected"
      :value="false"
    />
    <label for="online">Online</label>
    <input
      type="radio"
      name="online"
      id="online"
      v-model="sessionTypeSelected"
      :value="true"
    />
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
