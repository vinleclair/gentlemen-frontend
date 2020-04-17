import {
    APPOINTMENT_SCHEDULE,
    FETCH_BARBERS,
    FETCH_SERVICES,
    FETCH_UPCOMING_APPOINTMENTS
} from "../../../src/store/actions.type";
import {actions} from "../../../src/store/home.module";


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
        }
    };
});

describe("Vuex Home Module", () => {
    it("should return appointment from the create appointment action", async () => {
        const state = {
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
        const appointment = await actions[APPOINTMENT_SCHEDULE](state);
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
        const context = {
            commit: () => {
            }
        };
        const barbers = await actions[FETCH_BARBERS](context);
        expect(barbers).toHaveLength(2);
    });

    it("should return the services from the fetch services action", async () => {
        const context = {
            commit: () => {
            }
        };
        const services = await actions[FETCH_SERVICES](context);
        expect(services).toHaveLength(2);
    });

    it("should return the upcoming appointments from the fetch upcoming appointments action", async () => {
        const context = {
            commit: () => {
            }
        };
        const upcomingAppointments = await actions[FETCH_UPCOMING_APPOINTMENTS](context);
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
