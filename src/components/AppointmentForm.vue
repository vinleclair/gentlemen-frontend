<template>
    <v-container>
        <GmListErrors :errors="errors" />
        <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="onPublish(appointment.slug)"
                lazy-validation
        >
            <v-text-field
                    :disabled="inProgress"
                    v-model="appointment.name"
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>

            <v-text-field
                    :disabled="inProgress"
                    v-model="appointment.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>

            <v-btn
                    :disabled="!valid || inProgress"
                    color="success"
                    class="mr-4"
                    @click="onPublish(appointment.slug)"
            >
                Submit
            </v-btn>
        </v-form>

    </v-container>
</template>

<script>
    import { mapGetters } from "vuex";
    import store from "@/store";
    import GmListErrors from "@/components/ListErrors";
    import {
        APPOINTMENT_SCHEDULE,
        APPOINTMENT_EDIT,
        FETCH_APPOINTMENT,
        APPOINTMENT_RESET_STATE
    } from "@/store/actions.type";

    export default {
        name: "AppointmentForm",
        components: { GmListErrors },
        props: {
            previousAppointment: {
                type: Object,
                required: false
            }
        },
        async beforeRouteUpdate(to, from, next) {
            await store.dispatch(APPOINTMENT_RESET_STATE);
            return next();
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch(APPOINTMENT_RESET_STATE);
            if (to.params.slug !== undefined) {
                await store.dispatch(
                    FETCH_APPOINTMENT,
                    to.params.slug,
                    to.params.previousAppointment
                );
            }
            return next();
        },
        async beforeRouteLeave(to, from, next) {
            await store.dispatch(APPOINTMENT_RESET_STATE);
            next();
        },
        data() {
            return {
                inProgress: false,
                errors: {},
                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            };
        },
        computed: {
            ...mapGetters(["appointment"])
        },
        methods: {
            onPublish(slug) {
                let action = slug ? APPOINTMENT_EDIT : APPOINTMENT_SCHEDULE;
                this.inProgress = true;
                this.$store
                    .dispatch(action)
                    .then(({ data }) => {
                        this.inProgress = false;
                        this.$router.push({
                            name: "appointment",
                            params: { slug: data.appointment.slug }
                        });
                    })
                    .catch(({ response }) => {
                        this.inProgress = false;
                        this.errors = response.data.errors;
                    });
            },
        }
    };
</script>