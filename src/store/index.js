import Vue from 'vue'
import Vuex from 'vuex'

import home from "./home.module";

Vue.use(Vuex)

export default new Vuex.Store({
    //TODO remove strict mode for production
    strict: true,
    modules: {
        home,
    }
})
