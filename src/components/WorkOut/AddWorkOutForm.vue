<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateWorkOut">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Pridėkite treniruotę</div>
        </md-card-header>
        <md-card-content style="margin-right: 0px">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Treniruotės pavadinimas</label>
                <md-input
                  name="name"
                  id="name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.name.required"
                  >Treniruotės pavadinimas yra privalomas</span
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
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('type')">
                <label>Treniruotės tipas</label>
                <md-input
                  type="type"
                  id="type"
                  v-model="form.type"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.type.required"
                  >Treniruotės pavadinimas yra privalomas</span
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
            >Sukurti</md-button
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
  props: ["sportProgramId"],
  data: () => ({
    showDialog: false,
    form: {
      name: undefined,
      dayOfTheWeek: undefined,
      type: undefined,
    },
    workout: {
      pavadinimas: undefined,
      sukurimoData: undefined,
      savaitesDiena: undefined,
      savaitesDienosSkaitineReiksme: undefined,
      treniruotesTipas: undefined,
      sportoProgramaId: undefined,
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
      type: {
        required,
      },
    },
  },
  methods: {
    getNow() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time = undefined;

      if (today.getHours() > 9) {
        time = today.getHours() + ":";
      } else {
        time = "0" + today.getHours() + ":";
      }

      if (today.getMinutes() > 9) {
        time = time + today.getMinutes() + ":";
      } else {
        time = time + "0" + today.getMinutes() + ":";
      }

      if (today.getSeconds() > 9) {
        time = time + today.getSeconds();
      } else {
        time = time + "0" + today.getSeconds();
      }

      const dateTime = date + "T" + time + "Z";
      return dateTime;
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
        return 0;
      }
    },
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
    async createNewWorkOut() {
      this.sending = true;

      this.workout.pavadinimas = this.form.name;
      this.workout.sukurimoData = this.getNow();
      this.workout.savaitesDiena = this.form.dayOfTheWeek;
      this.workout.savaitesDienosSkaitineReiksme = this.getDayOfTheWeekFromName(
        this.form.dayOfTheWeek
      );
      this.workout.treniruotesTipas = this.form.type;
      this.workout.sportoProgramaId = this.sportProgramId;
      this.workout.vartotojasId = this.userId;

      await axios
        .post("treniruote", this.workout)
        .then(() => {
          Vue.swal("", "Treniruotė sėkmingai sukurta", "success");
          this.$emit("closeDialog");
          eventBus.$emit("updateWorkOutTable", this.sportProgramId);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.swal("Klaida", "Netinkami pratimo duomenys", "error");
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
