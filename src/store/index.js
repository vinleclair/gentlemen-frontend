import Vue from 'vue'
import Vuex from 'vuex'

import appointment from "./appointment.module";

Vue.use(Vuex)

export default new Vuex.Store({
    //TODO remove strict mode for production
    strict: true,
    modules: {
        appointment,
    }
})
