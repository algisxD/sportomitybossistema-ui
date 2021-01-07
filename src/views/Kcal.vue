<template>
  <div>
    <PageTitle v-bind:title="title" />
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import PageTitle from "../components/PageTitle";

Vue.use(VueAxios, axios);

export default {
  components: {
    PageTitle,
  },
  data() {
    return { list: undefined, title: "Kalorijų skaičiuoklė" };
  },
  mounted() {
    Vue.axios.get("https://localhost:44397/api/Produktas").then((response) => {
      this.list = response.data;
      console.warn(response.data);
    });
  },
};
</script>

<style lang="stylus" scoped></style>
