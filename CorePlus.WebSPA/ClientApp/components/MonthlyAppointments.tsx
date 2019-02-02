import * as React from "react";
import { Appointment, AppointmentsByMonth } from "ClientApp/models/models";

interface MonthlyAppointmentsProps {
    selectedAppointment: Appointment | null
    appointmentsByMonth: AppointmentsByMonth
    id?: string | null
    onAppointmentSelected: (appointment: Appointment) => void
}

export default function MonthlyAppointments(props: MonthlyAppointmentsProps) {
    return <div className="monthly monthly-appointments" id={props.id || ''}>
        <h3>{props.appointmentsByMonth.formatMonth()}<br/>
        <small>
            <span>Cost: $ {props.appointmentsByMonth.totalCost}</span> | <span>Revenue: $ {props.appointmentsByMonth.totalRevenue}</span>
        </small>
    </h3>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Cost</th>
                    <th>Revenue</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.appointmentsByMonth.appointments.length === 0 && <tr><td colSpan={4}>No appointments found for this month</td></tr>
                }
                {
                    props.appointmentsByMonth.appointments.length > 0 && props.appointmentsByMonth.appointments.map((appointment, index) => 
                    <tr key={index} 
                        onClick={e => props.onAppointmentSelected(appointment)} 
                        className={appointment === props.selectedAppointment ? `active` : ``}
                    >
                        <td>{appointment.date}</td>
                        <td>{appointment.client_name}</td>
                        <td>{appointment.cost}</td>
                        <td>{appointment.revenue}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    </div>
}