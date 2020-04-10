import Vue from "vue";
import {
    AppointmentsService
} from "@/common/api.service";
import {
    APPOINTMENT_SCHEDULE,
    APPOINTMENT_DELETE,
    APPOINTMENT_EDIT,
    APPOINTMENT_RESET_STATE,
    FETCH_APPOINTMENT

} from "./actions.type";
import {
    SET_APPOINTMENT,
    RESET_STATE,
} from "./mutations.type";

const initialState = {
    appointment: {
        name: "",
        email: "",
        //TODO: add date field
        //TODO: add barber field
        //TODO: add haircut type field
    }
}

export const state = { ...initialState };

export const actions = {
    async [FETCH_APPOINTMENT](context, appointmentSlug, prevAppointment) {
        if (prevAppointment !== undefined) {
            return context.commit(SET_APPOINTMENT, prevAppointment);
        }
        const { data } = await AppointmentsService.get(appointmentSlug);
        context.commit(SET_APPOINTMENT, data.appointment);
        return data;
    },
    [APPOINTMENT_SCHEDULE]({ state }) {
        return AppointmentsService.create(state.appointment);
    },
    [APPOINTMENT_DELETE](context, slug) {
        return AppointmentsService.destroy(slug);
    },
    [APPOINTMENT_EDIT]({ state }) {
        return AppointmentsService.update(state.appointment.slug, state.appointment);
    },
    [APPOINTMENT_RESET_STATE]({ commit }) {
        commit(RESET_STATE);
    }
};

export const mutations = {
    [SET_APPOINTMENT](state, appointment) {
        state.appointment = appointment;
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