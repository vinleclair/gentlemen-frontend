<template>
    <v-container>
        <v-item-group>
            <v-row justify="center">
                <v-col
                        :key="`service-${index}`"
                        align="center"
                        md="4"
                        v-for="(service, index) in fetchedServices"
                >
                    <v-card
                            @click="onSelectService(service)"
                            align="stretch"
                    >
                        <v-img
                                :gradient="appointment.serviceId !== service.serviceId ? 'rgba(121,85,64,.75), rgba(161,136,117, .5)' : '' "
                                :src="service.imagePath"
                        />
                    </v-card>
                    <p class="font-weight-black headline">{{service.name + " - " + service.price + "$ - " +
                        service.duration + " mins"}}</p>
                </v-col>
            </v-row>
        </v-item-group>
    </v-container>
</template>


<script>
    import {APPOINTMENT_SET_SERVICE, FETCH_SERVICES} from "../store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters(["appointment", "fetchedServices"]),
        },
        mounted() {
            this.$store.dispatch(FETCH_SERVICES);
        },
        methods: {
            onSelectService(service) {
                this.$store.dispatch(APPOINTMENT_SET_SERVICE, service);
            }
        },
    }
</script>