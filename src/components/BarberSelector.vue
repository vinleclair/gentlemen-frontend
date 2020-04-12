<template>
    <section id="AppointmentForm">
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
                            </v-card>
                        </v-item>
                    </v-col>
                </v-row>
            </v-container>
        </v-item-group>
        <v-expand-transition>
            <v-row
                    justify="center"
                    style="min-height: 100px; min-width: 100%; "
            >
                <v-col class="grow">
                    <v-card
                            class="mx-auto"
                            v-show="selectedBarber"
                            width="30%"
                    >
                        <ClientDetailsForm/>
                    </v-card>
                </v-col>
            </v-row>
        </v-expand-transition>
    </section>

</template>

<script> //TODO Fix animation
import ClientDetailsForm from "@/components/ClientDetailsForm";
import {APPOINTMENT_SELECT_BARBER} from "@/store/actions.type";

export default {
    name: "BarberSelector",
    components: {ClientDetailsForm},
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
            this.selectedBarber === barberId ? this.selectedBarber = null : this.selectedBarber = barberId;
            this.$store.dispatch(APPOINTMENT_SELECT_BARBER, barberId);
        }
    }
}
</script>