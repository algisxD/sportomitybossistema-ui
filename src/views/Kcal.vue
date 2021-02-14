<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true"
      >Show Dialog</md-button
    >
  </div>
</template>

<script>
export default {
  name: "DialogCustom",
  data: () => ({
    showDialog: false,
  }),
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
