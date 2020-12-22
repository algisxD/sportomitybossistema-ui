<template>
  <div
    id="app"
    style="height: 1000px; background-image: linear-gradient(#bdc3c7, #2c3e50);"
  >
    <ResponsiveNavigation
      :nav-links="navLinks"
      :image-path="require('./assets/logo.png')"
    />
    <router-view />
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation";

export default {
  components: {
    ResponsiveNavigation,
  },
  data: () => ({
    navLinks: [
      {
        text: "Pagrindinis",
        path: "/",
        icon: "ion-ios-home",
      },
      {
        text: "Produktai",
        path: "/products",
        icon: "ion-ios-search",
      },
      {
        text: "Kalorijų skaičiuoklė",
        path: "/kcal",
        icon: "ion-ios-megaphone",
      },
      {
        text: "KMI skaičiuoklė",
        path: "/kmi",
        icon: "ion-ios-calculator",
      },
      {
        text: "Mitybos planų parinkimas",
        path: "/diet",
        icon: "ion-ios-train",
      },
      {
        text: "Receptai",
        path: "/recipes",
        icon: "ion-ios-book",
      },
      {
        text: "Sportas",
        path: "/sport",
        icon: "ion-ios-american-football",
      },
      {
        text: "Prisijungti",
        path: "/kmi",
        icon: "ion-ios-log-in",
      },
    ],
  }),
};
</script>

<style src="./assets/tailwind.css">
@import "https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css";

figure {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 10px;
  margin-inline-end: 0;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
