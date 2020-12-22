<template>
  <div class="kmi">
    <fieldset class="kmi">
      <br />
      <div class="form-group kmi">
        <div style="margin-top: 120px;">
          <p>
            <span class="font-bold">Jūsų KMI: </span>
            <span v-if="BMI > 24.9 || BMI < 20" class="text-red-600">{{
              BMI
            }}</span>
            <span v-else class="text-green-600">{{ BMI }}</span>
          </p>
        </div>
        <div>
          <p v-if="BMI > 24.9" class="text-red-600 font-bold">
            Viršsvoris
          </p>
          <p v-else-if="BMI < 20" class="text-red-600 font-bold">
            Per mažas svoris
          </p>
          <p v-else class="text-green-600 font-bold">Normalus svoris</p>
        </div>
        <div style="margin-top: 100px; width: 780px;">
          <backButton />
        </div>
        <br />
      </div>
    </fieldset>
  </div>
</template>

<script>
import backButton from "./backButton";
export default {
  components: {
    backButton,
  },
  props: ["BMI", "isCalculated"],
};
</script>

<style scoped>
.kmi {
  height: 400px;
}
div {
  width: 800px;
  display: table;
}

p {
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  font-size: 40px;
}
</style>
