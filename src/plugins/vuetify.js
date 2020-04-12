import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#795548',
                secondary: '#A1887F',
                accent: '#FFCA28',
                error: '#b71c1c',
            },
        },
    },
});