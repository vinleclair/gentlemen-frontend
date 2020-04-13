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
                            @click="onSelectService(service.id, service.name)"
                    >
                        <v-list-item-title align="center" v-text="service.name"></v-list-item-title>
                        <v-list-item-subtitle align="center" v-text="service.details"></v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
    import {
        APPOINTMENT_SELECT_SERVICE,
        APPOINTMENT_UNSET_SERVICE
    } from "@/store/actions.type";

    export default {
        data: () => ({
            selectedServiceId: null,
            services: [
                {
                    id: 1,
                    name: 'Haircut',
                    details: '26$ - 30 mins'
                },
                {
                    id: 2,
                    name: 'Shave',
                    details: '26$ - 30 mins'

                },
            ],
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
        }
    }
</script>