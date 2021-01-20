<template>
  <div>
    <div
      v-for="(product, index) in filteredItems"
      :key="index"
      class="border-b search-results resultHover"
      v-on:click="
        displaySelectedItem(product);
        updateChart(product);
      "
    >
      {{ product.pavadinimas }}
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  props: ["filteredItems"],
  methods: {
    displaySelectedItem(item) {
      eventBus.$emit("displaySelected", item);
    },
    updateChart(item) {
      eventBus.$emit("updateChart", item);
    },
  },
};
</script>

<style scoped>
.search-results {
  font-size: 20px;
  margin-bottom: 20px;
  width: 600px;
}
.border-b {
  padding-bottom: 20px;
}
.resultHover:hover {
  text-decoration-line: underline;
  cursor: pointer;
}
</style>
