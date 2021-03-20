<template>
  <nav>
    <ul>
      <figure class="image-logo">
        <img
          :src="imagePath"
          height="40px"
          width="40px"
          style="margin-top: 5px; margin-left: 5px;"
        />
      </figure>
      <template>
        <li
          v-for="(link, index) in filteredNav"
          :key="index"
          @mouseenter="
            $event.currentTarget.style.background = hoverBackground || '#999'
          "
          @mouseleave="
            $event.currentTarget.style.background = background || '#333'
          "
        >
          <router-link :to="link.path" :style="{ color: linkColor || '#DDD' }">
            {{ link.text }}
            <i :class="link.icon" />
          </router-link>
        </li>
        <li
          v-if="!authenticated"
          @mouseenter="
            $event.currentTarget.style.background = hoverBackground || '#999'
          "
          @mouseleave="
            $event.currentTarget.style.background = background || '#333'
          "
        >
          <router-link :to="'/login'" :style="{ color: linkColor || '#DDD' }">
            Prisijungti
            <i :class="'ion-ios-log-in'" />
          </router-link>
        </li>
        <li
          v-if="authenticated"
          @mouseenter="
            $event.currentTarget.style.background = hoverBackground || '#999'
          "
          @mouseleave="
            $event.currentTarget.style.background = background || '#333'
          "
        >
          <a :to="'/'" :style="{ color: linkColor || '#DDD' }">
            {{ user.email }}
            <i :class="'ion-ios-person'" />
          </a>
        </li>
        <li
          @click.prevent="signOut"
          v-if="authenticated"
          @mouseenter="
            $event.currentTarget.style.background = hoverBackground || '#999'
          "
          @mouseleave="
            $event.currentTarget.style.background = background || '#333'
          "
        >
          <router-link :to="'/'" :style="{ color: linkColor || '#DDD' }">
            Atsijungti
            <i :class="'ion-ios-log-out'" />
          </router-link></li
      ></template>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data: () => {
    return {
      afterSignIn: ["Atsijungti"],
    };
  },
  props: [
    "navLinks",
    "background",
    "linkColor",
    "hoverBackground",
    "imagePath",
    "sportOptions",
  ],
  methods: {
    showAfterSignIn(text) {
      if (this.afterSignIn(text)) return true;
    },
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({
          name: "Home",
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
    filteredNav() {
      if (this.authenticated) return this.navLinks;
      else {
        return this.navLinks.filter((item) => {
          return item.needsAuthorization === false;
        });
      }
    },
  },
};
</script>

<style scoped>
nav {
  height: 60px;
  width: 100%;
  background-color: #333;
  position: relative;
}
ul {
  display: flex;
  height: 100%;
  align-items: center;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
}
a {
  text-decoration: none;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}
li {
  list-style-type: none;
  padding: 10px 20px;
}
figure {
  cursor: pointer;
  padding-right: 10px;
}
i {
  margin-right: 10px;
  font-size: 22px;
}
#SignInOff {
  float: right;
}
</style>
