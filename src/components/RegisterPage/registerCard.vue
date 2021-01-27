<template>
  <div class="centered-container">
    <form class="form" novalidate @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Registracija</div>
          <div style="margin-top: 20px;">
            Slaptažodis privalo turėti bent vieną:
            <ul>
              <li>Didžiają raidę</li>
              <li>Mažają raidę</li>
              <li>Skaičių</li>
              <li>Specialų simbolį</li>
            </ul>
          </div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">El. paštas</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required"
              >El. paštas yra privalomas</span
            >
            <span class="md-error" v-else-if="!$v.form.email.email"
              >Netinkamas el. paštas</span
            >
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Slaptažodis</label>
            <md-input
              type="password"
              name="password"
              id="password"
              autocomplete="password"
              v-model="form.password"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.password.required"
              >Slaptažodis yra privalomas</span
            >
            <span class="md-error" v-else-if="!$v.form.password.minLength"
              >Netinkamas slaptažodis</span
            >
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Pakartokite slaptažodį</label>
            <md-input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              autocomplete="password"
              v-model="form.repeatPassword"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.password.required"
              >Slaptažodis yra privalomas</span
            >
            <span class="md-error" v-else-if="!$v.form.password.minLength"
              >Netinkamas slaptažodis</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <div class="actions md-layout md-alignment-center-space-between">
            <button
              @click="$router.go(-1)"
              class="btn btn-danger"
              style="margin-right: 270px;"
              type="button"
            >
              Atgal
            </button>
          </div>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="sending"
            >Registruotis</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import Vue from "vue";
//import { swal } from "vue/types/umd";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: "",
      repeatPassword: "",
    },
    registerData: {
      email: null,
      password: "",
    },
    sending: false,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      repeatPassword: {
        required,
        minLength: minLength(8),
        sameAsPassword: sameAs("password"),
      },
    },
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
      this.form.email = null;
      this.form.password = null;
      this.form.repeatPassword = null;
    },
    async register() {
      this.sending = true;
      this.registerData.email = this.form.email;
      this.registerData.password = this.form.password;

      await Vue.axios
        .post("users/register", this.registerData)
        .then(() => {
          Vue.swal("", "Registracija sėkminga", "success");
          this.$router.replace({
            name: "Login",
          });
        })
        .catch((error) => {
          if (error.response.status === 409) {
            Vue.swal(
              "Klaida",
              "Vartotojas su tokiu el-paštu jau egzistuoja",
              "error"
            );
          }
          if (error.response.status === 403) {
            Vue.swal("Klaida", "Netinkamas slaptažodis", "error");
          }
        });

      this.sending = false;
      this.clearForm();
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.register();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 80vh;
}
.title {
  text-align: center;
  margin-bottom: 30px;
}
.actions {
  .md-button {
    margin: 0;
  }
}
.form {
  margin-bottom: 60px;
  width: 450px;
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
ul li {
  list-style-type: circle;
  display: list-item;
  list-style-position: inside;
}
.md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
}
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
