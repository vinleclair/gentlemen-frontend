import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[GM] ApiService ${error}`);
        });
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[GM] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[GM] ApiService ${error}`);
        });
    }
};

export default ApiService;

export const AppointmentsService = {
    query(type, params) {
        return ApiService.query("appointments", {
            params: params
        });
    },
    get(slug) {
        return ApiService.get("appointments", slug);
    },
    create(params) {
        return ApiService.post("appointments", { appointment: params });
    },
    update(slug, params) {
        return ApiService.update("appointments", slug, { appointment: params });
    },
    destroy(slug) {
        return ApiService.delete(`appointments/${slug}`);
    }
};