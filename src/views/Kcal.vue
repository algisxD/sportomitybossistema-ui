<template>
  <div id="wrapper">
    <div>
      <input
        type="file"
        @change="onFileSelected"
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
