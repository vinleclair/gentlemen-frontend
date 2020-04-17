<template>
    <v-card
            class="mx-auto"
            max-width="400"
    >
        <v-list rounded>
            <v-list-item-group color="primary">
                <v-list-item
                        :key="i"
                        v-for="(service, i) in fetchedServices"
                >

                    <v-list-item-content
                            @click="onSelectService(service)"
                    >
                        <v-list-item-title align="center" style="font-size: 150%" class="font-weight-black">{{ service.name }}</v-list-item-title>
                        <v-list-item-subtitle align="center" class="font-weight-bold">{{ service.price + "$  - " + service.duration + " mins"}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    import {
        APPOINTMENT_SET_SERVICE,
        APPOINTMENT_UNSET_SERVICE,
        FETCH_SERVICES
    } from "@/store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        data: () => ({
            selectedServiceId: null,
        }),
        methods: {
            onSelectService(service) {
                if (this.selectedServiceId !== service.serviceId) {
                    this.selectedServiceId = service.serviceId
                    this.$store.dispatch(APPOINTMENT_SET_SERVICE, service);
                } else {
                    this.selectedServiceId = null
                    this.$store.dispatch(APPOINTMENT_UNSET_SERVICE);
                }
            }
        },
        mounted() {
            this.$store.dispatch(FETCH_SERVICES);
        },
        computed: {
            ...mapGetters(["fetchedServices"]),
        }
    }
</script>