import Vue from "vue";
import {
    AppointmentsService,
    BarbersService,
    ServicesService
} from "@/common/api.service";
import {
    APPOINTMENT_SCHEDULE,
    APPOINTMENT_SET_CLIENT_NAME,
    APPOINTMENT_SET_CLIENT_EMAIL,
    APPOINTMENT_SET_BARBER,
    APPOINTMENT_SET_SERVICE,
    APPOINTMENT_SET_DATE,
    APPOINTMENT_SET_TIME,
    FETCH_BARBERS,
    FETCH_UPCOMING_APPOINTMENTS,
    FETCH_SERVICES, APPOINTMENT_RESET_STATE, APPOINTMENT_UNSET_DATE, APPOINTMENT_UNSET_TIME
} from "./actions.type";
import {
    SET_BARBER,
    SET_SERVICE,
    SET_DATE,
    UNSET_DATE,
    SET_TIME,
    UNSET_TIME,
    SET_CLIENT_NAME,
    SET_CLIENT_EMAIL,
    SET_UPCOMING_APPOINTMENTS,
    SET_FETCHED_BARBERS,
    SET_FETCHED_SERVICES, RESET_APPOINTMENT_STATE
} from "./mutations.type";

const initialAppointmentState = {
    appointment: {
        clientName: "",
        clientEmail: "",
        barberId: "",
        serviceId: "",
        date: "",
        time: "",
    },
    selections: {
        barberName: "",
        serviceName: "",
    },
    upcomingAppointments: [],

}

export const state = {
    appointment: {
        clientName: "",
        clientEmail: "",
        barberId: "",
        serviceId: "",
        date: "",
        time: "",
    },
    selections: {
        barberName: "",
        serviceName: "",
    },
    upcomingAppointments: [],
    fetchedBarbers: [],
    fetchedServices: [],
};

export const actions = {
    [APPOINTMENT_SCHEDULE]({state}) {
        return AppointmentsService.create(state.appointment);
    },
    [APPOINTMENT_SET_BARBER](context, barber) {
        context.commit(SET_BARBER, barber);
    },
    [APPOINTMENT_SET_SERVICE](context, service) {
        context.commit(SET_SERVICE, service);
    },
    [APPOINTMENT_SET_DATE](context, date) {
        context.commit(SET_DATE, date);
    },
    [APPOINTMENT_UNSET_DATE](context) {
        context.commit(UNSET_DATE);
    },
    [APPOINTMENT_SET_TIME](context, time) {
        context.commit(SET_TIME, time);
    },
    [APPOINTMENT_UNSET_TIME](context) {
        context.commit(UNSET_TIME);
    },
    [APPOINTMENT_SET_CLIENT_NAME](context, name) {
        context.commit(SET_CLIENT_NAME, name);
    },
    [APPOINTMENT_SET_CLIENT_EMAIL](context, email) {
        context.commit(SET_CLIENT_EMAIL, email);
    },
    async [FETCH_BARBERS](context) {
        const { data } = await BarbersService.get();
        context.commit(SET_FETCHED_BARBERS, data.barbers);
        return data.barbers;
    },
    async [FETCH_SERVICES](context) {
        const { data } = await ServicesService.get();
        context.commit(SET_FETCHED_SERVICES, data.services);
        return data.services;
    },
    async [FETCH_UPCOMING_APPOINTMENTS](context, barberId) {
        const { data } = await AppointmentsService.getUpcomingAppointments(barberId);
        context.commit(SET_UPCOMING_APPOINTMENTS, data.upcomingAppointments);
        return data.upcomingAppointments;
    },
    [APPOINTMENT_RESET_STATE](context) {
        context.commit(RESET_APPOINTMENT_STATE)
    }
};

export const mutations = {
    [SET_BARBER](state, barber) {
        state.appointment.barberId = barber.barberId;
        state.selections.barberName = barber.name
    },
    [SET_SERVICE](state, service) {
        state.appointment.serviceId = service.serviceId;
        state.selections.serviceName = service.name
    },
    [SET_DATE](state, date) {
        state.appointment.date = date;
    },
    [UNSET_DATE](state) {
        state.appointment.date = "";
    },
    [SET_TIME](state, time) {
        state.appointment.time = time;
    },
    [UNSET_TIME](state) {
        state.appointment.time = "";
    },
    [SET_CLIENT_NAME](state, name) {
        state.appointment.clientName = name;
    },
    [SET_CLIENT_EMAIL](state, email) {
        state.appointment.clientEmail = email;
    },
    [SET_FETCHED_BARBERS](state, fetchedBarbers) {
        state.fetchedBarbers = fetchedBarbers;
    },
    [SET_FETCHED_SERVICES](state, fetchedServices) {
        state.fetchedServices = fetchedServices;
    },
    [SET_UPCOMING_APPOINTMENTS](state, upcomingAppointments) {
        state.upcomingAppointments = upcomingAppointments;
    },
    [RESET_APPOINTMENT_STATE](state) {
        Object.assign(state, initialAppointmentState)
    }
};

export const getters = {
    appointment(state) {
        return state.appointment;
    },
    fetchedBarbers(state) {
        return state.fetchedBarbers;
    },
    fetchedServices(state) {
        return state.fetchedServices;
    },
    upcomingAppointments(state) {
        return state.upcomingAppointments;
    },
    selections(state) {
        return state.selections;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};