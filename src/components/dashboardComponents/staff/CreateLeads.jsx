import React from 'react'
import LeadForm from './createleads/LeadForm'
import {Switch,Route} from 'react-router-dom'
import UploadComponent from '../../utilComponents/UploadComponent'

function CreateLeads(props){

return (<>
        <div className='mbl' style={{marginTop:'10vh'}}/>
        <div className='my-2 ff-mst'>
            Create <span className='text-1'>Multiple</span> Leads
        </div>
        <div className='hr-3'></div>
        <div className='my-2'>
            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <label className='flg ff-mst m-0'>Upload a <span className='text-1'>.xls</span> file</label>
                <button className='btn btn-3 fsm text-nowrap'>Download Template (.xls) File</button>
            </div>
            <UploadComponent  fileType='xls' maxSize={50000} url='/staffapi/lead/createmultiple' />
        </div>
</>)
}

const CreateLeadsRouter = (props)=>{
    return (
        <Switch>
            <Route exact path = '/addleads/single' component={LeadForm}/>
            <Route exact path = '/addleads' component={CreateLeads} />
        </Switch>
    )
}


export default CreateLeadsRouter