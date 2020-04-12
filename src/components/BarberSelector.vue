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
                        <v-item>

                            <v-card
                                    @click="selectBarber(barber.id)"
                                    height="300"
                            >
                                <!-- TODO Turn into a single component -->
                                <v-img
                                        :src="barber.img"
                                        class="d-flex align-center "
                                        max-height="100%"
                                        v-if="selectedBarber === barber.id"
                                />
                                <v-img
                                        v-else
                                        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                                        :src="barber.img"
                                        class="d-flex align-center "
                                        max-height="100%"
                                />
                                {{barber.name}}

                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
</template>

<script> //TODO Fix animation
import ClientDetailsForm from "@/components/ClientDetailsForm";
import {
    APPOINTMENT_SELECT_BARBER,
    APPOINTMENT_UNSET_BARBER
} from "@/store/actions.type";
import DatetimeSelector from "@/components/DatetimeSelector";

export default {
    name: "BarberSelector",
    components: {DatetimeSelector, ClientDetailsForm},
    data() {
        return {
            selectedBarber: null,
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
                }
            ]
        };
    },
    methods: {
        //TODO REMOVE
        selectBarber(barberId) {
            if (this.selectedBarber !== barberId) {
                this.selectedBarber = barberId
                this.$store.dispatch(APPOINTMENT_SELECT_BARBER, barberId);
            } else {
                this.selectedBarber = null
                this.$store.dispatch(APPOINTMENT_UNSET_BARBER);
            }
        }
    }
}
</script>