<template>
    <v-form
            ref="clientDetailsForm"
    >
        <v-container>
        <v-row justify="center">
            <v-col align="center">

        <v-text-field
                v-model="clientName"
                :rules="clientNameRules"
                label="Name"
                ref="name"
                style="width: 25%;"
                required
        ></v-text-field>
        <v-text-field
                justify="center"
                style="width: 25%;"
                v-model="clientEmail"
                :rules="clientEmailRules"
                label="Email"
                ref="email"
                required
        ></v-text-field>
            </v-col>
        </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import {
        APPOINTMENT_SET_CLIENT_NAME,
        APPOINTMENT_SET_CLIENT_EMAIL,
    } from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: "ClientDetailsForm",
        data() {
            return {
                clientNameRules: [
                    v => !!v || 'Name is required',
                ],
                clientEmailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            };
        },
        computed: {
            ...mapGetters(["appointment"]),
            clientName: {
                set(clientName) {
                    if (this.$refs.name.validate()) {
                        this.$store.dispatch(APPOINTMENT_SET_CLIENT_NAME, clientName)
                    }
                },
                get() {
                    return this.appointment.clientName
                }
            },
            clientEmail: {
                set(clientEmail) {
                    if (this.$refs.email.validate()) {
                        this.$store.dispatch(APPOINTMENT_SET_CLIENT_EMAIL, clientEmail);
                    }
                },
                get() {
                    return this.appointment.clientEmail
                }
            }
        }
    };
</script>