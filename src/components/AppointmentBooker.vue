<template>
        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">Select a professional
                <small v-if="e6 > 1"> {{appointment.barberId}}</small>
            </v-stepper-step>

            <v-stepper-content step="1">
                <BarberSelector />
                <v-btn color="primary" @click="e6 = 2" :disabled="!appointment.barberId">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">Select a service
                <small v-if="e6 > 2">service</small>
            </v-stepper-step>

            <v-stepper-content step="2">
                IMPLEMENT SERVICE SELECTION <br>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn text @click="e6 = 1">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">Select a timeslot
                <small v-if="e6 > 3">{{appointment.date + " @ " + appointment.time}}</small>
            </v-stepper-step>

            <v-stepper-content step="3">
                <DatetimeSelector />
                <v-btn color="primary" @click="e6 = 4" :disabled="(!appointment.date && !appointment.time)">Continue</v-btn>
                <v-btn text @click="e6 = 2">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 4" step="4">Enter details
                <small v-if="e6 > 4">{{appointment.name + " - " + appointment.email}}</small>
            </v-stepper-step>

            <v-stepper-content step="4">
                <ClientDetailsForm />
                <v-btn color="primary" @click="e6 = 5">Continue</v-btn>
                <v-btn text @click="e6 = 3">Back</v-btn>
            </v-stepper-content>

            <v-stepper-step step="5">Review</v-stepper-step>

            <v-stepper-content step="5">
                {{this.$store.state}}
                <v-btn
                        color="success"
                        @click="book(appointment)"
                >
                    Book
                </v-btn>
                <v-btn text @click="e6 = 4">Back</v-btn>
            </v-stepper-content>
        </v-stepper>
</template>

<script>
    import BarberSelector from "@/components/BarberSelector";
    import DatetimeSelector from "@/components/DatetimeSelector";
    import ClientDetailsForm from "@/components/ClientDetailsForm";
    import {mapGetters} from "vuex";
    import {APPOINTMENT_SCHEDULE} from "../store/actions.type";

    export default {
        name: 'AppointmentBooker',
        computed: {
            ...mapGetters(["appointment"])
        },
        components: {
            BarberSelector,
            DatetimeSelector,
            ClientDetailsForm,
        },
        data() {
            return {
                e6: 1,
            }
        },
        methods: {
            book(appointment) {
                this.$store
                    .dispatch(APPOINTMENT_SCHEDULE, { appointment })
                    .catch(({ response }) => {
                        this.errors = response.data.errors;
                    });
            },
        }
    }
</script>
