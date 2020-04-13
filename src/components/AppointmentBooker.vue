<template>
    <v-container>
    <v-stepper v-model="step" vertical>
        <v-stepper-step :complete="step > 1" step="1">Select a professional
            <small v-if="step > 1"> {{ this.selectedBarberName }} </small>
        </v-stepper-step>

        <v-stepper-content step="1">
            <BarberSelectorForm @selected-barber="onChildSelectedBarber"/>
            <v-btn color="primary" @click="step = 2" :disabled="!selectedBarberId">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">Select a service
            <small v-if="step > 2"> {{ this.selectedServiceName }} </small>
        </v-stepper-step>

        <v-stepper-content step="2">
            <ServiceSelectorForm @selected-service="onChildSelectedService"/>
            <v-btn color="primary" @click="step = 3" :disabled="!selectedServiceId">Continue</v-btn>
            <v-btn text @click="step = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3">Select a timeslot
            <small v-if="step > 3">{{ appointment.date + " @ " + appointment.time }}</small>
        </v-stepper-step>

        <v-stepper-content step="3">
            <DatetimeSelectorForm @selected-date="onChildSelectedDate" @selected-time="onChildSelectedTime"/>
            <v-btn color="primary" @click="step = 4" :disabled="!(this.selectedDate !== null && this.selectedTime !== null)">Continue</v-btn> <!-- TODO Refactor, why does disabled boolean evaluates this way? -->
            <v-btn text @click="step = 2">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 4" step="4">Enter details
            <small v-if="step > 4">{{appointment.name + " - " + appointment.email}}</small>
        </v-stepper-step>

        <v-stepper-content step="4">
            <ClientDetailsForm  @selected-name="onChildSelectedName" @selected-email="onChildSelectedEmail"/>
            <v-btn color="primary" @click="step = 5" :disabled="!(this.selectedName !== null && this.selectedEmail !== null)">Continue</v-btn> <!-- TODO Refactor, why does disabled boolean evaluates this way? -->
            <v-btn text @click="step = 3">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="step > 5" step="5">Review
            <small v-if="step > 5">COMPLETED!</small>
        </v-stepper-step>

        <v-stepper-content step="5">
            <ReviewInformationForm v-bind:selectedBarberName="this.selectedBarberName" v-bind:selectedServiceName="this.selectedServiceName" />
            <v-btn
                    color="success"
                    @click="book(appointment)"
            >
                Book
            </v-btn>
            <v-btn text @click="step = 4">Back</v-btn>
        </v-stepper-content>
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
        el: "AppoimentBooker",
        name: 'AppointmentBooker',
        computed: {
            ...mapGetters(["appointment"])
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
                //TODO Clean refactor DRY
                selectedBarberId: null,
                selectedBarberName: null,
                selectedServiceId: null,
                selectedServiceName: null,
                selectedDate: null,
                selectedTime: null,
                selectedName: null,
                selectedEmail: null,
            }
        },
        methods: {
            //TODO Clean refactor DRY
            onChildSelectedBarber(barberId, barberName) {
                this.selectedBarberId = barberId;
                this.selectedBarberName = barberName;
            },
            onChildSelectedService(serviceId, serviceName) {
                this.selectedServiceId = serviceId;
                this.selectedServiceName = serviceName;
            },
            onChildSelectedDate(date) {
                this.selectedDate = date;
            },
            onChildSelectedTime(time) {
                this.selectedTime = time;
            },
            onChildSelectedName(name){
                this.selectedName = name;
            },
            onChildSelectedEmail(email) {
                this.selectedEmail = email;
            },
            book(appointment) {
                this.$store
                    .dispatch(APPOINTMENT_SCHEDULE, { appointment })
                    .catch(({ response }) => {
                        this.errors = response.data.errors;
                    });
                    this.step = 6;

            },
        }
    }
</script>
