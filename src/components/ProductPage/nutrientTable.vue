<template>
  <div>
    <md-table class="kcalTable">
      <md-table-row>
        <md-table-head>Kalorijos</md-table-head>
        <md-table-head>Vanduo</md-table-head>
        <md-table-head>Baltymai</md-table-head>
        <md-table-head>Angliavandeniai</md-table-head>
        <md-table-head>Riebalai</md-table-head>
        <md-table-head>Druska</md-table-head>
      </md-table-row>

      <md-table-row>
        <md-table-cell>{{ item.kcal }} kcal</md-table-cell>
        <md-table-cell>{{ item.vanduo }} ml</md-table-cell>
        <md-table-cell>{{ item.baltymai }} g</md-table-cell>
        <md-table-cell>{{ item.angliavandeniai }} g</md-table-cell>
        <md-table-cell>{{ item.riebalai }} g</md-table-cell>
        <md-table-cell>{{ item.druska }} g</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  data() {
    return {
      item: [],
    };
  },
  props: {
    //tableValues,
  },
  created() {
    eventBus.$on("displaySelected", (data) => {
      this.item = data;
    });
  },
};
</script>

<style scoped>
.kcalTable {
  height: 90%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
