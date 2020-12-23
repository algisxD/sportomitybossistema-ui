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
      <li
        v-for="(link, index) in navLinks"
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
      <li>
        <Dropdown v-bind:sportOptions="sportOptions" />
      </li>
    </ul>
  </nav>
</template>

<script>
import Dropdown from "@/components/Dropdown";

export default {
  components: {
    Dropdown,
  },
  props: [
    "navLinks",
    "background",
    "linkColor",
    "hoverBackground",
    "imagePath",
    "sportOptions",
  ],
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

/* @media screen and (max-width: 759px) {
  nav {
    
  }
  ul {
    position: absolute;
    width: 300px;
    flex-direction: column;
  }
  li {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  a {
    flex-direction: row;
    margin-left: 20px;
    justify-content: space-between;
    margin-right: 13px;
  }
} */
</style>
