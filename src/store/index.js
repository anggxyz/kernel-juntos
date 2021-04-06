import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    event: {
      title: "",
      description: "",
      date_time: "",
      creator: ""
    }
  },
  mutations: {
    updateEvent(state, obj) {
      state.title = obj.title;
      state.description = obj.description;
      state.date_time = obj.date_time;
      state.creator = obj.creator;
    }
  },
  getters: {
    title: state => state.title,
    description: state => state.description,
    date_time: state => state.date_time,
    creator: state => state.creator
  },
  actions: {},
  modules: {}
});
