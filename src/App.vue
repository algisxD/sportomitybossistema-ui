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
        needsAuthorization: false,
      },
      {
        text: "Produktai",
        path: "/products",
        icon: "ion-ios-search",
        needsAuthorization: false,
      },
      {
        text: "KMI skaičiuoklė",
        path: "/kmi",
        icon: "ion-ios-calculator",
        needsAuthorization: false,
      },
      {
        text: "Receptai",
        path: "/recipes",
        icon: "ion-ios-book",
        needsAuthorization: false,
      },
      {
        text: "Mitybos planavimas",
        path: "/diet",
        icon: "ion-ios-megaphone",
        needsAuthorization: true,
      },
      {
        text: "Sporto planavimas",
        path: "/sportplanning",
        icon: "ion-ios-american-football",
        needsAuthorization: true,
      },
      {
        text: "Mano diena",
        path: "/myday",
        icon: "ion-md-today",
        needsAuthorization: true,
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
