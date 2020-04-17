<template>
    <v-app>
        <GmHeader/>
        <router-view></router-view>
        <GmFooter/>
    </v-app>
</template>

<script>
    import GmHeader from "./components/TheHeader";
    import GmFooter from "./components/TheFooter";


    export default {
        name: 'App',

        components: {
            GmHeader,
            GmFooter
        }
    };
</script>
