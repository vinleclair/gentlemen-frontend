<template>
    <v-item-group active-class="primary">
        <v-container>
            <v-row>
                <v-col
                        :key="`barber-${index}`"
                        cols="12"
                        md="4"
                        v-for="(barber, index) in barbers"
                >

                    <v-card
                            @click="onSelectBarber(barber.id, barber.name)"
                            height="300"
                    >
                        <!-- TODO Turn into a single component -->
                        <v-img
                                v-if="selectedBarberId === barber.id"
                                :src="barber.portaitPath"
                                class="d-flex fit_screen "
                                max-height="100%"
                        />
                        <v-img
                                v-else
                                gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                                :src="barber.portraitPath"
                                class="d-flex align-center "
                                max-height="100%"
                        />
                    </v-card>
                    <p class="font-weight-black headline">{{barber.portraitPath}}</p>
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
        created() {
            this.$store.dispatch(FETCH_BARBERS);
        },
        computed: {
            ...mapGetters(["barbers"]),
            barber() {
                return this.$route.params.tag;
            }
        },
    }
</script>