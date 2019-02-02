import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Practitioner, Appointment, AppointmentsByMonth } from "../models/models";
import * as service from "../services/Service";
import PractitionerList from "../components/PractitionerList";
import AppointmentDetails from "../components/AppointmentDetails";
import PractitionerMonthlyAppointments from "../components/PractitionerMonthlyAppointments";
import * as moment from "moment"

interface ReportPageProps {}
interface ReportPageState {
    practitioners: Practitioner[],
    selectedPractitioner: Practitioner | null
    selectedAppointment: Appointment | null
    allPractitionerMonthlyAppointments: AppointmentsByMonth[]
    months: string[]
    dateStart: string 
    dateEnd: string
}

export class ReportPage extends React.Component<RouteComponentProps<ReportPageProps>, ReportPageState> {
    state: ReportPageState = {
        practitioners: [],
        selectedPractitioner: null,
        selectedAppointment: null,
        allPractitionerMonthlyAppointments: [],
        months: [],
        dateStart: moment().add(-3, "years").format("MMMM YYYY"),
        dateEnd: moment().format("MMMM YYYY")
    }

    public constructor(props: RouteComponentProps<ReportPageProps>) {
        super(props);
        this.handlePractitionerSelected = this.handlePractitionerSelected.bind(this);
        this.handleAppointmentSelected = this.handleAppointmentSelected.bind(this);
    }

    public handlePractitionerSelected(practitioner: Practitioner) {
        // get all practitioner appointments
        const practitionerAppointments = service.getAppointmentsByPractitionerId(practitioner.id);

        // group appointments by month
        const allAppointmentsGroupedByMonths = service.getAppointmentsGroupedByMonths(practitionerAppointments);

        // get all months
        const months = allAppointmentsGroupedByMonths.map(a => a.month);

        const dateStart = this.getDateStart(months);
        const dateEnd = this.getDateEnd(months);

        this.setState({
            selectedPractitioner: practitioner,
            allPractitionerMonthlyAppointments: allAppointmentsGroupedByMonths,
            months: months,
            selectedAppointment: null
        })
    }

    private getDateEnd(months: string[], format = AppointmentsByMonth.MONTH_FORMAT) {
        console.log("MONTHS", months);
    }

    private getDateStart(months: string[]) {

    }

    public handleAppointmentSelected(appointment: Appointment) {
        this.setState({
            selectedAppointment: appointment
        })
    }

    public componentDidMount() {
        const practitioners = service.getPractitioners();
        this.setState(() => ({
            practitioners: practitioners
        }))
    }
    
    public render() {
        return (
            <div>
                <div className="page-title">
                    <h1>Generated Report <br/><small><a href="/">Return back</a></small>
                    </h1>
                </div>
                <div id="ReportPage" className="page page-report">

                    <div className="left-sidebar">
                        <PractitionerList onSelectedPractitioner={this.handlePractitionerSelected} practitioners={this.state.practitioners}selectedPractitioner={this.state.selectedPractitioner}/>
                    </div>

                    <div className="right-sidebar">
                        { this.state.selectedAppointment && <AppointmentDetails appointment={this.state.selectedAppointment} practitioner={this.state.selectedPractitioner} /> }
                    </div>

                    <div className="page-body">
                    {
                        this.state.selectedPractitioner && <PractitionerMonthlyAppointments 
                            monthlyAppointments={this.state.allPractitionerMonthlyAppointments} 
                            months={this.state.months}
                            dateStart={this.state.dateStart}
                            dateEnd={this.state.dateEnd}
                            practitioner={this.state.selectedPractitioner}
                            onAppointmentSelected={this.handleAppointmentSelected}
                        />
                    }
                    {
                        !this.state.selectedPractitioner && <p id="NoPractitionerSelectedMessage">Please select a practitioner on the left</p>
                    }
                    </div>

                </div>
            </div>
        )
    }
}