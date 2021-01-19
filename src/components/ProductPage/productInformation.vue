<template>
  <div class="col-lg-6" style="float: left; margin: 1%; margin-left: 3%">
    <div class="cardBackground">
      <h3 style="margin-bottom: 20px;">
        Maistinių medžiagų skaičius 100 gramų produkto:
      </h3>
      <template>
        <nutrientTable />
        <div>aaa</div>
      </template>
    </div>
  </div>
</template>

<script>
import nutrientTable from "../ProductPage/nutrientTable";

export default {
  components: {
    nutrientTable,
  },
};
</script>

<style scoped>
h3 {
  margin-left: 1%;
}
</style>
