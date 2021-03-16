<template>
  <div>
    <form class="form" novalidate @submit.prevent="validateExercise">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Pridėkite sporto programą</div>
        </md-card-header>
        <md-card-content style="margin-right: 0px">
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label>Sporto programos pavadinimas</label>
                <md-input
                  name="name"
                  id="name"
                  v-model="form.name"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.name.required"
                  >Sporto programos pavadinimas yra privalomas</span
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
  data: () => ({
    showDialog: false,
    form: {
      name: undefined,
    },
    sportProgram: {
      pavadinimas: undefined,
      sukurimoData: undefined,
      arAktyvi: false,
      vartotojasId: undefined,
    },
    sending: false,
  }),
  validations: {
    form: {
      name: {
        required,
      },
    },
  },
  created() {},
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];
      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
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
    clearForm() {
      this.$v.$reset();
    },
    async createNewExercise() {
      this.sending = true;

      this.sportProgram.pavadinimas = this.form.name;
      this.sportProgram.sukurimoData = this.getNow();
      this.sportProgram.vartotojasId = this.userId;

      await axios
        .post("sportoPrograma", this.sportProgram)
        .then(() => {
          Vue.swal("", "Sporto programa sėkmingai sukurta", "success");
          this.$emit("closeDialog");
          eventBus.$emit("updateSportProgramTable");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.swal("Klaida", "Netinkami Sporto programos duomenys", "error");
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
    validateExercise() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createNewExercise();
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
ul li {
  list-style-type: circle;
  display: list-item;
  list-style-position: inside;
}
</style>
