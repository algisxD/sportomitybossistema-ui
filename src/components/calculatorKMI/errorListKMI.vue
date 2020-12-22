<template>
    <p v-if="errors.length">
                <b>Ištaisykite šias klaida(s):</b>
                <ul>
                  <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
              </p>
</template>

<script>
export default {
  props: ["errors"],
};
</script>