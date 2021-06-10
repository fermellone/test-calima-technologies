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
    display: flex;
    justify-content: center;
    align-items: center;

    & > p {
      background: lightgray;
      border-radius: 5px;
      padding: 0.5rem 1rem;
    }
  }
}
</style>
