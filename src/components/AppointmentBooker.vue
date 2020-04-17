<template>
    <v-container>
        <v-stepper v-model="step" vertical>
            <v-stepper-step :complete="step > 1" step="1">Select professional
                <small v-if="step > 1"> {{ selections.barberName }} </small>
            </v-stepper-step>

            <v-stepper-content step="1">
                <BarberSelectorForm/>
                <v-btn :disabled="!appointment.barberId" @click="step = 2" color="primary">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2">Select service
                <small v-if="step > 2"> {{ selections.serviceName }} </small>
            </v-stepper-step>

            <v-stepper-content step="2">
                <ServiceSelectorForm/>
                <v-btn :disabled="!appointment.serviceId" @click="step = 3" color="primary">Continue</v-btn>
                <v-btn @click="step = 1" text>Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 3" step="3">Select available timeslot
                <small v-if="step > 3">{{ appointment.date + " @ " + appointment.time }}</small>
            </v-stepper-step>

            <v-stepper-content step="3">
                <DatetimeSelectorForm/>
                <v-btn :disabled="!(appointment.date && appointment.time)" @click="step = 4"
                       color="primary">Continue
                </v-btn>
                <v-btn @click="step = 2" text>Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 4" step="4">Enter details
                <small v-if="step > 4">{{appointment.clientName + " - " + appointment.clientEmail}}</small>
            </v-stepper-step>

            <v-stepper-content step="4">
                <ClientDetailsForm v-on:client-form-validity="clientDetailsFormIsValid = !clientDetailsFormIsValid"/>
                <v-btn :disabled="!(clientDetailsFormIsValid)" @click="step = 5"
                       color="primary">Continue
                </v-btn>
                <v-btn @click="step = 3" text>Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 5" step="5">Review
                <small v-if="step > 5">COMPLETED!</small>
            </v-stepper-step>

            <v-stepper-content step="5">
                <ReviewInformationForm/>
                <v-btn
                        @click="book(appointment)"
                        color="success"
                        ref="book"
                >
                    Book
                </v-btn>
                <v-btn @click="step = 4" text>Back</v-btn>
            </v-stepper-content>
            <v-fade-transition>
                <v-row justify="center" v-if="step === 6">
                    <v-col align="center">
                        <v-btn
                                @click="reset()"
                                color="primary"
                                large
                                ref="resetForm"
                        >
                            Book Another Appointment
                        </v-btn>
                    </v-col>
                </v-row>
            </v-fade-transition>
        </v-stepper>
    </v-container>
</template>

<script>
    import BarberSelectorForm from "../components/BarberSelectorForm";
    import ServiceSelectorForm from "../components/ServiceSelectorForm";
    import DatetimeSelectorForm from "../components/DatetimeSelectorForm";
    import ClientDetailsForm from "../components/ClientDetailsForm"
    import ReviewInformationForm from "../components/ReviewInformationForm"
    import {mapGetters} from "vuex";
    import {APPOINTMENT_RESET_STATE, APPOINTMENT_SCHEDULE} from "../store/actions.type";

    export default {
        name: 'AppointmentBooker',
        computed: {
            ...mapGetters(["appointment", "selections"])
        },
        components: {
            BarberSelectorForm,
            ServiceSelectorForm,
            DatetimeSelectorForm,
            ClientDetailsForm,
            ReviewInformationForm,
        },
        data() {
            return {
                errors: {},
                step: 1,
                clientDetailsFormIsValid: false,
            }
        },
        methods: {
            book(appointment) {
                this.$store
                    .dispatch(APPOINTMENT_SCHEDULE, {appointment})
                    .catch(({response}) => {
                        this.errors = response.data.errors;
                    });
                this.step = 6;
            },
            reset() {
                this.$store.dispatch(APPOINTMENT_RESET_STATE);
                this.step = 1
            }
        }
    }
</script>
