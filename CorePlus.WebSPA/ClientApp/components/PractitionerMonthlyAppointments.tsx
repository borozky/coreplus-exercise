import * as React from "react"
import Months from "./Months";
import { AppointmentsByMonth, Appointment, Practitioner } from "ClientApp/models/models";
import MonthlyAppointments from "./MonthlyAppointments";


interface Props {
    months: string[]
    monthlyAppointments: AppointmentsByMonth[]
    practitioner: Practitioner
    dateStart: string
    dateEnd: string
    onAppointmentSelected: (appointment: Appointment) => void
}

interface State {
    selectedMonth: string | null
    selectedAppointment: Appointment | null
}

export default class PractitionerMonthlyAppointments extends React.Component<Props, State> {

    state: State = {
        selectedMonth: null, // null means all months selected
        selectedAppointment: null
    }

    public constructor(props: Props) {
        super(props);

        this.handleAllMonthsSelected = this.handleAllMonthsSelected.bind(this);
        this.handleMonthSelected = this.handleMonthSelected.bind(this);
        this.handleAppointmentSelected = this.handleAppointmentSelected.bind(this);
    }

    public componentDidMount() {
        this.setState({
            selectedAppointment: null
        })
    }

    public handleAllMonthsSelected() {
        this.setState({
            selectedMonth: null
        })
    }

    public handleAppointmentSelected(appointment: Appointment) {
        this.setState({
            selectedAppointment: appointment
        })

        this.props.onAppointmentSelected(appointment)
    }

    public handleMonthSelected(month: string) {
        this.setState({
            selectedMonth: month
        })
    }

    public getAppointmentsByMonth(monthlyAppointments: AppointmentsByMonth[], month: string) {
        return monthlyAppointments.filter(monthlyAppointment => monthlyAppointment.month == month);
    }

    public render() {
        let monthlyAppointments: AppointmentsByMonth[] = [];

        if (this.state.selectedMonth) {
            monthlyAppointments = this.getAppointmentsByMonth(this.props.monthlyAppointments, this.state.selectedMonth);
        } else {
            monthlyAppointments = this.props.monthlyAppointments
        }

        if (monthlyAppointments.length === 0) {
            return <p>Please select a practitioner on the left</p>
        }

        return (
            <div id="AppointmentsByMonth">
                <h2>Monthly appointments for {this.props.practitioner.name}<br/><small>{this.props.dateStart} - {this.props.dateEnd}</small></h2>
                <div id="AppointmentsByMonth-Inner">
                    <Months months={this.props.months} selectedMonth={this.state.selectedMonth} onAllSelected={this.handleAllMonthsSelected} onMonthSelected={this.handleMonthSelected} />
                    <div id="Appointments">
                        {
                            monthlyAppointments.map((monthlyAppointment, index) => {
                                return <MonthlyAppointments key={index} selectedAppointment={this.state.selectedAppointment} appointmentsByMonth={monthlyAppointment} id={`MONTH_${index}`} onAppointmentSelected={this.handleAppointmentSelected}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}