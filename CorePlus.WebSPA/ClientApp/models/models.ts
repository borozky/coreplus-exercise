import * as moment from "moment"
export interface Practitioner {
    id: number
    name: string
}

export interface Link {
    href?: string,
    rel?: string[]
}

export interface Appointment {
    id: number
    date: string;
    client_name: string;
    appointment_type: string;
    duration: number;
    revenue: number;
    cost: number;
    practitioner_id: number;
    links?: Link[];
}
export class Appointment implements Appointment {
    static readonly INPUT_DATE_FORMAT = "M/D/YYYY"
    static readonly OUTPUT_MONTH_FORMAT = "MM/YYYY"
    static readonly OUTPUT_DATE_FORMAT = "dddd, DD MMMM YYYY"

    constructor(appointment: Appointment) {
        this.id = appointment.id;
        this.date = appointment.date;
        this.client_name = appointment.client_name;
        this.appointment_type = appointment.appointment_type;
        this.duration = appointment.duration;
        this.revenue = appointment.revenue;
        this.cost = appointment.cost;
        this.practitioner_id = appointment.practitioner_id;
        this.links = appointment.links;
    }

    public getDate() {
        return moment(this.date, Appointment.INPUT_DATE_FORMAT).toDate();
    }

    public getUnixMillis() {
        return moment(this.date, Appointment.INPUT_DATE_FORMAT).unix()
    }

    public dateString(outputFormat = Appointment.OUTPUT_DATE_FORMAT) {
        return moment(this.date, Appointment.INPUT_DATE_FORMAT).format(outputFormat);
    }
}

export interface AppointmentsByMonth {
    month: string
    appointments: Appointment[]
}

export class AppointmentsByMonth implements AppointmentsByMonth {
    static readonly MONTH_FORMAT = "MM/YYYY"
    static readonly INPUT_DATE_FORMAT = "M/D/YYYY"
    private readonly moment: moment.Moment;

    public constructor(month: string, appointments: Appointment[]) {
        this.month = month
        this.appointments = appointments
        this.moment = moment(this.month, AppointmentsByMonth.MONTH_FORMAT)
    }

    formatMonth(dateFormat = "MMMM YYYY") {
        return moment(this.month, AppointmentsByMonth.MONTH_FORMAT).format(dateFormat); 
    }

    get totalCost() {
        return this.appointments.reduce((prevValue, appointment) => prevValue + appointment.cost, 0)
    }

    get totalRevenue() {
        return this.appointments.reduce((prevValue, appointment) => prevValue + appointment.revenue, 0)
    }

    get startDate() {
        return this.moment.toDate()
    }

    get endDate() {
        return this.moment.add(1, "month").subtract(1, "millisecond").toDate();
    }

    get sortedAppointments() {
        return this.appointments.sort((a, b) => a.getDate().getTime() - b.getDate().getTime())
    }

    
}