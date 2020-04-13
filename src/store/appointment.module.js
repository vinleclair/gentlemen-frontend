import Vue from "vue";
import {
    AppointmentsService
} from "@/common/api.service";
import {
    APPOINTMENT_SCHEDULE,
    APPOINTMENT_UPDATE_NAME,
    APPOINTMENT_UPDATE_EMAIL,
    APPOINTMENT_SELECT_BARBER,
    APPOINTMENT_UNSET_BARBER,
    APPOINTMENT_SELECT_SERVICE,
    APPOINTMENT_UNSET_SERVICE,
    APPOINTMENT_UPDATE_DATE,
    APPOINTMENT_UPDATE_TIME,
    APPOINTMENT_RESET_STATE,
} from "./actions.type";
import {
    SET_APPOINTMENT,
    SET_BARBER,
    UNSET_BARBER,
    SET_SERVICE,
    UNSET_SERVICE,
    SET_DATE,
    SET_TIME,
    SET_NAME,
    SET_EMAIL,
    RESET_STATE,
} from "./mutations.type";

const initialState = {
    appointment: {
        name: "",
        email: "",
        barberId: "",
        date: "",
        time: "",
        serviceId: ""
    }
}

export const state = {...initialState};

export const actions = {
    [APPOINTMENT_SCHEDULE]({state}) {
        return AppointmentsService.create(state.appointment);
    },
    [APPOINTMENT_SELECT_BARBER](context, barberId) {
        context.commit(SET_BARBER, barberId);
    },
    [APPOINTMENT_UNSET_BARBER](context) {
        context.commit(UNSET_BARBER);
    },
    [APPOINTMENT_SELECT_SERVICE](context, serviceId) {
        context.commit(SET_SERVICE, serviceId);
    },
    [APPOINTMENT_UNSET_SERVICE](context) {
        context.commit(UNSET_SERVICE);
    },
    [APPOINTMENT_UPDATE_DATE](context, date) {
        context.commit(SET_DATE, date);
    },
    [APPOINTMENT_UPDATE_TIME](context, time) {
        context.commit(SET_TIME, time);
    },
    [APPOINTMENT_UPDATE_NAME](context, name) {
        context.commit(SET_NAME, name);
    },
    [APPOINTMENT_UPDATE_EMAIL](context, email) {
        context.commit(SET_EMAIL, email);
    },
    [APPOINTMENT_RESET_STATE]({commit}) {
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
    [UNSET_BARBER](state) {
        state.appointment.barberId = "";
    },
    [SET_SERVICE](state, serviceId) {
        state.appointment.serviceId = serviceId;
    },
    [UNSET_SERVICE](state) {
        state.appointment.serviceId = "";
    },
    [SET_DATE](state, date) {
        state.appointment.date = date;
    },
    [SET_TIME](state, time) {
        state.appointment.time = time;
    },
    [SET_NAME](state, name) {
        state.appointment.name = name;
    },
    [SET_EMAIL](state, email) {
        state.appointment.email = email;
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

export default {
    state,
    actions,
    mutations,
    getters
};