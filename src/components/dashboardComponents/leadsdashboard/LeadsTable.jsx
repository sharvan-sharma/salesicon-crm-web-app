import React,{useState} from 'react'
import ToggleMenu from '../campaigns/ToggleMenu'
import SearchBar from '../Searchbar'

const Lead = (props)=>{
    return (
                    <div className='d-flex shadow p-2 my-4 rounded align-items-center justify-content-between'>
                        <div className='ff-mst bold p-1'>{props.campaign.name}</div>
                        <div className='ff-mst bold'>{props.campaign.date}</div>
                        <div className='text-1 ff-mst'>{props.campaign.status}</div>
                        <button className='btn btn-3' onClick={()=>props.setOpenLead({open:true,lead_id:props.id})}>Open</button>
                    </div>
    )
}

let dbdata = [
    {name:'lead-1',description:"dummy description added",date:'22/04/2019 06:48',status:'Active'},
    {name:'lead-2',description:"dummy description added",date:'22/04/2019 06:48',status:'Active'},
    {name:'lead-3',date:'22/04/2019 06:48',status:'Active'},
    {name:'lead-4',date:'22/04/2019 06:48',status:'Active'},
    {name:'lead-5',date:'22/04/2019 06:48',status:'Active'},
    {name:'lead-6',date:'22/04/2019 06:48',status:'Active'}
]

function LeadsTable(props){
    

    const [leadsArray,updateLeads] = useState(dbdata)
   
return (<>
        {/* searchbar */}
        {/* addnew */}
        {/* edit old */}
        <div className='col-12 fsm d-flex justify-content-between align-items-center flex-wrap'>
            <div className='col-12 col-md-6 col-lg-6 p-0 fsm'>
                <SearchBar/>
            </div>
            <div className='d-flex py-1 fsm'>
                <div className='mr-2'>
                    <ToggleMenu/>
                </div>
                <div className='mr-2'>
                    <ToggleMenu/>
                </div>
            </div>
        </div>
        
        <div className='col-12 my-4'>
            {
                leadsArray.map((campaign,index)=><Lead key={index} id={index} campaign={campaign} setOpenLead={props.setOpenLead}/>)
            }
        </div>
</>)
}

export default LeadsTable;