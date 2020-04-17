<template>
    <v-container>
        <v-stepper v-model="step" vertical>
            <v-stepper-step :complete="step > 1" step="1">Select professional
                <small v-if="step > 1"> {{ selections.barberName }} </small>
            </v-stepper-step>

            <v-stepper-content step="1">
                <BarberSelectorForm />
                <v-btn color="primary" @click="step = 2" :disabled="!appointment.barberId">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2">Select service
                <small v-if="step > 2"> {{ selections.serviceName }} </small>
            </v-stepper-step>

            <v-stepper-content step="2">
                <ServiceSelectorForm />
                <v-btn color="primary" @click="step = 3" :disabled="!appointment.serviceId">Continue</v-btn>
                <v-btn text @click="step = 1">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 3" step="3">Select available timeslot
                <small v-if="step > 3">{{ appointment.date + " @ " + appointment.time }}</small>
            </v-stepper-step>

            <v-stepper-content step="3">
                <DatetimeSelectorForm />
                <v-btn color="primary" @click="step = 4"
                       :disabled="!(appointment.date && appointment.time)">Continue
                </v-btn>
                <v-btn text @click="step = 2">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 4" step="4">Enter details
                <small v-if="step > 4">{{appointment.clientName + " - " + appointment.clientEmail}}</small>
            </v-stepper-step>

            <v-stepper-content step="4">
                <ClientDetailsForm />
                <v-btn color="primary" @click="step = 5"
                       :disabled="!(appointment.clientName && appointment.clientEmail)">Continue
                </v-btn>
                <v-btn text @click="step = 3">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 5" step="5">Review
                <small v-if="step > 5">COMPLETED!</small>
            </v-stepper-step>

            <v-stepper-content step="5">
                <ReviewInformationForm />
                <v-btn
                        ref="book"
                        color="success"
                        @click="book(appointment)"
                >
                    Book
                </v-btn>
                <v-btn text @click="step = 4">Back</v-btn>
            </v-stepper-content>
            <v-fade-transition>
            <v-row v-if="step === 6" justify="center">
                <v-col align="center">
                    <v-btn
                            large
                            color="primary"
                            ref="resetForm"
                            @click="reset()"
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
    import BarberSelectorForm from "@/components/BarberSelectorForm";
    import ServiceSelectorForm from "@/components/ServiceSelectorForm";
    import DatetimeSelectorForm from "@/components/DatetimeSelectorForm";
    import ClientDetailsForm from "@/components/ClientDetailsForm"
    import ReviewInformationForm from "@/components/ReviewInformationForm"
    import {mapGetters} from "vuex";
    import {APPOINTMENT_SCHEDULE} from "../store/actions.type";

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
            reset(appointment) {

            }
        }
    }
</script>
