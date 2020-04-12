<template>
    <v-form
            ref="datetimeSelector"
            lazy-validation
    >
        <v-container>
            <v-row justify="space-around">
                <v-col
                        cols="12"
                        md="4"
                >
                    <v-date-picker
                            v-model="date"
                            @change="updateDate"
                            :allowed-dates="allowedDates"
                            :landscape="$vuetify.breakpoint.smAndUp"
                            class="mt-4"
                            min="2020-04-11"
                            show-current
                    ></v-date-picker>
                </v-col>
                <v-col
                        cols="12"
                        md="4"
                >
                    <v-select
                            :items="timeslots"
                            @change="updateTime"
                            label="Timeslot"
                            prepend-icon="access_time"
                    ></v-select>
                </v-col>
            </v-row>
        </v-container>
        {{this.$store.state}}

    </v-form>
</template>

<script>
    import {mapGetters} from "vuex";
    import GmListErrors from "@/components/ListErrors";
    import {
        APPOINTMENT_UPDATE_DATE,
        APPOINTMENT_UPDATE_TIME
    } from "@/store/actions.type";

    export default {
        name: "DatetimeSelector",
        components: {GmListErrors},
        data() {
            return {
                date: '',
                time: '',
                timeslots: [
                    "9:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                ]
            };
        },
        methods: {
            //TODO Setup allowed dates and times
            allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
            allowedHours: v => v % 2,
            allowedMinutes: v => v >= 10 && v <= 50,
            updateDate (date) {
                this.$store.dispatch(APPOINTMENT_UPDATE_DATE, date);
            },
            updateTime (time) {
                this.$store.dispatch(APPOINTMENT_UPDATE_TIME, time);
            },
        },
        computed: {
            ...mapGetters(["appointment"])
        },
    }
</script>