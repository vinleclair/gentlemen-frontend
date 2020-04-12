<template>
    <v-app-bar
            app
            color="primary"
            height="100"
    >
        <v-avatar
                class="mr-3"
                size="70"
        >
            <v-img
                    alt="Gentlemen Logo"
                    contain
                    max-height="70%"
                    src="@/assets/images/logo.png"
            ></v-img>
        </v-avatar>

    </v-app-bar>
</template>

<script>
    export default {
        name: "GmHeader"
    }
</script>