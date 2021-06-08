<template>
  <div id="app">
    <h1>Test: Formulario</h1>
    <h2>Calima Thechnologies</h2>
    <ct-form> </ct-form>
  </div>
</template>

<script>
import CtForm from "@/components/CtForm";
export default {
  name: "App",
  components: {
    CtForm,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
