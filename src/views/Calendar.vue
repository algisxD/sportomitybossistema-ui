<template>
  <div>
    <PageTitle v-bind:title="title" />

    <div>
      <v-btn elevation="2"></v-btn>
    </div>
  </div>
</template>

<script>
import PageTitle from "../components/PageTitle";

export default {
  components: {
    PageTitle,
  },
  data: () => ({
    title: "Kalendorius",
  }),
  methods: {
    displaySelectedSportProgram(item) {
      this.selectedSportProgram = item;
    },
  },
};
</script>

<style scoped>
.check-box {
  width: 20px;
  height: 20px;
}
.table-margins {
  margin-top: 30px;
  margin-bottom: 30px;
}
.table-button {
  margin-left: 10px;
}
</style>
