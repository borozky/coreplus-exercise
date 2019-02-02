import * as React from "react"
import { Practitioner } from "ClientApp/models/models";

interface PractitionerListProps {
    practitioners?: Practitioner[]
    selectedPractitioner?: Practitioner | null
    onSelectedPractitioner?: (practitioner: Practitioner) => void

}

export default function PractitionerList(props: PractitionerListProps) {
    return <div id="PractitionerList">
        <h3>Practitioners</h3>
        <ul>
            {
                props.practitioners && props.practitioners.map((practitioner, index) => {
                    return <li 
                        className={props.selectedPractitioner && props.selectedPractitioner.id === practitioner.id ?  `active` : ``}
                        key={index} 
                        onClick={e => props.onSelectedPractitioner && props.onSelectedPractitioner(practitioner)}>
                        {practitioner.name}
                    </li>
                })
            }
        </ul>
    </div>
}