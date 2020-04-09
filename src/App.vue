<template>
  <v-app>
    <GmHeader />
    <v-content>
      <router-view></router-view>
    </v-content>
    <GmFooter />
  </v-app>
</template>

<script>
import GmHeader from "@/components/TheHeader";
import GmFooter from "@/components/TheFooter";


export default {
  name: 'App',

  components: {
    GmHeader,
    GmFooter
  }
};
</script>
