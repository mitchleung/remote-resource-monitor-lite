import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cpu: null,
    mem: null,
    cpuTemp: null,
    perCpuTemp: null,
  },
  mutations: {
    setData(state, payload) {
      state.cpu = payload.cpu;
      state.cpuTemp = payload.cpuTemp;
      state.mem = payload.mem;
      state.perCpuTemp = payload.perCpuTemp;
    },
  },
  actions: {},
  modules: {},
});
