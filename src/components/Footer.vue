<template>
  <footer>
    <div class="row">
      <div class="col-lg-6 left-div">
        <p>{{ footerText }} | algirdas.vasi@gmail.com</p>
      </div>
      <div class="col-lg-6 right-div">
        <p>Sistemos versija: {{ systemVersion }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      footerText: "Copyright © 2021",
      systemVersion: "v1.0.1",
    };
  },
};
</script>

<style scoped>
footer {
  width: 100%;
  background-color: #2a6f78;
  bottom: 0;
  position: fixed;
  padding: 10px;
  z-index: 10;
}
p {
  color: wheat;
}
.left-div {
  text-align: left;
}
.right-div {
  text-align: right;
}
</style>
