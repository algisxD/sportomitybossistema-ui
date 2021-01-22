<template>
  <div class="centered-container">
    <form class="form" novalidate @submit.prevent="login">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Prisijungimas</div>
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
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <div class="actions md-layout md-alignment-center-space-between">
            <a href="/#/register" style="margin-right: 250px;">Registracija</a>
          </div>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="sending"
            >Prisijungti</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
//import Vue from "vue";
import { mapActions } from "vuex";
//import { swal } from "vue/types/umd";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
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
    },
    ...mapActions({
      signIn: "auth/signIn",
    }),
    login() {
      this.sending = true;
      this.signIn(this.form).then(() => {
        this.$router.replace({
          name: "Home",
        });
      });

      /* .then((response) => {
          const token = response.data.token;
          localStorage.setItem("access_token", token);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            Vue.swal("Klaida", "Netinkami prisijungimo duomenys.", "error", {
              button: "asdasd",
            });
          } else {
            Vue.swal(
              "Klaida",
              "Vidinė serverio klaida, susisiekite su administracija",
              "error"
            );
          }
        }); */

      this.sending = false;
      this.clearForm();
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
