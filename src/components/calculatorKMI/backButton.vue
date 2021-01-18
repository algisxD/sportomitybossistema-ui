<template>
  <button v-on:click="goBack" class="btn btn-secondary float-right">
    Atgal
  </button>
</template>

<script>
import { eventBus } from "../../main.js";
export default {
  props: ["isCalculated"],
  methods: {
    goBack() {
      eventBus.$emit("changeIsCalculated", false);
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 80px;
}
</style>
