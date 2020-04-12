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
                            @click="console.log('yo')"
                            v-model="appointment.date"
                            :allowed-dates="allowedDates"
                            :landscape="$vuetify.breakpoint.smAndUp"
                            class="mt-4"
                            min="2020-04-11"
                    ></v-date-picker>
                </v-col>
                <v-col
                        cols="12"
                        md="4"
                >
                    <v-list dense v-if="appointment.date">
                        <v-subheader>TIMESLOTS</v-subheader>
                        <v-list-item-group v-model="appointment.time" color="primary">
                            <v-list-item
                                    v-for="(hour, i) in hours"
                                    v-bind:value="hour"
                                    :key="i"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-text="hour"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import {mapGetters} from "vuex";
    import GmListErrors from "@/components/ListErrors";

    export default {
        name: "DatetimeSelector",
        components: {GmListErrors},
        data() {
            return {
                date: "2020-04-11",
                hours: [
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
            allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
        },
        computed: {
            ...mapGetters(["appointment"])
        },
    }
</script>