<template>
    <v-item-group>
        <v-container>
            <v-row justify="center">
                <v-col
                        :key="`barber-${index}`"
                        md="4"
                        align="center"
                        v-for="(barber, index) in barbers"
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
        </v-container>
    </v-item-group>
</template>

<script>
    import {
        APPOINTMENT_SET_BARBER,
        APPOINTMENT_UNSET_BARBER,
        FETCH_BARBERS,
        FETCH_UPCOMING_APPOINTMENTS
    } from "@/store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        name: "BarberSelectorForm",
        data() {
            return {
                selectedBarberId: null,
            };
        },
        methods: {
            onSelectBarber(barber) {
                if (this.selectedBarberId !== barber.barberId) {
                    this.$store.dispatch(FETCH_UPCOMING_APPOINTMENTS, barber.barberId)
                    this.selectedBarberId = barber.barberId
                    this.$store.dispatch(APPOINTMENT_SET_BARBER, barber);
                } else {
                    this.selectedBarberId = null
                    this.$store.dispatch(APPOINTMENT_UNSET_BARBER);
                }
            }

        },
        mounted() {
            this.$store.dispatch(FETCH_BARBERS);
        },
        computed: {
            ...mapGetters(["barbers", "appointment"]),
        }
    }
</script>