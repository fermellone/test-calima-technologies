<template>
  <div id="app">
    <h1>Test: Formulario</h1>
    <h2>Calima Thechnologies</h2>
    <ct-nav :view.sync="view" />
    <div class="form-container" v-show="view === 'form'">
      <ct-message :message="isOrNotOnlineMessage" />
      <ct-session-type-selector :is-online.sync="isOnline" />
      <ct-form offline @update-list="updateList" @save="save" />
    </div>
    <div class="list-container" v-show="view === 'list'">
      <ct-message :message="isOrNotOnlineMessage" v-show="isOnline" />
      <ct-table
        v-show="!isOnline"
        :headers="tableHeaders"
        :items="listItems"
        :actions="['delete']"
        @delete="deleteItem"
      />
    </div>
  </div>
</template>

<script>
import CtForm from "@/components/CtForm";
import CtNav from "@/components/CtNav";
import CtMessage from "@/components/CtMessage";
import CtTable from "@/components/CtTable";
import CtSessionTypeSelector from "@/components/CtSessionTypeSelector";

import { saveForm } from "@/api/formSpree";

export default {
  name: "App",
  components: {
    CtForm,
    CtNav,
    CtMessage,
    CtTable,
    CtSessionTypeSelector,
  },
  data() {
    return {
      isOnline: false,
      view: "form",
      tableHeaders: [
        "Nombre",
        "País",
        "Ciudad",
        "Correo electrónico",
        "Teléfono",
      ],
      listItems: [],
    };
  },
  computed: {
    isOrNotOnlineMessage() {
      if (this.isOnline) {
        return 'La versión <b>"online"</b> almacena los datos en un gestor de formularios. Por lo cual <b>la lista no está disponible</b>';
      } else {
        return 'La versión "offline" almacena los datos en localStorage.';
      }
    },
  },
  methods: {
    updateList() {
      this.listItems = JSON.parse(localStorage.getItem("users")) || [];
    },
    deleteItem(indexParam) {
      const userResponse = window.confirm(
        "Estás seguro de que querés eliminar este item?"
      );
      if (userResponse) {
        const items = JSON.parse(localStorage.getItem("users"));

        localStorage.setItem(
          "users",
          JSON.stringify(items.filter((_, index) => index !== indexParam))
        );

        this.updateList();
      }
    },
    async save(form) {
      try {
        if (this.isOnline) {
          const result = await saveForm(form);
          window.location.href = result.next;
        } else {
          const data = localStorage.getItem("users");

          if (data) {
            localStorage.setItem(
              "users",
              JSON.stringify([...JSON.parse(data), form])
            );
          } else {
            localStorage.setItem("users", JSON.stringify([form]));
          }

          alert("Los datos se guardaron correctamente");

          this.updateList();
        }
      } catch (error) {
        console.error(error);
        alert(error);
      }
    },
  },

  mounted() {
    this.updateList();
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

  .list-container {
    margin: 2rem auto 0;
    width: 90%;
  }
}
</style>
