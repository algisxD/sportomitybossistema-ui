<template>
  <div>
    <div class="inside">
      <h3>
        {{ recipe.pavadinimas }}
      </h3>
      <h5>Porcijų skaičius: {{ recipe.porcijuSkaicius }}</h5>
      <h5>
        Gaminimo laikas: {{ recipe.gaminimoLaikas }} min.
        <i :class="'ion-md-clock'" />
      </h5>
      <h5></h5>
      <div class="image">
        <img
          :src="require('../../assets/uploads/' + recipe.nuotrauka)"
          alt="Patiekalai"
        />
      </div>
      <div></div>
      <div>
        <table class="table table-hover table-dark">
          <thead>
            <tr>
              <th scope="col">Ingredientas</th>
              <th scope="col">Kiekis</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ingredient, index) in recipe.ingridientai" :key="index">
              <td>{{ ingredient.produktas.pavadinimas }}</td>
              <td>{{ ingredient.kiekis }} g</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="kazkas">
        <h5>Paruošimas:</h5>
        <p>{{ recipe.aprasymas }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["recipe"],
};
</script>

<style scoped>
p {
  font-size: 18px;
  white-space: pre-line;
}
.inside {
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
}
.row {
  margin-left: 1%;
}
.image {
  margin-bottom: 25px;
  margin-top: 25px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding-bottom: 2%;
  padding-top: 2%;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 70%;
  width: 70%;
}
</style>
