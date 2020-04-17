<template>
    <v-container>
        <v-row>

            <v-col cols="12" sm="6">
                <p class="font-weight-black">Name: </p>
                <p class="font-weight-regular">{{appointment.clientName}}</p>
            </v-col>

            <v-col cols="12" sm="6">
                <p class="font-weight-black">Email: </p>
                <p class="font-weight-regular">{{appointment.clientEmail}}</p>
            </v-col>
            <v-col cols="12" sm="6">
                <p class="font-weight-black">Barber: </p>
                <p class="font-weight-regular">{{selections.barberName}}</p>
            </v-col>
            <v-col cols="12" sm="6">
                <p class="font-weight-black">Date: </p>
                <p class="font-weight-regular">{{appointment.date}}</p>
            </v-col>
            <v-col cols="12" sm="6">
                <p class="font-weight-black">Service: </p>
                <p class="font-weight-regular">{{selections.serviceName}}</p>
            </v-col>
            <v-col cols="12" sm="6">
                <p class="font-weight-black">Time: </p>
                <p class="font-weight-regular">{{appointment.time}}</p>
            </v-col>

        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "ReviewInformation",
        computed: {
            ...mapGetters(["appointment", "selections"])
        },
    }
</script>