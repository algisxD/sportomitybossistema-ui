<template>
  <div>
    <b-modal
      id="modal-tall"
      ok-title="Patvirtinti"
      cancel-title="Atšaukti"
      title="Pridėkite savo receptą"
    >
      <form ref="form">
        <b-form-group
          label="Pavadinimas"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Aprašymas"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-textarea
            id="textarea"
            v-model="text"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group
          label="Gaminimo laikas"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Porcijų skaičius"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Ingridientai"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";
import Vue from "vue";
export default {
  props: ["showCreateModal"],
  methods: {
    goBack() {
      eventBus.$emit("changeShowCreateModal", false);
    },
  },
  mounted() {
    Vue.axios.get("https://localhost:44397/api/Produktas").then((response) => {
      this.products = response.data;
      console.warn(response.data);
    });
  },
};
</script>

<style scoped>
.about {
  height: 100px;
}
</style>
