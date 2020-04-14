import Vue from "vue";
import {
    AppointmentsService,
    BarbersService,
    ServicesService
} from "@/common/api.service";
import {
    APPOINTMENT_SCHEDULE,
    APPOINTMENT_UPDATE_CLIENT_NAME,
    APPOINTMENT_UPDATE_CLIENT_EMAIL,
    APPOINTMENT_SELECT_BARBER,
    APPOINTMENT_UNSET_BARBER,
    APPOINTMENT_SELECT_SERVICE,
    APPOINTMENT_UNSET_SERVICE,
    APPOINTMENT_UPDATE_DATE,
    APPOINTMENT_UPDATE_TIME,
    FETCH_BARBERS,
    FETCH_SERVICES
} from "./actions.type";
import {
    SET_APPOINTMENT,
    SET_BARBER,
    UNSET_BARBER,
    SET_SERVICE,
    UNSET_SERVICE,
    SET_DATE,
    SET_TIME,
    SET_CLIENT_NAME,
    SET_CLIENT_EMAIL,
    SET_BARBERS,
    SET_SERVICES
} from "./mutations.type";

const appointmentInitialState = {
    appointment: {
        clientName: "",
        clientEmail: "",
        barberId: "",
        date: "",
        time: "",
        serviceId: ""
    },
}

export const state = Object.assign({}, {...appointmentInitialState}, { barbers: [], services: [] });

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
    [APPOINTMENT_UPDATE_CLIENT_NAME](context, name) {
        context.commit(SET_CLIENT_NAME, name);
    },
    [APPOINTMENT_UPDATE_CLIENT_EMAIL](context, email) {
        context.commit(SET_CLIENT_EMAIL, email);
    },
    async [FETCH_BARBERS]({ commit }) {
        return BarbersService.get()
            .then(({ data }) => {
                commit(SET_BARBERS, data.barbers);
            })
            .catch(error => {
                throw new Error(error);
            });
    },
    async [FETCH_SERVICES]({ commit }) {
        return ServicesService.get()
            .then(({ data }) => {
                commit(SET_SERVICES, data.services);
            })
            .catch(error => {
                throw new Error(error);
            });
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
    [SET_CLIENT_NAME](state, name) {
        state.appointment.clientName = name;
    },
    [SET_CLIENT_EMAIL](state, email) {
        state.appointment.clientEmail = email;
    },
    [SET_BARBERS](state, barbers) {
        state.barbers = barbers;
    },
    [SET_SERVICES](state, services) {
        state.services = services;
    }
};

export const getters = {
    appointment(state) {
        return state.appointment;
    },
    barbers(state) {
        return state.barbers;
    },
    services(state) {
        return state.services;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};