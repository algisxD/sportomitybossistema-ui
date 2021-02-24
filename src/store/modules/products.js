import axios from "axios";

const state = {
  products: [],
};

const getters = {
  allProducts: (state) => state.products,
};

const actions = {
  async fetchProducts({ commit }) {
    const response = await axios.get("https://localhost:44397/api/Produktas");
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
