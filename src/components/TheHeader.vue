<template>
    <v-app-bar
            app
            color="primary"
            height="80"
    >
        <v-avatar
                class="mr-3"
                size="70"
        >
            <v-img
                    alt="Gentlemen Logo"
                    contain
                    max-height="70%"
                    src="../assets/images/logo.png"
            ></v-img>
        </v-avatar>

        <v-spacer></v-spacer>

        <v-btn
                @click="$vuetify.goTo('#about-us')"
                class="ma-2"
                outlined
        >
            about
        </v-btn>

        <v-btn
                @click="$vuetify.goTo('#appointment-booker')"
                class="ma-2"
                outlined

        >
            book
        </v-btn>

        <v-btn
                @click="$vuetify.goTo('#contact-us')"
                class="ma-2"
                outlined

        >
            contact
        </v-btn>

    </v-app-bar>
</template>

<script>
    export default {
        name: "GmHeader"
    }
</script>