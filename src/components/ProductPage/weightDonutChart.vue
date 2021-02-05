<template>
  <div class="col" style="padding: 0px;">
    <apexchart
      class="chart"
      width="500"
      type="donut"
      :options="options"
      :series="series"
      :labels="labels"
    ></apexchart>
  </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  props: ["item"],
  data: function() {
    return {
      options: {
        labels: ["Angliavandeniai", "Riebalai", "Baltymai", "Vanduo"],
        title: {
          text: "Svorio proporcijos (%)",
        },
      },
      series: [
        this.item.angliavandeniai,
        this.item.riebalai,
        this.item.baltymai,
        this.item.vanduo,
      ],
    };
  },
  methods: {
    update(data) {
      this.series = [
        data.angliavandeniai,
        data.riebalai,
        data.baltymai,
        data.vanduo,
      ];
    },
  },
  created() {
    eventBus.$on("updateChart", (data) => {
      this.update(data);
    });
  },
};
</script>

<style scoped>
.chart {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
}
</style>
