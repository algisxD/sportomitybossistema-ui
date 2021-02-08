<template>
  <div class="d-flex justify-content-between align-items-center">
    <PageTitle v-bind:title="title" />
    <div>Showing {{ start }} to {{ stop }} of {{ total }}</div>
    <ul>
      <li>asdasd</li>
      <li>asdasd</li>
      <li>fdsgsdfgsd</li>
    </ul>
    <li>asd</li>
    <li>sadasd</li>
    <pagination
      v-model="page"
      :page-count="pageCount"
      :classes="paginationClasses"
      :labels="customLabels"
    />
  </div>
</template>

<script>
import Pagination from "vue-plain-pagination";
import PageTitle from "../components/PageTitle";

export default {
  components: {
    Pagination,
    PageTitle,
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      paginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
      customLabels: {
        first: false,
        prev: "Previous",
        next: "Next",
        last: false,
      },
    };
  },

  computed: {
    page: {
      get() {
        return parseInt(this.$route.query.page || 1);
      },

      set(v) {
        if (v > 0 && v !== this.page) {
          this.$router.push({
            path: this.$route.path,
            query: { ...this.$route.query, page: v, sz: this.sz },
          });
        }
      },
    },

    sz() {
      return parseInt(this.$route.query.sz || 25);
    },

    pageCount() {
      return Math.ceil(this.total / this.sz);
    },

    start() {
      return this.sz * (this.page - 1) + 1;
    },

    stop() {
      const stop = this.start - 1 + this.sz;

      return stop > this.total ? this.total : stop;
    },
  },
};
</script>

<style scoped>
@import "http://getbootstrap.com/docs/4.1/components/pagination/";
</style>
