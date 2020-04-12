<template>
    <v-container>
        <GmListErrors :errors="errors" />
        {{this.$store.state}}
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >
            <v-text-field
                    v-model="appointment.name"
                    :rules="nameRules"
                    label="Name"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="appointment.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>

            <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="onSchedule(appointment)"
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
    } from "@/store/actions.type";

    export default {
        name: "ClientDetailsForm",
        components: { GmListErrors },
        props: {
            selectedBarberId: {
                type: Number,
                required: false
            },
            previousAppointment: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
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
            onSchedule(appointment) {
                this.$store
                    .dispatch(APPOINTMENT_SCHEDULE, { appointment })
                    .catch(({ response }) => {
                        this.errors = response.data.errors;
                    });
            },
        }
    };
</script>