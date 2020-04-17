import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {API_URL} from "./config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[GM] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },
};

export default ApiService;

export const AppointmentsService = {
    create(params) {
        return ApiService.post("appointments", {appointment: params});
    },

    getUpcomingAppointments(barberId) {
        return ApiService.get("appointments", `upcoming/${barberId}`);
    },
};

export const BarbersService = {
    get() {
        return ApiService.get("barbers");
    }
};

export const ServicesService = {
    get() {
        return ApiService.get("services");
    }
};