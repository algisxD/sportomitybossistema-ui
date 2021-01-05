<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Kalorijų skaicius</th>
          <th scope="col">Angliavandieniu kiekis</th>
          <th scope="col">Baltymu kiekis</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in list" :key="index">
          <td>{{ product.kcal }}</td>
          <td>{{ product.angliavandeniai }}</td>
          <td>{{ product.baltymai }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  data() {
    return { list: undefined };
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
