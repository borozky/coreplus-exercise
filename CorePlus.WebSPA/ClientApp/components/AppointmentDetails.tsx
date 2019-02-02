import * as React from "react";
import { Appointment, Practitioner } from "ClientApp/models/models";

interface AppointmentDetailsProps {
    appointment: Appointment
    practitioner?: Practitioner | null
}

export default function AppointmentDetails(props: AppointmentDetailsProps) {

    return <div id="AppointmentDetails">
        <h3>Appointment Details</h3>
        <table>
            <tbody>
                <tr>
                    <td>Date</td>
                    <td>{props.appointment.dateString("dddd, DD MMMM YYYY")}</td>
                </tr>
                <tr>
                    <td>Client Name</td>
                    <td>{props.appointment.client_name}</td>
                </tr>
                <tr>
                    <td>Appointment Type</td>
                    <td>{props.appointment.appointment_type}</td>
                </tr>
                <tr>
                    <td>Duration</td>
                    <td>{props.appointment.duration}</td>
                </tr>
                <tr>
                    <td>Revenue</td>
                    <td>{props.appointment.revenue}</td>
                </tr>
                <tr>
                    <td>Cost</td>
                    <td>{props.appointment.cost}</td>
                </tr>
                <tr>
                    <td>Practitioner</td>
                    <td>{props.practitioner ? props.practitioner.name : props.appointment.practitioner_id}</td>
                </tr>
            </tbody>
        </table>
    </div>
}