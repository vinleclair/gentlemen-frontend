<template>
    <v-content>
        <section id="hero">
            <v-row no-gutters>
                <v-img
                        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
                        src="@/assets/images/bg.png"
                >
                    <v-theme-provider dark>
                        <v-container fill-height>
                            <v-row
                                    align="center"
                                    class="white--text mx-auto"
                                    justify="center"
                            >
                                <v-col
                                        class="white--text text-center"
                                        cols="12"
                                        tag="h1"
                                >
                                      <span
                                              :class="[$vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2']"
                                              class="font-weight-light"
                                      >
                      WELCOME
                    </span>

                                    <br>

                                    <span
                                            :class="[$vuetify.breakpoint.smAndDown ? 'display-3': 'display-4']"
                                            class="font-weight-black"
                                    >
                      GENTLEMEN
                    </span>

                                </v-col>

                                <v-btn
                                        @click="$vuetify.goTo('#AppointmentForm')"
                                        class="align-self-end"
                                        outlined
                                >
                                    book appointment
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-theme-provider>
                </v-img>
            </v-row>
        </section>
        <SelectBarber/>
    </v-content>
</template>

<script>
    import SelectBarber from "@/components/SelectBarber";


    export default {
        name: 'Home',
        components: {
            SelectBarber,
        }
    }
</script>
