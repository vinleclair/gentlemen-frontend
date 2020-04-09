import Vue from 'vue'
import Vuex from 'vuex'

import appointment from "./appointment.module";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appointment,
  }
})
