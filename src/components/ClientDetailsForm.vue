<template>
    <v-form
            ref="clientDetailsForm"
            v-model="valid"
    >
        <v-container>
        <v-row justify="center">
            <v-col align="center">

        <v-text-field
                @blur="onClientNameChange"
                v-model="clientName"
                :rules="clientNameRules"
                label="Name"
                style="width: 25%;"

        ></v-text-field>
        <v-text-field
                justify="center"
                style="width: 25%;"
                @blur="onClientEmailChange"
                v-model="clientEmail"
                :rules="clientEmailRules"
                label="Email"
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
    } from "@/store/actions.type";

    export default {
        name: "ClientDetailsForm",
        data() {
            return {
                valid: false,
                clientName: '',
                clientNameRules: [
                    v => !!v || 'Name is required',
                ],
                clientEmail: '',
                clientEmailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            };
        },
        methods: {
            onClientNameChange() {
                this.$store.dispatch(APPOINTMENT_SET_CLIENT_NAME, this.clientName);},
            onClientEmailChange() {
                //TODO Review behavior
                if (this.valid) {
                    this.$store.dispatch(APPOINTMENT_SET_CLIENT_EMAIL, this.clientEmail);
                }
            }
        }
    };
</script>