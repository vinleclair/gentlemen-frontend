<template>
    <v-form>
        <v-container>
            <v-row>

                <v-col cols="12" sm="6">
                    <p class="font-weight-black">Name: </p>
                    <p class="font-weight-regular">{{appointment.name}}</p>
                </v-col>

                <v-col cols="12" sm="6">
                    <p class="font-weight-black">Email: </p>
                    <p class="font-weight-regular">{{appointment.email}}</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="font-weight-black">Barber: </p>
                    <p class="font-weight-regular">{{appointment.barberId}}</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="font-weight-black">Date: </p>
                    <p class="font-weight-regular">{{appointment.date}}</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="font-weight-black">Service: </p>
                    <p class="font-weight-regular">{{appointment.serviceId}}</p>
                </v-col>
                <v-col cols="12" sm="6">
                    <p class="font-weight-black">Time: </p>
                    <p class="font-weight-regular">{{appointment.time}}</p>
                </v-col>

            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ReviewInformation",
        computed: {
            ...mapGetters(["appointment"])
        },
    }
</script>

<style scoped>

</style>