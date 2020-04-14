<template>
    <v-card
            class="mx-auto"
            max-width="400"
    >
        <v-list>
            <v-list-item-group color="secondary">
                <v-list-item
                        :key="i"
                        v-for="(service, i) in services"
                >

                    <v-list-item-content
                            @click="onSelectService(service.serviceId, service.name)"
                    >
                        <v-list-item-title align="center">{{ service.name }}</v-list-item-title>
                        <v-list-item-subtitle align="center">{{ service.price + "$  - " + service.duration + " mins"}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    import {
        APPOINTMENT_SELECT_SERVICE,
        APPOINTMENT_UNSET_SERVICE,
        FETCH_SERVICES
    } from "@/store/actions.type";
    import {mapGetters} from "vuex";

    export default {
        data: () => ({
            selectedServiceId: null,
        }),
        methods: {
            onSelectService(serviceId, serviceName) {
                if (this.selectedServiceId !== serviceId) {
                    this.selectedServiceId = serviceId
                    this.$store.dispatch(APPOINTMENT_SELECT_SERVICE, serviceId);
                } else {
                    this.selectedServiceId = null
                    this.$store.dispatch(APPOINTMENT_UNSET_SERVICE);
                }
                this.$emit('selected-service', this.selectedServiceId, serviceName)
            }
        },
        mounted() {
            this.$store.dispatch(FETCH_SERVICES);
        },
        computed: {
            ...mapGetters(["services"]),
        }
    }
</script>