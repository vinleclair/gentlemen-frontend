<template>
    <v-form
            ref="clientDetailsForm"
            v-model="valid"
    >
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
    </v-form>
</template>

<script>
    import {
        APPOINTMENT_UPDATE_CLIENT_NAME,
        APPOINTMENT_UPDATE_CLIENT_EMAIL,
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
                // TODO Stricter email validation rules
                clientEmailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            };
        },
        watch: {
            'valid': function (valid) {
                if (valid) {
                    this.$emit('selected-client-name', name)
                    this.$emit('selected-client-email', this.email)

                } else {
                    this.$emit('selected-client-name', null);
                    this.$emit('selected-client-email', null);

                }
            },
        },
        methods: {
            onClientNameChange() {
                this.$store.dispatch(APPOINTMENT_UPDATE_CLIENT_NAME, this.clientName);},
            onClientEmailChange(email) {
                this.$store.dispatch(APPOINTMENT_UPDATE_CLIENT_EMAIL, this.clientEmail);
            }
        }
    };
</script>