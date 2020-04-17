<template>
    <v-container>
        <v-item-group>
            <v-row justify="center">
                <v-col
                        :key="`barber-${index}`"
                        align="center"
                        md="4"
                        v-for="(barber, index) in fetchedBarbers"
                >
                    <v-card
                            @click="onSelectBarber(barber)"
                            align="stretch"
                    >
                        <v-img
                                :gradient="appointment.barberId !== barber.barberId ? 'rgba(121,85,64,.75), rgba(161,136,117, .5)' : '' "
                                :src="barber.imagePath"
                        />
                    </v-card>
                    <p class="font-weight-black headline" style="font-size: 150%">{{barber.name}}</p>
                </v-col>
            </v-row>
        </v-item-group>
    </v-container>
</template>

<script>
    import {
        APPOINTMENT_SET_BARBER,
        APPOINTMENT_UNSET_DATE,
        APPOINTMENT_UNSET_TIME,
        FETCH_BARBERS,
        FETCH_UPCOMING_APPOINTMENTS
    } from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: "BarberSelectorForm",
        computed: {
            ...mapGetters(["fetchedBarbers", "appointment"]),
        },
        mounted() {
            this.$store.dispatch(FETCH_BARBERS);
        },
        methods: {
            onSelectBarber(barber) {
                this.$store.dispatch(APPOINTMENT_SET_BARBER, barber);
                this.$store.dispatch(APPOINTMENT_UNSET_DATE);
                this.$store.dispatch(APPOINTMENT_UNSET_TIME);
                this.$store.dispatch(FETCH_UPCOMING_APPOINTMENTS, barber.barberId)
            }
        },
    }
</script>