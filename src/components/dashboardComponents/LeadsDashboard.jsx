import React ,{useEffect,useState} from 'react'
import LeadsTable from './leadsdashboard/LeadsTable'
import Lead from './leadsdashboard/Lead'

function LeadsDashboard(props){
    useEffect(() =>  props.setactive(), [])

    const [openlead,setOpenLead] = useState({open:false,lead_id:null})



    return (<>
               {(!openlead.open)?<LeadsTable setOpenLead={setOpenLead}/>
               :
               <Lead setOpenLead={setOpenLead} lead_id={openlead.lead_id} />}
            </>
        )
}

export default LeadsDashboard