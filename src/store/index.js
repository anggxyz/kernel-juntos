import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: "",
    network: "",
    chainId: "",
    currentOwner: "",
    claim_status: "",
    panelOpen: false,
    tokenMetadata: {},
    token: ""
  },
  mutations: {
    change(state, obj) {
      state.account = obj.account;
      state.network = obj.network;
      state.chainId = obj.chainId;
    },
    updateOwner(state, obj) {
      state.currentOwner = obj.currentOwner;
      state.claim_status = obj.claim_status;
    },
    togglePanel(state, bool) {
      state.panelOpen = bool;
    },
    updateTokenMetadata(state, json) {
      state.tokenMetadata = json;
    },
    addToken(state, token) {
      state.token = token;
    }
  },
  getters: {
    account: state => state.account,
    network: state => state.network,
    chainId: state => state.chainId,
    currentOwner: state => state.currentOwner,
    claim_status: state => state.claim_status,
    panelOpen: state => state.panelOpen,
    tokenMetadata: state => state.tokenMetadata,
    token: state => state.token
  },
  actions: {},
  modules: {}
});
