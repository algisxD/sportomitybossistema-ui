<template>
  <div>
    <table class="table table-hover table-dark table-margins">
      <thead>
        <tr>
          <th scope="col">Pavadinimas</th>
          <th scope="col">Serijų skaičius</th>
          <th scope="col">Pakartojimų skaičius</th>
          <th scope="col">Aprašymas</th>
          <th scope="col">Veiksmai</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exercise, index) in exercises" :key="index">
          <td>{{ exercise.pavadinimas }}</td>
          <td>{{ exercise.serijuSkaicius }}</td>
          <td>{{ exercise.pakartojimuSkaicius }}</td>
          <td style="width: 30%;">{{ exercise.aprasymas }}</td>
          <td>
            <b-button-group>
              <b-button variant="outline-light">Ištrinti</b-button>
              <b-button variant="outline-light">Redaguoti</b-button>
            </b-button-group>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["exercises"],
};
</script>

<style scoped></style>
