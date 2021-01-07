<template>
  <div>
    <h2
      class="page-title text-blue-500 border-b"
      style="margin-left: 2%; margin-top: 1%;"
    >
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.border-b {
  border-bottom-width: 1px;
  padding-bottom: 1%;
}
</style>
