<template>
    <v-content>
        <section id="hero">
            <v-row no-gutters>
                <v-img
                        :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
                        src="../assets/images/bg.png"
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
                                        @click="$vuetify.goTo('#about-us')"
                                        class="align-center"
                                        fab
                                        outlined
                                >
                                    <v-icon>mdi-chevron-double-down</v-icon>
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-theme-provider>
                </v-img>
            </v-row>
        </section>

        <section id="about-us">
            <div class="py-12"></div>

            <v-container class="text-center">
                <h2 class="display-2 font-weight-bold mb-3">ABOUT US</h2>

                <v-responsive
                        class="mx-auto mb-8"
                        width="56"
                >
                    <v-divider class="mb-1"></v-divider>

                    <v-divider></v-divider>
                </v-responsive>

                <v-responsive
                        class="mx-auto title font-weight-light mb-8"
                        max-width="720"
                >


                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel justo iaculis, congue ex sit amet,
                    vestibulum orci. Integer eu placerat mauris, non pellentesque diam. Fusce ut venenatis enim. Proin
                    consequat viverra tellus quis maximus. Nullam sodales lacus sit amet est viverra, ut tempus odio
                    vulputate. Maecenas tincidunt, justo vitae fringilla sollicitudin, arcu ligula pretium diam, vitae
                    blandit odio mi vel nunc. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse
                    euismod eros non nibh feugiat, non scelerisque velit volutpat. Pellentesque malesuada arcu a urna
                    suscipit, et euismod ligula aliquet.

                    Aliquam id orci vel libero blandit lacinia. Etiam fringilla enim nec mollis tincidunt. In posuere
                    lacus sed faucibus maximus. Sed blandit tincidunt sem ut porta. Praesent quis cursus ex.
                </v-responsive>
            </v-container>

            <div class="py-12"></div>
        </section>

        <section id="parallax">
            <v-parallax
                    :height="$vuetify.breakpoint.smAndDown ? 700 : 600"
                    src="../assets/images/parallax.png"
            >
            </v-parallax>
        </section>

        <section id="appointment-booker">
            <div class="py-12"></div>
            <v-container class="text-center">
                <h2 class="display-2 font-weight-bold mb-3">BOOK APPOINTMENT</h2>

                <v-responsive
                        class="mx-auto mb-8"
                        width="56"
                >
                    <v-divider class="mb-1"></v-divider>

                    <v-divider></v-divider>
                </v-responsive>
            </v-container>
            <AppointmentBooker/>
            <div class="py-12"></div>
        </section>

        <v-sheet
                color="secondary"
                dark
                id="contact-us"
                tag="section"
                tile
        >
            <div class="py-12"></div>

            <v-container>
                <h2 class="display-2 font-weight-bold mb-3 text-uppercase text-center">Contact Us</h2>

                <v-responsive
                        class="mx-auto mb-12"
                        width="56"
                >
                    <v-divider class="mb-1"></v-divider>

                    <v-divider></v-divider>
                </v-responsive>

                <v-row>

                    <v-col align="center">
                        <p class="font-weight-black">QUEBEC CITY</p>
                        <p class="font-weight-black">Gentlemen</p>
                        <p class="font-weight-black">162 2nd street</p>
                        <p class="font-weight-black">D9A 2K3 (Qc)</p>
                        <p class="font-weight-black">(123) 456-7890</p>
                    </v-col>

                    <v-col align="center">
                        <p class="font-weight-black">Monday: 10 - 18</p>
                        <p class="font-weight-black">Tuesday: 10 - 18</p>
                        <p class="font-weight-black">Wednesday: 10 - 18</p>
                        <p class="font-weight-black">Thursday: 10 - 18</p>
                        <p class="font-weight-black">Friday: 10 - 18</p>
                        <p class="font-weight-black">Saturday: 10 - 18</p>
                        <p class="font-weight-black">Sunday: CLOSED</p>
                    </v-col>

                </v-row>
            </v-container>

            <div class="py-12"></div>
        </v-sheet>

    </v-content>
</template>

<script>
    import AppointmentBooker from "../components/AppointmentBooker";

    export default {
        name: 'Home',
        components: {
            AppointmentBooker,
        }
    }
</script>
