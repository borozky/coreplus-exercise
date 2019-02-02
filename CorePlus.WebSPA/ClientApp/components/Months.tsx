import * as React from "react"
import * as moment from "moment" 

interface MonthsProps {
    months: string[]
    selectedMonth: string | null,
    onAllSelected?: () => void
    onMonthSelected?: (month: string) => void
}

function formatMonth(month: string, format = "MMMM YYYY") {
    return moment(month, "MM/YYYY").format(format);
}

export default function Months(props: MonthsProps) {
    return <div id="Months">
        <ul>
            <li className={!props.selectedMonth ? `active` : ``} onClick={e => props.onAllSelected && props.onAllSelected()}>All</li>
            {
                props.months.map((month, index) => {
                    return <li key={index} 
                        className={props.selectedMonth && props.selectedMonth === month ? `active` : ``} 
                        onClick={e => props.onMonthSelected && props.onMonthSelected(month)}>
                            {formatMonth(month)}
                        </li>
                })
            }
        </ul>
    </div>
}