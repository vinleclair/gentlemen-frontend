<template>
  <v-content>
    <AppointmentForm />
  </v-content>
</template>

<script>
import AppointmentForm from "@/components/AppointmentForm";

  export default {
  name: 'Home',
  components: {
    AppointmentForm,
  }
}
</script>
