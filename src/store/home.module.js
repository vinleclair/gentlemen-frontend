import {BarbersService} from "@/common/api.service";
import { FETCH_BARBERS } from "./actions.type";
import { SET_BARBERS } from "./mutations.type";

const state = {
    barbers: [],
    services: [],
}

const getters = {
    barbers(state) {
        return state.barbers;
    }
};

export const actions = {
    async [FETCH_BARBERS]({commit}) {
        return BarbersService.get()
            .then(({data}) => {
                commit(SET_BARBERS, data.barbers);
            })
            .catch(error => {
                throw new Error(error);
            });
    }
};

export const mutations = {
    [SET_BARBERS](state, barbers) {
        state.barbers = barbers;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};