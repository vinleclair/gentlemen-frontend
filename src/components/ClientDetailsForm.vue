<template>
    <v-form
            ref="clientDetailsForm"
            v-model="valid"
    >
        <v-container>
        <v-row justify="center">
            <v-col align="center">

        <v-text-field
                v-model="clientName"
                :rules="clientNameRules"
                label="Name"
                style="width: 25%;"
                required
        ></v-text-field>
        <v-text-field
                justify="center"
                style="width: 25%;"
                v-model="clientEmail"
                :rules="clientEmailRules"
                label="Email"
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
                valid: false,
                clientNameRules: [
                    v => !!v || 'Name is required',
                ],
                clientEmailRules: [
                    v => !!v || 'E-mail is required',
                    v => /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(v) || 'E-mail must be valid',
                ],
            };
        },
        computed: {
            ...mapGetters(["appointment"]),
            clientName: {
                set(clientName) {
                    this.$store.dispatch(APPOINTMENT_SET_CLIENT_NAME, clientName)
                },
                get() {
                    return this.appointment.clientName
                }
            },
            clientEmail: {
                set(clientEmail) {
                    this.$store.dispatch(APPOINTMENT_SET_CLIENT_EMAIL, clientEmail);
                },
                get() {
                    return this.appointment.clientEmail
                }
            },
        },

            watch: {
                valid: function()  {
                    this.$emit('client-form-validity')
                }
            }
    };
</script>