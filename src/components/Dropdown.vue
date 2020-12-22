<template>
  <div>
    <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
      <b-dropdown-item v-for="(option, index) in sportOptions" :key="index">
        {{ option.text }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["sportOptions"],
};
</script>

<style scoped></style>
