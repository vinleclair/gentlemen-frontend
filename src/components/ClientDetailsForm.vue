<template>
    <v-form
            ref="clientDetailsForm"
            v-model="valid"
    >
        <v-text-field
                @input="onNameChange"
                :value="name"
                :rules="nameRules"
                label="Name"
                style="width: 25%;"

        ></v-text-field>

        <v-text-field
                justify="center"
                style="width: 25%;"
                @input="onEmailChange"
                :value="email"
                :rules="emailRules"
                label="E-mail" s
        ></v-text-field>
    </v-form>
</template>

<script>
    import {mapGetters} from "vuex";
    import {
        APPOINTMENT_UPDATE_NAME,
        APPOINTMENT_UPDATE_EMAIL,
    } from "@/store/actions.type";

    export default {
        name: "ClientDetailsForm",
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
                // TODO Stricter email validation rules
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
            onNameChange(name) {
                this.$store.dispatch(APPOINTMENT_UPDATE_NAME, name);
                this.$emit('selected-name', name);

            },
            onEmailChange(email) {
                if (this.valid) {
                    this.$store.dispatch(APPOINTMENT_UPDATE_EMAIL, email);
                    this.$emit('selected-email', email);
                } else {
                    this.$emit('selected-email', null);

                }
            }
        }
    };
</script>