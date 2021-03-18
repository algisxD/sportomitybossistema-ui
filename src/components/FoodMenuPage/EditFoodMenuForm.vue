<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateWorkOut">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Redaguoti valgiaraštį</div>
        </md-card-header>
        <md-card-content style="margin-right: 0px">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Valgiaraščio pavadinimas</label>
                <md-input
                  name="name"
                  id="name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.name.required"
                  >Valgiaraščio pavadinimas yra privalomas</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('dayOfTheWeek')">
                <label>Savaitės diena</label>
                <md-select
                  name="dayOfTheWeek"
                  id="dayOfTheWeek"
                  v-model="form.dayOfTheWeek"
                  :disabled="sending"
                >
                  <md-option value="Pirmadienis">Pirmadienis</md-option>
                  <md-option value="Antradienis">Antradienis</md-option>
                  <md-option value="Trečiadienis">Trečiadienis</md-option>
                  <md-option value="Ketvirtadienis">Ketvirtadienis</md-option>
                  <md-option value="Penktadienis">Penktadienis</md-option>
                  <md-option value="Šeštadienis">Šeštadienis</md-option>
                  <md-option value="Sekmadienis">Sekmadienis</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.dayOfTheWeek.required"
                  >Savaitės diena yra privaloma</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="sending"
            >Redaguoti</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import axios from "axios";
import Vue from "vue";
import { eventBus } from "../../main.js";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  props: ["foodMenu"],
  data: () => ({
    showDialog: false,
    form: {
      name: undefined,
      dayOfTheWeek: undefined,
    },
    foodMenuForUpdate: {
      id: undefined,
      pavadinimas: undefined,
      sukurimoData: undefined,
      savaitesDiena: undefined,
      savaitesDienosSkaitineReiksme: undefined,
      arAktyvus: undefined,
      vartotojasId: undefined,
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
      dayOfTheWeek: {
        required,
      },
    },
  },
  created() {
    this.form.name = this.foodMenu.pavadinimas;
    this.form.dayOfTheWeek = this.foodMenu.savaitesDiena;
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
    },
    getDayOfTheWeekFromName(name) {
      if (name == "Pirmadienis") {
        return 1;
      }
      if (name == "Antradienis") {
        return 2;
      }
      if (name == "Trečiadienis") {
        return 3;
      }
      if (name == "Ketvirtadienis") {
        return 4;
      }
      if (name == "Penktadienis") {
        return 5;
      }
      if (name == "Šeštadienis") {
        return 6;
      }
      if (name == "Sekmadienis") {
        return 7;
      }
    },
    async createNewWorkOut() {
      this.sending = true;

      this.foodMenuForUpdate.id = this.foodMenu.id;
      this.foodMenuForUpdate.pavadinimas = this.form.name;
      this.foodMenuForUpdate.sukurimoData = this.foodMenu.sukurimoData;
      this.foodMenuForUpdate.savaitesDiena = this.form.dayOfTheWeek;
      this.foodMenuForUpdate.savaitesDienosSkaitineReiksme = this.getDayOfTheWeekFromName(
        this.form.dayOfTheWeek
      );
      this.foodMenuForUpdate.arAktyvus = this.foodMenu.arAktyvus;
      this.foodMenuForUpdate.vartotojasId = this.userId;
      console.log(this.foodMenuForUpdate);

      await axios
        .put(
          "valgiarastis/" + this.foodMenuForUpdate.id,
          this.foodMenuForUpdate
        )
        .then(() => {
          Vue.swal("", "Valgiaraštis sėkmingai atnaujintas", "success");
          this.$emit("closeDialog");
          eventBus.$emit("updateFoodMenuTable", this.foodMenu.sportoProgramaId);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.swal("Klaida", "Netinkami Valgiaraščio duomenys", "error");
          } else {
            Vue.swal(
              "Klaida",
              "Serverio klaida, susisiekite su administracija",
              "error"
            );
          }
        });

      this.sending = false;
      this.clearForm();
    },
    validateWorkOut() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewWorkOut();
      }
    },
  },
  computed: {
    ...mapGetters({
      userId: "auth/userId",
    }),
  },
};
</script>

<style scoped lang="scss">
.description {
  margin-top: 30px;
  margin-bottom: 20px;
}
.quantity-product {
  margin-bottom: 20px;
}
</style>
