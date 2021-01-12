<template>
  <div id="app" style="height: inherit;">
    <ResponsiveNavigation
      :nav-links="navLinks"
      :image-path="require('./assets/logo.png')"
    />
    <router-view />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      style="top: 56%; width:100%; position:absolute; "
    >
      <path
        fill="#ffffff"
        fill-opacity="1"
        d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,229.3C672,224,768,192,864,197.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
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
        path: "/login",
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
#app {
  display: flex;
  height: 100%;
}
#nav {
  padding: 30px;
}
.wave {
  display: block;
}
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.svg {
  display: inline-block;
  position: absolute;
  height: inherit;
  top: 0;
  left: 0;
}
</style>
