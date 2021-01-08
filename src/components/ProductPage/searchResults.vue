<template>
  <div>
    <div
      v-for="(product, index) in filteredItems"
      :key="index"
      class="text-green-200 border-b search-results"
    >
      {{ product.pavadinimas }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["filteredItems"],
  methods: {},
};
</script>

<style scoped>
.search-results {
  font-size: 20px;
  margin-bottom: 20px;
  width: 600px;
}
</style>
