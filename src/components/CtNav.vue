<template>
  <nav>
    <span :class="{ selected: view === 'form' }" @click="selected = 'form'"
      >Formulario</span
    >
    |
    <span :class="{ selected: view === 'list' }" @click="selected = 'list'"
      >Lista</span
    >
  </nav>
</template>

<script>
export default {
  name: "CtNav",
  props: {
    view: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: "form",
    };
  },
  watch: {
    selected(newVal) {
      this.$emit("update:view", newVal);
    },
  },
};
</script>

<style lang="scss">
#app {
  & > nav span {
    margin: 0 1rem;
    cursor: pointer;
    &.selected {
      font-weight: bold;
    }
  }
}
</style>
