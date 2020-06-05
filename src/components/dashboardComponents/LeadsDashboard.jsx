import React ,{useEffect,useState} from 'react'
import LeadsTable from './leadsdashboard/LeadsTable'
import Lead from './leadsdashboard/Lead' 

function LeadsDashboard(props){

    const [openlead,setOpenLead] = useState({open:false,lead:null})

    return (<>
               {(!openlead.open)?<LeadsTable setOpenLead={setOpenLead}/>
               :
               <Lead setOpenLead={setOpenLead} lead={openlead.lead} />}
            </>
        )
}

export default LeadsDashboard