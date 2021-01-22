<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div class="row">
      <div
        class="col-lg-4"
        style="float: left; margin: 1%; margin-left: 3%; margin-right: 0; padding: 0px;"
      >
        <h1 style="font-size: 20px; margin-bottom: 20px;">
          Įveskite produkto/recepto pavadinimą:
        </h1>
        <form style="width: 70%; margin-bottom: 50px;">
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
                type="button"
                :disabled="!isComplete"
                v-on:click="show()"
                class="ion-ios-search btn btn-primary"
                style="height: 38px; width: 90px;"
              >
                Ieškoti
              </button></span
            >
          </div>
        </form>
        <div v-if="pressedSearch" class="col-lg-5 searchDiv">
          <searchResults v-bind:filteredItems="filteredItems" />
        </div>
      </div>
      <transition
        mode="in"
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <productInformation
      /></transition>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import Vue from "vue";
import searchResults from "../components/ProductPage/searchResults";
import productInformation from "../components/ProductPage/productInformation";
//import { mapGetters } from 'vuex';

export default {
  components: {
    PageTitle,
    searchResults,
    productInformation,
  },
  data: () => ({
    title: "Produktų paieška",
    searchText: "",
    searchTextLength: 0,
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
      this.searchTextLength = this.searchText.length;
    },
  },
  computed: {
    filteredItems() {
      if (this.searchTextLength != this.searchText.length) {
        return "";
      } else {
        return this.products.filter((product) => {
          return (
            product.pavadinimas
              .toLowerCase()
              .indexOf(this.searchText.toLowerCase()) > -1
          );
        });
      }
    },
    isComplete() {
      return this.searchText;
    },
  },
};
</script>

<style scoped>
.searchDiv {
  float: left;
  margin: 1%;
  margin-left: 3%;
  padding-right: 0px;
  padding-left: 0px;
  margin: 0;
}
</style>
