import {
    APPOINTMENT_RESET_STATE,
    APPOINTMENT_SCHEDULE,
    APPOINTMENT_SET_BARBER,
    APPOINTMENT_SET_CLIENT_EMAIL,
    APPOINTMENT_SET_CLIENT_NAME,
    APPOINTMENT_SET_DATE,
    APPOINTMENT_SET_SERVICE,
    APPOINTMENT_SET_TIME,
    FETCH_BARBERS,
    FETCH_SERVICES,
    FETCH_UPCOMING_APPOINTMENTS
} from "../../../src/store/actions.type";
import {actions, getters, mutations} from "../../../src/store/home.module";
import {
    RESET_APPOINTMENT_STATE,
    SET_BARBER,
    SET_CLIENT_EMAIL,
    SET_CLIENT_NAME,
    SET_DATE,
    SET_FETCHED_BARBERS,
    SET_FETCHED_SERVICES,
    SET_SERVICE,
    SET_TIME,
    SET_UPCOMING_APPOINTMENTS,
    UNSET_DATE,
    UNSET_TIME
} from "../../../src/store/mutations.type";

jest.mock("vue", () => {
    return {
        axios: {
            get: jest.fn().mockImplementation(async () => {
                return {
                    data: {
                        barbers: [
                            {
                                "barberId": 1,
                                "name": "John Doe",
                                "imagePath": "../assets/images/john_doe.png"
                            },
                            {
                                "barberId": 2,
                                "name": "Jane Doe",
                                "imagePath": "../assets/images/jane_doe.png"
                            }
                        ],
                        services: [
                            {
                                "serviceId": 1,
                                "name": "haircut",
                                "price": 20,
                                "duration": 30
                            },
                            {
                                "serviceId": 2,
                                "name": "shave",
                                "price": 15,
                                "duration": 30
                            }
                        ],
                        upcomingAppointments: {
                            "2050-01-01": [
                                "12:00",
                                "12:30"
                            ],
                            "2000-01-02": [
                                "12:00"
                            ]
                        }
                    }
                };
            }),
            post: jest.fn().mockImplementation(async () => {
                return {
                    appointment: {
                        clientName: "John Doe",
                        clientEmail: "john.doe@example.com",
                        barberId: 1,
                        serviceId: 1,
                        date: "2020-01-01",
                        time: "12:00",
                    }
                };
            })
        },
        state: {
            appointment: {
                clientName: "",
                clientEmail: "",
                barberId: "",
                serviceId: "",
                date: "",
                time: "",
            },
            barbers: [],
            services: [],
            upcomingAppointments: []
        }
    };
});

describe("API call actions", () => {
    it("should return appointment from the create appointment action", async () => {
        const context = {
            state: {
                appointment: {
                    clientName: "John Doe",
                    clientEmail: "john.doe@example.com",
                    barberId: 1,
                    serviceId: 1,
                    date: "2020-01-01",
                    time: "12:00",
                }
            }
        };

        const appointment = await actions[APPOINTMENT_SCHEDULE](context);

        expect(appointment).toMatchObject({
            appointment: {
                clientName: "John Doe",
                clientEmail: "john.doe@example.com",
                barberId: 1,
                serviceId: 1,
                date: "2020-01-01",
                time: "12:00",
            }
        });
    });

    it("should return the barbers from the fetch barbers action", async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};

        const barbers = await actions[FETCH_BARBERS](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_FETCHED_BARBERS);
        expect(barbers).toHaveLength(2);
    });

    it("should return the services from the fetch services action", async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};

        const services = await actions[FETCH_SERVICES](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_FETCHED_SERVICES);
        expect(services).toHaveLength(2);
    });

    it("should return the upcoming appointments from the fetch upcoming appointments action", async () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction};

        const upcomingAppointments = await actions[FETCH_UPCOMING_APPOINTMENTS](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_UPCOMING_APPOINTMENTS);
        expect(upcomingAppointments).toMatchObject({
            "2050-01-01": [
                "12:00",
                "12:30"
            ],
            "2000-01-02": [
                "12:00"
            ]
        });
    });
});

describe("Actions", () => {
    it("set barber and unset date/time on set barber action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_SET_BARBER](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_BARBER);
    })

    it("set service on set service action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_SET_SERVICE](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_SERVICE);
    })

    it("set date and unset time on set date action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_SET_DATE](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_DATE);
    })

    it("set time on set time action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_SET_TIME](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_TIME);
    })

    it("set client name on set client name action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_SET_CLIENT_NAME](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_CLIENT_NAME);
    })

    it("set client email on set client email action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_SET_CLIENT_EMAIL](context);

        expect(commitFunction.mock.calls[0][0]).toBe(SET_CLIENT_EMAIL);
    })

    it("reset appointment state on appointment reset state action", () => {
        const commitFunction = jest.fn();
        const context = {commit: commitFunction}

        actions[APPOINTMENT_RESET_STATE](context);

        expect(commitFunction.mock.calls[0][0]).toBe(RESET_APPOINTMENT_STATE);
    })
});

describe("Mutations", () => {
    it("set barber", () => {
        const barber = {barberId: 1, name: "John Doe"}
        const state = {
            appointment: {
                barberId: ""
            },
            selections: {
                barberName: "",
            }
        }

        mutations[SET_BARBER](state, barber)

        expect(state).toEqual({
            appointment: {
                barberId: 1
            },
            selections: {
                barberName: "John Doe",
            }
        })
    })

    it("set service", () => {
        const service = {serviceId: 1, name: "Haircut"}
        const state = {
            appointment: {
                serviceId: ""
            },
            selections: {
                serviceName: "",
            }
        }

        mutations[SET_SERVICE](state, service)

        expect(state).toEqual({
            appointment: {
                serviceId: 1
            },
            selections: {
                serviceName: "Haircut",
            }
        })
    })

    it("set date", () => {
        const date = "2020-01-01"
        const state = {
            appointment: {
                date: ""
            },
        }

        mutations[SET_DATE](state, date)

        expect(state).toEqual({
            appointment: {
                date: "2020-01-01"
            },
        })
    })

    it("unset date", () => {
        const state = {
            appointment: {
                date: "2020-01-01"
            },
        }

        mutations[UNSET_DATE](state)

        expect(state).toEqual({
            appointment: {
                date: ""
            },
        })
    })

    it("set time", () => {
        const time = "12:00"
        const state = {
            appointment: {
                time: ""
            },
        }

        mutations[SET_TIME](state, time)

        expect(state).toEqual({
            appointment: {
                time: "12:00"
            },
        })
    })

    it("unset time", () => {
        const state = {
            appointment: {
                time: "12:00"
            },
        }

        mutations[UNSET_TIME](state)

        expect(state).toEqual({
            appointment: {
                time: ""
            },
        })
    })

    it("set client name", () => {
        const clientName = "John Doe"
        const state = {
            appointment: {
                clientName: ""
            },
        }

        mutations[SET_CLIENT_NAME](state, clientName)

        expect(state).toEqual({
            appointment: {
                clientName: "John Doe"
            },
        })
    })

    it("set client email", () => {
        const clientEmail = "john.doe@example.com"
        const state = {
            appointment: {
                clientEmail: ""
            },
        }

        mutations[SET_CLIENT_EMAIL](state, clientEmail)

        expect(state).toEqual({
            appointment: {
                clientEmail: "john.doe@example.com"
            },
        })
    })

    it("reset appointment state", () => {
        const state = {
            appointment: {
                clientName: "John Doe",
                clientEmail: "john.doe@example.com",
                barberId: 1,
                serviceId: 1,
                date: "2020-01-01",
                time: "12:00",
            },
            selections: {
                barberName: "Jeff Doe",
                serviceName: "Haircut",
            },
            upcomingAppointments: {"2025-01-01": ["12:00"], "2025-12-31": ["12:00", "13:00"]},
        }

        mutations[RESET_APPOINTMENT_STATE](state)

        expect(state).toEqual({
            appointment: {
                clientName: "",
                clientEmail: "",
                barberId: "",
                serviceId: "",
                date: "",
                time: "",
            },
            selections: {
                barberName: "",
                serviceName: "",
            },
            upcomingAppointments: [],
        })
    })
});

describe("getters", () => {

    const exampleState = {
        appointment: {
            clientName: "John Doe",
            clientEmail: "john.doe@example.com",
            barberId: 1,
            serviceId: 1,
            date: "2020-01-01",
            time: "12:00",
        },
        selections: {
            barberName: "Jeff Doe",
            serviceName: "Haircut",
        },
        upcomingAppointments: {"2025-01-01": ["12:00"], "2025-12-31": ["12:00", "13:00"]},
        fetchedBarbers: [1, 2, 3],
        fetchedServices: [1, 2, 3]
    }

    it("returns appointment", () => {
        expect(getters.appointment(exampleState)).toEqual({
                clientName: "John Doe",
                clientEmail: "john.doe@example.com",
                barberId: 1,
                serviceId: 1,
                date: "2020-01-01",
                time: "12:00",
            },
        )
    })

    it("returns fetched barbers", () => {
        expect(getters.fetchedBarbers(exampleState)).toEqual([1, 2, 3])
    })

    it("returns fetched services", () => {
        expect(getters.fetchedServices(exampleState)).toEqual([1, 2, 3])
    })

    it("returns upcoming appointments", () => {
        expect(getters.upcomingAppointments(exampleState)).toEqual({
            "2025-01-01": ["12:00"],
            "2025-12-31": ["12:00", "13:00"]
        })
    })

    it("returns selections", () => {
        expect(getters.selections(exampleState)).toEqual({
            barberName: "Jeff Doe",
            serviceName: "Haircut",
        },)
    })
})


