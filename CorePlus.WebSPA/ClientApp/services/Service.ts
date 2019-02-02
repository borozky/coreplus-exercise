import * as moment from "moment"
import { Appointment, AppointmentsByMonth, Practitioner } from "../models/models";

export const allPractitioners = require<Practitioner[]>("../../practitioners.json");
export const allAppointments = require<Appointment[]>("../../appointments.json");
export const OUTPUT_DATE_FORMAT = "dddd, DD MMMM YYYY"


export function getPractitioners() {
    return allPractitioners
}

export function getAllAppointments() {
    // allAppointments was derived directly from json file, 
    // so by default it will have undefined methods
    // to add methods, convert each json object into javascript class
    const appointments = allAppointments.map(a => {
         return new Appointment(a)
    })

    // return sortAppointments(appointments)
    return appointments
}

export function getAppointmentsByPractitionerId(practitionerId: number, from = moment().subtract(3, "years").unix(), to = moment().unix()) {
    const allAppointments = getAllAppointments();
    const foundAppointments = allAppointments.filter(a => {
        return a.practitioner_id === practitionerId && a.getUnixMillis() > from && a.getUnixMillis() < to
    })

    return foundAppointments;
}

// Get all appointments grouped monthly
export function getAppointmentsGroupedByMonths(appointments: Appointment[]) {
    var groups: Record<string, Appointment[]> = {};

    appointments.forEach(appointment => {
        var monthYear = moment(appointment.date, Appointment.INPUT_DATE_FORMAT).format(AppointmentsByMonth.MONTH_FORMAT);
        if (! groups[monthYear]) {
            groups[monthYear] = [];
        }

        groups[monthYear].push(appointment);
    })

    const monthlyAppointments = Object.keys(groups).map<AppointmentsByMonth>(key => {
        const appointments = groups[key];
        const sortedAppointments = sortAppointments(appointments)
        return new AppointmentsByMonth(key, sortedAppointments);
    })

    return sortMonthlyAppointments(monthlyAppointments);
}

export function sortAppointments(appointments: Appointment[]) {
    return appointments.sort((a, b) => b.getDate().getTime() - a.getDate().getTime())
}

export function sortMonthlyAppointments(monthlyAppointments: AppointmentsByMonth[]) {
    const sortedMonthlyAppointments = monthlyAppointments.sort((a, b) => {
        return b.startDate.getTime() - a.startDate.getTime()
    }) 

    return sortedMonthlyAppointments
}

export function getTotalCost(appointments: Appointment[]) {
    return appointments.reduce((prev, curr) => prev + curr.cost, 0)
}

export function getTotalRevenue(appointments: Appointment[]) {
    return appointments.reduce((prev, curr) => prev + curr.revenue, 0)
}