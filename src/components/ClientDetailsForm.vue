<template>
    <v-container>
        <GmListErrors :errors="errors" />
        {{this.$store.state}}
        <v-form
                ref="clientDetailsForm"
                v-model="valid"
        >
            <v-text-field
                    @input="updateName"
                    :value="name"
                    :rules="nameRules"
                    label="Name"
            ></v-text-field>

            <v-text-field
                    @input="updateEmail"
                    :value="email"
                    :rules="emailRules"
                    label="E-mail"
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
    import GmListErrors from "@/components/ListErrors";
    import {
        APPOINTMENT_UPDATE_NAME,
        APPOINTMENT_UPDATE_EMAIL,
        APPOINTMENT_SCHEDULE,
    } from "@/store/actions.type";

    export default {
        name: "ClientDetailsForm",
        components: { GmListErrors },
        props: {
            selectedBarberId: {
                type: Number,
                required: false
            }
        },
        data() {
            return {
                errors: {},
                valid: false,
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
            updateName (name) {
                this.$store.dispatch(APPOINTMENT_UPDATE_NAME, name);
            },
            updateEmail (email) {
                this.$store.dispatch(APPOINTMENT_UPDATE_EMAIL, email);
            },
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