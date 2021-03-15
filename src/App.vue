<template>
  <div id="app">
    <div class="content">
      <ResponsiveNavigation
        :nav-links="navLinks"
        :image-path="require('./assets/logo.png')"
      />
      <ul class="box-area">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
        ><router-view
      /></transition>
      <Footer />
    </div>
  </div>
</template>

<script>
import ResponsiveNavigation from "@/components/ResponsiveNavigation";
import Footer from "@/components/Footer";

export default {
  components: {
    ResponsiveNavigation,
    Footer,
  },
  methods: {},
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
        text: "Kalendorius",
        path: "/calendar",
        icon: "ion-ios-calendar",
      },
      {
        text: "Mano diena",
        path: "/myday",
        icon: "ion-md-today",
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
#app {
  display: flex;
  height: 100%;
}
#nav {
  padding: 30px;
}
</style>
