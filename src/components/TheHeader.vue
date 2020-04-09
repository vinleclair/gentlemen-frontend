<template>
    <v-app-bar
            app
            color="primary"
            height="100"
    >
        <v-avatar
                class="mr-3"
                color="white"
                size="70"
        >
            <v-img
                    alt="Gentlemen Logo"
                    contain
                    max-height="70%"
                    src="@/assets/images/logo.png"
            ></v-img>
        </v-avatar>

        <v-toolbar-title class="font-weight-black headline">
            GENTLEMEN
        </v-toolbar-title>
    </v-app-bar>
</template>

<script>
    export default {
        name: "GmHeader"
    }
</script>