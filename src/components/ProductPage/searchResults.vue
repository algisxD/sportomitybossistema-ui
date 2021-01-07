<template>
  <div>
    <div v-for="(product, index) in filteredItems" :key="index">
      {{ product.pavadinimas }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["filteredItems"],
};
</script>

<style scoped></style>
