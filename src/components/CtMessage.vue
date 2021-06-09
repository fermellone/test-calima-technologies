<template>
  <div class="message" v-html="`<p>${message}</p>`"></div>
</template>

<script>
export default {
  name: "CtMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
#app {
  .message {
    width: 70%;
    margin: auto;
    min-height: 5rem;
    display: table;

    & > p {
      background: lightgray;
      border-radius: 5px;
      padding: 0.3rem 0.1rem;
    }
  }
}
</style>
