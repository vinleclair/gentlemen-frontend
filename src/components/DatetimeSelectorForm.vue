<template>
    <v-form
            lazy-validation
            ref="datetimeSelector"
    >
        <v-container>
            <v-row no-gutters justify="space-between">
                <v-col align="center">
                    <v-date-picker
                            :allowed-dates=allowedDates
                            :landscape="$vuetify.breakpoint.smAndUp"
                            @change="onUpdateDate"
                            min="2020-04-11"
                            show-current
                            v-model="date"
                    ></v-date-picker>
                </v-col>
                <v-col>
                    <v-slide-x-transition>

                    <v-col  v-show="this.date">
                    <v-row no-gutters align="center"  justify="center"><p class="font-weight-black">Timeslots</p></v-row>
                    <v-row no-gutters align="center" justify="center">
                        <div v-for="timeslots in chunkedTimeslots">

                            <div class="ma-1" v-for="timeslot in timeslots">
                                <v-btn text @click="onUpdateTime(timeslot)">

                                    {{timeslot}}

                                </v-btn>
                            </div>
                        </div>
                    </v-row>
                    </v-col>
                    </v-slide-x-transition>

                </v-col>

            </v-row>

        </v-container>
    </v-form>
</template>

<script>
    import {mapGetters} from "vuex";
    import {
        APPOINTMENT_UPDATE_DATE,
        APPOINTMENT_UPDATE_TIME
    } from "@/store/actions.type";
    import {FETCH_UPCOMING_APPOINTMENTS} from "../store/actions.type";
    import chunk from 'chunk';

    export default {
        name: "DatetimeSelector",
        props: {
            selectedBarberId: {
                type: Number
            }
        },
        data() {
            return {
                date: '',
                time: '',
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

                this.$store.dispatch(APPOINTMENT_UPDATE_DATE, date);
                this.$emit('selected-date', date);
            },
            onUpdateTime(time) {
                this.$store.dispatch(APPOINTMENT_UPDATE_TIME, time);
                this.$emit('selected-time', time);
            },
            fetchUpcomingAppointments() {
                this.$store.dispatch(FETCH_UPCOMING_APPOINTMENTS, this.selectedBarberId)
            }
        },
        computed: {
            ...mapGetters(["upcomingAppointments"]),
            chunkedTimeslots() {
                return chunk(this.timeslots, Math.ceil(this.timeslots.length / 2))
            }
        },
        watch: {
            'selectedBarberId': function () {
                this.fetchUpcomingAppointments();
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

        }
    }
</script>