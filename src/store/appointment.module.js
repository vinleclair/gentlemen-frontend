import Vue from "vue";
import {
    AppointmentsService
} from "@/common/api.service";
import {
    APPOINTMENT_SCHEDULE,
    APPOINTMENT_SELECT_BARBER,
    APPOINTMENT_SELECT_DATE,
    APPOINTMENT_SELECT_TIME,
    APPOINTMENT_RESET_STATE,
} from "./actions.type";
import {
    SET_APPOINTMENT,
    SET_BARBER,
    SET_DATE,
    SET_TIME,
    RESET_STATE,
} from "./mutations.type";

const initialState = {
    appointment: {
        name: "",
        email: "",
        barberId: "",
        date: "",
        time: ""
    }
}

export const state = { ...initialState };

export const actions = {
    [APPOINTMENT_SCHEDULE]({ state }) {
        return AppointmentsService.create(state.appointment);
    },
    [APPOINTMENT_SELECT_BARBER](context, barberId) {
        context.commit(SET_BARBER, barberId);
    },
    [APPOINTMENT_SELECT_DATE]({context, date}) {
        context.commit(SET_DATE, date);
    },
    [APPOINTMENT_SELECT_TIME]({context, time}) {
        context.commit(SET_TIME, time);
    },
    [APPOINTMENT_RESET_STATE]({ commit }) {
        commit(RESET_STATE);
    }
};

export const mutations = {
    [SET_APPOINTMENT](state, appointment) {
        state.appointment = appointment;
    },
    [SET_BARBER](state, barberId) {
        state.appointment.barberId = barberId;
    },
    [SET_DATE](state, date) {
        state.appointment.date = date;
    },
    [SET_TIME](state, time) {
        state.appointment.time = time;
    },
    [RESET_STATE]() {
        for (let f in state) {
            Vue.set(state, f, initialState[f]);
        }
    }
};

export const getters = {
    appointment(state) {
        return state.appointment;
    }
};

export default{
    state,
    actions,
    mutations,
    getters
};