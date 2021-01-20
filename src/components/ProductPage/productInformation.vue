<template>
  <div
    v-if="display"
    class="col-lg-7"
    style="float: left; margin: 1%; margin-left: 3%"
  >
    <div class="cardBackground container">
      <h3 style="margin-bottom: 20px;">
        Maistinių medžiagų skaičius 100 gramų produkto ({{ item.pavadinimas }}):
      </h3>

      <nutrientTable v-bind:item="item" />
      <div class="row">
        <weightDonutChart v-bind:item="item" /> <kcalChart v-bind:item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import nutrientTable from "../ProductPage/nutrientTable";
import weightDonutChart from "../ProductPage/weightDonutChart";
import kcalChart from "../ProductPage/kcalChart";
import { eventBus } from "../../main.js";

export default {
  components: {
    nutrientTable,
    weightDonutChart,
    kcalChart,
  },
  data() {
    return {
      item: [],
      display: false,
    };
  },
  created() {
    eventBus.$on("displaySelected", (data) => {
      this.item = data;
      this.display = true;
    });
  },
};
</script>

<style scoped>
h3 {
  margin-left: 1%;
}
</style>
