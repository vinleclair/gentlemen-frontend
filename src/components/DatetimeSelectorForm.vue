<template>
            <v-row no-gutters justify="space-between">
                <v-col align="center">
                    <v-date-picker
                            :allowed-dates=allowedDates
                            :landscape="$vuetify.breakpoint.smAndUp"
                            @change="onUpdateDate"
                            :min="currentDate"
                            show-current
                            v-model="date"
                    ></v-date-picker>
                    <v-row v-show="!appointment.date"  no-gutters align="center" justify="center" class="mt-12"><p class="font-weight-black" style="font-size: 150%">Please select a date</p></v-row>

                    <v-row v-show="appointment.date"  no-gutters align="center" justify="center" class="mt-6"><p class="font-weight-black" style="font-size: 150%">Available timeslots</p></v-row>
                        <v-fade-transition>

                        <v-row v-show="appointment.date"  no-gutters align="center" justify="center">

                        <div v-for="timeslots in chunkedTimeslots">

                            <div class="ma-6" v-for="timeslot in timeslots">
                                <v-btn :disabled="appointment.time === timeslot" depressed color="primary" @click="onUpdateTime(timeslot)">

                                    {{timeslot}}

                                </v-btn>
                            </div>
                        </div>

                    </v-row>
                        </v-fade-transition>

                </v-col>

            </v-row>
</template>

<script>
    import {mapGetters} from "vuex";
    import {
        APPOINTMENT_SET_DATE,
        APPOINTMENT_SET_TIME,
        APPOINTMENT_UNSET_TIME
    } from "../store/actions.type";
    import chunk from 'chunk';

    export default {
        name: "DatetimeSelector",
        data() {
            return {
                time: '',
                currentDate: new Date().toISOString().slice(0,10),
                timeslots: [],
            };
        },
        methods: {
            allowedDates(date) {
                return !(this._isSunday(date) || this._isCompletelyBooked(date));
            },
            _isSunday(date) {
                return new Date(date).getDay() === this.DAY_OF_THE_WEEK["Sunday"]
            },
            _isCompletelyBooked(date) {
                return typeof this.upcomingAppointments[date] !== 'undefined' ? this.upcomingAppointments[date].length === this.POSSIBLE_TIMESLOTS.length : false
            },
            onUpdateDate(date) {
                if (typeof this.upcomingAppointments[date] !== 'undefined') {
                    this.timeslots = this.POSSIBLE_TIMESLOTS.filter(timeslot => !this.upcomingAppointments[date].includes(timeslot))
                } else {
                    this.timeslots = this.POSSIBLE_TIMESLOTS
                }
            },
            onUpdateTime(time) {
                this.$store.dispatch(APPOINTMENT_SET_TIME, time);
            }
        },
        computed: {
            ...mapGetters(["appointment", "upcomingAppointments"]),
            date: {
                set(date) {
                    this.$store.dispatch(APPOINTMENT_SET_DATE, date)
                    this.$store.dispatch(APPOINTMENT_UNSET_TIME);
                },
                get() {
                    return this.appointment.date
                }
            },
            chunkedTimeslots() {
                return chunk(this.timeslots, Math.ceil(this.timeslots.length / 4))
            }
        },
        created() {
            this.POSSIBLE_TIMESLOTS = [
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "13:00",
                "13:30",
                "14:00",
                "14:30",
                "15:00",
                "15:30",
                "16:00",
                "16:30",
                "17:00",
                "17:30"
            ]

            this.DAY_OF_THE_WEEK = {
                "Monday": 0,
                "Tuesday": 1,
                "Wednesday": 2,
                "Thursday": 3,
                "Friday": 4,
                "Saturday": 5,
                "Sunday": 6,
            }
        },

    }
</script>