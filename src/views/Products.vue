<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div class="col-lg-5" style="float: left; margin: 1%; margin-left: 3%">
        <h1 style="font-size: 20px; margin-bottom: 20px;">
          Įveskite produkto/recepto pavadinimą:
        </h1>
        <form style="width: 70%;">
          <div class="input-group mb-3">
            <div class="input-group-prepend"></div>
            <input
              required
              v-model="searchText"
              type="text"
              class="form-control"
              aria-describedby="inputGroup-sizing-default"
            />
            <span
              class="input-group-text"
              style="padding: 0px; border: 0px; width: 90px;"
              ><button
                type="submit"
                v-on:click="show()"
                class="ion-ios-search"
                style="height: 38px; width: 90px;"
              >
                Ieškoti
              </button></span
            >
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="pressedSearch"
      class="col-lg-5"
      style="float: left; margin: 1%; margin-left: 3%"
    >
      <searchResults v-bind:filteredItems="filteredItems" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import Vue from "vue";
import searchResults from "../components/ProductPage/searchResults";

export default {
  components: {
    PageTitle,
    searchResults,
  },
  data: () => ({
    title: "Produktų paieška",
    searchText: "",
    products: undefined,
    pressedSearch: false,
  }),
  mounted() {
    Vue.axios.get("https://localhost:44397/api/Produktas").then((response) => {
      this.products = response.data;
      console.warn(response.data);
    });
  },
  methods: {
    show() {
      this.pressedSearch = true;
    },
  },
  computed: {
    filteredItems() {
      return this.products.filter((product) => {
        return (
          product.pavadinimas
            .toLowerCase()
            .indexOf(this.searchText.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>

<style scoped></style>
