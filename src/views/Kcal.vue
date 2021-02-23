<template>
  <div id="wrapper">
    <h1>{{this.pavadinimas}}</h1>
    <div>
      <input
        type="file"
        @change="onFileSelected"
        accept="image/*"
        enctype="multipart/form-data"
      />
      <button
        type="submit"
        @click="post"
        class="btn btn-primary"
        style="width: 80px;"
      >
        submit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DialogCustom",
  data: () => ({
    image: null,
    pavadinimas: "",
  }),
  methods: {
    onFileSelected(event) {
      this.image = event.target.files[0];
    },
    post() {
      const fd = new FormData();
      fd.append("image", this.image, this.image.name);
      axios.post("Receptas/upload", fd).then((res) => {
        console.log(res);
        this.pavadinimas = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
