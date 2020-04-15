<template>
    <v-item-group>
        <v-container>
            <v-row>
                <v-col
                        :key="`barber-${index}`"
                        cols="12"
                        md="4"
                        v-for="(barber, index) in barbers"
                >

                    <v-card
                            @click="onSelectBarber(barber.barberId, barber.name)"
                            align="stretch"
                    >
                        <v-img
                                :src="'/img/' + barber.imagePath"
                                :gradient="selectedBarberId !== barber.barberId ? 'rgba(121,85,64,.75), rgba(161,136,117, .5)' : '' "
                        />
                    </v-card>
                    <p class="font-weight-black headline">{{barber.name}}</p>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>
</template>

<script>
    import {
        APPOINTMENT_SELECT_BARBER,
        APPOINTMENT_UNSET_BARBER,
        FETCH_BARBERS
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
            onSelectBarber(barberId, barberName) {
                if (this.selectedBarberId !== barberId) {
                    this.selectedBarberId = barberId
                    this.$store.dispatch(APPOINTMENT_SELECT_BARBER, barberId);
                } else {
                    this.selectedBarberId = null
                    this.$store.dispatch(APPOINTMENT_UNSET_BARBER);
                }
                this.$emit('selected-barber', this.selectedBarberId, barberName)
            }

        },
        beforeMount() {
            this.$store.dispatch(FETCH_BARBERS);
        },
        computed: {
            ...mapGetters(["barbers"]),
        }
    }
</script>