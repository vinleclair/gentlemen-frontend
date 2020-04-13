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
                                    :src="barber.img"
                                    class="d-flex align-center "
                                    max-height="100%"
                            />
                            <v-img
                                    v-else
                                    gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                                    :src="barber.img"
                                    class="d-flex align-center "
                                    max-height="100%"
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
    APPOINTMENT_UNSET_BARBER
} from "@/store/actions.type";

export default {
    name: "BarberSelectorForm",
    data() {
        return {
            selectedBarberId: null,
            barbers: [
                {
                    id: 1,
                    name: 'James',
                    img: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
                },
                {
                    id: 2,
                    name: 'Fatima',
                    img: 'https://semantic-ui.com/images/avatar2/large/molly.png',
                },
                {
                    id: 3,
                    name: 'Xin',
                    img: 'https://semantic-ui.com/images/avatar2/large/elyse.png',
                },
            ]
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
    }
}
</script>